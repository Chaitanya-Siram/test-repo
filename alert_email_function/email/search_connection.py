from opensearchpy import OpenSearch
import os
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] [%(name)s.%(funcName)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
)

logger = logging.getLogger(__name__)

OPENSEARCH_URL = os.environ.get('OPENSEARCH_URL')
OPENSEARCH_USERNAME = os.environ.get('OPENSEARCH_USERNAME')
OPENSEARCH_PASSWORD = os.environ.get('OPENSEARCH_PASSWORD')
OPENSEARCH_INDEX_NAME = os.environ.get('OPENSEARCH_INDEX_NAME')


def get_opensearch_data(query):
    ''' Function for getting data from Opensearch with query '''
    
    logger.info("Initializing OpenSearch Connection")
    
    # OpenSearch Client
    auth = (OPENSEARCH_USERNAME, OPENSEARCH_PASSWORD)
    client = OpenSearch(hosts=[OPENSEARCH_URL], http_auth = auth)

    # Define the index you want to search
    index_name = OPENSEARCH_INDEX_NAME

    # Execute the search
    response = client.search(index=index_name, body=query)

    client.close()

    logger.info("Fetched data from OpenSearch")
    return response