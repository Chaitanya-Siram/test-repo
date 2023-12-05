from sqlalchemy import create_engine, Column, Integer, String, Boolean, Text, Float, ForeignKey
from sqlalchemy.orm import Session, declarative_base, relationship, joinedload
from models import SavedSearch, SavedSearchData, Users
import json
import os
from dotenv import load_dotenv
load_dotenv()

DB_NAME = os.environ.get('DB_NAME')
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
DB_HOST = os.environ.get('DB_HOST')
DB_PORT = os.environ.get('DB_PORT')

Base = declarative_base()

# Replace 'your_user', 'your_password', 'your_host', and 'your_database' with your actual database credentials.
engine = create_engine(f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}')
Base.metadata.create_all(engine)


def fetch_saved_searches():
    ''' Function for Fetching the Saved Search and Saved Search Volume Data '''

    with Session(engine) as session:
        fetched_saved_searches = (
            session.query(SavedSearch)
            .options(joinedload(SavedSearch.data), joinedload(SavedSearch.user))
            .filter(
                (SavedSearch.alert_volume_enabled == True) |
                (SavedSearch.alert_sentiment_enabled == True),
                Users.active == True
            )
            .all()
        )
        session.close()
    
    saved_searches = []
    for saved_search in fetched_saved_searches:
        search_data = None
        for data_entry in saved_search.data:
            search_data = {
                "id": data_entry.id,
                "article_volume": data_entry.article_volume,
                "positive_sentiment": data_entry.positive_sentiment,
                "negative_sentiment": data_entry.negative_sentiment,
                "neutral_sentiment": data_entry.neutral_sentiment,
                "saved_search": data_entry.saved_search_id,
            }

        search = {
            "id": saved_search.id,
            "title": saved_search.title,
            "search_params": saved_search.search_params,
            "alert_volume_enabled": saved_search.alert_volume_enabled,
            "alert_volume_increase_enabled": saved_search.alert_volume_increase_enabled,
            "alert_volume_increase_by": saved_search.alert_volume_increase_by,
            "alert_volume_decrease_enabled": saved_search.alert_volume_decrease_enabled,
            "alert_volume_decrease_by": saved_search.alert_volume_decrease_by,
            "alert_sentiment_enabled": saved_search.alert_sentiment_enabled,
            "alert_sentiment_increase_enabled": saved_search.alert_sentiment_increase_enabled,
            "alert_sentiment_increase_by": saved_search.alert_sentiment_increase_by,
            "alert_sentiment_decrease_enabled": saved_search.alert_sentiment_decrease_enabled,
            "alert_sentiment_decrease_by": saved_search.alert_sentiment_decrease_by,
            "search_data": search_data,
            "user": {
                "id": saved_search.user.id,
                "email": saved_search.user.email,
                "first_name": saved_search.user.first_name
            }
        }
        saved_searches.append(search)

    return saved_searches


def create_search_data_volume(data):
    ''' Function for Creating new entry of Saved Search Data - Articles volume and Sentiments '''
    
    with Session(engine) as session:
        saved_search_data = SavedSearchData(
            saved_search_id=data['saved_search_id'],
            article_volume=data['article_volume'],
            positive_sentiment=data['positive_sentiment'],
            negative_sentiment=data['negative_sentiment'],
            neutral_sentiment=data['neutral_sentiment']
        )

        session.add(saved_search_data)
        session.commit()
        session.close()


def update_search_data_volume(data):
    ''' Function for Updating the Saved Search Data - Articles volume and Sentiments '''
    
    with Session(engine) as session:
        existing_entry = session.query(SavedSearchData).filter_by(saved_search_id=data['saved_search_id']).first()

        if existing_entry:
            # Update the existing entry
            existing_entry.article_volume = data['article_volume']
            existing_entry.positive_sentiment = data['positive_sentiment']
            existing_entry.negative_sentiment = data['negative_sentiment']
            existing_entry.neutral_sentiment = data['neutral_sentiment']

            session.commit()
        session.close()


def clean_search_params(search_params):
    ''' Function for Cleaning the Saved Search - String SearchParams '''

    data_dict = json.loads(search_params)

    search_type = "simple"
    query = None

    guided_all_of_these = None
    guided_any_of_these = None
    guided_none_of_these = None
    if str(data_dict["isGuidedSearch"]).lower() == 'true':
        search_type = "guided"
        guided_all_of_these = data_dict["filters"]["query"]["all"]
        guided_any_of_these = data_dict["filters"]["query"]["any"]
        guided_none_of_these = data_dict["filters"]["query"]["none"]
    
    else:
        query = data_dict["filters"]["query"]

    filters = data_dict["filters"]["filter"]
    
    start_date = "2023-05-02"
    end_date = "2023-05-02"
    
    media_types = []
    if "mediaTypes" in filters:
        media_types_filter = filters["mediaTypes"]
        for media in media_types_filter:
            media_types.append(media['value'])
    
    languages = []
    if "languages" in filters:
        languages_filter = filters["languages"]
        for language in languages_filter:
            languages.append(language['value'])

    locations = []
    if "locations" in filters:
        locations_filter = filters["locations"]
        for location in locations_filter:
            locations.append(location['value'])

    spam_exclusions = []
    if "spam_exclusions" in filters:
        spam_exclusions_filter = filters["spam_exclusions"]
        for spam_exclusion in spam_exclusions_filter:
            spam_exclusions.append(spam_exclusion['value'])
    
    sentiments = []
    if "sentiment" in filters:
        sentiments_filter = filters["sentiment"]
        for sentiment in sentiments_filter:
            sentiments.append(sentiment['value'])
    
    keywords_include = []
    keywords_exclude = []
    keywords_includes_case_sensitive = "false"
    keywords_exclude_case_sensitive = "false"
    if "keywords" in filters:
        keywords_filter = filters["keywords"]
        keywords_include.append(keywords_filter["include"]["query"])
        keywords_includes_case_sensitive = keywords_filter["include"]['caseSensitive']
        keywords_exclude.append(keywords_filter["exclude"]["query"])
        keywords_exclude_case_sensitive = keywords_filter["exclude"]['caseSensitive']
    
    source_includes = []
    source_excludes = []
    if "sources" in filters:
        sources_filter = filters["sources"]
        if "include" in sources_filter:
            for include in sources_filter["include"]:
                source_includes.append(include['value'])

        if "exclude" in sources_filter:
            for exclude in sources_filter["exclude"]:
                source_excludes.append(exclude['value'])

    result = {
        "search_type": search_type,
        "simple_query": query,
        "guided_all_of_these": guided_all_of_these,
        "guided_any_of_these": guided_any_of_these,
        "guided_none_of_these": guided_none_of_these,
        "start_date": start_date,
        "end_date": end_date,
        "media_types": ",".join(media_types),
        "languages": ",".join(languages),
        "locations": ",".join(locations),
        "spam_exclusions": ",".join(spam_exclusions),
        "sentiments": ",".join(sentiments),
        "keywords_include": ",".join(keywords_include),
        "keywords_includes_case_sensitive": keywords_includes_case_sensitive,
        "keywords_exclude": ",".join(keywords_exclude),
        "keywords_exclude_case_sensitive": keywords_exclude_case_sensitive,
        "source_includes": ",".join(source_includes),
        "source_excludes": ",".join(source_excludes)
    }

    return result