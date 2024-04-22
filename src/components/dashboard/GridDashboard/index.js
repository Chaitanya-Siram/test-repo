import React, { useEffect, useState } from 'react';
import {
  DashboardGraphheaderwpr,
  DashbordCmnentwpr,
  DashbrdGraphconrwpr,
  HeaderLeft,
  // IconsBoxwpr,
  // Iconwpr,
  Titletxtwpr,
  ArticleSectionComponentWrp,
  IconWrapper,
  // TextWrp,
} from './index.sc';
import DashboardList from '../../DashbordList';

// import RedirectIcon from '../../../assets/icons/RedirectIcon';
// import Edit3 from '../../../assets/icons/Edit3';
// import BookmarkIcon from '../../../assets/icons/BookmarkIcon';
// import Share2 from '../../../assets/icons/Share2';
// import Download2 from '../../../assets/icons/Download2';
// import Trash2 from '../../../assets/icons/Trash2';
import {
  useDashboardData,
  useSearchFilterData,
} from '../../../hooks/useSearch';
import { useNavigate } from 'react-router-dom';
import DashboardInnerContainer from '../../search-result/dashboard-section/DashboardInnerContainer';
import ArticleSectionComponent from '../../search-result/article-section';
import PropTypes from 'prop-types';
import XCirlcle from '../../../assets/icons/XCirlcle';
// import { axiosGet } from '../../../service';
// import { useInfiniteQuery } from '@tanstack/react-query';
import Edit from '../../../assets/icons/Edit';
import SaveSourcePopup from '../../save-source';
import DashboardPopup from '../../dasboard-popup';
// import { axiosPutRequest } from '../../../service';
import { Button } from '../../button';
import { theme } from '../../../constants/theme';
import { useSelector } from 'react-redux';
import {
  useDashboardPeopleAnalysisData,
  usePeopleDashboardSentimentChartData,
  usePeopleDashboardJournalistSentimetChart,
  usePeopleCoverageChart,
  usePeoplePopularTopicsChart,
  usePeopleMediaTypeChart,
} from '../../../hooks/usePeopleCharts';
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
} from '../../../hooks/useDashboardCharts';
import {
  useDashboardIndustryAnalysisData,
  useIndustryDashboardSentimentChartData,
  useIndustryCoverageOvertime,
  useIndustryCoverageBySource,
  useIndustryCompanies,
  useIndustryCoverageByJournalists,
  useIndustryPublications,
} from '../../../hooks/useIndustryCharts';
import { getPayloadForSearch } from '../../../constants/dashboards/dashboardUtils';
import { getTokenData } from '../../../constants/validateToken';
import { getDateParams } from '../../../utils';
import toast from 'react-hot-toast';
import { useEditSaveDashboardData } from '../../../hooks/useSaveDashboard';
import { dashboardConfig } from '../../article-graphs';
import AdvancedDashboard from '../../advanced-dashboard';
import {
  useAuthorCompact,
  useCampaignAnalysisData,
  useCongruence,
  usePRImpact,
  useSentimentByThemes,
} from '../../../hooks/useAdvancedCharts';
import { useGetSavedSearchQueryData } from '../../../hooks/useSaveSearch';
// import Edit2 from '../../../assets/icons/Edit2';

const articleTypeDefault = {
  widget: undefined,
  graphSelection: undefined,
};

const GridDashboard = ({
  setLength,
  savedDashboardData,
  dataAmx,
  statusSaveDashboard,
  setFiterType,
  fetchNextPage,
  title,
  setSearchType,
  searchQuery,
}) => {
  // const location = useLocation();
  const authInfo = getTokenData();
  const [active, setActive] = useState(0);
  // const [activeSearchId, setActiveSearchId] = useState(0);
  const [savePopup, setSavePopup] = useState(false);

  const [dashType, setDashType] = useState('');
  // const [loader, setLoader] = useState(false);
  const loader = false;
  const [articleType, setArticleType] = useState(articleTypeDefault);
  const [type, setType] = useState('totalArticles');
  const [page, setPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [floatingPagination, setfloatingPagination] = useState(false);
  // const [activeScreen, setActiveScreen] = useState('dashboard');
  const [selectedDashboard, setSelectedDashboard] = useState({});
  const [listLoading, setListLoading] = useState(true);
  const [articlePosition, setArticlePosition] = useState('');
  const [dateTimeAvailable, setDateTimeAvailable] = useState(false);
  const handleListClick = (item) => {
    setActive(item?.id);
    // setActiveSearchId(item?.searchId);
    setDashType(item?.type);
    console.log({ item });
    setSelectedDashboard(item);
  };
  const [resetSelection, setResetSelection] = useState(true);
  const [selected, setSelected] = useState(null);
  const activeScreen = 'dashboard';
  const {
    // isLoading,
    // error,
    data,
  } = useSearchFilterData(authInfo?.user_id);

  const {
    // isLoading: dashboard Loading,
    // error: searchError,
    data: dashboardData,
    status,
    // isFetching,
  } = useDashboardData(active, dashType, true);
  const searchFilterOptions = data?.data || [];
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  // const tileDetails = dashboardData?.data?.data?.summary || [];
  const dashboardDetails = dashboardData?.data?.data?.dashboardDetails || [];
  const x = dashboardDetails.length;
  const [selectGraph, setSelectedGraph] = useState(new Array(x).fill(true));
  const [filters, setFilters] = useState({});
  const searchedQuery = selectedDashboard?.params?.query;
  const guidedSection = selectedDashboard?.params?.guidedSection;
  const { mutateAsync: createEditDashboardData } = useEditSaveDashboardData();
  const { data: savedSearches } = useGetSavedSearchQueryData(
    authInfo?.user_id,
    {
      orderBy: 'name',
    }
  );

  useEffect(() => {
    if (selectedDashboard) {
      let searchParams = selectedDashboard?.params;
      const dateParams = getDateParams(searchParams?.dateTime);
      setDateTimeAvailable(!!dateParams);
      searchParams = {
        ...searchParams,
        dateTime: dateParams,
      };
      setFilters(searchParams);
    }
  }, [selectedDashboard]);

  console.log({ charts: selectedDashboard?.chart_field?.selectedChart });

  function isChartIdMatch(targetChartId) {
    // Check if any item in the selectedChart array has a matching chartId
    return selectedDashboard?.chart_field?.selectedChart.some(
      (chart) => chart.chartId === targetChartId
    );
  }
  const navigate = useNavigate();
  // if (dashboardDataLoading) {
  //   return <Spinner />;
  // }
  // const savedChartName = location?.state?.savedDashboardData?.chart_field?.selectedChart || []

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
    selectedDashboard?.params?.brand_keywords,
    isChartIdMatch('volume_analysis') && dateTimeAvailable
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
    selectedDashboard?.params?.brand_keywords,
    isChartIdMatch('sentiment_analysis') && dateTimeAvailable
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
    selectedDashboard?.params?.brand_keywords,
    isChartIdMatch('sentiment_over_time') && dateTimeAvailable
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
    selectedDashboard?.params?.brand_keywords,
    isChartIdMatch('coverage_over_time') && dateTimeAvailable
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
    selectedDashboard?.params?.brand_keywords,
    isChartIdMatch('reach_over_time') && dateTimeAvailable
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
    selectedDashboard?.params?.brand_keywords,
    selectedDashboard?.params?.competition_keywords,
    isChartIdMatch('sov') && dateTimeAvailable
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
    selectedDashboard?.params?.brand_keywords,
    selectedDashboard?.params?.competition_keywords,
    isChartIdMatch('competitive_coverage_over_time') && dateTimeAvailable
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
    selectedDashboard?.params?.brand_keywords,
    isChartIdMatch('media_type') && dateTimeAvailable
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
    selectedDashboard?.params?.brand_keywords,
    selectedDashboard?.params?.competition_keywords,
    isChartIdMatch('article_sentiment') && dateTimeAvailable
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
    selectedDashboard?.params?.brand_keywords,
    selectedDashboard?.params?.competition_keywords,
    isChartIdMatch('competitive_reach_over_time') && dateTimeAvailable
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
    selectedDashboard?.params?.brand_keywords,
    selectedDashboard?.params?.competition_keywords,
    isChartIdMatch('coverage_by_journalist') && dateTimeAvailable
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
    selectedDashboard?.params?.brand_keywords,
    selectedDashboard?.params?.competition_keywords,
    isChartIdMatch('breakdown_by_media_type') && dateTimeAvailable
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
    selectedDashboard?.params?.brand_keywords,
    selectedDashboard?.params?.competition_keywords,
    isChartIdMatch('coverage_by_source') && dateTimeAvailable
  );

  const {
    isLoading: isPeopleMediaTypeChartLoading,
    data: PeopleMediaTypeChartData,
  } = usePeopleMediaTypeChart(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    selectedDashboard?.params?.person_name,
    isChartIdMatch('people_media_type') && dateTimeAvailable
  );

  const {
    isLoading: isPeopleVolumeAnalysisLoading,
    data: peopleVolumeAnalysisData,
  } = useDashboardPeopleAnalysisData(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    selectedDashboard?.params?.person_name,
    isChartIdMatch('people_volume_analysis') && dateTimeAvailable
  );
  const {
    isLoading: isPeopleSentimentDataLoading,
    data: peopleSentimenetData,
  } = usePeopleDashboardSentimentChartData(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    selectedDashboard?.params?.person_name,
    isChartIdMatch('people_top_source_by_sentiment') && dateTimeAvailable
  );

  const {
    isLoading: isPeopleJournalistSentimentLoading,
    data: peopleJournalistSentimenetData,
  } = usePeopleDashboardJournalistSentimetChart(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    selectedDashboard?.params?.person_name,
    isChartIdMatch('people_top_journalist_by_sentiment') && dateTimeAvailable
  );

  const {
    isLoading: isPeopleCoverageChartLoading,
    data: peopleCoverageChartData,
  } = usePeopleCoverageChart(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    selectedDashboard?.params?.person_name,
    isChartIdMatch('people_coverage_over_time') && dateTimeAvailable
  );
  const {
    isLoading: isPeoplePopularTopicsChartLoading,
    data: peoplePopularTopicsChartData,
  } = usePeoplePopularTopicsChart(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    selectedDashboard?.params?.person_name,
    isChartIdMatch('people_popular_topics') && dateTimeAvailable
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
    isChartIdMatch('industry_volume_analysis') && dateTimeAvailable
  );
  const {
    isLoading: isIndustryCoverageOverTimeLoading,
    isFetching: isIndustryCoverageOverTimeFetching,
    data: industryCoverageOverTimeData,
  } = useIndustryDashboardSentimentChartData(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    isChartIdMatch('industry_sentiment_analysis') && dateTimeAvailable
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
    selectedDashboard?.type === 'authorimpact' && dateTimeAvailable
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
    selectedDashboard.params?.advanced_keywords || [],
    selectedDashboard?.type === 'campaign' && dateTimeAvailable
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
    selectedDashboard.params?.advanced_keywords || [],
    selectedDashboard?.type === 'congruence' && dateTimeAvailable
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
    selectedDashboard.params?.advanced_keywords || [],
    selectedDashboard?.type === 'primpact' && dateTimeAvailable
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
    selectedDashboard?.type === 'sentiments' && dateTimeAvailable
  );

  const {
    isLoading: isIndustrySentimentLoading,
    isFetching: isIndustrySentimentFetching,
    data: industrySentimentData,
  } = useIndustryCoverageOvertime(
    getPayloadForSearch(
      searchedQuery,
      filters,
      searchFilterOptions,
      guidedSection || false,
      true
    ),
    isChartIdMatch('industry_coverage_over_time') && dateTimeAvailable
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
    isChartIdMatch('industry_coverage_by_source') && dateTimeAvailable
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
    isChartIdMatch('industry_companies_mentioned') && dateTimeAvailable
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
    isChartIdMatch('industry_coverage_by_journalist') && dateTimeAvailable
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
    isChartIdMatch('industry_coverage_by_top_publications') && dateTimeAvailable
  );

  const setArticleTypeClose = () => {
    setSelected(null);
    setArticleType(articleTypeDefault);
    setResetSelection(false);
  };

  const handleClick = (index) => {
    // setLoader(true);
    // setfloatingPagination(true);
    // let position = '';
    // if (index % 2 !== 0) {
    //   position = 'left';
    // } else {
    //   position = 'right';
    // }
    // setArticlePosition(position);
    // setLoader(false);
  };

  useEffect(() => {
    if (selected == null) {
      setSelectedGraph(new Array(x).fill(true));
    }
  }, [x, selected]);

  const handleSaveDashborad = async (data, isEdit) => {
    const editedData = {
      dashboard_id: selectedDashboard.id,
      name: data.name,
      description: data.description,
    };
    if (isEdit) {
      await createEditDashboardData(editedData, {
        onSuccess: () => {
          toast.success('Dashboard updated successfully');
        },
      });
    }
  };

  const handleNavigate = () => {
    let searchParams = selectedDashboard?.params;
    const dateParams = getDateParams(searchParams?.dateTime);
    searchParams = {
      ...searchParams,
      dateTime: dateParams,
    };
    const searchInfo = savedSearches?.data?.data?.find(
      (x) => parseInt(selectedDashboard.save_search_id) === parseInt(x?.id)
    );
    navigate(
      `/dashboard/${selectedDashboard.save_search_id}/${selectedDashboard?.type}/${selectedDashboard.id}`,
      {
        state: {
          data: null,
          filters: searchParams,
          savedDashboardData: selectedDashboard,
          search_name:
            searchInfo?.title || selectedDashboard?.params?.searchName || '',
          recent_search_id: selectedDashboard?.recent_search_id,
        },
      }
    );
  };

  return (
    <>
      <DashbordCmnentwpr>
        <DashboardList
          active={active}
          setDashType={setDashType}
          dashType={dashType}
          setActive={handleListClick}
          setListLoading={setListLoading}
          setLength={setLength}
          status={statusSaveDashboard}
          data={savedDashboardData}
          dataAmx={dataAmx}
          fetchNextPage={fetchNextPage}
          setFiterType={setFiterType}
          title={title}
          setSearchQuery={setSearchType}
          searchQuery={searchQuery}
        />
        {!listLoading && status === 'success' && (
          <DashbrdGraphconrwpr
            activeScreen={activeScreen}
            articlePosition={articlePosition}
          >
            <DashboardGraphheaderwpr>
              <HeaderLeft>
                <Titletxtwpr>{selectedDashboard?.name || ''}</Titletxtwpr>
                <Button
                  title={'Edit Dashboard'}
                  backgroundColor={theme[selectedTheme].background}
                  color={theme[selectedTheme].primary}
                  onClick={handleNavigate}
                  border={theme[selectedTheme].primary}
                  icon={<Edit color={theme[selectedTheme].primary} />}
                />
              </HeaderLeft>
            </DashboardGraphheaderwpr>
            {dashboardConfig.advanced.includes(selectedDashboard?.type) && (
              <AdvancedDashboard
                overviewDashboard={selectedDashboard?.type}
                activeScreen={'overview-advanced'}
                advancedWidgetDetails={{
                  campaign: {
                    isLoading:
                      isCampaignAnalysisDataFetching ||
                      isCampaignAnalysisDataLoading,
                    show: selectedDashboard?.type === 'campaign',
                    data: campaignDashboardData,
                    customClassName: 'campaign_analysis',
                  },
                  authorimpact: {
                    isLoading: isAuthorImpactFetching || isAuthorImpactLoading,
                    data: authorImpactDashboardData,
                    customClassName: 'authorimpact',
                    show: selectedDashboard?.type === 'authorimpact',
                  },
                  sentiments: {
                    isLoading:
                      isSentimentByThemeLoading || isSentimentByThemeFetching,
                    show: selectedDashboard?.type === 'sentiments',
                    data: sentimentByThemeData,
                    customClassName: 'sentimentByTheme',
                  },
                  congruence: {
                    isLoading:
                      isCongrunceDataFetching || isCongruenceDataLoading,
                    show: selectedDashboard?.type === 'congruence',
                    data: congruenceData,
                    customClassName: 'congruence',
                  },
                  primpact: {
                    isLoading: prImpactLoading || prImpactFetching,
                    show: selectedDashboard?.type === 'primpact',
                    data: prImpactData,
                    customClassName: 'primpact',
                  },
                }}
                overView={false}
                articlePosition={articlePosition}
                setClickedPosition={setArticlePosition}
              />
            )}
            <DashboardInnerContainer
              setClickedPosition={handleClick}
              // dashboardDetails={dashboardDetails}
              dashboardDetails={[]}
              tileDetails={false}
              selected={selected}
              loader={loader}
              setSelected={setSelected}
              articleType={articleType}
              setArticlePosition={setArticlePosition}
              setArticleType={setArticleType}
              overRideSlot={activeScreen === ''}
              articlePosition={articlePosition}
              resetSelection={resetSelection}
              setResetSelection={setResetSelection}
              setArticleTypeClose={setArticleTypeClose}
              selectGraph={selectGraph}
              setSelectedGraph={setSelectedGraph}
              actionOption={false}
              dashboardType={'grid-dashboard'}
              volumeAnalysisWidgetDetails={{
                isLoading: isVolumeAnalysisFetching || isVolumeAnalysisLoading,
                show:
                  !selectedDashboard?.params?.competition_keywords?.length >
                    0 || selectedDashboard?.type === 'custom'
                    ? selectedDashboard?.chart_field?.selectedChart?.some(
                        (chart) => chart.chartId === 'volume_analysis'
                      )
                    : false,
                data: {
                  ...volumeAnalysisData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'volume_analysis';
                  })?.chartName,
                },
                customClassName: 'volume_analysis',
              }}
              sentimentAnalysisWidgetDetails={{
                isLoading: isSentimentDataLoading || isSentimentDataFetching,
                show:
                  !selectedDashboard?.params?.competition_keywords?.length >
                    0 || selectedDashboard?.type === 'custom'
                    ? selectedDashboard?.chart_field?.selectedChart?.some(
                        (chart) => chart.chartId === 'sentiment_analysis'
                      )
                    : false,
                data: {
                  ...sentimentData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'sentiment_analysis';
                  })?.chartName,
                },
                customClassName: 'sentiment_analysis',
              }}
              sentimeOverTimeWidgetDetails={{
                isLoading:
                  isSentimentOvertimeLoading || isSentimeentOvertimeFetching,
                show:
                  !selectedDashboard?.params?.competition_keywords?.length >
                    0 || selectedDashboard?.type === 'custom'
                    ? selectedDashboard?.chart_field?.selectedChart?.some(
                        (chart) => chart.chartId === 'sentiment_over_time'
                      )
                    : false,
                data: {
                  ...sentimenetOvertimeData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'sentiment_over_time';
                  })?.chartName,
                },
                customClassName: 'sentiment_over_time',
              }}
              coverageOverTimeBrandWidgetDetails={{
                isLoading:
                  isCoverageOvertimeBrandDataFetching ||
                  isCoverageOvertimeBrandDataLoading,
                show:
                  !selectedDashboard?.params?.competition_keywords?.length >
                    0 || selectedDashboard?.type === 'custom'
                    ? selectedDashboard?.chart_field?.selectedChart?.some(
                        (chart) => chart.chartId === 'coverage_over_time'
                      )
                    : false,
                data: {
                  ...coverageOvertimeBrandData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'coverage_over_time';
                  })?.chartName,
                },
                customClassName: 'coverage_over_time',
              }}
              reachOvertimeBrandWidgetDetails={{
                isLoading:
                  isReachOvertimeBrandDataFetching ||
                  isReachOvertimeBrandDataLoading,
                show:
                  !selectedDashboard?.params?.competition_keywords?.length >
                    0 || selectedDashboard?.type === 'custom'
                    ? selectedDashboard?.chart_field?.selectedChart?.some(
                        (chart) => chart.chartId === 'reach_over_time'
                      )
                    : false,
                data: {
                  ...reachOvertimeBrandData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'reach_over_time';
                  })?.chartName,
                },
                customClassName: 'reach_over_time',
              }}
              mediaTypeLWidgetDetails={{
                isLoading: isMediaFetching || isMediaLoading,
                show:
                  !selectedDashboard?.params?.competition_keywords?.length >
                    0 || selectedDashboard?.type === 'custom'
                    ? selectedDashboard?.chart_field?.selectedChart?.some(
                        (chart) => chart.chartId === 'media_type'
                      )
                    : false,
                data: {
                  ...mediaData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'media_type';
                  })?.chartName,
                },
                customClassName: 'media_type',
              }}
              SOVWidgetDetails={{
                isLoading: isSOVDataFetching || isSOVDataLoading,
                show:
                  selectedDashboard?.params?.competition_keywords?.length > 0 ||
                  selectedDashboard?.type === 'custom'
                    ? selectedDashboard?.chart_field?.selectedChart?.some(
                        (chart) => chart.chartId === 'sov'
                      )
                    : false,
                data: {
                  ...SOVData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'sov';
                  })?.chartName,
                },
                customClassName: 'sov',
              }}
              coverageOverTimeCompWidgetDetails={{
                isLoading:
                  isCoverageOvertimeBrandCompetitionDFetching ||
                  isCoverageOvertimeBrandCompetitionDLoading,
                show:
                  selectedDashboard?.params?.competition_keywords?.length > 0 ||
                  selectedDashboard?.type === 'custom'
                    ? selectedDashboard?.chart_field?.selectedChart?.some(
                        (chart) =>
                          chart.chartId === 'competitive_coverage_over_time'
                      )
                    : false,
                data: {
                  ...coverageOvertimeCompData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'competitive_coverage_over_time';
                  })?.chartName,
                },
                customClassName: 'competitive_coverage_over_time',
              }}
              sentimentCompWidgetDetails={{
                isLoading: isSentimentCompLoading || isSentimentCompFetching,
                show:
                  selectedDashboard?.params?.competition_keywords?.length > 0 ||
                  selectedDashboard?.type === 'custom'
                    ? selectedDashboard?.chart_field?.selectedChart?.some(
                        (chart) => chart.chartId === 'article_sentiment'
                      )
                    : false,
                data: {
                  ...sentimentCompData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'article_sentiment';
                  })?.chartName,
                },
                customClassName: 'article_sentiment',
              }}
              reachOvertimeCompWidgetDetails={{
                isLoading:
                  isReachOvertimeCompFetching || isReachOvertimeCompLoading,
                show:
                  selectedDashboard?.params?.competition_keywords?.length > 0 ||
                  selectedDashboard?.type === 'custom'
                    ? selectedDashboard?.chart_field?.selectedChart?.some(
                        (chart) =>
                          chart.chartId === 'competitive_reach_over_time'
                      )
                    : false,
                data: {
                  ...reachOvertimeCompData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'competitive_reach_over_time';
                  })?.chartName,
                },
                customClassName: 'competitive_reach_over_time',
              }}
              mediaBreakdownWidgetDetails={{
                isLoading: isMediaBreakdownFetching || isMediaBreakdownLoading,
                show:
                  selectedDashboard?.params?.competition_keywords?.length > 0 ||
                  selectedDashboard?.type === 'custom'
                    ? selectedDashboard?.chart_field?.selectedChart?.some(
                        (chart) => chart.chartId === 'breakdown_by_media_type'
                      )
                    : false,
                data: {
                  ...mediaBreakdownData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'breakdown_by_media_type';
                  })?.chartName,
                },
                customClassName: 'breakdown_by_media_type',
              }}
              journalistWidgetDetails={{
                isLoading:
                  isJournalistCoverageDataFetching ||
                  isJournalistCoverageDataLoading,
                show:
                  selectedDashboard?.params?.competition_keywords?.length > 0 ||
                  selectedDashboard?.type === 'custom'
                    ? selectedDashboard?.chart_field?.selectedChart?.some(
                        (chart) => chart.chartId === 'coverage_by_journalist'
                      )
                    : false,
                data: {
                  ...journalistCoverageData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'coverage_by_journalist';
                  })?.chartName,
                },
                customClassName: 'coverage_by_journalist',
              }}
              sourceCompWidgetDetails={{
                isLoading: isSourceCompDataFetching || isSourceCompDataLoading,
                show:
                  selectedDashboard?.params?.competition_keywords?.length > 0 ||
                  selectedDashboard?.type === 'custom'
                    ? selectedDashboard?.chart_field?.selectedChart?.some(
                        (chart) => chart.chartId === 'coverage_by_source'
                      )
                    : false,
                data: {
                  ...sourceCompData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'coverage_by_source';
                  })?.chartName,
                },
                customClassName: 'coverage_by_source',
              }}
              peopleVolumeAnalysisWidgetDetails={{
                isLoading: isPeopleVolumeAnalysisLoading,
                show: selectedDashboard?.chart_field?.selectedChart?.some(
                  (chart) => chart.chartId === 'people_volume_analysis'
                ),
                data: {
                  ...peopleVolumeAnalysisData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'people_volume_analysis';
                  })?.chartName,
                },
                customClassName: 'people_volume_analysis',
              }}
              topJournalistSentimentAnalysisWidgetDetails={{
                isLoading: isPeopleJournalistSentimentLoading,
                show: selectedDashboard?.chart_field?.selectedChart?.some(
                  (chart) =>
                    chart.chartId === 'people_top_journalist_by_sentiment'
                ),
                data: {
                  ...peopleJournalistSentimenetData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'people_top_journalist_by_sentiment';
                  })?.chartName,
                },
                customClassName: 'people_top_journalist_by_sentiment',
              }}
              peopleSentimentAnalysisWidgetDetails={{
                isLoading: isPeopleSentimentDataLoading,
                show:
                  selectedDashboard?.chart_field?.selectedChart?.some(
                    (chart) =>
                      chart.chartId === 'people_top_source_by_sentiment'
                  ) && peopleSentimenetData,
                data: {
                  ...peopleSentimenetData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'people_top_source_by_sentiment';
                  })?.chartName,
                },
                customClassName: 'people_top_source_by_sentiment',
              }}
              peopleCoverageChartDataWidgetDetails={{
                isLoading: isPeopleCoverageChartLoading,
                show: selectedDashboard?.chart_field?.selectedChart?.some(
                  (chart) => chart.chartId === 'people_coverage_over_time'
                ),
                data: {
                  ...peopleCoverageChartData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'people_coverage_over_time';
                  })?.chartName,
                },
                customClassName: 'people_coverage_over_time',
              }}
              peopleThemeWidgetDetails={{
                isLoading: isPeoplePopularTopicsChartLoading,
                show: selectedDashboard?.chart_field?.selectedChart?.some(
                  (chart) => chart.chartId === 'people_popular_topics'
                ),
                data: {
                  ...peoplePopularTopicsChartData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'people_popular_topics';
                  })?.chartName,
                },
                customClassName: 'people_popular_topics',
              }}
              peopleMediaTypeWidgetDetails={{
                isLoading: isPeopleMediaTypeChartLoading,
                show: selectedDashboard?.chart_field?.selectedChart?.some(
                  (chart) => chart.chartId === 'people_media_type'
                ),
                data: {
                  ...PeopleMediaTypeChartData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'people_media_type';
                  })?.chartName,
                },
                customClassName: 'people_media_type',
              }}
              industryVolumeAnalysisWidgetDetails={{
                isLoading:
                  isIndustryAnalysisLoading || isIndustryAnalysisFetching,
                show: selectedDashboard?.chart_field?.selectedChart?.some(
                  (chart) => chart.chartId === 'industry_volume_analysis'
                ),
                data: {
                  ...industryAnalysisData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'industry_volume_analysis';
                  })?.chartName,
                },
                customClassName: 'industry_volume_analysis',
              }}
              industrySentimentWidgetDetails={{
                isLoading:
                  isIndustrySentimentLoading || isIndustrySentimentFetching,
                show: selectedDashboard?.chart_field?.selectedChart?.some(
                  (chart) => chart.chartId === 'industry_sentiment_analysis'
                ),
                data: {
                  ...industrySentimentData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'industry_sentiment_analysis';
                  })?.chartName,
                },
                customClassName: 'industry_sentiment_analysis',
              }}
              industryCoverageOverTimeWidgetDetails={{
                isLoading:
                  isIndustryCoverageOverTimeLoading ||
                  isIndustryCoverageOverTimeFetching,
                show: selectedDashboard?.chart_field?.selectedChart?.some(
                  (chart) => chart.chartId === 'industry_coverage_over_time'
                ),
                data: {
                  ...industryCoverageOverTimeData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'industry_coverage_over_time';
                  })?.chartName,
                },
                customClassName: 'industry_coverage_over_time',
              }}
              industryCoverageBySourceWidgetDetails={{
                isLoading:
                  isIndustryCoverageBySourceFetching ||
                  isIndustryCoverageBySourceLoading,
                show: selectedDashboard?.chart_field?.selectedChart?.some(
                  (chart) => chart.chartId === 'industry_coverage_by_source'
                ),
                data: {
                  ...industryCoverageBySourceData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'industry_coverage_by_source';
                  })?.chartName,
                },
                customClassName: 'industry_coverage_by_source',
              }}
              industryCompaniesWidgetDetails={{
                isLoading:
                  isIndustryCompaniesFetching || isIndustryCompaniesLoading,
                show: selectedDashboard?.chart_field?.selectedChart?.some(
                  (chart) => chart.chartId === 'industry_companies_mentioned'
                ),
                data: {
                  ...industryCompaniesData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'industry_companies_mentioned';
                  })?.chartName,
                },
                customClassName: 'industry_companies_mentioned',
              }}
              industryCoverageByJournalistsWidgetDetails={{
                isLoading:
                  isIndustryCoverageByJournalistsLoading ||
                  isIndustryCoverageByJournalistsFetching,
                show: selectedDashboard?.chart_field?.selectedChart?.some(
                  (chart) => chart.chartId === 'industry_coverage_by_journalist'
                ),
                data: {
                  ...industryCoverageByJournalistsData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return x.chartId === 'industry_coverage_by_journalist';
                  })?.chartName,
                },
                customClassName: 'industry_coverage_by_journalist',
              }}
              industryPublicationsWidgetDetails={{
                isLoading:
                  isIndustryPublicationsFetching ||
                  isIndustryPublicationsLoading,
                show: selectedDashboard?.chart_field?.selectedChart?.some(
                  (chart) =>
                    chart.chartId === 'industry_coverage_by_top_publications'
                ),
                data: {
                  ...industryPublicationsData,
                  title: (
                    selectedDashboard?.chart_field?.selectedChart || []
                  ).find((x) => {
                    return (
                      x.chartId === 'industry_coverage_by_top_publications'
                    );
                  })?.chartName,
                },
                customClassName: 'industry_coverage_by_top_publications',
              }}
              savedSelectedChart={selectedDashboard?.chart_field?.selectedChart}
            />
            <ArticleSectionComponentWrp articlePosition={articlePosition}>
              <IconWrapper
                articlePosition={articlePosition}
                onClick={() => {
                  setArticlePosition('');
                  setArticleTypeClose();
                  setSelected(null);
                  setResetSelection(false);
                }}
              >
                <XCirlcle width={'1.5rem'} height="1.5rem" />
              </IconWrapper>
              <ArticleSectionComponent
                articleType={articleType}
                activeScreen={activeScreen}
                setArticleTypeClose={setArticleTypeClose}
                page={page}
                setPage={setPage}
                setSelected={setSelected}
                type={type}
                setType={setType}
                setTotal={setLength}
                id={active}
                setArticlePosition={setArticlePosition}
                articlePosition={articlePosition}
                floatingPagination={floatingPagination}
              />
            </ArticleSectionComponentWrp>
          </DashbrdGraphconrwpr>
        )}
      </DashbordCmnentwpr>
      <DashboardPopup
        popContent={
          <SaveSourcePopup
            heading="Save Dashboard"
            toggler={(value) => {
              setSavePopup(value);
            }}
            selectedItem={{
              name: selectedDashboard?.name,
              description: selectedDashboard?.description,
            }}
            handleSaveDashboard={handleSaveDashborad}
          />
        }
        open={savePopup}
        toggler={setSavePopup}
        padding="0"
        borderRadius="0.625rem"
        width={'43.75rem'}
      />
    </>
  );
};

GridDashboard.propTypes = {
  setLength: PropTypes.func,
  setSearchType: PropTypes.func,
  statusSaveDashboard: PropTypes.string,
  savedDashboardData: PropTypes.object,
  dataAmx: PropTypes.array,
  setFiterType: PropTypes.string,
  fetchNextPage: PropTypes.number,
  title: PropTypes.string,
  searchQuery: PropTypes.string,
};

export default GridDashboard;
