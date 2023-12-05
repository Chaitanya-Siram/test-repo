from jinja2 import Template
from templates import *
import sendgrid
from sendgrid.helpers.mail import Email, Content, Mail
import os
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] [%(name)s.%(funcName)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

logger = logging.getLogger(__name__)

SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY')
SENDGRID_EMAIL = os.environ.get('SENDGRID_EMAIL')

def send_mail(to_email, subject, message):
    sg = sendgrid.SendGridAPIClient(api_key=SENDGRID_API_KEY)
    from_email = Email(SENDGRID_EMAIL)
    
    content = Content("text/html", message)
    mail = Mail(from_email, to_email, subject, content)
    response = sg.send(mail)
    return response

def send_volume_alert_email(saved_search, new_data):
    ''' Function for generating email content for Volume Alert '''
    
    user_detail = saved_search["user"]
    to_email = user_detail["email"]

    existing_saved_data = saved_search['search_data']
    saved_search_title = saved_search["title"]

    # If Volume Alert is Enabled
    is_mail_send = False
    if saved_search['alert_volume_enabled'] == True:
        old_article_volume = existing_saved_data["article_volume"]
        new_article_volume = new_data["article_volume"]

        template_string = volume_email_template()
        template = Template(template_string)
        subject = f"Alert Email for Change in Search Volume for Your Query : {saved_search_title}"
        
        # If Increase in Volume is Enabled
        if saved_search['alert_volume_increase_enabled'] == True and new_article_volume > old_article_volume:
            increase_volume = new_article_volume - old_article_volume
            if old_article_volume == 0:
                increase_percent = increase_volume * 100
            else:
                increase_percent = (increase_volume / old_article_volume) * 100
            
            if increase_percent >= saved_search['alert_volume_increase_by']:
                logger.info(f"Sending email for increased in volume")
                email_data = {
                    "first_name" : user_detail["first_name"],
                    "query_title": saved_search["title"],
                    "search_query": saved_search["title"],
                    "pre_defined_percent" : saved_search['alert_volume_increase_by'],
                    "change_text": "increased",
                    "changes_volume": new_article_volume,
                    "changes_color": "green"
                }
            
                message = template.render(email_data)
                mail_response = send_mail(to_email, subject, message)
                if mail_response.status_code == 202:
                    is_mail_send = True
                    logger.info(f"Email sent for increased in volume")
        
        # If Increase in Volume is Disabled
        if saved_search['alert_volume_decrease_enabled'] == True and old_article_volume > new_article_volume:
            decrease_volume = old_article_volume - new_article_volume
            if old_article_volume == 0:
                decrease_percent = decrease_volume * 100
            else:
                decrease_percent = (decrease_volume / old_article_volume) * 100

            if decrease_percent >= saved_search['alert_volume_decrease_by']:
                logger.info(f"Sending email for decreased in volume")
                email_data = {
                    "first_name" : user_detail["first_name"],
                    "query_title": saved_search["title"],
                    "search_query": saved_search["title"],
                    "pre_defined_percent" : saved_search['alert_volume_decrease_by'],
                    "change_text": "decreased",
                    "changes_volume": new_article_volume,
                    "changes_color": "red"
                }
            
                message = template.render(email_data)
                mail_response = send_mail(to_email, subject, message)
                if mail_response.status_code == 202:
                    is_mail_send = True
                    logger.info(f"Email sent for decreased in volume")
        
    return is_mail_send


def send_sentiment_alert_emails(saved_search, new_data):
    user_detail = saved_search["user"]
    to_email = user_detail["email"]

    existing_saved_data = saved_search['search_data']
    saved_search_title = saved_search["title"]

    # If Sentiment Alert is Enabled
    is_mail_send = False
    if saved_search['alert_sentiment_enabled'] == True:
        template_string = sentiment_email_template()
        template = Template(template_string)
        subject = f"Alert Email for Change in Sentiment for Your Query : {saved_search_title}"

        old_article_volume = existing_saved_data["article_volume"]
        new_article_volume = new_data["article_volume"]
        old_positive_sentiment = existing_saved_data['positive_sentiment']
        old_negative_sentiment = existing_saved_data['negative_sentiment']
        new_positive_sentiment = new_data['positive_sentiment']
        new_negative_sentiment = new_data['negative_sentiment']

        old_positive_percent = 0
        old_negative_percent = 0
        if old_article_volume == 0:
            old_positive_percent = old_positive_sentiment * 100
            old_negative_percent = old_negative_sentiment * 100
        else:
            old_positive_percent = (old_positive_sentiment / old_article_volume) * 100
            old_negative_percent = (old_negative_sentiment / old_article_volume) * 100
        
        new_positive_percent = 0
        new_negative_percent = 0
        if new_article_volume == 0:
            new_positive_percent = new_positive_sentiment * 100
            new_negative_percent = new_negative_sentiment * 100
        else:
            new_positive_percent = (new_positive_sentiment / new_article_volume) * 100
            new_negative_percent = (new_negative_sentiment / new_article_volume) * 100

        # If Increase in Sentiment is Enabled
        if saved_search['alert_sentiment_increase_enabled'] == True:
            updated_sentiment = None

            negative_changes = new_negative_percent - old_negative_percent
            if negative_changes >= saved_search['alert_sentiment_increase_by']:
                updated_sentiment = "Negative"
                changes_color = "red"

            positive_changes = new_positive_percent - old_positive_percent
            if positive_changes >= saved_search['alert_sentiment_increase_by']:
                updated_sentiment = "Positive"
                changes_color = "green"

            if updated_sentiment is not None:
                logger.info(f"Sending email for increase sentiment in volume")
                email_data = {
                    "first_name" : user_detail["first_name"],
                    "query_title": saved_search["title"],
                    "search_query": saved_search["title"],
                    "pre_defined_percent" : saved_search['alert_sentiment_increase_by'],
                    "change_text": "increased",
                    "updated_sentiment": updated_sentiment,
                    "changes_color": "green"
                }
                message = template.render(email_data)
                mail_response = send_mail(to_email, subject, message)
                if mail_response.status_code == 202:
                    is_mail_send = True
                    logger.info(f"Email sent for increased in sentiment")

        
        # If Decrease in Sentiment is Enabled
        if saved_search['alert_sentiment_decrease_enabled'] == True:
            updated_sentiment = None

            negative_changes = old_negative_percent - new_negative_percent
            if negative_changes >= saved_search['alert_sentiment_decrease_by']:
                updated_sentiment = "Negative"
                changes_color = "red"


            positive_changes = old_positive_percent - new_positive_percent
            if positive_changes >= saved_search['alert_sentiment_decrease_by']:
                updated_sentiment = "Positive"
                changes_color = "green"

            if updated_sentiment is not None:
                logger.info(f"Sending email for decrease sentiment in volume")
                email_data = {
                    "first_name" : user_detail["first_name"],
                    "query_title": saved_search["title"],
                    "search_query": saved_search["title"],
                    "pre_defined_percent" : saved_search['alert_sentiment_decrease_by'],
                    "change_text": "decreased",
                    "updated_sentiment": updated_sentiment,
                    "changes_color": changes_color
                }
                message = template.render(email_data)
                mail_response = send_mail(to_email, subject, message)
                if mail_response.status_code == 202:
                    is_mail_send = True
                    logger.info(f"Email send for decreased in sentiment")

    return is_mail_send
