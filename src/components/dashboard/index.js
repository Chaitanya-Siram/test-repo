import React, { useEffect, useState } from 'react';
import AppBG from '../app-bg';
import AppHeader from '../app-header';
import {
  DashboardBoxwpr,
  DashboardHeader,
  DashboardPagewpr,
  Dashboardwpr,
  HeaderRight,
  HeaderTitlewpr,
  Iconwpr,
  LeftWrp,
  RightWrp,
} from './index.sc';
import GridDashboard from './GridDashboard';
import NpLeftSidebar from '../../assets/icons/Np_left_sidebar';
import ListIcon2 from '../../assets/icons/ListIcon2';

import { CrossButtonWrp } from '../../pages/news-letter/newsletter-top-section/top-bar/index.sc';
import ArrowLeft from '../../assets/icons/ArrowLeft';
import { useNavigate } from 'react-router-dom';
import DashboardTable from './dashboardTable';
import AppFooter from '../../components/app-footer';
import ReusableDropDown from '../Drop-down-reusable';
import Brand from '../../assets/icons/create-dashboard/dropdown/brand.svg';
import Advanced from '../../assets/icons/create-dashboard/dropdown/advanced.svg';
import People from '../../assets/icons/create-dashboard/dropdown/people.svg';
import Industry from '../../assets/icons/create-dashboard/dropdown/industry.svg';
import Custom from '../../assets/icons/create-dashboard/dropdown/custom.svg';
import Add2 from '../../assets/icons/Add2';
import CustomPopupWrapper from '../custom-popup-wrapper';
import { ButtonBoxwpr, ButtonWrapper } from '../nav-section/index.sc';
import { useSelector } from 'react-redux';
import { Frames } from '../search-popup/contents';
import { theme } from '../../constants/theme';
import CustomDashboardCanvas from '../custom-dashboard-canvas';
import SearchPopup from '../search-popup/SearchPopContent';
import DashboardPopup from '../dasboard-popup';
import { axiosGet } from '../../service';
import { useInfiniteQuery } from '@tanstack/react-query';
import useDebounce from '../../hooks/useDebounce';
import {
  useSavedDashboardQueryCount,
  useGetSavedDashboardQueryData,
} from '../../hooks/useSaveDashboard';
import { getSearchParams } from '../../utils';
import toast from 'react-hot-toast';
const Dashboard = () => {
  const [view, setView] = useState('dashboard');

  const [length, setLength] = useState(0);
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };
  const dropdownOptions = [
    {
      label: 'Brand & Competition',
      value: 'brand',
      icon: Brand,
      subText: '13 Charts',
    },
    {
      label: 'People',
      value: 'people',
      icon: People,
      subText: '6 Charts',
    },
    {
      label: 'Industry',
      value: 'industry',
      icon: Industry,
      subText: '7 Charts',
    },
    {
      label: 'Advanced',
      value: 'advanced',
      icon: Advanced,
      subText: '5 Charts',
      children: [
        {
          label: 'Campaign Monitor',
          value: 'campaign',
        },
        {
          label: 'Author Impact',
          value: 'authorimpact',
        },
        {
          label: 'Sentiments By Themes',
          value: 'sentiments',
        },
        {
          label: 'Message Congruence',
          value: 'congruence',
        },
        {
          label: 'PR Impact',
          value: 'primpact',
        },
      ],
    },
    {
      label: 'Custom',
      value: 'custom',
      icon: Custom,
      subText: '26 Charts',
    },
  ];
  // create dashboard
  const [showCreateDashboard, setShowCreateDashboard] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState('');
  const [selectedCustomSearch, setSelectedCustomSearch] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const handleSearchForCustom = (e) => {
    let searchParams = JSON.parse(e?.search_params);
    searchParams = getSearchParams(searchParams);
    const stateData = {
      filters: {
        ...searchParams?.filters?.filter,
        query: searchParams?.filters?.query,
        guidedSection: searchParams?.isGuidedSearch,
      },
      recent_searchId: e.recent_search_id,
      search_name: e?.title,
    };
    if (selectedDashboard === 'custom') {
      setCurrentStep(2);
      setSelectedCustomSearch(e);
    } else {
      const advancedDashboards = dropdownOptions.find(
        (x) => x.value === 'advanced'
      )?.children;
      if (advancedDashboards.some((x) => x.value === selectedDashboard)) {
        if (
          searchParams?.filters?.filter?.sentiment &&
          searchParams?.filters?.filter?.sentiment?.length === 1 &&
          searchParams?.filters?.filter?.sentiment[0]?.value === 'NEU'
        ) {
          toast.error(
            'The saved search is based on neutral sentiment. Please unselect the sentiment filter in the Saved Search query.'
          );
          return;
        }
      }
      navigate(`/dashboard/${e.id}/${selectedDashboard}/`, {
        state: stateData,
      });
    }
  };
  const createDashboard = (path) => {
    setSelectedDashboard(path);
    setShowCreateDashboard(true);
    setCurrentStep(1);
  };
  const childNavigation = (e) => {
    setCurrentStep(1);
    setShowCreateDashboard(true);
    setSelectedDashboard(e);
  };
  useEffect(() => {
    setCurrentStep(1);
  }, [showCreateDashboard]);
  const handleCheckedItems = (e) => {
    setSelectedItems(e);
  };
  const [selectedItems, setSelectedItems] = useState({});
  const pageLimit = 10;
  const [searchQuery, setSearchType] = useState('');
  const [count, setCount] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 1000);
  const [dashboardType, setDashboardType] = useState('recent');
  const { data: totalSavedDashboards } = useSavedDashboardQueryCount();
  const { data: dashboardData } = useGetSavedDashboardQueryData(dashboardType);

  useEffect(() => {
    setLength(totalSavedDashboards?.data?.total_count);
  }, [totalSavedDashboards]);

  const getSavedDashboard = ({
    pageParam,
    sortBy,
    orderBy,
    debouncedSearch,
  }) => {
    const params = {};
    if (dashboardType) {
      params.dashboardType = dashboardType;
    }
    if (sortBy && orderBy) {
      params.sortBy = sortBy;
      params.OrderBy = orderBy;
    }
    if (debouncedSearch) {
      params.searchType = debouncedSearch;
    }
    return axiosGet('/saved-dashboard', {
      ...params,
      limit: pageLimit,
      page: pageParam,
    });
  };

  const {
    data,
    status: statusSaveDashboard,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [
      'saved-dashboard-list',
      dashboardType,
      sortBy,
      orderBy,
      debouncedSearch,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getSavedDashboard({
        pageParam,
        sortBy,
        orderBy,
        debouncedSearch,
      }),
    refetchOnWindowFocus: false,
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
  });
  const handleFilter = (sortItemType) => {
    if (sortItemType === sortBy) {
      if (count % 3 === 0) {
        setCount((prev) => prev + 1);
        setOrderBy('asc');
        setSortBy(sortItemType);
      } else if (count % 3 === 1) {
        setCount((prev) => prev + 1);
        setSortBy(sortItemType);
        setOrderBy('desc');
      } else {
        setOrderBy('');
        setOrderBy('');
        setCount(0);
      }
    } else {
      setCount((prev) => 0);
      setSortBy(sortItemType);
      setOrderBy('asc');
      setCount((prev) => prev + 1);
    }
  };
  const handleDashboard = (value) => {
    setDashboardType(value);
  };

  return (
    <DashboardPagewpr>
      <AppBG />
      <AppHeader />
      <Dashboardwpr>
        <DashboardHeader>
          <LeftWrp>
            <CrossButtonWrp onClick={handleClose}>
              <ArrowLeft color={'#656B8A'} width="2rem" />
            </CrossButtonWrp>
            <HeaderTitlewpr>All Dashboards ({length})</HeaderTitlewpr>
          </LeftWrp>
          <RightWrp>
            <ReusableDropDown
              dropdownArray={dropdownOptions}
              label="Create Dashboard"
              frontIcon={<Add2 height={'1rem'} color={'#fff'}></Add2>}
              navigation={createDashboard}
              childNavigation={childNavigation}
            ></ReusableDropDown>
            <HeaderRight>
              <Iconwpr
                active={view === 'dashboard'}
                onClick={() => setView('dashboard')}
              >
                <NpLeftSidebar
                  color={view === 'dashboard' ? '#675EF2' : '#656B8A'}
                />
              </Iconwpr>
              <Iconwpr onClick={() => setView('list')} active={view === 'list'}>
                <ListIcon2 color={view === 'list' ? '#675EF2' : '#656B8A'} />
              </Iconwpr>
            </HeaderRight>
          </RightWrp>
        </DashboardHeader>
        <DashboardBoxwpr className="dashboardmainDiv">
          {view === 'dashboard' && (
            <GridDashboard
              setLength={setLength}
              setView={setView}
              savedDashboardData={data}
              dataAmx={dashboardData?.data}
              statusSaveDashboard={statusSaveDashboard}
              fetchNextPage={fetchNextPage}
              setFiterType={handleDashboard}
              title={dashboardType}
              setSearchType={setSearchType}
              dashboardType={dashboardType}
              searchQuery={searchQuery}
            />
          )}
          {view === 'list' && (
            <DashboardTable
              dashboardType={dashboardType}
              setDashboardType={setDashboardType}
              setLength={setLength}
              data={data}
              dataAmx={dashboardData}
              handleFilter={handleFilter}
              fetchNextPage={fetchNextPage}
              setSearchType={setSearchType}
              sortBy={sortBy}
              orderBy={orderBy}
              searchQuery={searchQuery}
              debouncedSearch={debouncedSearch}
            />
          )}
        </DashboardBoxwpr>
      </Dashboardwpr>
      <AppFooter />
      <DashboardPopup
        open={showCreateDashboard}
        toggler={setShowCreateDashboard}
        width={
          currentStep === 1
            ? '58.75rem'
            : currentStep === 2
            ? '62.5rem'
            : 'auto'
        }
        popContent={
          currentStep === 1 ? (
            <SearchPopup
              Frames={Frames}
              handleClick={handleSearchForCustom}
              isCheckBox={false}
              isIcons={false}
              showChip={false}
            />
          ) : (
            <CustomPopupWrapper
              heading="Select Charts for Dashboard"
              footer={
                <ButtonWrapper>
                  <ButtonBoxwpr
                    onClick={() => {
                      setSelectedItems({});
                      setShowCreateDashboard(false);
                    }}
                    border="1px solid #535770"
                  >
                    Cancel
                  </ButtonBoxwpr>
                  <ButtonBoxwpr
                    background={theme[selectedTheme].primary}
                    fontColor={'#fff'}
                    onClick={() => {
                      if (
                        !Object.keys(selectedItems).filter(
                          (items) =>
                            Object.keys(selectedItems[items]).filter(
                              (item) => selectedItems[items][item]
                            ).length
                        ).length
                      ) {
                        return;
                      }
                      let searchParams = JSON.parse(
                        selectedCustomSearch?.search_params
                      );
                      searchParams = getSearchParams(searchParams);
                      navigate(
                        `/dashboard/${selectedCustomSearch?.id}/${selectedDashboard}/`,
                        {
                          state: {
                            filters: {
                              ...searchParams?.filters?.filter,
                              query: searchParams?.filters?.query,
                              guidedSection: searchParams?.isGuidedSearch,
                            },
                            selectedItems: JSON.stringify(selectedItems),
                            search_name: selectedCustomSearch?.title,
                          },
                        }
                      );
                      setShowCreateDashboard(false);
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
          )
        }
        padding="0"
        Cross={true}
        borderRadius="0.75rem"
      />
    </DashboardPagewpr>
  );
};

export default Dashboard;
