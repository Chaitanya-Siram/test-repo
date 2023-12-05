from data import fetch_saved_searches, clean_search_params, create_search_data_volume, update_search_data_volume
from search_query import search_pagination_filter
from search_connection import get_opensearch_data
from send_email import send_volume_alert_email, send_sentiment_alert_emails
import logging
from datetime import datetime, timedelta

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] [%(name)s.%(funcName)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

logger = logging.getLogger(__name__)

def lambda_handler(event, context):
    try:
        logger.info("Starting Alert Email Function")
        count = 0
        email_send = 0
        startDate = datetime.now() + timedelta(hours=9)
        endDate = datetime.now()

        saved_searches = fetch_saved_searches()

        for saved_search in saved_searches:
            logger.info(f"Creating Search Query for SavedSearch Id : {saved_search['id']}")
            search_params = saved_search["search_params"]
            query_and_filters = clean_search_params(search_params)
            
            logger.info(f"Generating OpenSearch Query with statDate - {startDate}, endDate - {endDate}")
            opensearch_query = search_pagination_filter(query_and_filters, startDate, endDate)
            
            logger.info(f"Fetching Data From OpenSearch")
            data = get_opensearch_data(opensearch_query)

            # Cleaning OpenSearch Data
            logger.info(f"Cleaning OpenSearch Data")
            total_volume = data["aggregations"]["total_count"]["value"]
            positive_count = 0
            negative_count = 0
            neutral_count = 0
            for sentiment in data["aggregations"]["sentiment_count"]["buckets"]:
                if sentiment["key"] == "POS":
                    positive_count = sentiment["doc_count"]
                if sentiment["key"] == "NEU":
                    neutral_count = sentiment["doc_count"]
                if sentiment["key"] == "NEG":
                    negative_count = sentiment["doc_count"]
            
            new_volume_data = {
                'article_volume': total_volume,
                'positive_sentiment': positive_count,
                'negative_sentiment': negative_count,
                'neutral_sentiment': neutral_count,
                'saved_search_id': saved_search["id"]
            }

            # Logic for Saving and Email Sending
            existing_saved_volumes = saved_search['search_data']
            if existing_saved_volumes is None:
                logger.info("No volume data exist, saving data for first time")
                create_search_data_volume(new_volume_data)
            else:
                logger.info("Start Logic for sending alert email")
                volume_mail_response = send_volume_alert_email(saved_search, new_volume_data)
                if volume_mail_response == True:
                    email_send += 1
                
                sentiment_mail_response = send_sentiment_alert_emails(saved_search, new_volume_data)
                if sentiment_mail_response == True:
                    email_send += 1

                logger.info("Updating New Volume record")
                update_search_data_volume(new_volume_data)

            count += 1
        logger.info(f"Total User: {count} and Email Send: {email_send}")
          
    except Exception as e:
        logger.info(f"Total User: {count} and Email Send: {email_send}")
        logger.error(str(e))
        return str(e)


if __name__ == "__main__":
    lambda_handler(None, None)
