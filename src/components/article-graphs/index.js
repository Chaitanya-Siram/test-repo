// import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
// import Spinner from '../spinner';
import PropTypes from 'prop-types';
import DashboardSectionComponent from '../search-result/dashboard-section';
import ArticleSectionComponent from '../search-result/article-section';
import {
  ArticleSectionComponentWrp,
  IconWrapper,
  SearchMainWrp,
  SearchResultWrp,
} from './index.sc';
import XCirlcle from '../../assets/icons/XCirlcle';
import { useParams } from 'react-router-dom';
import AdvancedDashboard from '../advanced-dashboard';
import { useMutation } from '@tanstack/react-query';
import {
  // handleSearchPost,
  handleSearchPostV1,
  useSearchFilterData,
} from '../../hooks/useSearch';
import { useSelector, useDispatch } from 'react-redux';
import { getTokenData } from '../../constants/validateToken';
import { getPayloadForSearch } from '../../constants/dashboards/dashboardUtils';
import {
  getDashboardSearchQuery,
  getMediaCountDataUTIL,
} from '../../constants/utils';
import { setInput } from '../../redux/slices/searchInputSlice';
import { dashboardCharts } from '../../pages/new-dashboard/utils';
import { encloseWordsInDoubleQuotes } from '../../hooks/usePeopleCharts';
import DashboardPopup from '../dasboard-popup';
import DownloadArticlePopup from '../download-articles-popup';

const articleTypeDefault = {
  widget: undefined,
  graphSelection: undefined,
  rawData: null,
};

export const dashboardConfig = {
  standard: ['brand', 'industry', 'people'],
  advanced: [
    'campaign',
    'authorimpact',
    'sentiments',
    'congruence',
    'primpact',
  ],
};

const ArticleGraph = ({
  recentSearchId,
  tileDetails,
  dashboardDetails,
  advancedWidgetDetails,
  customCanvas,
  volumeAnalysisWidgetDetails,
  sentimentAnalysisWidgetDetails,
  sentimeOverTimeWidgetDetails,
  topJournalistSentimentAnalysisWidgetDetails,
  coverageOverTimeBrandWidgetDetails,
  reachOvertimeBrandWidgetDetails,
  SOVWidgetDetails,
  peopleCoverageChartDataWidgetDetails,
  peopleThemeWidgetDetails,
  peopleMediaTypeWidgetDetails,
  coverageOverTimeCompWidgetDetails,
  mediaTypeWidgetDetails,
  peopleVolumeAnalysisWidgetDetails,
  peopleSentimentAnalysisWidgetDetails,
  sentimentCompWidgetDetails,
  reachOvertimeCompWidgetDetails,
  mediaBreakdownWidgetDetails,
  journalistWidgetDetails,
  sourceCompWidgetDetails,
  placeholderGraphs,
  searchedQuery,
  handleGraphTitleUpdate,
  searchFilters,
  customData,
  storeSelectedItems,
  industryVolumeAnalysisWidgetDetails,
  industrySentimentWidgetDetails,
  industryCoverageOverTimeWidgetDetails,
  industryCoverageBySourceWidgetDetails,
  industryCompaniesWidgetDetails,
  industryCoverageByJournalistsWidgetDetails,
  industryPublicationsWidgetDetails,
  isSavePopup,
}) => {
  const dispatch = useDispatch();
  // const [activeScreen, setActiveScreen] = useState('dashboard');
  const authInfo = getTokenData();
  // const [query, setQuery] = useState(searchedQuery || '');
  const [floatingPagination, setfloatingPagination] = useState(false);
  const [articlePosition, setArticlePosition] = useState('');
  const [resetSelection, setResetSelection] = useState(true);
  const [selected, setSelected] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [inSearchArticles, setInSearchArticles] = useState([]);
  const [inSearchTotalData, setInSearchTotalData] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [inSearchSortOrder, setInsearchSortOrder] = useState('');
  const [inSearchPageNum, setInsearchPageNum] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [isCustomPagiNationFlag, setIsCustomPagiNationFlag] = useState(false);
  const [inSearchPaging, setInSearchPaging] = useState({
    pageNumber: 1,
    pageSize: 50,
    total: 0,
  });

  const [resetSelected, setResetSelected] = useState(false);
  const [checked, setChecked] = useState([]);
  const [downloadSelected, setDownloadSelected] = useState('');
  const [downloadArticleFlag, setDownLoadArticleFlag] = useState(false);

  // const [loader, setLoader] = useState(false);
  // const [guidedSearch, setGuidedSearch] = useState({
  //   all: '',
  //   none: '',
  //   any: '',
  // });
  // const [value, setValue] = useState('');
  const activeScreen = 'dashboard';
  const loader = false;
  // const queryClient = useQueryClient();
  const [type, setType] = useState('totalArticles');

  // const onBtnClick = (screen) => {
  //   setLoader(true);
  //   setActiveScreen(activeScreen === '' ? screen : '');
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 500);
  // };
  const x = dashboardDetails.length;
  const [selectGraph, setSelectedGraph] = useState(new Array(x).fill(true));
  const [triggerInSearchFetchData, setTriggerInSearchFetchData] =
    useState(false);

  useEffect(() => {
    if (selected == null) {
      setSelectedGraph(new Array(x).fill(true));
    }
  }, [x, selected]);
  // const [page, setPage] = useState(0);
  const paginationWidth = '45vw';
  const [articleType, setArticleType] = useState(articleTypeDefault);
  const [syndicationType, setSyndicationType] = useState({
    ...articleTypeDefault,
  });
  const [storeComments, setStoreComments] = useState([]);
  const [storeTags, setStoreTags] = useState([]);
  const [hiddenArticlesLocal, setHiddenArticlesLocal] = useState([]);
  const [bookmarksLocal, setBookmarksLocal] = useState([]);

  const setArticleTypeClose = () => {
    setArticleType(articleTypeDefault);
  };
  const handleClick = (index, uniqueId) => {
    let graphIndex = index;
    if (uniqueId) {
      const totalSelectedGraphs = Object.keys(
        storeSelectedItems?.[dashboardType] || {}
      ).filter((x) => storeSelectedItems?.[dashboardType]?.[x]);
      const index = totalSelectedGraphs.indexOf(uniqueId);
      if (index !== -1) {
        graphIndex = index;
      }
    }
    let position = '';
    if (graphIndex % 2 !== 0) {
      position = 'left';
    } else {
      position = 'right';
    }
    setArticlePosition(position);
    setfloatingPagination(true);
    // this is to remove eslint warning
  };

  // const handlePage = (pageNum) => {
  //   setPage(pageNum);
  //   queryClient.invalidateQueries(['articles', pageNum, type]);
  // };
  const { searchId, dashboardType } = useParams();

  const updateBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const {
    mutate: updateSearchInSearch,
    isSuccess: isInSearchSuccess,
    data: inSearchData,
    isLoading: inSearchDataLoading,
  } = useMutation({
    mutationFn: handleSearchPostV1,
  });

  React.useEffect(() => {
    if (isInSearchSuccess) {
      setInSearchArticles(inSearchData?.data?.data);
      setHiddenArticlesLocal([]);
      setBookmarksLocal([]);
      setStoreComments([]);
      setStoreTags([]);
      setInSearchPaging(
        inSearchData?.data?.paged || {
          pageNumber: 1,
          pageSize: 50,
          total: 0,
        }
      );
    }
  }, [isInSearchSuccess, inSearchData]);

  const storeArticleCommentsTags = (data, text, actionType) => {
    if (actionType === 'bookmarks') {
      if (text === 'add') {
        const filteredBookMarks = bookmarksLocal.filter(
          (bookMark) => bookMark?.article_id !== data?.article_id
        );
        setBookmarksLocal([...filteredBookMarks, { ...data }]);
      } else {
        setBookmarksLocal((prev) => {
          const filteredBookMarks = prev.filter(
            (bookmark) => bookmark?.article_id !== data?.article_id
          );
          return [...filteredBookMarks];
        });
      }
    } else if (actionType === 'hidden-articles') {
      if (text === 'add') {
        const hiddenArticlesLocal = bookmarksLocal.filter(
          (bookMark) => bookMark?.article_id !== data?.article_id
        );
        setHiddenArticlesLocal([...hiddenArticlesLocal, { ...data }]);
      } else {
        setHiddenArticlesLocal((prev) => {
          const hiddenArticlesFiltered = prev.filter(
            (hiddenArticle) => hiddenArticle?.article_id !== data?.article_id
          );
          return [...hiddenArticlesFiltered];
        });
      }
    } else if (actionType === 'comments') {
      if (text === 'add') {
        const filteredComment = storeComments.filter(
          (comment) => comment?.article_id !== data?.article_id
        );
        setStoreComments([...filteredComment, { ...data }]);
      } else {
        setStoreComments((prev) => {
          const deleteFilterComment = prev.filter(
            (comment) => comment?.article_id !== data?.article_id
          );
          return [...deleteFilterComment];
        });
      }
    } else {
      if (text === 'add') {
        const filteredTags = storeTags.filter(
          (tags) => tags?.article_id !== data?.article_id
        );
        setStoreTags([...filteredTags, { ...data }]);
      } else if (text === 'deleteAll') {
        setStoreTags([
          {
            articleId: 0,
            tags: [],
          },
        ]);
      } else {
        setStoreTags((prev) => {
          const deleteFilterTags = prev.filter(
            (comment) => comment?.article_id !== data?.article_id
          );
          return [...deleteFilterTags];
        });
      }
    }
  };

  useEffect(() => {
    if (type === 'totalArticles') {
      setInSearchTotalData(inSearchData?.data?.media_types || []);
    }
  }, [inSearchData, type]);

  const {
    // isLoading,
    // error,
    data,
  } = useSearchFilterData(authInfo?.user_id);
  const searchFilterOptions = data?.data || [];
  const checkClickedChart = () => {
    const foundChart = Object.entries(dashboardCharts)
      .flatMap(([category, charts]) =>
        charts.map((chart) => ({ category, chart }))
      )
      .find(({ chart }) => articleType?.rawData?.uniqueId === chart?.chartId);

    if (foundChart) {
      return foundChart.category;
    }

    return null;
  };

  const userInput = useSelector((state) => state.searchInput.searchKeyword);
  useEffect(() => {
    if (
      searchFilterOptions?.length > 0 &&
      (articleType?.widget || syndicationType?.widget || articleType?.isSearch)
    ) {
      let searchFilters = getPayloadForSearch(
        customData?.query,
        customData?.filters,
        searchFilterOptions,
        customData?.guidedSection,
        true
      );
      if (checkClickedChart() === 'brand') {
        searchFilters = {
          ...searchFilters,
          graph_type: 'brand',
          brand_keywords: customData?.brandData || [],
        };
      }

      if (checkClickedChart() === 'competition') {
        searchFilters = {
          ...searchFilters,
          competition_keywords: customData?.competitionData || [],
          brand_keywords: customData?.brandData || [],
        };
      }
      // if (graphType === 'brand') {
      //   searchFilters = {
      //     ...searchFilters,
      //     graph_type: graphType,
      //   };
      // }

      if (checkClickedChart() === 'people') {
        searchFilters = {
          ...searchFilters,
          person_name: customData?.peopleData || [],
        };
      }
      if (syndicationType?.name === 'DASHBOARD') {
        const graphFilter = getDashboardSearchQuery(
          articleType?.widget,
          articleType?.graphSelection,
          articleType?.rawData,
          articleType?.otherInfo,
          searchFilters
        );
        searchFilters = {
          ...searchFilters,
          ...graphFilter,
          syndication_article_title: syndicationType?.rawData?.title,
          syndication_article_id: syndicationType?.rawData?.articleId,
        };
      } else {
        const graphFilter = getDashboardSearchQuery(
          articleType?.widget,
          articleType?.graphSelection,
          articleType?.rawData,
          articleType?.otherInfo,
          searchFilters
        );
        searchFilters = {
          ...searchFilters,
          ...graphFilter,
        };
      }

      if (inSearchSortOrder) {
        searchFilters = {
          ...searchFilters,
          sort: inSearchSortOrder,
        };
      }
      if (type !== 'totalArticles' && type) {
        searchFilters = {
          ...searchFilters,
          media_types: [type],
        };
      }
      // if RHS search result popup is open

      if (articleType.isSearch && userInput) {
        searchFilters = {
          ...searchFilters,
          search_in_search: userInput,
        };
      }
      if (recentSearchId) {
        searchFilters = {
          ...searchFilters,
          recent_search_id: recentSearchId,
        };
      }

      if (
        searchFilters?.person_name &&
        searchFilters?.person_name?.length > 0
      ) {
        searchFilters = {
          ...searchFilters,
          person_name: encloseWordsInDoubleQuotes(searchFilters?.person_name),
        };
      }

      if (
        searchFilters?.brand_keywords &&
        searchFilters?.brand_keywords?.length > 0
      ) {
        searchFilters = {
          ...searchFilters,
          brand_keywords: encloseWordsInDoubleQuotes(
            searchFilters?.brand_keywords
          ),
        };
      }

      if (
        searchFilters?.competition_keywords &&
        searchFilters?.competition_keywords?.length > 0
      ) {
        searchFilters = {
          ...searchFilters,
          competition_keywords: encloseWordsInDoubleQuotes(
            searchFilters?.competition_keywords
          ),
        };
      }

      updateSearchInSearch({
        ...searchFilters,
        page_number: inSearchPageNum + 1,
        saved_search_id: searchId,
        save_recent_search: false,
      });
    }
    // clean up store
    return () => {
      dispatch(setInput(''));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    inSearchPageNum,
    articleType,
    searchFilterOptions,
    inSearchSortOrder,
    type,
    bookmarked,
    customData?.filters,
    triggerInSearchFetchData,
    syndicationType,
  ]);

  const getTabs = (data) => {
    const mediaCountData = getMediaCountDataUTIL(data);
    if (customData?.filters?.mediaTypes) {
      return mediaCountData?.filter(
        (x) =>
          customData?.filters?.mediaTypes?.some((y) => y.value === x.value) ||
          x.value === 'totalArticles'
      );
    } else {
      const mediaTypes = searchFilterOptions.find(
        (x) => x.value === 'mediaTypes'
      );
      if (mediaTypes) {
        const options = mediaTypes?.options;
        return mediaCountData?.filter(
          (x) =>
            options?.some((y) => y.value === x.value) ||
            x.value === 'totalArticles'
        );
      }
      return [];
    }
  };

  return (
    <SearchMainWrp className="p-relative">
      {/* <BtnWrp top="2rem" activeScreen={activeScreen}>
        <Btn
          className={activeScreen === 'dashboard' ? 'inactive' : ''}
          onClick={() => onBtnClick('article')}
        >
          <ChevronLeft color={activeScreen === '' ? '#675EF2' : '#FFFFFF'} />
        </Btn>
        <Btn
          className={activeScreen === 'article' ? 'inactive' : ''}
          onClick={() => onBtnClick('dashboard')}
        >
          <ChevronRight color={activeScreen === '' ? '#675EF2' : '#FFFFFF'} />
        </Btn>
      </BtnWrp> */}
      <SearchResultWrp activeScreen={activeScreen}>
        {dashboardConfig.advanced.includes(dashboardType) ? (
          <AdvancedDashboard
            activeScreen={activeScreen}
            loader={loader}
            articleType={articleType}
            setArticleType={setArticleType}
            advancedWidgetDetails={advancedWidgetDetails}
            overView={false}
            setClickedPosition={handleClick}
            articlePosition={articlePosition}
          />
        ) : (
          <DashboardSectionComponent
            setSyndicationClick={() => {
              setSyndicationType({
                widget: undefined,
                graphSelection: undefined,
                rawData: null,
              });
              setSearchKey('');
              setInsearchPageNum(0);
            }}
            isSavePopup={isSavePopup}
            handleGraphTitleUpdate={handleGraphTitleUpdate}
            activeScreen={activeScreen}
            loader={loader}
            articleType={articleType}
            setArticleType={setArticleType}
            tileDetails={tileDetails}
            dashboardDetails={dashboardDetails}
            overView={false}
            setClickedPosition={handleClick}
            articlePosition={articlePosition}
            setResetSelection={setResetSelection}
            setSelected={setSelected}
            selected={selected}
            setArticlePosition={setArticlePosition}
            resetSelection={resetSelection}
            setArticleTypeClose={setArticleTypeClose}
            selectGraph={selectGraph}
            setSelectedGraph={setSelectedGraph}
            dashboardType={dashboardType}
            customCanvas={customCanvas}
            editOption={true}
            volumeAnalysisWidgetDetails={volumeAnalysisWidgetDetails}
            sentimentAnalysisWidgetDetails={sentimentAnalysisWidgetDetails}
            sentimeOverTimeWidgetDetails={sentimeOverTimeWidgetDetails}
            coverageOverTimeBrandWidgetDetails={
              coverageOverTimeBrandWidgetDetails
            }
            reachOvertimeBrandWidgetDetails={reachOvertimeBrandWidgetDetails}
            SOVWidgetDetails={SOVWidgetDetails}
            topJournalistSentimentAnalysisWidgetDetails={
              topJournalistSentimentAnalysisWidgetDetails
            }
            peopleCoverageChartDataWidgetDetails={
              peopleCoverageChartDataWidgetDetails
            }
            peopleThemeWidgetDetails={peopleThemeWidgetDetails}
            peopleMediaTypeWidgetDetails={peopleMediaTypeWidgetDetails}
            coverageOverTimeCompWidgetDetails={
              coverageOverTimeCompWidgetDetails
            }
            mediaTypeWidgetDetails={mediaTypeWidgetDetails}
            peopleVolumeAnalysisWidgetDetails={
              peopleVolumeAnalysisWidgetDetails
            }
            peopleSentimentAnalysisWidgetDetails={
              peopleSentimentAnalysisWidgetDetails
            }
            sentimentCompWidgetDetails={sentimentCompWidgetDetails}
            reachOvertimeCompWidgetDetails={reachOvertimeCompWidgetDetails}
            mediaBreakdownWidgetDetails={mediaBreakdownWidgetDetails}
            journalistWidgetDetails={journalistWidgetDetails}
            sourceCompWidgetDetails={sourceCompWidgetDetails}
            industryVolumeAnalysisWidgetDetails={
              industryVolumeAnalysisWidgetDetails
            }
            industrySentimentWidgetDetails={industrySentimentWidgetDetails}
            industryCoverageOverTimeWidgetDetails={
              industryCoverageOverTimeWidgetDetails
            }
            industryCoverageBySourceWidgetDetails={
              industryCoverageBySourceWidgetDetails
            }
            industryCompaniesWidgetDetails={industryCompaniesWidgetDetails}
            industryCoverageByJournalistsWidgetDetails={
              industryCoverageByJournalistsWidgetDetails
            }
            industryPublicationsWidgetDetails={
              industryPublicationsWidgetDetails
            }
            placeholderGraphs={placeholderGraphs}
          />
        )}
        <ArticleSectionComponentWrp articlePosition={articlePosition}>
          <IconWrapper
            articlePosition={articlePosition}
            onClick={() => {
              setArticlePosition('');
              setArticleTypeClose();
              setSelected(null);
              setResetSelection(false);
              setType('totalArticles');
              setInsearchPageNum(0);
              setResetSelected(true);
              setSearchKey('');
            }}
          >
            <XCirlcle />
          </IconWrapper>
          <ArticleSectionComponent
            name="DASHBOARD"
            syndicationClickData={syndicationType}
            resetAllChecked={resetSelected}
            toggleResetAllChecked={() => setResetSelected(false)}
            articlesRecentSearchId={recentSearchId}
            articleType={articleType}
            activeScreen={activeScreen}
            setArticleTypeClose={setArticleTypeClose}
            type={type}
            setType={setType}
            floatingPagination={floatingPagination}
            articlePosition={articlePosition}
            id={searchId}
            setArticlePosition={setArticlePosition}
            setSelected={setSelected}
            pageWidth={paginationWidth}
            setClickedPosition={handleClick}
            setArticleType={setArticleType}
            page={inSearchPageNum}
            setPage={setInsearchPageNum}
            setSelectedGraph={setSelectedGraph}
            updateBookmark={updateBookmark}
            setResetSelection={setResetSelection}
            showFullTitle={
              searchKey ||
              syndicationType?.graphSelection ||
              articleType?.graphSelection
            }
            articlePagingInfo={inSearchPaging}
            articlesInfo={inSearchArticles}
            isLoading={
              storeComments?.length > 0 ||
              storeTags?.length > 0 ||
              bookmarksLocal?.length > 0 ||
              hiddenArticlesLocal?.length > 0
                ? false
                : inSearchDataLoading
            }
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            sortOrder={inSearchSortOrder}
            setSortOrder={setInsearchSortOrder}
            titleTabs={getTabs(inSearchTotalData)}
            setIsCustomPagiNationFlag={setIsCustomPagiNationFlag}
            setTriggerFetchUseEffect={setTriggerInSearchFetchData}
            setSyndicationClick={setSyndicationType}
            storeArticleCommentsTags={storeArticleCommentsTags}
            storeComments={storeComments}
            storeTags={storeTags}
            setStoreComments={setStoreComments}
            setStoreTags={setStoreTags}
            bookmarksLocal={bookmarksLocal}
            hiddenArticlesLocal={hiddenArticlesLocal}
            checked={checked}
            setChecked={setChecked}
            setDownLoadArticleFlag={setDownLoadArticleFlag}
            setDownloadSelected={setDownloadSelected}
          />
          <DashboardPopup
            open={downloadArticleFlag}
            toggler={setDownLoadArticleFlag}
            popContent={
              // <ContactUs
              //   toggler={setNewCanvasPopCont}
              //   updateParentStateCont={updateParentStateCont}
              // />
              <DownloadArticlePopup
                toggler={setDownLoadArticleFlag}
                checked={checked}
                totalArticles={inSearchPaging?.total}
                downloadType={downloadSelected}
                getPayloadForSearch={() => {
                  return getPayloadForSearch(
                    customData?.query,
                    customData?.filters,
                    searchFilterOptions,
                    customData?.guidedSection,
                    true
                  );
                }}
                query={customData?.query}
                articlesInfo={inSearchArticles}
                sortOrder={inSearchSortOrder}
              />
            }
            padding="0"
            Cross={true}
            borderRadius="0.75rem"
            width={'25rem'}
          />
        </ArticleSectionComponentWrp>
      </SearchResultWrp>
    </SearchMainWrp>
  );
};

ArticleGraph.propTypes = {
  recentSearchId: PropTypes.number,
  tileDetails: PropTypes.array,
  dashboardDetails: PropTypes.array,
  advancedWidgetDetails: PropTypes.object,
  customCanvas: PropTypes.object,
  volumeAnalysisWidgetDetails: PropTypes.object,
  sentimentAnalysisWidgetDetails: PropTypes.object,
  sentimeOverTimeWidgetDetails: PropTypes.object,
  coverageOverTimeBrandWidgetDetails: PropTypes.object,
  reachOvertimeBrandWidgetDetails: PropTypes.object,
  SOVWidgetDetails: PropTypes.object,
  topJournalistSentimentAnalysisWidgetDetails: PropTypes.object,
  peopleCoverageChartDataWidgetDetails: PropTypes.object,
  peopleThemeWidgetDetails: PropTypes.object,
  peopleMediaTypeWidgetDetails: PropTypes.object,
  coverageOverTimeCompWidgetDetails: PropTypes.object,
  mediaTypeWidgetDetails: PropTypes.object,
  peopleVolumeAnalysisWidgetDetails: PropTypes.object,
  peopleSentimentAnalysisWidgetDetails: PropTypes.object,
  sentimentCompWidgetDetails: PropTypes.object,
  reachOvertimeCompWidgetDetails: PropTypes.object,
  mediaBreakdownWidgetDetails: PropTypes.object,
  journalistWidgetDetails: PropTypes.object,
  sourceCompWidgetDetails: PropTypes.object,
  placeholderGraphs: PropTypes.bool,
  searchedQuery: PropTypes.object,
  handleGraphTitleUpdate: PropTypes.func,
  searchFilters: PropTypes.object,
  customData: PropTypes.object,
  storeSelectedItems: PropTypes.object,
  industryVolumeAnalysisWidgetDetails: PropTypes.object,
  industrySentimentWidgetDetails: PropTypes.object,
  industryCoverageOverTimeWidgetDetails: PropTypes.object,
  industryCoverageBySourceWidgetDetails: PropTypes.object,
  industryCompaniesWidgetDetails: PropTypes.object,
  industryCoverageByJournalistsWidgetDetails: PropTypes.object,
  industryPublicationsWidgetDetails: PropTypes.object,
  isSavePopup: PropTypes.bool,
};

export default ArticleGraph;
