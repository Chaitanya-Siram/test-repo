from sqlalchemy import create_engine, Column, Integer, String, Boolean, Text, Float, ForeignKey
from sqlalchemy.orm import Session, declarative_base, relationship, joinedload


Base = declarative_base()


class SavedSearch(Base):
    __tablename__ = 'searchapp_savedsearch'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    search_params = Column(Text)
    alert_volume_enabled = Column(Boolean)
    alert_volume_increase_enabled = Column(Boolean)
    alert_volume_increase_by = Column(Integer)
    alert_volume_decrease_enabled = Column(Boolean)
    alert_volume_decrease_by = Column(Integer)
    alert_sentiment_enabled = Column(Boolean)
    alert_sentiment_increase_enabled = Column(Boolean)
    alert_sentiment_increase_by = Column(Integer)
    alert_sentiment_decrease_enabled = Column(Boolean)
    alert_sentiment_decrease_by = Column(Integer)
    created_by_id = Column(Integer, ForeignKey('settingapp_orguser.id'))

    user = relationship("Users")
    data = relationship("SavedSearchData", back_populates="saved_search")


class SavedSearchData(Base):
    __tablename__ = 'searchapp_savedsearchdata'

    id = Column(Integer, primary_key=True)
    saved_search_id = Column(Integer, ForeignKey('searchapp_savedsearch.id'))
    article_volume = Column(Float)
    positive_sentiment = Column(Float)
    negative_sentiment = Column(Float)
    neutral_sentiment = Column(Float)

    saved_search = relationship("SavedSearch", back_populates="data")


class Users(Base):
    __tablename__ = 'settingapp_orguser'

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    active = Column(Boolean)
    is_active = Column(Boolean)