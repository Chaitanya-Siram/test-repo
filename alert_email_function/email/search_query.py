def search_pagination_filter(filters, startDate, endDate):
    # The paging in opensearch start with 0

    if filters.get('search_type') == 'simple':
        search_query = filters['simple_query']

    # Query for guided search type
    if filters.get('search_type') == 'guided':
        guided_all_of_these = filters.get("guided_all_of_these")
        guided_any_of_these = filters.get("guided_any_of_these")
        guided_none_of_these = filters.get("guided_none_of_these")

        # search query for include all of these keywords
        if "guided_all_of_these" in filters and len(guided_all_of_these) > 0:
            added_bool_guided_all_of_these = guided_all_of_these.replace(',', ' AND ')
            search_query = '(' + added_bool_guided_all_of_these + ')'

        # search query for include any of these keywords
        if "guided_any_of_these" in filters and len(guided_any_of_these) > 0:
            added_bool_guided_any_of_these = guided_any_of_these.replace(',', ' OR ')
            search_query = search_query + ' AND (' + added_bool_guided_any_of_these +')'
        
        # search query for include none of these keywords
        if "guided_none_of_these" in filters and len(guided_none_of_these) > 0:
            added_bool_guided_none_of_these = guided_none_of_these.replace(',', ' OR ')
            search_query = search_query + ' AND NOT (' + added_bool_guided_none_of_these +')'

    # Construct the final query with paging parameters
    query = {
        "size": 0,
        "query": {
            "bool": {
                "must": {
                    "query_string": {
                        "query": search_query,
                        "fields": ["title", "summary", "description", "content"]
                    }
                }
            }
        },
        "aggs": {
            "total_count": {
                "value_count": {
                    "field": "_id"
                }
            },
            "sentiment_count": {
                "terms": {
                    "field": "articleSentiment.keyword"
                }
            }
        }
    }
    
    # Sorting
    sort = [{ "pubDate": { "order": "desc" } }]

    if filters.get("sort") != None and filters.get("sort") == 'sentiment':
        sort = [{ "articleSentiment.keyword": { "order": "desc" } }]

    if sort:
        query["sort"] = sort

    # Apply filters
    filter_clauses = []
    must_not_filters = []

    # Filter - Date Range
    filter_clauses.append({"range": {"pubDate": {"gte": startDate, "lte": endDate}}})

    # Filter - Media Type
    if "media_types" in filters and len(filters["media_types"]):
        media_type_filter = {
            "bool": {
                "should": [{"match_phrase": {"mediaType": media_type}} for media_type in filters["media_types"].split(',')]
            }
        }
        filter_clauses.append(media_type_filter)
    
    # Filter - Language
    if "languages" in filters and len(filters["languages"]) > 0:
        language_filter = {
            "bool": {
                "should": [{"match_phrase": {"language": lang.strip()}} for lang in filters["languages"].split(',')]
            }
        }
        filter_clauses.append(language_filter)

    # Filter - Countries
    if "countries" in filters and len(filters["countries"]) > 0:
        country_filter = {
            "bool": {
                "should": [{"match_phrase": {"country": country.strip()}} for country in filters["countries"].split(',')]
            }
        }
        filter_clauses.append(country_filter)

    # Filter - Source Includes
    if "source_includes" in filters and len(filters["source_includes"]) > 0:
        source_includes_filter = {
            "bool": {
                "should": [{"match_phrase": {"source": source.strip()}} for source in filters["source_includes"].split(',')]
            }
        }
        filter_clauses.append(source_includes_filter)

    # Filter - Keyword Include in Title
    if "keywords_includes" in filters and len(filters["keywords_includes"]) > 0:
        case_sensitive = filters.get("keywords_includes_case_sensitive", "false")
        if case_sensitive == "true":
            case_insensitive = "false"
        else:
            case_insensitive = "true"
        
        keywords_include_filter = {
            "bool": {
                "should": [{"term": { "title": { "value": keyword, "case_insensitive": case_insensitive }}} for keyword in filters["keywords_includes"].split(',')]
            }
        }
        filter_clauses.append(keywords_include_filter)

    # Filter - Sentiment Includes
    if "sentiments" in filters and len(filters["sentiments"]) > 0:
        sentiment_filter = {
            "bool": {
                "should": [{"match_phrase": {"articleSentiment": sentiment.strip()}} for sentiment in filters["sentiments"].split(',')]
            }
        }
        filter_clauses.append(sentiment_filter)

    # Filter - Source Excludes
    if "source_excludes" in filters and len(filters["source_excludes"]) > 0:
        source_excludes_filter = {
            "bool": {
                "should": [{"match_phrase": {"source": source.strip()}} for source in filters["source_excludes"].split(',')]
            }
        }
        must_not_filters.append(source_excludes_filter)

    # Filter - Keywords Excludes in Title
    if "keywords_excludes" in filters and len(filters["keywords_excludes"]) > 0:
        case_sensitive = filters.get("keywords_excludes_case_sensitive", "false")
        if case_sensitive == "true":
            case_insensitive = "false"
        else:
            case_insensitive = "true"
        keywords_exclude_filter = {
            "bool": {
                "should": [{"term": { "title": { "value": keyword, "case_insensitive": case_insensitive }}} for keyword in filters["keywords_excludes"].split(',')]
            }
        }
        must_not_filters.append(keywords_exclude_filter)

    # --------------------------------------------------------------------------------------------------------
    #  Extra Filters For Click on Visual and Search in Searched Articles (Save Recent Search should be false)
    # --------------------------------------------------------------------------------------------------------
    if "save_recent_search" in filters and filters["save_recent_search"].lower() == "false":
        # Filter - WordCloud
        if "wordcloud" in filters and len(filters["wordcloud"]) > 0:
            wordcloud_filter = {
                "bool": {
                    "should": [{"term": {"wordCloud.label.keyword": {"value": filters["wordcloud"], "case_insensitive": "true" }}}]
                }
            }
            filter_clauses.append(wordcloud_filter)

        # Filter - Theme
        if "theme" in filters and len(filters["theme"]) > 0:
            theme_filter = {
                "bool": {
                    "should": [{"term": {"final_theme.label.keyword": {"value": filters["theme"], "case_insensitive": "true" }}}]
                }
            }
            filter_clauses.append(theme_filter)

        # Filter - Author
        if "author" in filters and len(filters["author"]) > 0:
            author_filter = {
                "bool": {
                    "should": [{"term": {"author.keyword": {"value": filters["author"], "case_insensitive": "true" }}}]
                }
            }
            filter_clauses.append(author_filter)
        
        # Filter - Sub Media
        if "sub_media" in filters and len(filters["sub_media"]) > 0:
            sub_media_filter = {
                "bool": {
                    "should": [{"term": {"sub_media.keyword": {"value": filters["sub_media"], "case_insensitive": "true" }}}]
                }
            }
            filter_clauses.append(sub_media_filter)

        # Filter - State (Location)
        if "state" in filters and len(filters["state"]) > 0:
            state_filter = {
                "bool": {
                    "should": [{"term": {"state.keyword": {"value": filters["state"], "case_insensitive": "true" }}}]
                }
            }
            filter_clauses.append(state_filter)

        # Filter - Search in searched articles
        if "search_in_search" in filters and len(filters["search_in_search"]) > 0:
            mainQuery =  query["query"]["bool"]["must"]["query_string"]["query"]
            query["query"]["bool"]["must"]["query_string"]["query"] = mainQuery + ' AND ' + filters["search_in_search"]

    # -----------------------------
    # Adding Filters to Main Query
    # -----------------------------
    if filter_clauses:
        query["query"]["bool"]["filter"] = filter_clauses

    if must_not_filters:
        query["query"]["bool"]["must_not"] = must_not_filters

    return query
