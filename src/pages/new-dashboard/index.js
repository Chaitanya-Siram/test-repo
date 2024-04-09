import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Btnwrp,
  ButtonBoxwpr,
  ButtonText,
  ButtonWrapper,
  CrossButtonWrp,
  // DashboardType,
  DashboardTypeDiv,
  DropDown,
  DropDownCont,
  // DashboardTypeDivText,
  DropDownMasterWrpr,
  DropDownWrp,
  DropdownForButton,
  FiltersWrp,
  IconWrapper,
  PageMainWrp,
  PageWrp,
  QueryFilterCon,
  SaveSearchBtn,
  SearchContainer,
  SearchSection,
  SearchText,
  SearchTextWrp,
  SearchWrp,
  SectionBody,
  SectionHeader,
  SmallTitle,
} from './index.sc';

import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowLeft from '../../assets/icons/ArrowLeft';
import DropDownButton from '../../assets/icons/DropDownButton';
import AppBG from '../../components/app-bg';
import AppFooter from '../../components/app-footer';
import AppHeader from '../../components/app-header';
import DashboardPopup from '../../components/dasboard-popup';
import FilterComponent from '../../components/search-component/filter';
import SearchPopup from '../../components/search-popup/SearchPopContent';
import { Frames } from '../../components/search-popup/contents';
import Brand from '../../components/search-result/dashboard-section/dashboard-header/brand';
import { theme } from '../../constants/theme';
// import Industry from '../../components/search-result/dashboard-section/dashboard-header/industry';
import Add2 from '../../assets/icons/Add2';
import Arrow from '../../assets/icons/Arrow';
import Edit2 from '../../assets/icons/Edit2';
import SavedSearches from '../../assets/icons/SavedSearches';
import AdvancedIcon from '../../assets/icons/create-dashboard/dropdown/advanced.svg';
import BrandIcon from '../../assets/icons/create-dashboard/dropdown/brand.svg';
import CustomIcon from '../../assets/icons/create-dashboard/dropdown/custom.svg';
import IndustryIcon from '../../assets/icons/create-dashboard/dropdown/industry.svg';
import PeopleIcon from '../../assets/icons/create-dashboard/dropdown/people.svg';
import { ChipText } from '../../components/DashbordList/index.sc';
import ReusableDropDown from '../../components/Drop-down-reusable';
import AlertPopUp from '../../components/alert-popup';
import CustomDashboardCanvas from '../../components/custom-dashboard-canvas';
import CustomPopupWrapper from '../../components/custom-popup-wrapper';
import CustomConfirmationPopUp from '../../components/customize-confirmation-popup';
import NewDashboard from '../../components/new-dashboard';
import SaveSourcePopup from '../../components/save-source';
import SavedDashboardPopup from '../../components/saved-dashboards-popup';
import Advanced from '../../components/search-result/dashboard-section/dashboard-header/advanced';
import Custom from '../../components/search-result/dashboard-section/dashboard-header/custom';
import People from '../../components/search-result/dashboard-section/dashboard-header/people';
import { Iconwrp } from '../../components/search-result/index.sc';
import { dashboardChips } from '../../constants/dashboard';
import { getPayloadForSearch } from '../../constants/dashboards/dashboardUtils';
import { getTokenData } from '../../constants/validateToken';
import { dashobardData } from '../../hooks/data/dashboardData';
import { peopleData as peopleChartData } from '../../hooks/data/peopleData';
import { industryData } from '../../hooks/data/IndustryData';
import {
  useArticleSentimentComp,
  useCoverageOvertimeBrand,
  useCoverageOvertimeCompetition,
  useDashboardAnalisysData,
  useDashboardSentimentChartData,
  useDashboardSentimentOverTimeChartData,
  useJournalistCoverageComp,
  useMediaBreakDownMediaType,
  useMediaTypeBrand,
  useReachOverTimeBrand,
  useReachOverTimeComp,
  useSOVData,
  useSourcesCompData,
} from '../../hooks/useDashboardCharts';
import {
  useDashboardPeopleAnalysisData,
  usePeopleDashboardSentimentChartData,
  usePeopleDashboardJournalistSentimetChart,
  usePeopleCoverageChart,
  usePeoplePopularTopicsChart,
  usePeopleMediaTypeChart,
} from '../../hooks/usePeopleCharts';
import {
  useDashboardIndustryAnalysisData,
  useIndustryDashboardSentimentChartData,
  useIndustryCoverageOvertime,
  useIndustryCoverageBySource,
  useIndustryCompanies,
  useIndustryCoverageByJournalists,
  useIndustryPublications,
} from '../../hooks/useIndustryCharts';
import {
  useDashboardData,
  // useSearchData,
  useSearchFilterData,
} from '../../hooks/useSearch';
import {
  useCreateSaveDashboardData,
  useEditSaveDashboardData,
} from '../../hooks/useSaveDashboard';
import {
  convertObjToString,
  getDateParams,
  getSearchParams,
} from '../../utils';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { getDateRange } from '../../constants/utils';
// import { standardDashboards } from '../../constants/widgets';
import {
  allDashboards,
  convertToSelectedGraphsFormat,
  countTruthyValues,
  dashboardWidgets,
} from './utils';
import {
  useAuthorCompact,
  useCampaignAnalysisData,
  useCongruence,
  usePRImpact,
  useSentimentByThemes,
} from '../../hooks/useAdvancedCharts';
import { useGetSavedSearchQueryData } from '../../hooks/useSaveSearch';

const CreateDashboard = () => {
  const location = useLocation();
  const authInfo = getTokenData();
  const [showSaved, setShowSaved] = useState(false);
  // const [filter, setFilter] = useState();
  const navigate = useNavigate();
  const { searchId, dashboardType, dashboardId } = useParams();
  const [confimationAlertPopUp, setConfimationAlertPopUp] = useState(false);
  const [changeSaved, setChangeSaved] = useState(true);
  const [selectedPath, setSelectedPath] = useState('');
  const [updatedGraphs, setUpdatedGraphs] = useState([]);
  const [newDashboard, setNewDashboard] = useState(false);
  const [savePopup, setSavePopup] = useState(false);
  const [prevDashboardType, setPrevDashboardType] = useState(dashboardType);
  const [handlerCalled, setHandlerCalled] = useState(false);

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  // const [selectedTab, setSeletedTab] = useState(1);
  // const [selectedItem, setSeleteditem] = useState({});

  // const {
  //   // isLoading: searchDataLoading,
  //   // error: searchError,
  //   data: searchData,
  //   // isFetching,
  // } = useSearchData(searchId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchedDetails = location?.state?.filters || {};
  const savedName = location?.state?.savedDashboardData?.name || '';
  const savedDescription =
    location?.state?.savedDashboardData?.description || '';
  const savedSelectedChart =
    location?.state?.savedDashboardData?.chart_field?.selectedChart;
  // const savedChartName = location?.state?.savedDashboardData?.chart_field?.selectedChart || []
  const searchedQuery = searchedDetails?.query;
  const prevSearchPath = location?.state?.prevPath;

  const searchName = location?.state?.search_name;
  const guidedSection = searchedDetails?.guidedSection;
  const [filters, setFilters] = useState(searchedDetails || {});
  const [selectedGraphs, setSelectedGraphs] = useState({});

  const initialStoringKeywords = () => {
    if (dashboardId) {
      if (
        (searchedDetails?.brand_keywords?.length ||
          searchedDetails?.competition_keywords?.length) &&
        dashboardType === 'brand'
      ) {
        return {
          brandKeywords: searchedDetails?.brand_keywords,
          competitionKeywords: searchedDetails?.competition_keywords,
        };
      } else if (
        searchedDetails?.person_name?.length &&
        dashboardType === 'people'
      ) {
        return searchedDetails?.person_name;
        //
      } else if (
        dashboardType === 'custom' &&
        (searchedDetails?.brand_keywords?.length ||
          searchedDetails?.competition_keywords?.length ||
          searchedDetails?.person_name?.length)
      ) {
        return {
          brandData: searchedDetails?.brand_keywords,
          competitionData: searchedDetails?.competition_keywords,
          peopleData: searchedDetails?.person_name,
        };
      } else {
        return searchedDetails?.advanced_keywords;
      }
    }
  };

  const [storingKeywords, setStoringKeywords] = useState(
    initialStoringKeywords() || []
  );
  useEffect(() => {
    if (location?.state?.filters) {
      const searchedDetails = location?.state?.filters || {};
      setFilters(searchedDetails);
    }
  }, [location?.state?.filters]);

  // useEffect(() => {
  //   if (dashboardId) {
  //     if (
  //       (searchedDetails?.brand_keywords?.length ||
  //         searchedDetails?.competition_keywords?.length) &&
  //       dashboardType === 'brand'
  //     ) {
  //       setStoringKeywords({
  //         brandKeywords: searchedDetails?.brand_keywords,
  //         competitionKeywords: searchedDetails?.competition_keywords,
  //       });
  //     } else if (
  //       searchedDetails?.person_name?.length &&
  //       dashboardType === 'people'
  //     ) {
  //       setStoringKeywords(searchedDetails?.person_name);
  //       //
  //     } else if (
  //       dashboardType === 'custom' &&
  //       (searchedDetails?.brand_keywords?.length ||
  //         searchedDetails?.competition_keywords?.length ||
  //         searchedDetails?.person_name?.length)
  //     ) {
  //       setStoringKeywords({
  //         brandData: searchedDetails?.brand_keywords,
  //         competitionData: searchedDetails?.competition_keywords,
  //         peopleData: searchedDetails?.person_name,
  //       });
  //     } else {
  //       setStoringKeywords(searchedDetails?.advanced_keywords);
  //     }
  //   }
  // }, [dashboardId, dashboardType, searchedDetails]);

  const { mutate: CreateSaveDashboard } = useCreateSaveDashboardData(
    authInfo?.user_id
  );
  const { mutateAsync: createEditDashboardData } = useEditSaveDashboardData(
    authInfo?.user_id
  );

  const { data: savedSearches } = useGetSavedSearchQueryData(
    authInfo?.user_id,
    {
      orderBy: 'name',
    }
  );

  const truncateQuery = (query) => {
    if (!query) {
      return query;
    }
    let res = '';
    if (query !== null && typeof query === 'object') {
      res = convertObjToString(query);
    } else {
      res = query;
    }
    return res;
  };

  const getKeywordsFromDashboard = () => {
    if (dashboardType === 'brand' || dashboardType === 'primpact') {
      return {
        brandKeywords: liveBrandData,
        competitionKeywords: liveCompetitionData,
      };
    } else if (dashboardType === 'people') {
      return livePeopleData;
    } else if (dashboardType === 'custom') {
      return {
        brandData,
        competitionData,
        peopleData,
      };
    } else {
      return liveAdvancedData;
    }
  };

  const handleGoBack = () => {
    // navigate('/dashboards');
    const isDataChanged =
      JSON.stringify(storingKeywords) !==
      JSON.stringify(getKeywordsFromDashboard());
    if (dashboardId) {
      if (
        ((handlerCalled && isDataChanged) || !changeSaved) &&
        (dashboardType !== 'industry' ||
          dashboardType !== 'authorimpact' ||
          dashboardType !== 'sentiments')
      ) {
        setConfimationAlertPopUp(true);
        dashboardId ? setSelectedPath('/dashboards') : setSelectedPath(-1);
      } else if (
        !changeSaved &&
        (dashboardType === 'industry' ||
          dashboardType === 'authorimpact' ||
          dashboardType === 'sentiments')
      ) {
        setConfimationAlertPopUp(true);
        dashboardId ? setSelectedPath('/dashboards') : setSelectedPath(-1);
      } else {
        navigate('/dashboards');
      }
    } else {
      if (
        // (Object.keys(analyzedData).length &&
        //   prevDashboardType === dashboardType) ||
        handlerCalled ||
        !changeSaved ||
        (campaignDashboardData && dashboardType === 'campaign') ||
        (congruenceData && dashboardType === 'congruence') ||
        (prImpactData && dashboardType === 'primpact')
      ) {
        setConfimationAlertPopUp(true);
        setSelectedPath('/dashboards');
      } else {
        navigate(prevSearchPath ? -1 : '/dashboards');
      }
    }
    // if () {}
  };

  useEffect(() => {
    // For the browser navigation there should be a initial navigation. And that is written below. And the below navigation is only for saved Dashboards.
    (handlerCalled || !changeSaved) &&
      dashboardId &&
      navigate(`/dashboard/${searchId}/${dashboardType}/${dashboardId}`, {
        state: {
          data: null,
          filters: {
            ...filters,
            brand_keywords: brandData,
            competition_keywords: competitionData,
            person_name: peopleData,
            advanced_keywords: advancedData,
          },
          savedDashboardData: location?.state?.savedDashboardData,
          recent_searchId: location?.state?.recent_searchId,
          search_name: searchName,
          name: savedName,
          description: savedDescription,
        },
      });
    const onBackButtonEvent = (e) => {
      e.preventDefault();
      const isDataChanged =
        JSON.stringify(storingKeywords) !==
        JSON.stringify(getKeywordsFromDashboard());
      if (dashboardId) {
        // The below navigation is written because during the click on browser navigation the location states are getting undefined. So to re-iterate that navigation is given.
        navigate(`/dashboard/${searchId}/${dashboardType}/${dashboardId}`, {
          state: {
            data: null,
            filters: {
              ...filters,
              brand_keywords: brandData,
              competition_keywords: competitionData,
              person_name: peopleData,
              advanced_keywords: advancedData,
            },
            savedDashboardData: location?.state?.savedDashboardData,
            recent_searchId: location?.state?.recent_searchId,
            search_name: searchName,
            name: savedName,
            description: savedDescription,
          },
        });
        if (
          ((handlerCalled && isDataChanged) || !changeSaved) &&
          (dashboardType !== 'industry' ||
            dashboardType !== 'authorimpact' ||
            dashboardType !== 'sentiments')
        ) {
          setConfimationAlertPopUp(true);
          dashboardId ? setSelectedPath('/dashboards') : setSelectedPath(-1);
        } else if (
          !changeSaved &&
          (dashboardType === 'industry' ||
            dashboardType === 'authorimpact' ||
            dashboardType === 'sentiments')
        ) {
          setConfimationAlertPopUp(true);
          dashboardId ? setSelectedPath('/dashboards') : setSelectedPath(-1);
        } else {
          navigate('/dashboards');
        }
      } else {
        // currently for create dashboard browser back button is not working.
        if (
          // (Object.keys(analyzedData).length &&
          //   prevDashboardType === dashboardType) ||
          handlerCalled ||
          !changeSaved ||
          (campaignDashboardData && dashboardType === 'campaign') ||
          (congruenceData && dashboardType === 'congruence') ||
          (prImpactData && dashboardType === 'primpact')
        ) {
          setConfimationAlertPopUp(true);
          setSelectedPath('/dashboards');
        } else {
          navigate(prevSearchPath ? -1 : '/dashboards');
        }
      }
      // }
    };

    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
      // window.addEventListener('popstate', (e) => onBackButtonEvent(e));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlerCalled, !changeSaved]);

  const handleShowSavedSearches = (e) => {
    e.stopPropagation();
    setShowSaved((old) => !old);
  };
  const handleFilterChange = (data) => {
    // if we apply the filter then we need to save it , show AlertPopUp
    setChangeSaved(false);
    // const { name, options } = data;
    // setFilter(data);
    setFilters({ ...data });
  };

  const dashboardKeyConfig = {
    // overview: <></>,
    brand: Brand,
    // industry: Industry,
    people: People,
    campaign: Advanced,
    // authorimpact: Advanced,
    // sentiments: Advanced,
    congruence: Advanced,
    primpact: Brand,
    custom: Custom,
  };
  // const analyzeKeywords = useCallback(
  //   (keywordsObj) => {
  //     const storedWidgets = JSON.parse(
  //       sessionStorage.getItem('selectedWidgets')
  //     );
  //     const selectedWidgets = JSON.parse(JSON.stringify(storedWidgets));
  //     for (const key in selectedWidgets) {
  //       const widget = selectedWidgets[key];
  //       for (const subKey in widget) {
  //         if (!widget[subKey]) delete widget[subKey];
  //       }
  //     }
  //     return axiosPostRequest(
  //       '/analyze-keywords',
  //       { searchId, dashboardType },
  //       { keywordsObj, searchData: searchData?.data, selectedWidgets }
  //     );
  //   },
  //   [dashboardType, searchData?.data, searchId]
  // );

  const [analyzedData, setAnalyzedData] = useState({});
  const handleAnalyze = useCallback(
    async (_keywordsObj) => {
      // if (changeSaved) {
      //   setConfimationAlertPopUp(true);
      //   return;
      // }
      // setConfimationAlertPopUp(false);
      try {
        if (dashboardType === 'people') {
          setAnalyzedData(JSON.parse(JSON.stringify(peopleChartData)));
        }
        if (dashboardType === 'brand') {
          setAnalyzedData(JSON.parse(JSON.stringify(dashobardData)));
        }
        if (dashboardType === 'industry') {
          setAnalyzedData(JSON.parse(JSON.stringify(industryData)));
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        sessionStorage.removeItem('selectedWidgets');
      }
    },
    [dashboardType, searchedDetails]
  );

  const dropdownOptions = [
    {
      label: 'Brand & Competition',
      value: 'brand',
      path: `${searchId}/brand`,
      icon: BrandIcon,
      subText: '13 Charts',
    },
    {
      label: 'People',
      value: 'people',
      path: `${searchId}/people`,
      icon: PeopleIcon,
      subText: '6 Charts',
    },
    {
      label: 'Industry',
      value: 'industry',
      path: `${searchId}/industry`,
      icon: IndustryIcon,
      subText: '7 Charts',
    },
    {
      label: 'Advanced',
      value: 'advanced',
      path: `${searchId}/advanced`,
      icon: AdvancedIcon,
      subText: '5 Charts',
      children: [
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
      ],
    },
    {
      label: 'Custom',
      value: 'custom',
      path: `${searchId}/custom`,
      icon: CustomIcon,
      subText: '26 Charts',
    },
  ];
  const [customCanvas, setCustomCanvas] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState('');
  const [showSavedDashboards, setShowSavedDashboards] = useState(false);
  const [brandData, setBrandData] = useState([]);
  const [competitionData, setCompetitionData] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [IndustryData, setIndustryData] = useState([]);
  const [advancedData, setAdvancedData] = useState([]);

  const [liveBrandData, setLiveBrandData] = useState([]);
  const [liveCompetitionData, setLiveCompetitionData] = useState([]);
  const [livePeopleData, setLivePeopleData] = useState([]);
  const [liveAdvancedData, setLiveAdvancedData] = useState([]);

  const shouldShowGraph = (graphType, chartId) => {
    const result = Object.keys(selectedGraphs || {}).flatMap((property) => {
      return Object.keys(selectedGraphs[property]).filter((key) => {
        return selectedGraphs[property][key] === true;
      });
    });
    const count = countTruthyValues(selectedGraphs);

    if (dashboardType === 'custom') {
      if (
        (count.people > 0 && peopleData?.length === 0) ||
        (count.brandComp > 0 &&
          (competitionData.length === 0 || brandData?.length === 0)) ||
        (count.brandNotcomp > 0 && brandData.length === 0)
      ) {
        return false;
      } else {
        if (result.includes(chartId)) {
          return true;
        }
        return false;
      }
    }
    if (graphType === 'brand') {
      return (
        brandData?.length > 0 &&
        !(competitionData?.length > 0) &&
        result?.includes(chartId)
      );
    }

    if (graphType === 'competition') {
      return (
        brandData?.length > 0 &&
        competitionData?.length > 0 &&
        result?.includes(chartId)
      );
    }

    if (graphType === 'people') {
      return peopleData?.length > 0 && result?.includes(chartId);
    }
    // need to update logci based on length of the keywords
    if (graphType === 'industry') {
      return IndustryData?.length > 0 && result?.includes(chartId);
    }

    if (graphType === 'campaign' || graphType === 'congruence') {
      return advancedData?.length > 0;
    }

    if (graphType === 'sentimentByTheme' || graphType === 'authorimpact') {
      return searchFilterOptions?.length > 0;
    }

    if (graphType === 'primpact') {
      return (
        liveBrandData?.length > 0 &&
        brandData?.length > 0 &&
        brandData[0] === liveBrandData[0]
      );
    }

    return true;
  };

  const shouldShowPlaceholderGraphs = () => {
    const count = countTruthyValues(selectedGraphs);
    if (dashboardType === 'custom') {
      if (
        (count.people > 0 && livePeopleData?.length === 0) ||
        (count.brandComp > 0 &&
          (liveCompetitionData.length === 0 || liveBrandData?.length === 0)) ||
        (count.brandNotcomp > 0 && liveBrandData.length === 0)
      ) {
        return true;
      } else if (
        (count.people > 0 && peopleData?.length === 0) ||
        (count.brandComp > 0 &&
          (competitionData.length === 0 || brandData?.length === 0)) ||
        (count.brandNotcomp > 0 && brandData.length === 0)
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (dashboardType === 'brand') {
      return !(liveBrandData?.length > 0) || !(brandData?.length > 0);
    }

    if (dashboardType === 'people') {
      return !(livePeopleData?.length > 0) || !(peopleData?.length > 0);
    }
    if (dashboardType === 'industry') {
      return false;
    }
    if (dashboardType === 'campaign') {
      return (
        !advancedData?.every((x) => x.name?.length > 0) ||
        !liveAdvancedData?.every((y) => y.name?.length > 0) ||
        !(advancedData?.length === liveAdvancedData?.length)
      );
    }
    if (
      dashboardType === 'sentimentByTheme' ||
      dashboardType === 'authorimpact'
    ) {
      return !(searchFilterOptions?.length > 0);
    }
    if (dashboardType === 'primpact') {
      return !(brandData?.length > 0) && brandData[0] !== liveBrandData[0];
    }
    return true;
  };

  const createDashboard = (path) => {
    const isDataChanged =
      JSON.stringify(storingKeywords) !==
      JSON.stringify(getKeywordsFromDashboard());
    if (dashboardId) {
      if (
        ((isDataChanged && handlerCalled) || !changeSaved) &&
        (dashboardType !== 'industry' ||
          dashboardType !== 'authorimpact' ||
          dashboardType !== 'sentiments')
      ) {
        setConfimationAlertPopUp(true);
        setSelectedPath(`/dashboard/${path}`);
      } else if (
        !changeSaved &&
        (dashboardType === 'industry' ||
          dashboardType === 'authorimpact' ||
          dashboardType === 'sentiments')
      ) {
        setConfimationAlertPopUp(true);
        setSelectedPath(`/dashboard/${path}`);
      } else {
        setSelectedDashboard(path.split('/')[1]);
        if (path.split('/')[1] === 'custom') {
          setCustomCanvas(true);
        } else {
          setSelectedPath(`/dashboard/${path}`);
          navigate(`/dashboard/${path}`, {
            state: {
              filters,
              recent_searchId: location?.state?.recent_searchId,
              query: searchedQuery,
              search_name: searchName,
            },
          });
        }
      }
    } else {
      if (
        // (Object.keys(analyzedData).length &&
        //   prevDashboardType === dashboardType) ||
        handlerCalled ||
        !changeSaved ||
        (campaignDashboardData && dashboardType === 'campaign') ||
        (congruenceData && dashboardType === 'congruence') ||
        (prImpactData && dashboardType === 'primpact')
      ) {
        setConfimationAlertPopUp(true);
        setSelectedPath(`/dashboard/${path}`);
      } else if (
        !changeSaved ||
        (dashboardType === 'industry' && IndustryData?.length)
      ) {
        setConfimationAlertPopUp(true);
        setSelectedPath(`/dashboard/${path}`);
      } else if (
        !changeSaved ||
        (authorImpactDashboardData?.data && dashboardType === 'authorimpact') ||
        (sentimentByThemeData?.data && dashboardType === 'sentiments')
      ) {
        setConfimationAlertPopUp(true);
        setSelectedPath(`/dashboard/${path}`);
      } else {
        setSelectedPath(`/dashboard/${path}`);
        path?.split('/')[1] !== 'custom' &&
          navigate(`/dashboard/${path}`, {
            state: {
              filters,
              recent_searchId: location?.state?.recent_searchId,
              query: searchedQuery,
              search_name: searchName,
            },
          });
      }
    }
    setSelectedDashboard(path.split('/')[1]);
    // the below condition is for when user tried to create a dashboard which is not required(industry, authorimpact and sentiment by themes)
    if (path?.split('/')[1] === 'custom') {
      setConfimationAlertPopUp(false);
      setCustomCanvas(true);
    }
    // else {
    //   navigate(`/dashboard/${path}`, {
    //     state: {
    //       filters,
    //       recent_searchId: location?.state?.recent_searchId,
    //       query: searchedQuery,
    //       search_name: searchName,
    //     },
    //   });
    // }
  };

  useEffect(() => {
    // coming when opening saved selected dashboard
    if (savedSelectedChart) {
      setSelectedGraphs({
        ...convertToSelectedGraphsFormat(savedSelectedChart),
      });
    }
  }, [savedSelectedChart]);

  useEffect(() => {
    // coming when selecting graphs when we select the custom dashboard
    if (location?.state?.selectedItems) {
      setSelectedGraphs(JSON.parse(location?.state?.selectedItems));
      if (dashboardType === 'custom') {
        sessionStorage.setItem(
          'selectedWidgets',
          location?.state?.selectedItems
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.state?.selectedItems, dashboardType]);

  useEffect(() => {
    // when the non saved and not custom dashboard are coming
    if (!dashboardId && dashboardType !== 'custom') {
      const selectedGraphsDashboard = dashboardWidgets[dashboardType];
      if (selectedGraphsDashboard) {
        setSelectedGraphs(
          convertToSelectedGraphsFormat(selectedGraphsDashboard)
        );
      }
    }
  }, [dashboardId, dashboardType]);

  const childNavigation = (path) => {
    const isDataChanged =
      JSON.stringify(storingKeywords) !==
      JSON.stringify(getKeywordsFromDashboard());

    if (dashboardId) {
      if (
        ((isDataChanged && handlerCalled) || !changeSaved) &&
        (dashboardType !== 'industry' ||
          dashboardType !== 'authorimpact' ||
          dashboardType !== 'sentiments')
      ) {
        setConfimationAlertPopUp(true);
        setSelectedPath(`/dashboard/${path}`);
      } else if (
        !changeSaved &&
        (dashboardType === 'industry' ||
          dashboardType === 'authorimpact' ||
          dashboardType === 'sentiments')
      ) {
        setConfimationAlertPopUp(true);
        setSelectedPath(`/dashboard/${path}`);
      } else {
        setSelectedPath(`/dashboard/${path}`);

        navigate(`/dashboard/${path}`, {
          state: {
            filters,
            recent_searchId: location?.state?.recent_searchId,
            query: searchedQuery,
            search_name: searchName,
          },
        });
      }
    } else {
      if (
        // (Object.keys(analyzedData).length &&
        //   prevDashboardType === dashboardType) ||
        handlerCalled ||
        !changeSaved ||
        (campaignDashboardData && dashboardType === 'campaign') ||
        (congruenceData && dashboardType === 'congruence') ||
        (prImpactData && dashboardType === 'primpact')
      ) {
        setConfimationAlertPopUp(true);
        setSelectedPath(`/dashboard/${path}`);
      } else if (
        !changeSaved ||
        (authorImpactDashboardData?.data && dashboardType === 'authorimpact') ||
        (sentimentByThemeData?.data && dashboardType === 'sentiments')
      ) {
        setConfimationAlertPopUp(true);
        setSelectedPath(`/dashboard/${path}`);
      } else if (
        !changeSaved ||
        (dashboardType === 'industry' && IndustryData?.length)
      ) {
        setConfimationAlertPopUp(true);
        setSelectedPath(`/dashboard/${path}`);
      } else {
        setSelectedPath(`/dashboard/${path}`);
        navigate(`/dashboard/${path}`, {
          state: {
            filters,
            recent_searchId: location?.state?.recent_searchId,
            query: searchedQuery,
            search_name: searchName,
          },
        });
      }
    }
    // navigate(`/dashboard/${path}`, {
    //   state: {
    //     filters,
    //     query: searchedQuery,
    //     search_name: searchName,
    //     recent_searchId: location?.state?.recent_searchId,
    //   },
    // });
  };
  const [selectedItems, setSelectedItems] = useState({});
  const {
    // isLoading,
    // error,
    data,
  } = useSearchFilterData(authInfo?.user_id);

  const searchFilterOptions = data?.data || [];

  const {
    isLoading: isVolumeAnalysisLoading,
    isFetching: isVolumeAnalysisFetching,
    data: volumeAnalysisData,
  } = useDashboardAnalisysData(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    brandData,
    shouldShowGraph('brand', 'volume_analysis')
  );

  const {
    isLoading: isCampaignAnalysisDataLoading,
    isFetching: isCampaignAnalysisDataFetching,
    data: campaignDashboardData,
  } = useCampaignAnalysisData(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false
    ),
    advancedData,
    shouldShowGraph('campaign', 'campaign_analysis') &&
      dashboardType === 'campaign'
  );

  const {
    isLoading: isAuthorImpactLoading,
    isFetching: isAuthorImpactFetching,
    data: authorImpactDashboardData,
  } = useAuthorCompact(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false
    ),
    shouldShowGraph('authorimpact', 'author') &&
      dashboardType === 'authorimpact'
  );

  const {
    data: sentimentByThemeData,
    isLoading: isSentimentByThemeLoading,
    isFetching: isSentimentByThemeFetching,
  } = useSentimentByThemes(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false
    ),
    shouldShowGraph('sentimentByTheme', 'sentimentByTheme') &&
      dashboardType === 'sentiments'
  );

  const {
    data: congruenceData,
    isLoading: isCongruenceDataLoading,
    isFetching: isCongrunceDataFetching,
  } = useCongruence(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false
    ),
    advancedData,
    shouldShowGraph('congruence', 'congruence')
  );

  const {
    isLoading: isSentimentDataLoading,
    isFetching: isSentimentDataFetching,
    data: sentimentData,
  } = useDashboardSentimentChartData(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    brandData,
    shouldShowGraph('brand', 'sentiment_analysis')
  );

  const {
    isLoading: isSentimentOvertimeLoading,
    isFetching: isSentimeentOvertimeFetching,
    data: sentimenetOvertimeData,
  } = useDashboardSentimentOverTimeChartData(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    brandData,
    shouldShowGraph('brand', 'sentiment_over_time')
  );

  const {
    isLoading: isCoverageOvertimeBrandDataLoading,
    isFetching: isCoverageOvertimeBrandDataFetching,
    data: coverageOvertimeBrandData,
  } = useCoverageOvertimeBrand(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    brandData,
    shouldShowGraph('brand', 'coverage_over_time')
  );

  const {
    isLoading: isReachOvertimeBrandDataLoading,
    isFetching: isReachOvertimeBrandDataFetching,
    data: reachOvertimeBrandData,
  } = useReachOverTimeBrand(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    brandData,
    shouldShowGraph('brand', 'reach_over_time')
  );

  const {
    isLoading: isSOVDataLoading,
    isFetching: isSOVDataFetching,
    data: SOVData,
  } = useSOVData(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    brandData,
    competitionData,
    shouldShowGraph('competition', 'sov')
  );

  const {
    isLoading: isCoverageOvertimeBrandCompetitionDLoading,
    isFetching: isCoverageOvertimeBrandCompetitionDFetching,
    data: coverageOvertimeCompData,
  } = useCoverageOvertimeCompetition(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    brandData,
    competitionData,
    shouldShowGraph('competition', 'competitive_coverage_over_time')
  );

  const {
    isLoading: isMediaLoading,
    isFetching: isMediaFetching,
    data: mediaData,
  } = useMediaTypeBrand(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    brandData,
    shouldShowGraph('brand', 'media_type')
  );

  const {
    isLoading: isPeopleVolumeAnalysisLoading,
    isFetching: isPeopleVolumeAnalysisFetching,
    data: peopleVolumeAnalysisData,
  } = useDashboardPeopleAnalysisData(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    peopleData,
    shouldShowGraph('people', 'people_volume_analysis')
  );

  const {
    data: prImpactData,
    isLoading: prImpactLoading,
    isFetching: prImpactFetching,
  } = usePRImpact(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    brandData,
    dashboardType === 'primpact'
  );

  const {
    isLoading: isPeopleSentimentDataLoading,
    isFetching: isPeopleSentimentDataFetching,
    data: peopleSentimenetData,
  } = usePeopleDashboardSentimentChartData(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    peopleData,
    shouldShowGraph('people', 'people_top_source_by_sentiment')
  );

  const {
    isLoading: isPeopleJournalistSentimentLoading,
    isFetching: isPeopleJournalistSentimentFetching,
    data: peopleJournalistSentimenetData,
  } = usePeopleDashboardJournalistSentimetChart(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    peopleData,
    shouldShowGraph('people', 'people_top_journalist_by_sentiment')
  );

  const {
    isLoading: isPeopleCoverageChartLoading,
    isFetching: isPeopleCoverageChartFetching,
    data: peopleCoverageChartData,
  } = usePeopleCoverageChart(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    peopleData,
    shouldShowGraph('people', 'people_coverage_over_time')
  );

  const {
    isLoading: isPeoplePopularTopicsChartLoading,
    isFetching: isPeoplePopularTopicsChartFetching,
    data: peoplePopularTopicsChartData,
  } = usePeoplePopularTopicsChart(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    peopleData,
    shouldShowGraph('people', 'people_popular_topics')
  );
  const {
    isLoading: isPeopleMediaTypeChartLoading,
    isFetching: isPeopleMediaTypeChartFetching,
    data: PeopleMediaTypeChartData,
  } = usePeopleMediaTypeChart(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    peopleData,
    shouldShowGraph('people', 'people_media_type')
  );

  const {
    isLoading: isSentimentCompLoading,
    isFetching: isSentimentCompFetching,
    data: sentimentCompData,
  } = useArticleSentimentComp(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    brandData,
    competitionData,
    shouldShowGraph('competition', 'article_sentiment')
  );

  const {
    isLoading: isReachOvertimeCompLoading,
    isFetching: isReachOvertimeCompFetching,
    data: reachOvertimeCompData,
  } = useReachOverTimeComp(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    brandData,
    competitionData,
    shouldShowGraph('competition', 'competitive_reach_over_time')
  );

  const {
    isLoading: isJournalistCoverageDataLoading,
    isFetching: isJournalistCoverageDataFetching,
    data: journalistCoverageData,
  } = useJournalistCoverageComp(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    brandData,
    competitionData,
    shouldShowGraph('competition', 'coverage_by_journalist')
  );

  const {
    isLoading: isMediaBreakdownLoading,
    isFetching: isMediaBreakdownFetching,
    data: mediaBreakdownData,
  } = useMediaBreakDownMediaType(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    brandData,
    competitionData,
    shouldShowGraph('competition', 'breakdown_by_media_type')
  );

  const {
    isLoading: isSourceCompDataLoading,
    isFetching: isSourceCompDataFetching,
    data: sourceCompData,
  } = useSourcesCompData(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    brandData,
    competitionData,
    shouldShowGraph('competition', 'coverage_by_source')
  );

  // industry dashboards
  const {
    isLoading: isIndustryAnalysisLoading,
    isFetching: isIndustryAnalysisFetching,
    data: industryAnalysisData,
  } = useDashboardIndustryAnalysisData(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    shouldShowGraph('industry', 'industry_volume_analysis')
  );
  const {
    isLoading: isIndustrySentimentLoading,
    isFetching: isIndustrySentimentFetching,
    data: industrySentimentData,
  } = useIndustryDashboardSentimentChartData(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    shouldShowGraph('industry', 'industry_sentiment_analysis')
  );
  const {
    isLoading: isIndustryCoverageOverTimeLoading,
    isFetching: isIndustryCoverageOverTimeFetching,
    data: industryCoverageOverTimeData,
  } = useIndustryCoverageOvertime(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    shouldShowGraph('industry', 'industry_coverage_over_time')
  );
  const {
    isLoading: isIndustryCoverageBySourceLoading,
    isFetching: isIndustryCoverageBySourceFetching,
    data: industryCoverageBySourceData,
  } = useIndustryCoverageBySource(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    shouldShowGraph('industry', 'industry_coverage_by_source')
  );
  const {
    isLoading: isIndustryCompaniesLoading,
    isFetching: isIndustryCompaniesFetching,
    data: industryCompaniesData,
  } = useIndustryCompanies(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    shouldShowGraph('industry', 'industry_companies_mentioned')
  );
  const {
    isLoading: isIndustryCoverageByJournalistsLoading,
    isFetching: isIndustryCoverageByJournalistsFetching,
    data: industryCoverageByJournalistsData,
  } = useIndustryCoverageByJournalists(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    shouldShowGraph('industry', 'industry_coverage_by_journalist')
  );
  const {
    isLoading: isIndustryPublicationsLoading,
    isFetching: isIndustryPublicationsFetching,
    data: industryPublicationsData,
  } = useIndustryPublications(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    shouldShowGraph('industry', 'industry_coverage_by_top_publications')
  );

  const handleCheckedItems = (e) => {
    setSelectedItems(e);
  };
  // get edited chart names
  const handleGraphTitleUpdate = async (
    data,
    _updatedChartData,
    _chartData,
    widgetClassName,
    chartType
  ) => {
    const charts = updatedGraphs.filter((x) => x.chartId !== widgetClassName);
    setUpdatedGraphs([
      ...charts,
      {
        chartId: widgetClassName,
        chartName: data?.chartName,
        chartType,
      },
    ]);
    if (dashboardId) {
      const toastId = toast('Updating Chart Configuration');
      try {
        await handleSaveDashboard(
          { name: savedName, description: savedDescription },
          true,
          [
            ...charts,
            { chartId: widgetClassName, chartName: data?.chartName, chartType },
          ]
        );
      } catch (error) {
        console.log(error);
      } finally {
        toast.dismiss(toastId);
      }
    }
  };

  // useEffect(() => {
  //   getSelectedCharts(selectedGraphs);
  // }, [updatedGraphs]);

  useEffect(() => {
    if (location?.state?.savedDashboardData?.chart_field) {
      const selectedCharts =
        location.state.savedDashboardData.chart_field.selectedChart;
      const newSelectedGraphs = selectedCharts?.reduce((acc, chart) => {
        acc[chart.chartId] = true;
        return acc;
      }, {});
      sessionStorage.setItem(
        'selectedWidgets',
        JSON.stringify(newSelectedGraphs)
      );
    }
  }, [location.state?.savedDashboardData?.chart_field]);

  const handleSaveDashboard = async (data, isEdit, graphs = updatedGraphs) => {
    const result = Object.keys(selectedGraphs || {}).flatMap((property) => {
      return Object.keys(selectedGraphs[property]).filter((key) => {
        return selectedGraphs[property][key] === true;
      });
    });
    const selectedCharts = result.map((chart) => {
      const result = {};
      result.chartId = chart;
      const updatedChartData = graphs?.find((x) => x.chartId === chart);
      const alreadySavedChartData = savedSelectedChart?.find(
        (x) => x.chartId === chart
      );
      if (updatedChartData) {
        result.chartName = updatedChartData?.chartName;
        if (updatedChartData?.chartType) {
          result.chartType = updatedChartData?.chartType;
        }
      } else if (alreadySavedChartData) {
        result.chartName = alreadySavedChartData?.chartName;
        if (alreadySavedChartData?.chartType) {
          result.chartType = alreadySavedChartData?.chartType;
        }
      } else {
        const chartData = allDashboards?.find((x) => x.chartId === chart);
        result.chartName = chartData.chartName;
      }
      return result;
    });
    let dateTimeFilters = {};
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
    const savedData = {
      name: data.name,
      description: data.description,
      type: dashboardType,
      recent_search_id: location?.state?.recent_searchId,
      save_search_id: parseFloat(searchId),

      params: {
        ...filters,
        dateTime: {
          ...dateTimeFilters,
        },
        person_name: peopleData ?? [],
        brand_keywords: brandData ?? [],
        competition_keywords: competitionData ?? [],
        advanced_keywords: advancedData ?? [],
        search_name: searchName,
      },
      chart_field: { selectedChart: selectedCharts },
    };

    const editedData = {
      dashboard_id: parseInt(dashboardId),
      name: data.name,
      description: data.description,
      type: dashboardType,
      recent_search_id: location?.state?.recent_searchId,
      save_search_id: parseFloat(searchId),
      params: {
        ...filters,
        dateTime: {
          ...dateTimeFilters,
        },
        person_name: peopleData ?? [],
        brand_keywords: brandData ?? [],
        competition_keywords: competitionData ?? [],
        advanced_keywords: advancedData ?? [],
        search_name: searchName,
      },
      chart_field: { selectedChart: selectedCharts },
    };

    if (isEdit && dashboardId && !newDashboard) {
      try {
        await createEditDashboardData(editedData, {
          onSuccess: (searchData) => {
            const item = searchData?.data?.data;
            let searchParams = item?.params;
            const dateParams = getDateParams(searchParams?.dateTime);
            searchParams = {
              ...searchParams,
              dateTime: dateParams,
            };
            setPrevDashboardType((prev) => prev);
            setHandlerCalled(false);
            toast.success('Dashboard updated successfully');
            item?.id &&
              navigate(`/dashboard/${searchId}/${dashboardType}/${item.id}`, {
                state: {
                  data: null,
                  filters: searchParams,
                  savedDashboardData: item,
                  recent_searchId: location?.state?.recent_searchId,
                  search_name: searchName,
                  selectedItems:
                    selectedDashboard === 'custom' &&
                    JSON.stringify(selectedItems),
                },
              });

            if (
              item?.id &&
              (selectedPath !== '' || selectedPath !== 'dashboards')
            ) {
              navigate(selectedPath, {
                state: {
                  data: null,
                  filters: searchParams,
                  savedDashboardData: item,
                  recent_searchId: location?.state?.recent_searchId,
                  search_name: searchName,
                  selectedItems:
                    selectedDashboard === 'custom' &&
                    JSON.stringify(selectedItems),
                },
              });
              setSelectedPath('');
            }
            setChangeSaved(true);
          },
        });
      } catch (error) {
        console.log('error', error);
        toast.error('Failed to update dashboard');
      }
    }
    if (!isEdit && newDashboard) {
      try {
        CreateSaveDashboard(savedData, {
          onSuccess: (searchData) => {
            if (searchData.isSuccessful) {
              const item = searchData?.data?.data;
              let searchParams = item?.params;
              const dateParams = getDateParams(searchParams?.dateTime);
              searchParams = {
                ...searchParams,
                dateTime: dateParams,
              };
              setPrevDashboardType((prev) => prev);
              toast.success('Dashboard Saved Successfully');
              if (item?.id) {
                const navigationState = {
                  data: null,
                  filters: searchParams,
                  savedDashboardData: item,
                  recent_searchId: location?.state?.recent_searchId,
                  search_name: searchName,
                  selectedItems:
                    selectedDashboard === 'custom' &&
                    JSON.stringify(selectedItems),
                };

                navigate(`/dashboard/${searchId}/${dashboardType}/${item.id}`, {
                  state: navigationState,
                });

                // If a selectedPath is specified, navigate to it as well
                if (selectedPath !== '' && selectedPath !== 'dashboards') {
                  navigate(selectedPath, { state: navigationState });
                  setSelectedPath('');
                }
              }
              setNewDashboard(false);
            } else {
              if (
                searchData?.message ===
                'Dashboard name should be unique for the user.'
              ) {
                toast.error(
                  'Failed to save the Dashboard. Dashboard with this name already exists.'
                );
              } else {
                toast.error(searchData?.message);
              }
            }
          },
        });
      } catch (error) {
        console.log('error', error);
      }
    }
  };
  const getSelectedTabContent = () => {
    const Component = dashboardKeyConfig[dashboardType];

    if (Component) {
      return (
        <Component
          maxBrandKeywords={dashboardType === 'primpact' ? 5 : 1}
          hideCompetitionKeywords={dashboardType === 'primpact'}
          handler={handleAnalyze}
          tabKeywords={{
            brandKeywords: brandData || searchedDetails?.brand_keywords,
            competitionKeywords:
              competitionData || searchedDetails?.competition_keywords,
            peopleKeywords: peopleData || searchedDetails?.person_name,
            advancedKeywords:
              advancedData || searchedDetails?.advanced_keywords,
          }}
          handleSubmit={(data) => {
            setHandlerCalled(true);
            if (data?.peopleData) {
              setPeopleData([...data?.peopleData]);
            }
            if (data?.brandData) {
              setBrandData([...data?.brandData]);
            }
            if (data?.competitionData) {
              setCompetitionData([...data?.competitionData]);
            }

            if (data?.campaignData) {
              setAdvancedData([...data?.campaignData]);
            }
          }}
          handleUpdates={(data) => {
            if (data?.peopleData) {
              setLivePeopleData([...data?.peopleData]);
            }
            if (data?.brandData) {
              setLiveBrandData([...data?.brandData]);
            }
            if (data?.competitionData) {
              setLiveCompetitionData([...data?.competitionData]);
            }
            if (data?.campaignData) {
              setLiveAdvancedData([...data?.campaignData]);
            }
          }}
          selectedItems={selectedGraphs}
          selectedChartsCountConfig={countTruthyValues(selectedGraphs)}
          setStoringKeywords={setStoringKeywords}
        />
      );
    }
    return <></>;
  };

  const handleShowSaveDashboards = (e) => {
    e.stopPropagation();
    setShowSavedDashboards((old) => !old);
  };

  const handleDashboardTitleClick = (item) => {
    if (item) {
      const { id } = item;
      let searchParams = item?.params;
      const dateParams = getDateParams(searchParams?.dateTime);
      searchParams = {
        ...searchParams,
        dateTime: dateParams,
      };
      const searchInfo = savedSearches?.data?.data?.find(
        (x) => parseInt(item.save_search_id) === parseInt(x?.id)
      );
      navigate(`/dashboard/${item?.save_search_id}/${item.type}/${id}`, {
        state: {
          data: null,
          filters: searchParams,
          savedDashboardData: item,
          search_name: searchInfo?.title || item?.params?.search_name,
        },
      });
    }
    setShowSavedDashboards((old) => !old);
  };

  const [showCustomComponent, setShowCustomComponent] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const [deletedbtn, setDeletedbtn] = useState(false);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [isDashboardsAssociated, setIsDashboardsAssociated] = useState(false);

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

  const handleOpenClcik = () => {
    setShowCustomComponent(!showCustomComponent);
    setDropdownOpen(!dropdownOpen);
  };

  const hidePlaceholderObj = useMemo(
    () => ['industry', 'sentiments', 'primpact', 'authorimpact'],
    []
  );

  useEffect(() => {
    if (searchedDetails?.person_name?.length > 0 || peopleData?.length > 0) {
      handleAnalyze();
    } else {
      setAnalyzedData({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peopleData, searchedDetails?.person_name]);
  useEffect(() => {
    if (searchedDetails?.brand_keywords?.length > 0 || brandData?.length > 0) {
      handleAnalyze();
    } else {
      setAnalyzedData({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandData, searchedDetails]);
  useEffect(() => {
    if (dashboardType === 'industry') {
      setIndustryData(['industry']);
      handleAnalyze();
    } else {
      setAnalyzedData({});
      setIndustryData([]);
    }
  }, [dashboardType]);
  useEffect(() => {
    if (hidePlaceholderObj.includes(dashboardType)) {
      handleAnalyze();
    } else {
      setAnalyzedData({});
    }
  }, [dashboardType, handleAnalyze, hidePlaceholderObj, searchedDetails]);

  useEffect(() => {
    if (searchedDetails?.brand_keywords?.length > 0 && dashboardId) {
      setBrandData(searchedDetails?.brand_keywords);
      setLiveBrandData(searchedDetails?.brand_keywords);
    } else {
      setBrandData([]);
      setLiveBrandData([]);
    }

    if (searchedDetails?.competition_keywords?.length > 0 && dashboardId) {
      setCompetitionData(searchedDetails?.competition_keywords);
      setLiveCompetitionData(searchedDetails?.competition_keywords);
    } else {
      setCompetitionData([]);
      setLiveCompetitionData([]);
    }

    if (searchedDetails?.person_name?.length > 0 && dashboardId) {
      setPeopleData(searchedDetails?.person_name);
      setLivePeopleData(searchedDetails?.person_name);
    } else {
      setPeopleData([]);
      setLivePeopleData([]);
    }
    if (searchedDetails?.advanced_keywords?.length > 0 && dashboardId) {
      setAdvancedData(searchedDetails?.advanced_keywords);
      setLiveAdvancedData(searchedDetails?.advanced_keywords);
    } else {
      setAdvancedData([]);
      setLiveAdvancedData([]);
    }
  }, [searchedDetails, dashboardId, searchId]);

  const handleClick = (item) => {
    let searchParams = JSON.parse(item?.search_params);
    searchParams = getSearchParams(searchParams);
    if (dashboardId) {
      navigate(`/dashboard/${item?.id}/${dashboardType}/${dashboardId}`, {
        state: {
          filters: {
            ...location?.state?.savedDashboardData?.params,
            ...searchParams?.filters?.filter,
            query: searchParams?.filters?.query,
            guidedSection: searchParams?.isGuidedSearch,
          },
          data: null,
          savedDashboardData: location?.state?.savedDashboardData,
          recent_searchId: item?.recent_search_id,
          search_name: item?.title,
        },
      });
    } else {
      navigate(`/dashboard/${item?.id}/${dashboardType}`, {
        state: {
          filters: {
            ...searchParams?.filters?.filter,
            query: searchParams?.filters?.query,
            guidedSection: searchParams?.isGuidedSearch,
          },
          recent_searchId: item?.recent_search_id,
          search_name: item?.title,
        },
      });
    }
    setShowSaved(false);
  };
  const handleSavedDelete = () => {
    setDeletedbtn(() => true);
  };

  // const handleSaveSearch = ({ dashboardName, dashboardDescription }) => {
  //   axiosPutRequest(
  //     selectedTab === 1 ? '/edit-saved-search' : '/edit-shared-saved',
  //     {
  //       savedSearchId: selectedItem?.savedSearchId,
  //     },
  //     { ...selectedItem, title: dashboardName, des: dashboardDescription }
  //   ).then(() => {
  //     axiosGet(selectedTab === 1 ? '/saved-search' : '/shared-search', {
  //       limit: 10,
  //       page: 1,
  //       fiterType: '',
  //     });
  //   });
  // };

  const handleAlertSaved = () => {
    // setChangeSaved((_) => true);
    !dashboardId && setSavePopup(true);
    !dashboardId ? setNewDashboard(true) : setNewDashboard(false);
    // handleAnalyze();
    setConfimationAlertPopUp(false);
  };

  const setGraphs = (selectedChartData) => {
    setSelectedGraphs(selectedChartData);
  };

  return (
    <PageWrp>
      <AppBG />
      <AppHeader />
      <PageMainWrp>
        <SearchSection>
          <SearchWrp>
            <SectionHeader>
              <CrossButtonWrp onClick={handleGoBack}>
                <ArrowLeft
                  color={theme[selectedTheme].text}
                  width="32"
                  height="32"
                />
              </CrossButtonWrp>
              <SearchTextWrp>
                {/* <DashboardType>{dashboardType} Dashboard</DashboardType> */}
                <SearchText>
                  {(dashboardId
                    ? location?.state?.savedDashboardData?.name
                    : 'Untitled'
                  )?.toUpperCase()}
                </SearchText>
              </SearchTextWrp>
              <DashboardTypeDiv>
                {/* <DashboardTypeDivText>{dashboardType}</DashboardTypeDivText> */}

                <ChipText bgcolor={dashboardChips[dashboardType]?.color}>
                  {dashboardChips[dashboardType]?.label?.toUpperCase()}
                </ChipText>
              </DashboardTypeDiv>
              <Iconwrp className="ml" onClick={handleShowSaveDashboards}>
                <Arrow
                  size="1rem"
                  className={'dropdown-arrow-icon'}
                  fill={theme[selectedTheme].text}
                />
              </Iconwrp>
              {dashboardId && (
                <Iconwrp
                  // className="ml"
                  onClick={() => {
                    setSavePopup(true);
                    setNewDashboard(false);
                  }}
                >
                  <Edit2 size={'1.25rem'} />
                </Iconwrp>
              )}
              <DropDownMasterWrpr>
                <ReusableDropDown
                  label="Create Dashboard"
                  dropdownArray={dropdownOptions}
                  frontIcon={<Add2 height={'1rem'} color={'#fff'}></Add2>}
                  navigation={createDashboard}
                  childNavigation={childNavigation}
                ></ReusableDropDown>
              </DropDownMasterWrpr>
              <DropdownForButton ref={dropdownRef}>
                <Btnwrp
                  disabled={!Object.keys(analyzedData).length && !dashboardId}
                >
                  <SaveSearchBtn
                    className="save-btn"
                    onClick={(_e) => {
                      if (dashboardId) {
                        handleSaveDashboard(
                          {
                            name: savedName,
                            description: savedDescription,
                          },
                          true
                        );
                      } else {
                        setSavePopup(true);
                        setNewDashboard(true);
                      }
                    }}
                  >
                    <ButtonText>Save</ButtonText>
                  </SaveSearchBtn>
                  <DropDownWrp
                    onClick={() => {
                      if (dashboardId || Object.keys(analyzedData).length) {
                        handleOpenClcik();
                      }
                    }}
                  >
                    <DropDownButton
                      size={'1rem'}
                      color={'#ffffff'}
                      isOpen={dropdownOpen}
                    />
                  </DropDownWrp>
                </Btnwrp>
                {showCustomComponent && (
                  <DropDownCont
                    onClick={() => {
                      setNewDashboard(true);
                    }}
                  >
                    <DropDown
                      onClick={() =>
                        (Object.keys(analyzedData).length || dashboardId) &&
                        setSavePopup(true)
                      }
                    >
                      <ButtonText dropDown={true}>Save As</ButtonText>
                    </DropDown>
                  </DropDownCont>
                )}
              </DropdownForButton>
              <DashboardPopup
                toggler={setShowSavedDashboards}
                open={showSavedDashboards}
                popContent={
                  <SavedDashboardPopup
                    Frames={Frames}
                    titleClick={handleDashboardTitleClick}
                  />
                }
                padding="0px"
                Cross={true}
                borderRadius="0.75rem"
              />
              <DashboardPopup
                popContent={
                  <SaveSourcePopup
                    heading={
                      dashboardId ? 'Rename Dashboard' : 'Save Dashboard'
                    }
                    buttonText={dashboardId ? 'Done' : 'Save Dashboard'}
                    toggler={setSavePopup}
                    selectedItem={
                      newDashboard
                        ? {
                            name: '',
                            description: '',
                          }
                        : {
                            name: savedName,
                            description: savedDescription,
                          }
                    }
                    // selectedItem={dashboardTitle}
                    handleSaveDashboard={handleSaveDashboard}
                  />
                }
                open={savePopup}
                toggler={setSavePopup}
                padding="0"
                borderRadius="0.625rem"
                width={'43.75rem'}
              />
              <DashboardPopup
                open={customCanvas}
                toggler={setCustomCanvas}
                popContent={
                  <CustomPopupWrapper
                    heading="Select Charts for Dashboard"
                    footer={
                      <ButtonWrapper>
                        <ButtonBoxwpr
                          onClick={() => {
                            setSelectedItems({});
                            setCustomCanvas(false);
                          }}
                        >
                          Cancel
                        </ButtonBoxwpr>
                        <ButtonBoxwpr
                          background={theme[selectedTheme].primary}
                          fontColor={'#fff'}
                          onClick={() => {
                            const isDataChanged =
                              JSON.stringify(storingKeywords) !==
                              JSON.stringify(getKeywordsFromDashboard());
                            if (
                              !Object.keys(selectedItems).filter(
                                (items) =>
                                  Object.keys(selectedItems[items]).filter(
                                    (item) => selectedItems[items][item]
                                  ).length
                              ).length &&
                              changeSaved
                            ) {
                              navigate(
                                `/dashboard/${searchId}/${selectedDashboard}/`,
                                {
                                  state: {
                                    filters,
                                    query: searchedQuery,
                                    selectedItems:
                                      JSON.stringify(selectedItems),
                                    search_name: searchName,
                                    recent_searchId:
                                      location?.state?.recent_searchId,
                                  },
                                }
                              );
                              // return;
                            } else if (
                              !dashboardId &&
                              (handlerCalled ||
                                !changeSaved ||
                                (campaignDashboardData &&
                                  dashboardType === 'campaign') ||
                                (congruenceData &&
                                  dashboardType === 'congruence') ||
                                (handlerCalled &&
                                  prImpactData &&
                                  dashboardType === 'primpact'))
                            ) {
                              setConfimationAlertPopUp(true);
                            } else if (
                              !dashboardId &&
                              (!changeSaved ||
                                (dashboardType === 'industry' &&
                                  IndustryData?.length))
                            ) {
                              setConfimationAlertPopUp(true);
                            } else if (
                              !dashboardId &&
                              (!changeSaved ||
                                (authorImpactDashboardData?.data &&
                                  dashboardType === 'authorimpact') ||
                                (sentimentByThemeData?.data &&
                                  dashboardType === 'sentiments'))
                            ) {
                              setConfimationAlertPopUp(true);
                            } else if (
                              dashboardId &&
                              ((((isDataChanged && handlerCalled) ||
                                !changeSaved) &&
                                (dashboardType !== 'industry' ||
                                  dashboardType !== 'authorimpact' ||
                                  dashboardType !== 'sentiments')) ||
                                (!changeSaved &&
                                  (dashboardType === 'industry' ||
                                    dashboardType === 'authorimpact' ||
                                    dashboardType === 'sentiments')))
                            ) {
                              setConfimationAlertPopUp(true);
                            } else {
                              navigate(
                                `/dashboard/${searchId}/${selectedDashboard}/`,
                                {
                                  state: {
                                    filters,
                                    query: searchedQuery,
                                    selectedItems:
                                      JSON.stringify(selectedItems),
                                    search_name: searchName,
                                    recent_searchId:
                                      location?.state?.recent_searchId,
                                  },
                                }
                              );
                            }

                            setCustomCanvas(false);
                          }}
                          disabled={
                            !Object.keys(selectedItems).filter(
                              (items) =>
                                Object.keys(selectedItems[items]).filter(
                                  (item) => selectedItems[items][item]
                                ).length
                            ).length
                          }
                        >
                          Create Dashboard
                        </ButtonBoxwpr>
                      </ButtonWrapper>
                    }
                    width={'100%'}
                  >
                    <CustomDashboardCanvas
                      handleItemClick={handleCheckedItems}
                      selectedItems={selectedItems}
                    ></CustomDashboardCanvas>
                  </CustomPopupWrapper>
                }
                width={'1000px'}
                padding="0"
                Cross={true}
                borderRadius="0.75rem"
              />
            </SectionHeader>
            <SectionBody>
              <QueryFilterCon>
                <SearchContainer
                  className={dashboardId ? 'disabled' : ''}
                  onClick={(e) => handleShowSavedSearches(e)}
                >
                  <SmallTitle>
                    {truncateQuery(searchName || searchedQuery)}
                  </SmallTitle>
                  <IconWrapper className="center">
                    <SavedSearches
                      width="1.5rem"
                      height="1.5rem"
                      fill={theme[selectedTheme].primary}
                    />
                  </IconWrapper>
                </SearchContainer>
                <FiltersWrp>
                  <FilterComponent
                    searchFilter={filters}
                    handleFilterChange={handleFilterChange}
                    createDashboard={dashboardType}
                    key={[`${searchId} ${dashboardId || ''}`]}
                  />
                </FiltersWrp>
              </QueryFilterCon>
              {getSelectedTabContent()}
            </SectionBody>
          </SearchWrp>
          <DashboardPopup
            toggler={setShowSaved}
            open={showSaved}
            popContent={
              <SearchPopup
                Frames={Frames}
                titleClick={handleClick}
                setConfirmationPopUp={setConfirmationPopUp}
                deletedbtn={deletedbtn}
                setDeletedbtn={setDeletedbtn}
                // setSeleteditem={setSeleteditem}
                setSavePopup={setSavePopup}
                // setSeletedTab={setSeletedTab}
                isCheckBox={false}
                isIcons={false}
                setIsDashboardsAssociated={setIsDashboardsAssociated}
              />
            }
            padding="0px"
            Cross={true}
            borderRadius="0.75rem"
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
            borderRadius="0.625rem"
            width="35rem"
          />
          {/* <DashboardPopup
            popContent={
              <SaveSourcePopup
                heading="Save Saved Search"
                // toggler={(value) => {
                //   setSavePopup(value);
                //   setSeleteditem('');
                // }}
                primaryHeading="Saved Search Name"
                selectedItem={{
                  name: selectedItem?.title,
                  description: selectedItem?.des,
                }}
                handleSaveDashboard={handleSaveSearch}
              />
            }
            // toggler={setSavePopup}
            open={savePopup}
            padding="0"
            borderRadius="0.625rem"
            width={'43.75rem'}
          /> */}
        </SearchSection>
        <DashboardPopup
          open={confimationAlertPopUp}
          toggler={setConfimationAlertPopUp}
          setSelectedPath={setSelectedPath}
          popContent={
            <AlertPopUp
              Heading={!dashboardId ? 'Save dashboard?' : 'Save changes?'}
              toggler={setConfimationAlertPopUp}
              setSelectedPath={setSelectedPath}
              description={
                !dashboardId
                  ? 'You are about to leave this page without saving. Would you like to save your current dashboard?'
                  : 'You have modified the dashboard. Would you like to save the changes?'
              }
              handleSave={() => {
                !dashboardId
                  ? handleAlertSaved()
                  : handleSaveDashboard(
                      {
                        name: savedName,
                        description: savedDescription,
                      },
                      true
                    ) &&
                    setConfimationAlertPopUp(false) &&
                    setHandlerCalled(false);
              }}
              handleDontSave={() => {
                setHandlerCalled(false);
                setConfimationAlertPopUp(false);
                setChangeSaved(true);
                setAnalyzedData({});
                navigate(selectedPath, {
                  state: {
                    filters,
                    query: searchedQuery,
                    selectedItems: JSON.stringify(selectedItems || []),
                  },
                });
              }}
            />
          }
          padding="0"
          borderRadius="0.625rem"
          width="28rem"
        />
        <NewDashboard
          recentSearchId={location?.state?.recent_searchId}
          selectedGraphs={selectedGraphs}
          setSelectedGraphs={setGraphs}
          handleGraphTitleUpdate={handleGraphTitleUpdate}
          dashboardData={{
            campaign: {
              isLoading:
                isCampaignAnalysisDataFetching || isCampaignAnalysisDataLoading,
              show: shouldShowGraph('campaign', 'campaign_analysis'),
              data: campaignDashboardData,
              customClassName: 'campaign_analysis',
            },
            authorimpact: {
              isLoading: isAuthorImpactFetching || isAuthorImpactLoading,
              data: authorImpactDashboardData,
              customClassName: 'authorimpact',
              show: shouldShowGraph('authorimpact', 'author'),
            },
            sentiments: {
              isLoading:
                isSentimentByThemeLoading || isSentimentByThemeFetching,
              show: shouldShowGraph('sentimentByTheme', 'sentimentByTheme'),
              data: sentimentByThemeData,
              customClassName: 'sentimentByTheme',
            },
            congruence: {
              isLoading: isCongrunceDataFetching || isCongruenceDataLoading,
              show:
                shouldShowGraph('congruence', 'congruence') &&
                dashboardType === 'congruence',
              data: congruenceData,
              customClassName: 'congruence',
            },
            primpact: {
              isLoading: prImpactLoading || prImpactFetching,
              show: shouldShowGraph('primpact', 'primpact'),
              data: prImpactData,
              customClassName: 'primpact',
            },
          }}
          volumeAnalysisWidgetDetails={{
            isLoading: isVolumeAnalysisFetching || isVolumeAnalysisLoading,
            show: shouldShowGraph('brand', 'volume_analysis'),
            data: volumeAnalysisData,
            customClassName: 'volume_analysis',
          }}
          sentimentAnalysisWidgetDetails={{
            isLoading: isSentimentDataLoading || isSentimentDataFetching,
            show: shouldShowGraph('brand', 'sentiment_analysis'),
            data: sentimentData,
            customClassName: 'sentiment_analysis',
          }}
          sentimeOverTimeWidgetDetails={{
            isLoading:
              isSentimentOvertimeLoading || isSentimeentOvertimeFetching,
            show: shouldShowGraph('brand', 'sentiment_over_time'),
            data: sentimenetOvertimeData,
            customClassName: 'sentiment_over_time',
          }}
          coverageOverTimeBrandWidgetDetails={{
            isLoading:
              isCoverageOvertimeBrandDataFetching ||
              isCoverageOvertimeBrandDataLoading,
            show: shouldShowGraph('brand', 'coverage_over_time'),
            data: coverageOvertimeBrandData,
            customClassName: 'coverage_over_time',
          }}
          reachOvertimeBrandWidgetDetails={{
            isLoading:
              isReachOvertimeBrandDataFetching ||
              isReachOvertimeBrandDataLoading,
            show: shouldShowGraph('brand', 'reach_over_time'),
            data: reachOvertimeBrandData,
            customClassName: 'reach_over_time',
          }}
          mediaTypeWidgetDetails={{
            isLoading: isMediaFetching || isMediaLoading,
            show: shouldShowGraph('brand', 'media_type'),
            data: mediaData,
            customClassName: 'media_type',
          }}
          SOVWidgetDetails={{
            isLoading: isSOVDataFetching || isSOVDataLoading,
            show: shouldShowGraph('competition', 'sov'),
            data: SOVData,
            customClassName: 'sov',
          }}
          coverageOverTimeCompWidgetDetails={{
            isLoading:
              isCoverageOvertimeBrandCompetitionDFetching ||
              isCoverageOvertimeBrandCompetitionDLoading,
            show: shouldShowGraph(
              'competition',
              'competitive_coverage_over_time'
            ),
            data: coverageOvertimeCompData,
            customClassName: 'competitive_coverage_over_time',
          }}
          sentimentCompWidgetDetails={{
            isLoading: isSentimentCompLoading || isSentimentCompFetching,
            show: shouldShowGraph('competition', 'article_sentiment'),
            data: sentimentCompData,
            customClassName: 'article_sentiment',
          }}
          reachOvertimeCompWidgetDetails={{
            isLoading:
              isReachOvertimeCompFetching || isReachOvertimeCompLoading,
            show: shouldShowGraph('competition', 'competitive_reach_over_time'),
            data: reachOvertimeCompData,
            customClassName: 'competitive_reach_over_time',
          }}
          mediaBreakdownWidgetDetails={{
            isLoading: isMediaBreakdownFetching || isMediaBreakdownLoading,
            show: shouldShowGraph('competition', 'breakdown_by_media_type'),
            data: mediaBreakdownData,
            customClassName: 'breakdown_by_media_type',
          }}
          journalistWidgetDetails={{
            isLoading:
              isJournalistCoverageDataFetching ||
              isJournalistCoverageDataLoading,
            show: shouldShowGraph('competition', 'coverage_by_journalist'),
            data: journalistCoverageData,
            customClassName: 'coverage_by_journalist',
          }}
          sourceCompWidgetDetails={{
            isLoading: isSourceCompDataFetching || isSourceCompDataLoading,
            show: shouldShowGraph('competition', 'coverage_by_source'),
            data: sourceCompData,
            customClassName: 'coverage_by_source',
          }}
          peopleVolumeAnalysisWidgetDetails={{
            isLoading:
              isPeopleVolumeAnalysisLoading || isPeopleVolumeAnalysisFetching,
            show: shouldShowGraph('people', 'people_volume_analysis'),
            data: peopleVolumeAnalysisData,
            customClassName: 'people_volume_analysis',
          }}
          topJournalistSentimentAnalysisWidgetDetails={{
            isLoading:
              isPeopleJournalistSentimentFetching ||
              isPeopleJournalistSentimentLoading,
            show: shouldShowGraph(
              'people',
              'people_top_journalist_by_sentiment'
            ),
            data: peopleJournalistSentimenetData,
            customClassName: 'people_top_journalist_by_sentiment',
          }}
          peopleSentimentAnalysisWidgetDetails={{
            isLoading:
              isPeopleSentimentDataFetching || isPeopleSentimentDataLoading,
            show: shouldShowGraph('people', 'people_top_source_by_sentiment'),
            data: peopleSentimenetData,
            customClassName: 'people_top_source_by_sentiment',
          }}
          peopleCoverageChartDataWidgetDetails={{
            isLoading:
              isPeopleCoverageChartFetching || isPeopleCoverageChartLoading,
            show: shouldShowGraph('people', 'people_coverage_over_time'),
            data: peopleCoverageChartData,
            customClassName: 'people_coverage_over_time',
          }}
          peopleThemeWidgetDetails={{
            isLoading:
              isPeoplePopularTopicsChartFetching ||
              isPeoplePopularTopicsChartLoading,
            show: shouldShowGraph('people', 'people_popular_topics'),
            data: peoplePopularTopicsChartData,
            customClassName: 'people_popular_topics',
          }}
          peopleMediaTypeWidgetDetails={{
            isLoading:
              isPeopleMediaTypeChartFetching || isPeopleMediaTypeChartLoading,
            show: shouldShowGraph('people', 'people_media_type'),
            data: PeopleMediaTypeChartData,
            customClassName: 'people_media_type',
          }}
          industryVolumeAnalysisWidgetDetails={{
            isLoading: isIndustryAnalysisLoading || isIndustryAnalysisFetching,
            show: shouldShowGraph('industry', 'industry_volume_analysis'),
            data: industryAnalysisData,
            customClassName: 'industry_volume_analysis',
          }}
          industrySentimentWidgetDetails={{
            isLoading:
              isIndustrySentimentLoading || isIndustrySentimentFetching,
            show: shouldShowGraph('industry', 'industry_sentiment_analysis'),
            data: industrySentimentData,
            customClassName: 'industry_sentiment_analysis',
          }}
          industryCoverageOverTimeWidgetDetails={{
            isLoading:
              isIndustryCoverageOverTimeLoading ||
              isIndustryCoverageOverTimeFetching,
            show: shouldShowGraph('industry', 'industry_coverage_over_time'),
            data: industryCoverageOverTimeData,
            customClassName: 'industry_coverage_over_time',
          }}
          industryCoverageBySourceWidgetDetails={{
            isLoading:
              isIndustryCoverageBySourceFetching ||
              isIndustryCoverageBySourceLoading,
            show: shouldShowGraph('industry', 'industry_coverage_by_source'),
            data: industryCoverageBySourceData,
            customClassName: 'industry_coverage_by_source',
          }}
          industryCompaniesWidgetDetails={{
            isLoading:
              isIndustryCompaniesFetching || isIndustryCompaniesLoading,
            show: shouldShowGraph('industry', 'industry_companies_mentioned'),
            data: industryCompaniesData,
            customClassName: 'industry_companies_mentioned',
          }}
          industryCoverageByJournalistsWidgetDetails={{
            isLoading:
              isIndustryCoverageByJournalistsLoading ||
              isIndustryCoverageByJournalistsFetching,
            show: shouldShowGraph(
              'industry',
              'industry_coverage_by_journalist'
            ),
            data: industryCoverageByJournalistsData,
            customClassName: 'industry_coverage_by_journalist',
          }}
          industryPublicationsWidgetDetails={{
            isLoading:
              isIndustryPublicationsFetching || isIndustryPublicationsLoading,
            show: shouldShowGraph(
              'industry',
              'industry_coverage_by_top_publications'
            ),
            data: industryPublicationsData,
            customClassName: 'industry_coverage_by_top_publications',
          }}
          placeholderGraphs={shouldShowPlaceholderGraphs()}
          customData={{
            filters,
            query: searchedQuery,
            guidedSection,
            brandData,
            competitionData,
            peopleData,
          }}
          isSavePopup={savePopup}
        />
      </PageMainWrp>
      <AppFooter />
    </PageWrp>
  );
};

export default CreateDashboard;
