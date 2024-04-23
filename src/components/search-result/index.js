/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  convertObjToExpression,
  // convertObjToString,
  getSearchParams,
} from '../../utils';
import AppBG from '../app-bg';
import AppHeader from '../app-header';
import DashboardPopup from '../dasboard-popup';
import DashSearchDrwr from '../dashboard-saved-search-drawer';
import { SearchFocusBackdrop } from '../home-page/search-section/index.sc';
import {
  ArticleMainWrapper,
  ArticleSectionComponentWrp,
  Btn,
  BtnWrp,
  CrossButtonWrp,
  DashboardSection,
  DropDown,
  DropDownCont,
  DropdownForButton,
  EditorWrapper,
  HeaderContainer,
  IconWrp,
  IcondownWrp,
  Iconwrp,
  LoaderWrp,
  NonEditModeContainer,
  PopUpWrapper,
  SaveSearchBtn,
  SearchMainWrp,
  SearchPageWrp,
  SearchQueryBox,
  SearchResultWrp,
  SearchSection,
  SearchText,
  // ButtonText,
  SearchTextWrp,
  SearchWrp,
  SectionHeader,
  WrapperContainer,
} from './index.sc';
// import Spinner from '../spinner';
import {
  getSearchQueryStatus,
  handleSearchPost,
  handleSearchPostV1,
  useDashboardData,
  useGetArticlesThemeData,
  usePostSearchDataTags,
  useSearchFilterData,
  useUpdateChartNames,
} from '../../hooks/useSearch';
// import DashboardSectionComponent from './dashboard-section';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../../constants/theme';
import { axiosGet, axiosPutRequest } from '../../service';
import AddtoCanvas from '../add-to-canvas';
import AppFooter from '../app-footer';
import { CanvasList } from '../custom-drawer/mock';
import SearchComponent from '../search-component';
import FilterComponent from '../search-component/filter';
import SearchPopup from '../search-popup/SearchPopContent';
import { Frames } from '../search-popup/contents';
import ArticleSectionComponent from './article-section';
// import bgsr from '../../assets/img/bg/bg_sr.svg';
import { format } from 'date-fns';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import toast from 'react-hot-toast';
import Editor from 'react-simple-code-editor';
import Arrow from '../../assets/icons/Arrow';
import ArrowLeft from '../../assets/icons/ArrowLeft';
import DropDownButton from '../../assets/icons/DropDownButton';
import XCirlcle from '../../assets/icons/XCirlcle';
import Edit2 from '../../assets/icons/Edit2';
import CircularLoading from '../../assets/icons/loading/circularLoading';
import {
  addCountPrefix,
  calculatePercentageIncrease,
  checkMismatchedQuotes,
  checkSameOperators,
  getDateRange,
  getMediaCountDataUTIL,
  isCorrectParenthesisOrder,
  replaceOperators,
  searchQueryForGraph,
} from '../../constants/utils';
import { getTokenData } from '../../constants/validateToken';
import { useDownloadGraphsHook } from '../../hooks/common/useDownloadGraphHook';
import {
  dashboardDetails as tempDashboardData,
  totalOverviewDetailsMap,
} from '../../hooks/data/chartData';
import {
  useGeographicalBreakdownData,
  useMediaOutletBreakdown,
  useMediaTypeChartData,
  useOverviewDetails,
  useResultOverTimeData,
  useSentimentChartData,
  useTopAuthorChartData,
  useTopSourceChartData,
  useTopThemeChartData,
  useWordCloudChartData,
} from '../../hooks/useCharts';
import { useUpdateSaveSearchQueryData } from '../../hooks/useSaveSearch';
import AlertPopUp from '../alert-popup';
import CustomConfirmationPopUp from '../customize-confirmation-popup';
import SaveSourcePopup from '../save-source';
import '../search-bar/CustomLanguageCss.css';
import '../search-bar/CustomLanguageDefinition';
import GraphIconBox from './GraphIconBox';
import SortDropdown from './SortDropdown';
import DashboardInnerContainer from './dashboard-section/DashboardInnerContainer';
import DashboardHeaderV2 from './dashboard-section/dashboard-header-v2';
// import { onMessageListener } from '../../utils/firebase';
import { setInput } from '../../redux/slices/searchInputSlice';
import useExitPrompt from '../../hooks/useExitPrompt';
import { useGetTagsData } from '../../hooks/useSaveNewsLetter';
import { inBuiltOperators } from '../search-bar/CustomInBuiltConfig';
import DownloadArticlePopup from '../download-articles-popup';
import { socketEndpoint } from '../../constants';

const articleTypeDefault = {
  widget: undefined,
  graphSelection: undefined,
  rawData: undefined,
};
const findIndexByTitle = (arr = [], title = '') =>
  [...arr].findIndex((obj) => obj?.title === title);

const updateState = (stateArray, newState, index) =>
  index === -1
    ? stateArray
    : [...stateArray.slice(0, index), newState, ...stateArray.slice(index + 1)];

const SearchResult = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { searchId, savedSearchId } = useParams();
  const [activeScreen, setActiveScreen] = useState('');
  const [loader, setLoader] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showSavedSearch, setShowSavedSearch] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showNewCandrwr, setShowNewCandrwr] = useState(false);
  const [resetSelection, setResetSelection] = useState(true);
  const [selected, setSelected] = useState(null);
  const [articlePosition, setArticlePosition] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [floatingPagination, setfloatingPagination] = useState(false);
  const isSavedChanges = JSON.parse(localStorage.getItem('isSavedChanges'));

  const [confimationAlertPopUp, setConfimationAlertPopUp] = useState(false);
  const [selectedPath, setSelectedPath] = useState('');
  const [selectedDashboardItems, setSelectedDashboardItems] = useState({});
  const [changeSaved, setChangeSaved] = useState(searchId !== 'custom-search');

  const [isDocDownloading, setIsDocDownloading] = useState(false);
  const [sydicationArticles, setSydicationArticles] = useState([]);
  const [sydicationActive, setSydicationActive] = useState(false);
  const [recentSearchArticlesId, setRecentSearchArticlesId] =
    useState(savedSearchId);
  const shouldSaveSearch = useRef(false);
  const [isCustomPagiNationFlag, setIsCustomPagiNationFlag] = useState(false);

  const [changes, setChanges] = useExitPrompt(false);
  const [resetAllChecked, setResetAllChecked] = useState(false);
  const [checked, setChecked] = useState([]);
  const [downloadArticleFlag, setDownLoadArticleFlag] = useState(false);
  const [downloadSelected, setDownloadSelected] = useState('');
  const [hiddenArticlesLocal, setHiddenArticlesLocal] = useState([]);
  const [bookmarksLocal, setBookmarksLocal] = useState([]);

  const recentSearchIdRef = useRef(null);
  const socketRef = useRef(null);
  const responseCountsRef = useRef(0);
  const [isConnected, setIsConnected] = useState(false);
  const [eventCycle, setEventCycle] = useState(true);
  const [articleSocketData, setArticleSocketData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [socketPaging, setSocketPaging] = useState({
    pageNumber: 1,
    pageSize: 50,
    total: 0,
  });
  const [liveArticleCount, setLiveArticleCount] = useState(0);
  const [socketDataTiles, setSocketDataTiles] = useState(
    totalOverviewDetailsMap
  );
  const [fetchInBackground, setFetchInBackground] = useState(false);
  const [triggerLiveSearch, setTriggerLiveSearch] = useState(false);
  const [isDataPreprocessed, setIsDataPreprocessed] = useState(false);

  // const [guidedSearch, setGuidedSearch] = useState({
  //   all: '',
  //   none: '',
  //   any: '',
  // });
  // const [value, setValue] = useState('');
  const navigate = useNavigate();
  // const maxWords = 10;

  // myCode for the day - start
  const [showCustomComponent, setShowCustomComponent] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const dropdownRef = useRef();
  const authInfo = getTokenData();

  const { mutateAsync: updateSearchData } = useUpdateSaveSearchQueryData(
    authInfo?.user_id
  );

  const [tags, setTags] = useState([]);

  const codeRef = useRef();

  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown container
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowCustomComponent(false);
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Attach the event listener to the dropdown container when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setEventCycle((old) => {
        if (old) {
          refetchAllData();
        }
        return false;
      });
      setIsDataPreprocessed(true);
    }, 2.5 * 60 * 1000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timerId);
  }, [eventCycle]);

  const handleOpenClcik = () => {
    setShowCustomComponent(!showCustomComponent);
    setDropdownOpen(!dropdownOpen);
  };

  const selectedSavedSearch = location?.state?.savedSearchData;
  const isCreatedFresh = useRef(!!location?.state?.isCreatedFresh);

  // Access the complete URL
  const fullURL = location.pathname + location.search;

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const [type, setType] = useState('totalArticles');
  const [addCanvasConfirmationPopUp, setAddConfirmationPopUp] = useState(false);
  const queryClient = useQueryClient();

  //  const setResetSelection = (value) => {};
  // const handleSearchUpdate = (payload) => {
  //   return get(
  //     `${API}/search/get-search-data?${objectToQueryString(payload)}`,
  //     {}
  //   );
  // };

  const DownloadDropDownOptions = [
    {
      label: 'Download As Image',
      value: 'Image',
    },
    {
      label: 'Download as Pdf',
      value: 'PDF',
    },
  ];

  // useEffect(() => {
  //   socket.connect();
  //   const onMessageListener = (value) => {
  //     console.log(value);
  //   };
  //   socket.emit('message', {
  //     user_id: 1,
  //     search_type: 'simple',
  //     simple_query: 'Iphone AND redmi',
  //     start_date: '2023-10-06',
  //     end_date: '2023-10-06',
  //   });
  //   socket.on('message', onMessageListener);
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   function onFooEvent(value) {
  //     setFooEvents(fooEvents.concat(value));
  //   }

  //   socket.on('foo', onFooEvent);

  //   return () => {
  //     socket.off('foo', onFooEvent);
  //   };
  // }, [fooEvents]);

  const refetchAllData = () => {
    // for debugging purposes in Development, have added console.log
    setFetchInBackground(true);
    if (articleType.graphSelection) {
      setTriggerInSearchUseEffect((old) => !old);
    }
    setRefetchData((old) => !old);
    refetchSentimentData();
    refetchGeographicalData();
    refetchMediaChartData();
    refetchWordCloudData();
    refetchResultOvertimeData();
    refetchOutletBreakdownData();
    refetchTopSourceData();
    refetchTopThemeData();
    refetchTopAuthorData();
    refetchOverviewData();
    if (responseCountsRef?.current === 2) {
      setEventCycle(false);
    }
  };

  const refetchPreprocessedData = () => {
    setFetchInBackground(true);
    if (articleType.graphSelection) {
      setTriggerInSearchUseEffect((old) => !old);
    }
    setRefetchData((old) => !old);
    // refetchSentimentData();
    refetchGeographicalData();
    refetchMediaChartData();
    // refetchWordCloudData();
    refetchResultOvertimeData();
    refetchOutletBreakdownData();
    refetchTopSourceData();
    // refetchTopThemeData();
    refetchTopAuthorData();
    refetchOverviewData();
  };

  const {
    mutate: updateSearch,
    isSuccess,
    data: searchData,
    isLoading: isSearchLoading,
  } = useMutation({
    mutationFn: handleSearchPost,
  });

  const {
    mutate: updateSearchInSearch,
    isSuccess: isInSearchSuccess,
    data: inSearchData,
    isLoading: inSearchDataLoading,
  } = useMutation({
    mutationFn: handleSearchPostV1,
  });

  const {
    mutate: updateSearchDataByTags,
    isSuccess: isTagSearchSuccesss,
    data: tagsSearchData,
    isLoading: isTagsSearchLoading,
  } = usePostSearchDataTags();

  React.useEffect(() => {
    if (isTagSearchSuccesss) {
      setTagArticles(tagsSearchData?.data?.data);
      setHiddenArticlesLocal([]);
      setBookmarksLocal([]);
      setStoreComments([]);
      setStoreTags([]);
      setArticlePaging(
        tagsSearchData?.data?.paged || {
          pageNumber: 1,
          pageSize: 50,
          total: 0,
        }
      );
    }
  }, [isTagSearchSuccesss, tagsSearchData]);

  React.useEffect(() => {
    if (isSuccess) {
      if (!searchData?.isSuccessful) {
        toast.error(searchData?.message);
        setArticles([]);
        setArticlePaging({
          pageNumber: 1,
          pageSize: 50,
          total: 0,
        });
      } else {
        selectedSavedSearch
          ? setRecentSearchArticlesId(selectedSavedSearch?.recent_search_id)
          : parseInt(searchData?.data?.recent_search_id) &&
            setRecentSearchArticlesId(searchData?.data?.recent_search_id);
        setArticles(searchData?.data?.data);
        setHiddenArticlesLocal([]);
        setBookmarksLocal([]);
        setStoreComments([]);
        setStoreTags([]);
        setArticlePaging(
          searchData?.data?.paged || {
            pageNumber: 1,
            pageSize: 50,
            total: 0,
          }
        );
        shouldSaveSearch.current = false;
        setFetchInBackground(false);
      }
    }
  }, [isSuccess, searchData, selectedSavedSearch]);

  useEffect(() => {
    if (type === 'totalArticles' && searchData?.data?.media_types) {
      setSearchTotalData(searchData?.data?.media_types || []);
    }
  }, [searchData, type]);

  useEffect(() => {
    if (type === 'totalArticles') {
      setInSearchTotalData(inSearchData?.data?.media_types || []);
    }
  }, [inSearchData, type]);

  React.useEffect(() => {
    if (isInSearchSuccess) {
      selectedSavedSearch
        ? setRecentSearchArticlesId(selectedSavedSearch?.recent_search_id)
        : setRecentSearchArticlesId(searchData?.data?.recent_search_id);

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
  }, [inSearchData, isInSearchSuccess, selectedSavedSearch]);

  const {
    // isLoading,
    // error,
    data,
  } = useSearchFilterData(authInfo?.user_id);
  const searchFilterOptions = data?.data || [];

  const searchedDetails = location?.state?.filters || {};
  const searchedQuery = searchedDetails?.query;
  const searchName = location?.state?.savedSearchData?.title || 'Untitled';
  // const selectedSavedSearch = location?.state?.savedSearchData;
  const articleInfo = location?.state?.data || {};
  const isGuidedSearch = !!location?.state?.isGuidedSearch;

  const articleList = articleInfo?.data || [];
  const articlePagingTemp = articleInfo?.paged || {
    pageNumber: 1,
    pageSize: 50,
    total: 0,
  };
  const [filters, setFilters] = useState(searchedDetails?.filter);
  const [articles, setArticles] = useState(articleList);
  const [articlePaging, setArticlePaging] = useState(
    articleInfo?.paged || articlePagingTemp
  );
  const [query, setQuery] = useState(searchedQuery || '');
  const [guidedSection, setGuidedSection] = useState(isGuidedSearch);
  const [triggerFetchUseEffect, setTriggerFetchUseEffect] = useState(false);
  const [refetchData, setRefetchData] = useState(false);
  const [triggerInSearchUseEffect, setTriggerInSearchUseEffect] =
    useState(false);

  // Popup Search Results
  const [inSearchPaging, setInSearchPaging] = useState({
    pageNumber: 1,
    pageSize: 50,
    total: 0,
  });
  const [inSearchArticles, setInSearchArticles] = useState([]);
  const [inSearchPageNum, setInsearchPageNum] = useState(0);
  const [inSearchSortOrder, setInsearchSortOrder] = useState('relevance');
  const [sortOrder, setSortOrder] = useState('relevance');

  const [tagArticles, setTagArticles] = useState([]);

  // For redirecting to other places
  const [overviewClick, setOverViewClick] = useState(false);
  const [pathName, setPathName] = useState('');

  const [prevSavedSearch, setPrevSavedSearch] = useState({
    languages: filters?.languages,
    locations: filters?.locations,
    dateTime: filters?.dateTime,
    mediaTypes: filters?.mediaTypes,
    keywords: filters?.keywords,
    sentiment: filters?.sentiment,
    sources: filters?.sources,
    spam_exclusions: filters?.spam_exclusions,
    query,
    guidedSection,
    search_name: location?.state?.savedSearchData?.title,
    recent_searchId: recentSearchArticlesId,
  });
  // const [prevChartNames, setPrevChartNames] = useState();
  // const [chartDetails, setChartDetails] = useState();

  const {
    isLoading: dashboardDataLoading,
    // error: searchError,
    data: dashboardData,
    // isFetching,
  } = useDashboardData(searchId);
  // const tabKeywords = dashboardData?.data?.data?.keywords;
  // const tileDetails = dashboardData?.data?.data?.summary || [];
  // const InitialLoader = dashboardDataLoading;
  const dashboardDetails = tempDashboardData;
  // const dashboardDetails = dashboardData?.data?.data?.dashboardDetails || [];
  const customWidgetDetails = dashboardData?.data?.data?.customWidgets;
  const x = dashboardDetails.length;
  const [selectGraph, setSelectedGraph] = useState([]);
  // const [showFeatures, SetShowFeature] = useState(false);

  const [dashboardState, setDashboardState] = useState([...dashboardDetails]);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [isDashboardsAssociated, setIsDashboardsAssociated] = useState(false);

  const [deletedbtn, setDeletedbtn] = useState(false);
  const [selectedItem, setSeleteditem] = useState({});
  const [savePopup, setSavePopup] = useState(false);
  const [selectedTab, setSeletedTab] = useState(1);
  const [sentimentChartData, setSentimentChartData] = useState(null);
  const [mediaTypeChartData, setMediaTypeChartData] = useState(null);
  const [wordCloudChartData, setWordCloudChartData] = useState(null);
  const [topSourcesChartData, setTopSourcesChartData] = useState(null);
  const [topThemeChartData, setTopThemeChartData] = useState(null);
  const [topAuthorChartData, setTopAuthorChartData] = useState(null);
  const [resultOverTimeChartData, setResultsOverTimeChartData] = useState(null);
  const [outletMediaChartData, setOutletMediaChartData] = useState(null);
  const [geographicalChartData, setGeographicalChartData] = useState(null);
  const [isDownloadOptionsOpen, setIsDownloadOptionOpen] = useState(false);
  const [inSearchTotalData, setInSearchTotalData] = useState([]);
  const [searchTotalData, setSearchTotalData] = useState([]);
  const [storeComments, setStoreComments] = useState([]);
  const [storeTags, setStoreTags] = useState([]);
  // const [cancelPrevQuery, setCancelPrevQuery] = useState();

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
    setDashboardState([...dashboardDetails]);
  }, [dashboardDetails]);

  const handleSaveDashboard = () => {
    console.log('save dashboard', [...dashboardState]);
  };
  const handleUpdatedChart = (data) => {
    const { chartType: updatedChartType, chartName: chartTitle } = data;
    if (chartTitle === 'Sentiment') {
      setSentimentChartData({
        ...sentimentChartData,
        graphType: updatedChartType,
      });
    } else if (chartTitle === 'Media Type') {
      setMediaTypeChartData({
        ...mediaTypeChartData,
        graphType: updatedChartType,
      });
    } else if (chartTitle === 'Top Source') {
      setTopSourcesChartData({
        ...topSourcesChartData,
        graphType: updatedChartType,
      });
    } else if (chartTitle === 'Top Themes') {
      setTopThemeChartData({
        ...topThemeChartData,
        graphType: updatedChartType,
      });
    } else if (chartTitle === 'Top Author') {
      setTopAuthorChartData({
        ...topAuthorChartData,
        graphType: updatedChartType,
      });
    } else {
      let objIndex = -1;
      let updatedDashState = [];
      objIndex = findIndexByTitle(dashboardState, chartTitle);
      if (objIndex !== -1) {
        const updatedObj = {
          ...dashboardState[objIndex],
          graphType: updatedChartType,
        };
        updatedDashState = updateState(dashboardState, updatedObj, objIndex);
        setDashboardState(updatedDashState);
      }
    }
  };
  const handleShowDownloadPopUp = () => {
    // SetShowFeature((prev) => !prev);
  };
  useEffect(() => {
    if (selected == null) {
      setSelectedGraph(new Array(x).fill(true));
    }
  }, [x, selected, setSelectedGraph]);

  // useEffect(() => {
  //   if (location?.state && searchId !== 'custom-search') {
  //     const searchedDetails = location?.state?.filters || {};
  //     const searchedQuery = searchedDetails?.query;
  //     const articleInfo = location?.state?.data || {};
  //     const isGuidedSearch = !!location?.state?.isGuidedSearch;

  //     const articlePagingTemp = articleInfo?.paged || {
  //       pageNumber: 1,
  //       pageSize: 50,
  //       total: 0,
  //     };
  //     setQuery(searchedQuery || '');
  //     setGuidedSection(isGuidedSearch);
  //     setFilters(searchedDetails?.filter);
  //     setArticlePaging(articlePagingTemp);
  //     setSortOrder('relevance');
  //     setPage(0);
  //     setTriggerFetchUseEffect((prev) => !prev);
  //   }
  // }, [location?.state, searchId]);

  const { mutateAsync: updateChartNames } = useUpdateChartNames(searchId);

  // useEffect(() => {
  //   if (searchedQuery !== undefined && searchedQuery !== null) {
  //     console.log('search value inside useeffect');

  //     if (typeof searchedQuery === 'string') {
  //       setValue(searchedQuery);
  //     } else if (typeof searchedQuery === 'object') {
  //       setGuidedSearch(searchedQuery);
  //     } else {
  //       console.log('else type');
  //     }
  //   }
  // }, [searchedQuery]);

  // useEffect(() => {
  //   setFilterState(searchedDetails?.filter);
  // }, [searchedDetails?.filter]);

  const truncateQuery = (query) => {
    if (!query) {
      return query;
    }
    let res = '';
    if (query !== null && typeof query === 'object') {
      // res = convertObjToString(query);
      res = convertObjToExpression(query);
    } else {
      res = query;
    }
    return res;
  };

  const onBtnClick = (screen) => {
    if (articlePosition !== '') {
      return;
    }
    setLoader(true);
    setActiveScreen(activeScreen === '' ? screen : '');
    setTimeout(() => {
      setLoader(false);
    }, 500);
  };

  // const handleSearchEdit = () => {
  //   setEditMode((old) => !old);
  //   setIsSearchFocused(true);
  // };

  // const handleSearchInputFocus = (isFocused) => {
  //   setIsSearchFocused(isFocused);
  // };

  const handleGuidedToggle = () => {
    setGuidedSection((old) => !old);
  };

  const handleChangeQuery = (booleanQuery) => {
    shouldSaveSearch.current = true;
    setQuery((prev) => {
      if (prev === booleanQuery) {
        setChangeSaved(true);
      } else {
        setChangeSaved(false);
      }
      return booleanQuery;
    });
  };

  function convertObjectValues(obj) {
    const convertedObject = {};

    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        convertedObject[key] = obj[key].join(', ');
      } else {
        convertedObject[key] = obj[key];
      }
    }

    return convertedObject;
  }

  const getPayloadForSearch = (query) => {
    const filter = filters;
    let searchFilters = {};
    let filterData = searchFilterOptions.find(
      (filter) => filter.value === 'mediaTypes'
    );
    if (
      filter?.mediaTypes === undefined ||
      filter?.mediaTypes.length === filterData?.options?.length
    ) {
      searchFilters = { ...searchFilters };
    } else {
      const mediaTypes = filter?.mediaTypes?.map((x) => x.value);
      searchFilters = { ...searchFilters, media_types: mediaTypes };
    }
    filterData = searchFilterOptions.find(
      (filter) => filter.value === 'languages'
    );
    if (
      filter?.languages === undefined ||
      filter?.languages?.length === filterData?.options?.length
    ) {
      searchFilters = { ...searchFilters };
    } else {
      const languages = filter?.languages?.map((x) => x.value);
      searchFilters = { ...searchFilters, languages };
    }

    filterData = searchFilterOptions.find(
      (filter) => filter.value === 'locations'
    );
    if (
      filter?.locations === undefined ||
      filter?.locations?.length === filterData?.options?.length
    ) {
      searchFilters = { ...searchFilters };
    } else {
      const locations = filter?.locations?.map((x) => x.value);
      searchFilters = { ...searchFilters, countries: locations };
    }

    filterData = searchFilterOptions.find(
      (filter) => filter.value === 'spam_exclusions'
    );
    if (filter?.spam_exclusions === undefined) {
      searchFilters = { ...searchFilters };
    } else {
      const spamExclusions = filter?.spam_exclusions?.map((x) => x.value);
      searchFilters = { ...searchFilters, spam_exclusions: spamExclusions };
    }

    filterData = searchFilterOptions.find(
      (filter) => filter.value === 'sentiment'
    );
    if (
      filter?.sentiment === undefined ||
      filter?.sentiment?.length === filterData?.options?.length
    ) {
      searchFilters = { ...searchFilters };
    } else {
      const sentiment = filter?.sentiment?.map((x) => x.value);
      searchFilters = { ...searchFilters, sentiments: sentiment };
    }

    if (filter?.dateTime === undefined) {
      searchFilters = { ...searchFilters, dateTime: '' };
    } else {
      const dateTime = filter?.dateTime?.value;
      searchFilters = {
        ...searchFilters,
        dateTime: filter?.dateTime?.end ? 'custom_range' : dateTime,
      };
    }

    if (filter?.keywords) {
      const keywords = filter?.keywords;
      if (keywords?.include?.query) {
        searchFilters = {
          ...searchFilters,
          keywords_includes: keywords.include.query?.split(','),
          keywords_includes_case_sensitive: keywords.include?.caseSensitive,
        };
      }

      if (keywords?.placement?.query) {
        searchFilters = {
          ...searchFilters,
          keyword_placement: keywords?.placement?.query,
          keyword_placement_range:
            keywords?.placement?.range?.defaultValue?.length > 0
              ? keywords?.placement?.range?.defaultValue[1]
              : 100,
          keywords_includes: keywords.include.query?.split(','),
          keywords_includes_case_sensitive: keywords.include?.caseSensitive,
        };
      }

      if (keywords?.exclude?.query) {
        searchFilters = {
          ...searchFilters,
          keywords_excludes: keywords.exclude.query?.split(','),
          keywords_excludes_case_sensitive: keywords.exclude?.caseSensitive,
        };
      }
    }

    if (filter?.sources) {
      const sources = filter?.sources;
      if (
        sources?.include ||
        (Array.isArray(sources?.include) && sources?.include > 0)
      ) {
        searchFilters = {
          ...searchFilters,
          source_includes: sources.include?.map((x) => x.value),
        };
      }

      if (
        sources?.exclude ||
        (Array.isArray(sources?.exclude) && sources?.exclude > 0)
      ) {
        searchFilters = {
          ...searchFilters,
          source_excludes: sources.exclude?.map((x) => x.value),
        };
      }
    }

    let startDate, endDate;
    if (searchFilters?.dateTime === 'custom_range') {
      endDate = format(filter?.dateTime.end, 'yyyy-MM-dd');
      startDate = format(filter?.dateTime.start, 'yyyy-MM-dd');
    } else {
      const dateRange = getDateRange(searchFilters?.dateTime);
      startDate = dateRange?.startDate;
      endDate = dateRange?.endDate;
    }
    searchFilters = {
      ...searchFilters,
      start_date: startDate,
      end_date: endDate,
      search_type: guidedSection ? 'guided' : 'simple',
      simple_query: guidedSection ? '' : replaceOperators(query)?.trim(),
      page_number: 1,
      page_size: 50,
      // 'fcm-token': localStorage.getItem('FCM-Token') || '',
      // ...saved_search_id: searchId,
      // save_recent_search: false,
      // user_id: authInfo?.user_id,
    };
    if (guidedSection) {
      searchFilters = {
        ...searchFilters,
        guided_all_of_these: query?.all?.split(',').map((x) => x.trim()),
        guided_none_of_these: query?.none?.split(',').map((x) => x.trim()),
        guided_any_of_these: query?.any?.split(',').map((x) => x.trim()),
      };
    }
    return searchFilters;
  };

  const handleSearchValue = async (query) => {
    if (!guidedSection) {
      if (!query.trim()) {
        toast.error('Query should not be empty.');
        return;
      }
      if (!checkMismatchedQuotes(query.trim())) {
        toast.error('Mismatched quotes present in query.');
        return;
      }
      if (!isCorrectParenthesisOrder(query.trim())) {
        toast.error('Mismatched Parenthesis present in query.');
        return;
      }
      const formatedQuery = replaceOperators(query)?.trim();
      const splitQuery = formatedQuery?.split(' ');
      if (
        inBuiltOperators.includes(
          splitQuery[splitQuery?.length - 1]?.toLowerCase()?.trim()
        ) ||
        inBuiltOperators.includes(splitQuery[0]?.toLowerCase()?.trim())
      ) {
        toast.error('Kindly check the Query text box.');
        return;
      }
    }

    // console.log(data, 'searchResult->data');
    // call search update api
    const searchFilters = getPayloadForSearch(query);
    const data = await getSearchQueryStatus(searchFilters);
    if (!data?.data) {
      toast.error(
        '"AND" and "OR" operator not allowed at same level, Please use parentheses to group terms correctly.'
      );
      return;
    }
    setType('totalArticles');
    if (tags?.length > 0) {
      setTags([]);
    } else {
      updateSearch({
        ...searchFilters,
        save_recent_search: shouldSaveSearch.current,
        refresh_api: true,
        recent_search_id: recentSearchArticlesId,
      });
      isCreatedFresh.current = false;
      setTriggerLiveSearch((old) => !old);
    }
    handleCancelSearch();
  };

  const handleCancelSearch = (type) => {
    if (type === 'CANCEL') {
      setTriggerFetchUseEffect((old) => !old);
      setQuery(prevSavedSearch?.query);
    }
    // setGuidedSection(false);
    setEditMode(false);
  };

  const handleCancelSearchResult = () => {
    // navigate('/');
    if (!changeSaved) {
      const comparingData =
        JSON.stringify({ ...prevSavedSearch }) !==
        JSON.stringify({
          ...filters,
          query,
          guidedSection,
          search_name: location?.state?.savedSearchData?.title,
          recent_searchId: recentSearchArticlesId,
        });
      // setConfimationAlertPopUp(true);
      if (searchId !== 'custom-search' && comparingData) {
        setConfimationAlertPopUp(true);
        setSelectedPath('/');
      } else {
        // setShowSavedSearch(true);
        // setSelectedPath('/');
        // return;
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  const comparingData =
    JSON.stringify({ ...prevSavedSearch }) !==
    JSON.stringify({
      ...filters,
      query,
      guidedSection,
      search_name: location?.state?.savedSearchData?.title,
      recent_searchId: recentSearchArticlesId,
    });

  useEffect(() => {
    // window.history.pushState(null, null, window.location.pathname);
    navigate(window.location.pathname, {
      state: {
        filters: { filter: filters, query },
        search_name: searchName,
        recent_searchId: location?.state?.recent_searchId,
        selectedItems: JSON.stringify(searchData?.data?.data),
        savedSearchData: location?.state?.savedSearchData,
      },
    });
    const onBackButtonEvent = (e) => {
      const validateFlag =
        !changeSaved && searchId !== 'custom-search' && comparingData;
      e.preventDefault();
      if (validateFlag) {
        // if (window.confirm('Do you want to go back ?')) {
        setConfimationAlertPopUp(true);
        setSelectedPath('/');
      } else {
        // window.history.pushState(null, null, window.location.pathname);
        navigate('/');
      }
      // }
    };

    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
      // window.addEventListener('popstate', (e) => onBackButtonEvent(e));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!changeSaved, comparingData, searchId]);

  const handleBackdropClick = () => {
    handleCancelSearch('CANCEL');
  };
  const [page, setPage] = useState(0);

  const handleSaveSearchData = async () => {
    let dateTimeFilters = {};
    const filterQuery = getUpdatedFilterData(filters);

    if (filters?.dateTime?.end) {
      dateTimeFilters = {
        ...filters?.dateTime,
        end: format(filters?.dateTime?.end, 'yyyy-MM-dd'),
        start: format(filters?.dateTime?.start, 'yyyy-MM-dd'),
        value: 'custom_range',
      };
    } else {
      const dateRange = getDateRange(filters?.dateTime?.value);
      const startDate = dateRange?.startDate;
      const endDate = dateRange?.endDate;
      dateTimeFilters = {
        ...filters?.dateTime,
        end: endDate,
        start: startDate,
      };
    }
    const payload = {
      id: selectedSavedSearch?.id,
      title: selectedSavedSearch?.title,
      description: selectedSavedSearch?.description,
      search_params: JSON.stringify({
        filters: {
          filter: {
            ...filterQuery,
            dateTime: {
              ...dateTimeFilters,
            },
          },
          query,
        },
        isGuidedSearch: guidedSection,
      }),
    };

    try {
      await updateSearchData(payload, {
        onSuccess: () => {
          toast.success('Search Saved Successfully!');

          const item = searchData?.data?.data;
          searchId &&
            navigate(
              `/search-results/${searchId}/overview/${recentSearchArticlesId}`,
              {
                state: {
                  filters: { filter: filters, query },
                  search_name: searchName,
                  recent_searchId: location?.state?.recent_searchId,
                  selectedItems: JSON.stringify(item),
                  savedSearchData: location?.state?.savedSearchData,
                },
              }
            );

          if (overviewClick || selectedPath === '/') {
            navigate(selectedPath, {
              state: {
                filters: { ...filters, query },
                search_name: searchName,
                recent_searchId: location?.state?.recent_searchId,
                selectedItems:
                  selectedPath.split('/')[3] === 'custom'
                    ? JSON.stringify(selectedDashboardItems)
                    : JSON.stringify(item),
                prevPath: true,
              },
            });
          }
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setOverViewClick(false);
      setChangeSaved(true);
    }
  };
  // const handleGuidedSearch = (e) => {
  //   const { name, value } = e.target;
  //   setGuidedSearch({
  //     ...guidedSearch,
  //     [name]: value,
  //   });
  // };
  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   console.log(value, 'search value');
  //   setValue(value);
  // };
  const handleEditMode = () => {
    setEditMode(true);
  };
  // const handleUpdateSearch = () => {};
  const handleShowSavedSearches = (e) => {
    e.stopPropagation();
    setShowSaved((old) => !old);
  };

  const handleFilterChange = (data, name) => {
    // const { name, options } = data;
    // console.log(data, 'onFilterChange');
    setChangeSaved(false);
    setChanges(true);
    localStorage.setItem('isSavedChanges', JSON.stringify(true));
    setType('totalArticles');
    setSortOrder('relevance');
    setFilters(data);
    setTags([]);
    setTriggerLiveSearch((old) => !old);
    isCreatedFresh.current = false;
    if (!editMode) {
      page !== 0 && setPage(0);
    }
    // call update api
  };

  const getDownloadPdf = () => {
    localStorage.setItem('isSavedChanges', JSON.stringify(true));
    return axiosGet('/downloadPdf', {
      page: 'search-results',
      active: 'dashboard',
      searchId,
    });
  };

  const { isFetching: downloading } = useQuery({
    queryKey: ['download-dashboard-pdf'],
    queryFn: () => getDownloadPdf(),
    refetchOnWindowFocus: false,
    enabled: false,
    // onSuccess: (data) => {
    //   window.open(`${baseURL}/images/${data.data.pdfName}`, '_blank');
    // },
  });
  // console.log(downloading, 'download-pdf');

  useEffect(() => {
    socketRef.current = new WebSocket(socketEndpoint);
    const socket = socketRef.current;
    socket.onopen = function (event) {
      console.log('Connection opened!');
      setIsConnected(true);
    };

    socket.onmessage = function (event) {
      const data = JSON.parse(JSON.parse(event?.data));
      if (data?.response_status === 'SEARCH_SUBMITTED') {
        if (data?.data?.searchId) {
          recentSearchIdRef.current = data?.data?.searchId;
          setIsDataPreprocessed(false);
          responseCountsRef.current = 0;
        }
      } else if (
        data?.response_status === 'SEARCH_COUNTS_UPDATED' &&
        recentSearchIdRef.current === data?.data?.searchId
      ) {
        setLiveArticleCount(data?.data?.current_hits ?? 0);
        setSocketPaging({
          pageNumber: 1,
          pageSize:
            data?.data?.current_hits < 50 ? data?.data?.current_hits : 50,
          total: data?.data?.current_hits ?? 0,
        });
        setSocketDataTiles((prev) => {
          return prev.map((x) => {
            if (x?.title === 'Total Articles') {
              const { isIncreased, percentageIncrease } =
                calculatePercentageIncrease(
                  data?.data?.current_hits,
                  data?.data?.old_hits
                );
              return {
                ...x,
                data: data?.data?.current_hits,
                change: percentageIncrease,
                isIncreased,
              };
            }
            return { ...x };
          });
        });
      } else if (
        data?.response_status === 'TOP_ARTICLES_READY' &&
        recentSearchIdRef.current === data?.data?.searchId
      ) {
        setArticleSocketData(data.data.articles || []);
        turnOffTheLoadingData();
      } else if (
        data?.response_status === 'ALL_ARTICLES_READY' &&
        recentSearchIdRef.current === data?.data?.search_id
      ) {
        responseCountsRef.current = responseCountsRef.current + 1;
        setIsDataPreprocessed(true);
        refetchAllData();
      } else if (
        data?.response_status === 'ALL_SENTIMENTS_READY' &&
        recentSearchIdRef.current === data?.data?.search_id
      ) {
        responseCountsRef.current = responseCountsRef.current + 1;
        refetchAllData();
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (
      searchFilterOptions.length > 0 &&
      page === 0 &&
      isConnected &&
      !isCreatedFresh.current
    ) {
      const message = JSON.stringify({
        user_id: authInfo?.user_id,
        ...convertObjectValues(getPayloadForSearch(query)),
      });
      setEventCycle(true);
      setIsLoadingData(true);
      socketRef.current.send(message);
    }
  }, [searchFilterOptions, isConnected, authInfo?.user_id, triggerLiveSearch]);

  const [articleType, setArticleType] = useState(articleTypeDefault);
  const [inSearchArticleType, setInSearchArticleType] = useState({
    ...articleTypeDefault,
  });
  // if (searchDataLoading) {
  //   return <Spinner />;
  // }

  // console.log(filterState, 'filterState');
  // const handlePage = (pageNum) => {
  //   setPage(pageNum);
  //   queryClient.invalidateQueries(['articles', pageNum, type]);
  // };

  const handleSaveSearch = () => {
    setShowSavedSearch((old) => !old);
  };

  const setArticleTypeClose = () => {
    setArticleType(articleTypeDefault);
    setInSearchArticleType({ ...articleTypeDefault });
  };
  const handleClick = (index) => {
    // if (activeScreen !== 'dashboard') {
    //   return;
    // }
    setLoader(true);
    // imp Dont delete start Sujay
    setfloatingPagination(true);
    let position = '';
    if (activeScreen === '') {
      position = 'right';
    } else {
      if (index === 0) {
        position = 'right';
      } else if (index % 2 === 0) {
        position = 'left';
      } else {
        position = 'right';
      }
    }
    setArticlePosition(position);
    // imp Dont delete end Sujay
    setLoader(false);
  };
  const handleResetGraph = () => {
    setArticlePosition('');
    setArticleTypeClose();
    setSelected(null);
    setResetSelection(false);
    setSearchKey('');
    setType('totalArticles');
    setSydicationActive(false);
    setSydicationArticles([]);
    searchKey && setSearchKey('');
    type !== 'totalArticles' && setType('totalArticles');
    setResetAllChecked(true);
  };

  // console.log(InitialLoader, 'loader');

  const handleAddToCanvas = () => {
    setAddConfirmationPopUp(false);
  };
  const handleAlertSaved = () => {
    setChangeSaved((_) => true);
    localStorage.setItem('isSavedChanges', true);

    // handleAnalyze();
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isSavedChanges || downloading) {
        event.preventDefault();
        event.returnValue =
          'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    function handlePopstate(event) {
      if (isSavedChanges || downloading) {
        event.preventDefault();
        const stayOnPage = window.confirm(
          'You have unsaved changes. Are you sure you want to leave?'
        );
        if (stayOnPage) {
          // do default routing
        } else {
          navigate(`${fullURL}`);
          localStorage.removeItem('isSavedChanges', false);
        }
      }
    }

    // window.addEventListener('popstate', handlePopstate);
    // window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // window.removeEventListener('popstate', handlePopstate);
      // window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isSavedChanges, downloading, fullURL, navigate, changeSaved]);

  useEffect(() => {
    localStorage.removeItem('isSavedChanges');
  }, []);

  const getEditmode = () => {
    if (editMode) {
      return true;
    } else if (searchFilterOptions?.length > 0) {
      return false;
    } else {
      return true;
    }
    // if it's in editMode, we should disable the APIs
    // if it doesnot have search fitlers, we need to disabled the APIs
  };

  const advancedDashboards = [
    {
      label: 'Campaign Monitor',
      value: 'campaign',
      path: `${searchId}/campaign`,
    },
    {
      label: 'Author Impact',
      value: 'authorimpact',
      path: `${searchId}/authorimpact`,
    },
    {
      label: 'Sentiments By Themes',
      value: 'sentiments',
      path: `${searchId}/sentiments`,
    },
    {
      label: 'Message Congruence',
      value: 'congruence',
      path: `${searchId}/congruence`,
    },
    {
      label: 'PR Impact',
      value: 'primpact',
      path: `${searchId}/primpact`,
    },
  ];

  const {
    isFetching: isSentimentChartFetching,
    isLoading: isSentimentChartLoading,
    data: chartsData,
    refetch: refetchSentimentData,
  } = useSentimentChartData(filters, getPayloadForSearch(query), getEditmode());

  const {
    isFetching: isGeoGraphicalDataFetching,
    isLoading: isGeoGraphicalDataLoading,
    data: geographicalData,
    refetch: refetchGeographicalData,
  } = useGeographicalBreakdownData(
    filters,
    getPayloadForSearch(query),
    getEditmode()
  );
  const {
    isFetching: isMediaChartFetching,
    isLoading: isMediaChartLoading,
    data: mediaData,
    refetch: refetchMediaChartData,
  } = useMediaTypeChartData(filters, getPayloadForSearch(query), getEditmode());

  const {
    isFetching: isWordCloudDataFetching,
    isLoading: isWordCloudDataLoading,
    data: wordCloudData,
    refetch: refetchWordCloudData,
  } = useWordCloudChartData(filters, getPayloadForSearch(query), getEditmode());

  const {
    isFetching: isResultsOverTimeFetching,
    isLoading: isResultOverTimeLoading,
    data: resultsData,
    refetch: refetchResultOvertimeData,
  } = useResultOverTimeData(filters, getPayloadForSearch(query), getEditmode());

  const {
    isFetching: isOutletbreakdownFetching,
    isLoading: isOutletbreakdownLoading,
    data: outletbreakdownData,
    refetch: refetchOutletBreakdownData,
  } = useMediaOutletBreakdown(
    filters,
    getPayloadForSearch(query),
    getEditmode()
  );

  const {
    isFetching: isTopSourceDataFetching,
    isLoading: isTopSourceDataLoading,
    data: topSourceData,
    refetch: refetchTopSourceData,
  } = useTopSourceChartData(filters, getPayloadForSearch(query), getEditmode());

  const {
    isFetching: isTopThemeDataFetching,
    isLoading: isTopThemeDataLoading,
    data: topThemeData,
    refetch: refetchTopThemeData,
  } = useTopThemeChartData(filters, getPayloadForSearch(query), getEditmode());

  const {
    isFetching: isTopAuthorDataFetching,
    isLoading: isTopAuthorDataLoading,
    data: topAuthorData,
    refetch: refetchTopAuthorData,
  } = useTopAuthorChartData(filters, getPayloadForSearch(query), getEditmode());

  const { data: tileDetails, refetch: refetchOverviewData } =
    useOverviewDetails(filters, getPayloadForSearch(query), getEditmode());

  useEffect(() => {
    if (!isResultOverTimeLoading && !isResultsOverTimeFetching) {
      setResultsOverTimeChartData(resultsData);
    }
  }, [isResultOverTimeLoading, resultsData, isResultsOverTimeFetching]);

  useEffect(() => {
    if (!isOutletbreakdownLoading) {
      setOutletMediaChartData(outletbreakdownData);
    }
  }, [isOutletbreakdownLoading, outletbreakdownData]);

  useEffect(() => {
    if (!isGeoGraphicalDataLoading) {
      setGeographicalChartData(geographicalData);
    }
  }, [isGeoGraphicalDataLoading, geographicalData]);

  useEffect(() => {
    if (!isSentimentChartLoading) {
      setSentimentChartData(chartsData);
    }
  }, [isSentimentChartLoading, chartsData]);

  useEffect(() => {
    if (!isMediaChartLoading) {
      setMediaTypeChartData(mediaData);
    }
  }, [isMediaChartLoading, mediaData]);

  useEffect(() => {
    if (!isWordCloudDataLoading) {
      setWordCloudChartData(wordCloudData);
    }
  }, [isWordCloudDataLoading, wordCloudData]);

  useEffect(() => {
    if (!isTopThemeDataLoading) {
      setTopThemeChartData(topThemeData);
    }
  }, [isTopThemeDataLoading, topThemeData]);

  useEffect(() => {
    if (!isTopAuthorDataLoading) {
      setTopAuthorChartData(topAuthorData);
    }
  }, [isTopAuthorDataLoading, topAuthorData]);

  useEffect(() => {
    if (!isTopSourceDataLoading) {
      setTopSourcesChartData(topSourceData);
    }
  }, [isTopSourceDataLoading, topSourceData]);

  useEffect(() => {
    if (tags?.length > 0) {
      const searchFilters = {
        page_size: 50,
        page_number: page + 1,
        recent_search_id: recentSearchArticlesId,
        tags,
      };
      updateSearchDataByTags(searchFilters);
    } else if (
      searchFilterOptions?.length > 0 &&
      !articleType?.graphSelection &&
      isDataPreprocessed
    ) {
      let searchFilters = getPayloadForSearch(query);
      if (sortOrder) {
        searchFilters = {
          ...searchFilters,
          sort: sortOrder,
        };
      }
      if (type !== 'totalArticles' && type) {
        searchFilters = {
          ...searchFilters,
          media_types: [type],
        };
      }
      if (searchId !== 'custom-search') {
        searchFilters = {
          ...searchFilters,
          saved_search_id: searchId,
        };
      }

      if (page !== 0) {
        shouldSaveSearch.current = false;
      }
      updateSearch({
        ...searchFilters,
        page_number: page + 1,
        save_recent_search: shouldSaveSearch.current,
        refresh_api: true,
        recent_search_id: recentSearchArticlesId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    triggerFetchUseEffect,
    searchFilterOptions,
    sortOrder,
    type,
    refetchData,
    isDataPreprocessed,
  ]);

  const getTabs = (data) => {
    const mediaCountData = getMediaCountDataUTIL(data);
    if (filters?.mediaTypes) {
      return mediaCountData?.filter(
        (x) =>
          filters?.mediaTypes?.some(
            (y) => y.value?.toLowerCase() === x.value?.toLowerCase()
          ) || x.value === 'totalArticles'
      );
    } else {
      const mediaTypes = searchFilterOptions.find(
        (x) => x.value === 'mediaTypes'
      );
      if (mediaTypes) {
        const options = mediaTypes?.options;
        const tabsData = mediaCountData?.filter(
          (x) =>
            options?.some(
              (y) => y.value?.toLowerCase() === x.value?.toLowerCase()
            ) || x.value === 'totalArticles'
        );
        return tabsData;
      }
      return [];
    }
  };

  const userInput = useSelector((state) => state.searchInput.searchKeyword);

  useEffect(() => {
    if (
      searchFilterOptions?.length > 0 &&
      (articleType?.graphSelection ||
        articleType?.isSearch ||
        inSearchArticleType?.graphSelection)
    ) {
      let searchFilters = getPayloadForSearch(query);

      if (inSearchArticleType?.name === 'RHS') {
        const graphFilter = searchQueryForGraph(
          inSearchArticleType?.widget,
          inSearchArticleType?.graphSelection,
          inSearchArticleType?.rawData,
          inSearchArticleType?.otherInfo,
          searchFilters
        );
        searchFilters = {
          ...searchFilters,
          ...graphFilter,
        };
      } else if (inSearchArticleType?.name === 'INSEARCH') {
        const graphFilter = searchQueryForGraph(
          articleType?.widget,
          articleType?.graphSelection,
          articleType?.rawData,
          articleType?.otherInfo,
          searchFilters
        );
        searchFilters = {
          ...searchFilters,
          ...graphFilter,
          syndication_reprint_group_id:
            inSearchArticleType?.rawData?.reprint_group_id,
          syndication_article_id: inSearchArticleType?.rawData?.articleId,
        };
      } else {
        const graphFilter = searchQueryForGraph(
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
      if (
        (articleType.isSearch || inSearchArticleType?.isSearch) &&
        inSearchArticleType?.widget !== 'Syndication' &&
        userInput
      ) {
        searchFilters = {
          ...searchFilters,
          search_in_search: userInput,
        };
      }

      updateSearchInSearch({
        ...searchFilters,
        page_number: inSearchPageNum + 1,
        save_recent_search: false,
        ...(searchId !== 'custom-search' && { saved_search_id: searchId }),
      });
    }

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
    triggerInSearchUseEffect,
    inSearchArticleType,
  ]);
  const onSubmitData = (data) => {
    // console.log(data);
    setChangeSaved(true);
  };
  const handleSavedDelete = () => {
    setDeletedbtn(() => true);
  };

  const handleNaviationSearch = (item) => {
    setShowSaved(false);
    let searchParams = JSON.parse(item?.search_params);
    searchParams = getSearchParams(searchParams);
    navigate(`/search-results/${item.id}/overview/${item.recent_search_id}`, {
      state: {
        data: null,
        filters: searchParams?.filters,
        isGuidedSearch: searchParams?.isGuidedSearch,
        savedSearchData: item,
      },
    });
  };

  useEffect(() => {
    if (
      searchId === 'custom-search' &&
      (storeComments.length > 0 || storeTags.length > 0)
    ) {
      !changes && setChanges(true);
    }
  }, [searchId, storeComments, storeTags]);

  const handleSaveSearchForData = async ({ name, description }) => {
    const searchParamsInfo = JSON.parse(selectedSavedSearch?.search_params);
    const searchParams = getSearchParams(searchParamsInfo);
    if (selectedTab === 1) {
      await updateSearchData(
        {
          id: selectedSavedSearch?.id,
          title: name,
          description,
          search_params: selectedSavedSearch?.search_params,
          recent_search_id: selectedSavedSearch?.recent_search_id,
        },
        {
          onSuccess: () => {
            toast.success(' Search Updated successfully ');
            navigate(
              `/search-results/${selectedSavedSearch.id}/overview/${selectedSavedSearch?.recent_search_id}`,
              {
                state: {
                  data: null,
                  filters: searchParams?.filters,
                  isGuidedSearch: searchParams?.isGuidedSearch,
                  savedSearchData: {
                    ...selectedSavedSearch,
                    title: name,
                    description,
                  },
                },
              }
            );
            setChangeSaved(true);
            setChanges(false);
          },
        }
      );
    }
  };

  const getLoader = (loading, backgroundFetching) => {
    if (eventCycle && isLoadingData && !tags?.length > 0) {
      return true;
    }

    if (fetchInBackground) {
      return false;
    }

    if (loading || backgroundFetching) {
      return true;
    } else {
      return false;
    }
  };

  const getUpdatedFilterData = (filter) => {
    let searchFilters = JSON.parse(JSON.stringify(filter));
    let filterData = searchFilterOptions.find(
      (filter) => filter.value === 'mediaTypes'
    );
    if (
      filter?.mediaTypes === undefined ||
      filter?.mediaTypes.length === filterData?.options?.length
    ) {
      searchFilters = { ...searchFilters, mediaTypes: undefined };
    }
    filterData = searchFilterOptions.find(
      (filter) => filter.value === 'languages'
    );
    if (
      filter?.languages === undefined ||
      filter?.languages?.length === filterData?.options?.length
    ) {
      searchFilters = { ...searchFilters, languages: undefined };
    }

    filterData = searchFilterOptions.find(
      (filter) => filter.value === 'locations'
    );
    if (
      filter?.locations === undefined ||
      filter?.locations?.length === filterData?.options?.length
    ) {
      searchFilters = { ...searchFilters, locations: undefined };
    }

    filterData = searchFilterOptions.find(
      (filter) => filter.value === 'spam_exclusions'
    );
    if (filter?.spam_exclusions === undefined) {
      searchFilters = { ...searchFilters, spam_exclusions: undefined };
    }

    filterData = searchFilterOptions.find(
      (filter) => filter.value === 'sentiment'
    );
    if (
      filter?.sentiment === undefined ||
      filter?.sentiment?.length === filterData?.options?.length
    ) {
      searchFilters = { ...searchFilters, sentiment: undefined };
    }
    return filterUndefinedProperties(searchFilters);
  };

  function filterUndefinedProperties(obj) {
    // Use Object.entries to get an array of [key, value] pairs
    // Use Array.prototype.filter to filter out entries with undefined values
    const filteredEntries = Object.entries(obj).filter(
      ([key, value]) => value !== undefined
    );

    // Use Object.fromEntries to convert the filtered entries back to an object
    const filteredObject = Object.fromEntries(filteredEntries);

    return filteredObject;
  }

  const onUpdateChartNames = async (updatedChartData, widget, chartData) => {
    if (chartData?.provided_name === updatedChartData?.chartName) {
      return;
    }
    const loadingToastId = toast.loading('Saving Chart Name...');
    try {
      // Set a loading toast before calling the mutation function
      // Execute the mutation function
      await updateChartNames(
        {
          saved_search_id: searchId,
          default_name: widget?.chartName,
          provided_name: updatedChartData
            ? updatedChartData?.chartName
            : widget?.chartName,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([
              'search_saved-search-visual',
              searchId,
            ]);
            toast.success('Updated the chart name successfully');
          },
          onError: () => {
            toast.error('Error while updating the chart name');
          },
        }
      );

      // Clear the loading toast once the mutation is complete
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  const turnOffTheLoadingData = () => {
    setIsLoadingData(false);
  };

  const { onDownload } = useDownloadGraphsHook();

  const getDataWithCount = (graphData) => {
    if (graphData) {
      graphData.data.summary.value = String(addCountPrefix(liveArticleCount));
      return graphData;
    }
    return graphData;
  };

  const outletDataWithCount = (graphData) => {
    if (graphData) {
      graphData.data.summary.data = [
        {
          label: 'Online',
          value: liveArticleCount,
        },
        {
          label: 'Broadcast',
          value: 0,
        },
        {
          label: 'Print',
          value: 0,
        },
      ];
      return graphData;
    }
    return graphData;
  };

  return (
    <SearchPageWrp>
      <AppBG />
      <AppHeader />
      <SearchFocusBackdrop
        className={`backdrop ${editMode ? 'active' : ''}`}
        onClick={handleBackdropClick}
      ></SearchFocusBackdrop>
      <SearchMainWrp activeScreen={activeScreen}>
        <SearchSection>
          <SearchWrp className={`search-wrapper ${editMode ? 'active' : ''}`}>
            <NonEditModeContainer>
              <HeaderContainer>
                <SectionHeader>
                  <CrossButtonWrp onClick={handleCancelSearchResult}>
                    <ArrowLeft
                      color={theme[selectedTheme].text}
                      width="32"
                      height="32"
                    />
                  </CrossButtonWrp>
                  <SearchTextWrp>
                    <SearchText>{searchName}</SearchText>
                    <Iconwrp onClick={handleShowSavedSearches}>
                      <Arrow
                        size="1rem"
                        className={'dropdown-arrow-icon'}
                        fill={theme[selectedTheme].text}
                      />
                    </Iconwrp>
                    {searchId !== 'custom-search' && (
                      <Iconwrp
                        onClick={() => {
                          setSavePopup(true);
                        }}
                      >
                        <Edit2 size={'1.25rem'} />
                      </Iconwrp>
                    )}
                  </SearchTextWrp>
                  <DropdownForButton ref={dropdownRef}>
                    <SaveSearchBtn
                      onClick={() => {
                        if (searchId === 'custom-search') {
                          handleSaveSearch();
                        } else {
                          handleSaveSearchData();
                        }
                      }}
                    >
                      {/* <ButtonText>Save</ButtonText> */}Save
                      <IcondownWrp
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenClcik();
                        }}
                      >
                        <DropDownButton
                          size={'1rem'}
                          color={'#ffffff'}
                          isOpen={dropdownOpen}
                        />
                      </IcondownWrp>
                    </SaveSearchBtn>
                    {showCustomComponent && (
                      <DropDownCont>
                        {/* <DropDown onClick={handleSaveSearch}>Save</DropDown> */}
                        <DropDown onClick={handleSaveSearch}>Save As</DropDown>
                      </DropDownCont>
                    )}
                  </DropdownForButton>
                  {/* <SaveSearchBtn onClick={handleSaveSearch}>
                    <ButtonText>Save</ButtonText>
                  </SaveSearchBtn> */}
                </SectionHeader>
                <FilterComponent
                  searchFilter={filters}
                  handleFilterChange={handleFilterChange}
                  editMode={editMode}
                  searchResult={true}
                  key={searchId}
                />
                {typeof query === 'object' && (
                  <SearchQueryBox
                    ref={codeRef}
                    className={editMode ? 'hide' : ''}
                    onClick={handleEditMode}
                  >
                    <Editor
                      value={truncateQuery(query)}
                      highlight={(code) =>
                        highlight(code, languages.customLanguage)
                      }
                      onValueChange={() => {}}
                      style={{
                        fontSize: '0.9375rem',
                        width: '100%',
                      }}
                      preClassName="search-result-text-area"
                      textareaClassName="search-result-text-area"
                    />
                    ;{/* {truncateQuery(query)} */}
                  </SearchQueryBox>
                )}
                {typeof query !== 'object' && !editMode && (
                  <EditorWrapper>
                    <Editor
                      value={query}
                      highlight={(code) =>
                        highlight(code, languages.customLanguage)
                      }
                      onValueChange={() => {}}
                      style={{
                        fontSize: '0.9375rem',
                        width: '100%',
                      }}
                      onClick={handleEditMode}
                      preClassName="search-result-text-area"
                      textareaClassName="search-result-text-area"
                    />
                  </EditorWrapper>
                )}
              </HeaderContainer>
              <WrapperContainer className={editMode ? 'active' : ''}>
                <SearchComponent
                  // onSearchInputFocus={handleSearchInputFocus}
                  onGuidedToggleFocus={handleGuidedToggle}
                  isFocused={editMode}
                  handleSearchValue={handleSearchValue}
                  guidedSection={guidedSection}
                  handleCancelSearch={handleCancelSearch}
                  isEditMode={editMode}
                  isSearchResult={true}
                  searchedDetails={searchedDetails}
                  handleChangeQuery={handleChangeQuery}
                  searchDetailsQuery={query}
                  key={searchId}
                  prevSavedSearch={prevSavedSearch}
                />
              </WrapperContainer>
            </NonEditModeContainer>
          </SearchWrp>
          <DashboardPopup
            toggler={setShowSaved}
            open={showSaved}
            popContent={
              <SearchPopup
                Frames={Frames}
                titleClick={handleNaviationSearch}
                isCheckBox={false}
                setConfirmationPopUp={setConfirmationPopUp}
                deletedbtn={deletedbtn}
                setDeletedbtn={setDeletedbtn}
                setSeleteditem={setSeleteditem}
                setSavePopup={setSavePopup}
                setSeletedTab={setSeletedTab}
                setIsDashboardsAssociated={setIsDashboardsAssociated}
              />
            }
            padding="0px"
            Cross={true}
            borderRadius="0.75rem"
          />
        </SearchSection>
        <BtnWrp top="16.5rem" activeScreen={activeScreen}>
          <Btn
            className={activeScreen === 'dashboard' ? 'inactive' : ''}
            onClick={() => onBtnClick('article')}
            rotat={true}
          >
            <ArrowLeft
              color={activeScreen === '' ? '#161A34' : '#FFFFFF'}
              width="1.375rem"
              height="1.875rem"
            />
          </Btn>
          <Btn
            className={activeScreen === 'article' ? 'inactive' : ''}
            onClick={() => onBtnClick('dashboard')}
          >
            <ArrowLeft
              color={activeScreen === '' ? '#161A34' : '#FFFFFF'}
              width="1.375rem"
              height="1.875rem"
            />
          </Btn>
        </BtnWrp>
        <SearchResultWrp activeScreen={activeScreen}>
          <DashboardSection
            activeScreen={activeScreen}
            className={activeScreen === 'dashboard' ? 'active' : ''}
          >
            <DashboardHeaderV2
              activeScreen={activeScreen}
              handleSaveDashboard={handleSaveDashboard}
              setConfimationAlertPopUp={setConfimationAlertPopUp}
              changeSaved={changeSaved}
              setSelectedPath={setSelectedPath}
              selectedSavedSearch={selectedSavedSearch?.id}
              setShowSavedSearch={setShowSavedSearch}
              setOverViewClick={setOverViewClick}
              setPathName={setPathName}
              prevSavedSearch={prevSavedSearch}
              setSelectedDashboardItems={setSelectedDashboardItems}
              // prevChartNames={prevChartNames}
              // chartDetails={chartDetails}
              filters={{
                ...filters,
                query,
                guidedSection,
                search_name: location?.state?.savedSearchData?.title,
                recent_searchId: recentSearchArticlesId,
              }}
              recentSearchArticlesId={recentSearchArticlesId}
              isProcessing={eventCycle}
            ></DashboardHeaderV2>
            {dashboardDataLoading ? (
              <LoaderWrp>
                <CircularLoading
                  size="0.25rem"
                  width="1.875rem"
                  height="1.875rem"
                />
              </LoaderWrp>
            ) : (
              <DashboardInnerContainer
                isLoading={eventCycle}
                dashboardDetails={dashboardState}
                tileDetails={
                  eventCycle
                    ? socketDataTiles
                    : tileDetails?.map((x) => {
                        if (x?.title === 'Total Articles') {
                          return (
                            socketDataTiles?.find(
                              (x) => x?.title === 'Total Articles'
                            ) ?? { ...x }
                          );
                        } else {
                          return {
                            ...x,
                          };
                        }
                      })
                }
                customWidgetDetails={customWidgetDetails}
                loader={loader}
                articleType={articleType}
                setArticleType={setArticleType}
                overRideSlot={activeScreen !== 'dashboard'}
                setClickedPosition={handleClick}
                articlePosition={articlePosition}
                handleUpdatedChart={handleUpdatedChart}
                setResetSelection={setResetSelection}
                setSelected={setSelected}
                selected={selected}
                setArticlePosition={setArticlePosition}
                resetSelection={resetSelection}
                selectGraph={selectGraph}
                setSelectedGraph={setSelectedGraph}
                handleShowDownloadPopUp={handleShowDownloadPopUp}
                editOption={true}
                activeScreen={activeScreen}
                handleGraphTitleUpdate={onUpdateChartNames}
                geographicalWidgetDetails={{
                  isLoading: getLoader(
                    isGeoGraphicalDataLoading,
                    isGeoGraphicalDataFetching
                  ),
                  data: getDataWithCount(geographicalChartData),
                  show: true,
                  customClassName: 'geographical-graph-download',
                }}
                sentimeWidgetDetails={{
                  isLoading: getLoader(
                    isSentimentChartLoading,
                    isSentimentChartFetching
                  ),
                  data: getDataWithCount(sentimentChartData),
                  show: true,
                  customClassName: 'sentiment-graph-download',
                }}
                mediaTypeWidgetDetails={{
                  isLoading: getLoader(
                    isMediaChartLoading,
                    isMediaChartFetching
                  ),
                  data: getDataWithCount(mediaTypeChartData),
                  show: true,
                  customClassName: 'media-graph-download',
                }}
                wordCloudWidgetDetails={{
                  isLoading: getLoader(
                    isWordCloudDataLoading,
                    isWordCloudDataFetching
                  ),
                  data: getDataWithCount(wordCloudChartData),
                  show: true,
                  customClassName: 'wordcloud-graph-download',
                }}
                topSourceWidgetDetails={{
                  isLoading: getLoader(
                    isTopSourceDataLoading,
                    isTopSourceDataFetching
                  ),
                  data: getDataWithCount(topSourcesChartData),
                  show: true,
                  customClassName: 'topsource-graph-download',
                }}
                topThemeWidgetDetails={{
                  isLoading: getLoader(
                    isTopThemeDataLoading,
                    isTopThemeDataFetching
                  ),
                  data: getDataWithCount(topThemeChartData),
                  show: true,
                  customClassName: 'toptheme-graph-download',
                }}
                topAuthorWidgetDetails={{
                  isLoading: getLoader(
                    isTopAuthorDataLoading,
                    isTopAuthorDataFetching
                  ),
                  data: getDataWithCount(topAuthorChartData),
                  show: true,
                  customClassName: 'topauthor-graph-download',
                }}
                resultOverTimeWidgetDetails={{
                  isLoading:
                    getLoader(
                      isResultOverTimeLoading,
                      isResultsOverTimeFetching
                    ) || loader,
                  data: resultOverTimeChartData,
                  show: true,
                  customClassName: 'resultovertime-graph-download',
                }}
                outletMediaTypeWidgetDetails={{
                  isLoading: getLoader(
                    isOutletbreakdownLoading,
                    isOutletbreakdownFetching
                  ),
                  data: outletDataWithCount(outletMediaChartData),
                  show: true,
                  customClassName: 'outletmedia-graph-download',
                }}
                resetData={() => {
                  setInsearchPageNum(0);
                  setSearchKey('');
                  setInsearchSortOrder('relevance');
                  setInSearchArticleType({
                    ...articleTypeDefault,
                  });
                }}
              />
            )}
            <PopUpWrapper
              activeScreen={activeScreen}
              articlePosition={articlePosition}
            >
              <GraphIconBox
                downloadClickFunction={() => {
                  setIsDownloadOptionOpen((prev) => !prev);
                }}
                downloading={isDocDownloading}
                handleShowAddToCanvas={() => setAddConfirmationPopUp(true)}
                setIsClickOutside={setIsDownloadOptionOpen}
                // sharePopup={}
              />
              <SortDropdown
                Open={isDownloadOptionsOpen}
                setIsDropdownOpen={(value) => {
                  onDownload(
                    {
                      type: value,
                    },
                    [
                      'resultovertime-graph-download',
                      'sentiment-graph-download',
                      'media-graph-download',
                      'wordcloud-graph-download',
                      'topsource-graph-download',
                      'toptheme-graph-download',
                      'topauthor-graph-download',
                      'outletmedia-graph-download',
                      'geographical-graph-download',
                    ],
                    {
                      title: 'All Graphs',
                    },
                    setIsDocDownloading
                  );
                  // setIsDownloadOptionOpen((prev) => !prev);
                }}
                setSortOrder={setIsDownloadOptionOpen}
                // sortOrder={''}
                isParentComponentFixed={true}
                dropdownOptions={DownloadDropDownOptions}
              />
            </PopUpWrapper>
          </DashboardSection>
          <ArticleMainWrapper
            className="articleMainWrapper"
            activeScreen={activeScreen}
          >
            <ArticleSectionComponent
              liveArticleCount={liveArticleCount}
              activeTheme={tags}
              setActiveTheme={setTags}
              syndicationClickData={inSearchArticleType}
              setClickedPosition={handleClick}
              setArticleType={setArticleType}
              articleType={articleType}
              activeScreen={activeScreen}
              page={page}
              setPage={setPage}
              type={type}
              setType={setType}
              id={searchId}
              setArticlePosition={setArticlePosition}
              articlePosition={articlePosition}
              floatingPagination={tags?.length > 0 ? true : isDataPreprocessed}
              setSelected={setSelected}
              resetSelection={resetSelection}
              setSelectedGraph={setSelectedGraph}
              setResetSelection={setResetSelection}
              showHeading={true}
              loader={loader}
              articlesInfo={
                tags?.length > 0
                  ? Array.isArray(tagArticles)
                    ? tagArticles
                    : []
                  : eventCycle || fetchInBackground
                  ? articleSocketData
                  : articles
              }
              articlePagingInfo={
                !isDataPreprocessed && !fetchInBackground
                  ? {
                      ...socketPaging,
                      pageNumber: articlePaging?.pageNumber ?? 1,
                    }
                  : articlePaging
              }
              isLoading={
                fetchInBackground ||
                storeComments?.length > 0 ||
                storeTags?.length > 0 ||
                bookmarksLocal?.length > 0 ||
                hiddenArticlesLocal?.length > 0
                  ? false
                  : isSearchLoading || isTagsSearchLoading || isLoadingData
              }
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              titleTabs={
                eventCycle || fetchInBackground
                  ? [
                      {
                        label: 'All Media',
                        value: 'totalArticles',
                        count: socketPaging?.total ?? 0,
                      },
                      {
                        label: 'Online',
                        value: 'online',
                        count: socketPaging?.total ?? 0,
                      },
                      {
                        label: 'Print',
                        value: 'print',
                        count: 0,
                      },
                      {
                        label: 'Broadcast',
                        value: 'broadcast',
                        count: 0,
                      },
                    ]
                  : getTabs(searchTotalData || {})?.map((tab) => {
                      if (
                        tab?.value === 'totalArticles' ||
                        tab?.value === 'online'
                      ) {
                        return {
                          ...tab,
                          count: liveArticleCount,
                        };
                      }
                      return { ...tab };
                    })
              }
              onBtnClick={onBtnClick}
              setSydicationArticles={setSydicationArticles}
              setSydicationActive={setSydicationActive}
              articlesRecentSearchId={recentSearchArticlesId}
              setTriggerFetchUseEffect={setTriggerFetchUseEffect}
              storeArticleCommentsTags={storeArticleCommentsTags}
              storeComments={storeComments}
              setStoreComments={setStoreComments}
              storeTags={storeTags}
              setStoreTags={setStoreTags}
              getPayloadForSearch={getPayloadForSearch}
              query={query}
              filters={filters}
              isCustomPagiNationFlag={isCustomPagiNationFlag}
              setIsCustomPagiNationFlag={setIsCustomPagiNationFlag}
              setTags={setTags}
              setSyndicationClick={setInSearchArticleType}
              name="RHS"
              checked={checked}
              setChecked={setChecked}
              setDownLoadArticleFlag={setDownLoadArticleFlag}
              setDownloadSelected={setDownloadSelected}
              bookmarksLocal={bookmarksLocal}
              hiddenArticlesLocal={hiddenArticlesLocal}
            />
          </ArticleMainWrapper>
          {/* Floating Article Component */}

          {/* {activeScreen === 'dashboard' && ( */}
          <ArticleSectionComponentWrp
            articlePosition={articlePosition}
            activeScreen={activeScreen}
            isArticleScreenExplanded={activeScreen === 'article'}
          >
            <IconWrp
              articlePosition={articlePosition}
              onClick={handleResetGraph}
            >
              <XCirlcle width={'1.5rem'} height="1.5rem" />
            </IconWrp>
            <ArticleSectionComponent
              name="INSEARCH"
              syndicationClickData={inSearchArticleType}
              resetAllChecked={resetAllChecked}
              toggleResetAllChecked={() => setResetAllChecked(false)}
              setClickedPosition={handleClick}
              setArticleType={setArticleType}
              articleType={articleType}
              activeScreen={''}
              page={inSearchPageNum}
              setPage={setInsearchPageNum}
              setSelected={setSelected}
              type={type}
              setType={setType}
              id={searchId}
              setSelectedGraph={setSelectedGraph}
              setArticlePosition={setArticlePosition}
              articlePosition={articlePosition}
              setResetSelection={setResetSelection}
              showFullTitle={
                searchKey ||
                inSearchArticleType?.graphSelection ||
                articleType?.graphSelection
              }
              floatingPagination={floatingPagination}
              articlesRecentSearchId={recentSearchArticlesId}
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
              sydicationActive={sydicationActive}
              sydicationArticles={sydicationArticles}
              setTriggerFetchUseEffect={setTriggerInSearchUseEffect}
              storeArticleCommentsTags={storeArticleCommentsTags}
              storeComments={storeComments}
              setStoreComments={setStoreComments}
              storeTags={storeTags}
              setStoreTags={setStoreTags}
              getPayloadForSearch={getPayloadForSearch}
              query={query}
              filters={filters}
              setIsCustomPagiNationFlag={setIsCustomPagiNationFlag}
              setSyndicationClick={setInSearchArticleType}
              checked={checked}
              setChecked={setChecked}
              setDownLoadArticleFlag={setDownLoadArticleFlag}
              setDownloadSelected={setDownloadSelected}
              isActiveScreenSelected={activeScreen === 'article'}
              bookmarksLocal={bookmarksLocal}
              hiddenArticlesLocal={hiddenArticlesLocal}
            />
          </ArticleSectionComponentWrp>
          {/* )} */}
        </SearchResultWrp>
      </SearchMainWrp>
      <AppFooter />
      <DashboardPopup
        popContent={
          <DashSearchDrwr
            toggler={setShowSavedSearch}
            onHandleData={onSubmitData}
            filters={filters}
            guidedSection={guidedSection}
            getUpdatedFilterData={getUpdatedFilterData}
            query={query}
            recentSearchArticlesId={recentSearchArticlesId}
            setOverViewClick={setOverViewClick}
            overviewClick={overviewClick}
            pathName={pathName}
            selectedPath={selectedPath}
            handleSaveSearchData={handleSaveSearchData}
            selectedSavedSearch={selectedSavedSearch}
            selectedDashboardItems={selectedDashboardItems}
            eventCycle={eventCycle}
          />
        }
        padding="2rem"
        open={showSavedSearch}
        toggler={setShowSavedSearch}
        borderRadius="0.625rem"
        width={'45vw'}
      />
      <AddtoCanvas
        open={showNewCandrwr}
        toggler={setShowNewCandrwr}
        CanvasList={CanvasList}
      />
      <DashboardPopup
        open={addCanvasConfirmationPopUp}
        toggler={setAddConfirmationPopUp}
        popContent={
          <CustomConfirmationPopUp
            Heading={'Add to Canvas'}
            SecondHeading={'Are you sure you want to add to canvas ?'}
            toggler={setAddConfirmationPopUp}
            handleDelete={handleAddToCanvas}
            actionLabel="Confirm"
          />
        }
        padding="0"
        borderRadius="0.625rem"
        width="35rem"
      />
      <DashboardPopup
        open={confimationAlertPopUp}
        toggler={setConfimationAlertPopUp}
        setSelectedPath={setSelectedPath}
        popContent={
          <AlertPopUp
            Heading={'Save Changes?'}
            toggler={setConfimationAlertPopUp}
            setSelectedPath={setSelectedPath}
            description={
              'You have modified your search query. Would you like to save the changes?'
            }
            handleSave={() => {
              if (
                advancedDashboards.some(
                  (x) => x.value === selectedPath.split('/')[3]
                )
              ) {
                if (
                  filters.sentiment &&
                  filters.sentiment?.length === 1 &&
                  filters.sentiment[0].value === 'NEU'
                ) {
                  toast.error(
                    'The saved search is based on neutral sentiment. Please unselect the sentiment filter in the Saved Search query.'
                  );
                  return;
                }
              }
              handleAlertSaved();
              if (selectedPath && selectedPath?.includes('dashboard')) {
                if (searchId !== 'custom-search') {
                  handleSaveSearchData();
                }
                // if (confimationAlertPopUp) {
                //   setShowSavedSearch(true);
                // }
                setConfimationAlertPopUp(false);
                setChangeSaved(false);
              } else {
                // navigate(selectedPath, {
                //   state: {
                //     filters: {
                //       ...filters,
                //       query,
                //       guidedSection,
                //     },
                //     search_name: location?.state?.savedSearchData?.title,
                //     recent_searchId: recentSearchId,
                //   },
                // });
                if (searchId !== 'custom-search') {
                  handleSaveSearchData();
                }
                // if (confimationAlertPopUp) {
                //   setShowSavedSearch(true);
                // }
                setConfimationAlertPopUp(false);
                setChangeSaved(false);
              }
            }}
            handleDontSave={() => {
              if (
                advancedDashboards.some(
                  (x) => x.value === selectedPath.split('/')[3]
                )
              ) {
                if (
                  filters.sentiment &&
                  filters.sentiment?.length === 1 &&
                  filters.sentiment[0].value === 'NEU'
                ) {
                  toast.error(
                    'The saved search is based on neutral sentiment. Please unselect the sentiment filter in the Saved Search query.'
                  );
                  return;
                }
              }
              // setConfimationAlertPopUp(false);
              // setChangeSaved(true);
              if (selectedPath && selectedPath?.includes('dashboard')) {
                navigate(selectedPath, {
                  state: {
                    filters: { ...filters, query },
                    guidedSection,
                    search_name: location?.state?.savedSearchData?.title,
                    recent_searchId: recentSearchArticlesId,
                    selectedItems:
                      selectedPath.split('/')[3] === 'custom' &&
                      JSON.stringify(selectedDashboardItems),
                    prevPath: true,
                  },
                });
                setConfimationAlertPopUp(false);
                setChangeSaved(false);
              } else {
                navigate(selectedPath, {
                  state: {
                    filters: { ...filters, query },
                    guidedSection,
                    search_name: location?.state?.savedSearchData?.title,
                    recent_searchId: recentSearchArticlesId,
                    prevPath: true,
                  },
                });
                setConfimationAlertPopUp(false);
                setChangeSaved(false);
              }
            }}
          />
        }
        padding="0"
        borderRadius="0.625rem"
        width="28rem"
      />
      <DashboardPopup
        open={confirmationPopUp}
        toggler={setConfirmationPopUp}
        popContent={
          <CustomConfirmationPopUp
            Heading={'Delete Saved Searches'}
            SecondHeading={
              isDashboardsAssociated
                ? 'A saved search or multiple saved searches is associated with Dashboards. Are you sure you want to delete?'
                : 'Are you sure you want to delete?'
            }
            toggler={(bool) => {
              setConfirmationPopUp(bool);
              setIsDashboardsAssociated(false);
            }}
            handleDelete={handleSavedDelete}
          />
        }
        padding="0"
        borderRadius="0.75rem"
        width="35rem"
      />
      <DashboardPopup
        popContent={
          <SaveSourcePopup
            heading={
              searchId === 'custom-search' ? 'Save Search' : 'Rename Search'
            }
            toggler={(value) => {
              setSavePopup(value);
              setSeleteditem('');
            }}
            primaryHeading="Search Name"
            buttonText={searchId === 'custom-search' ? 'Save Search' : 'Done'}
            selectedItem={{
              name: selectedSavedSearch?.title,
              description: selectedSavedSearch?.description,
            }}
            handleSaveDashboard={handleSaveSearchForData}
          />
        }
        open={savePopup}
        toggler={setSavePopup}
        padding="0"
        borderRadius="0.625rem"
        width={'43.75rem'}
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
            totalArticles={articlePaging?.total || inSearchPaging?.total}
            downloadType={downloadSelected}
            getPayloadForSearch={getPayloadForSearch}
            query={query}
            articlesInfo={
              tags?.length > 0 ? tagArticles : articles || inSearchArticles
            }
            sortOrder={sortOrder}
          />
        }
        padding="0"
        Cross={true}
        borderRadius="0.75rem"
        width={'25rem'}
      />
    </SearchPageWrp>
  );
};

export default SearchResult;
