import React, { useState } from 'react';
import Proptypes, { object } from 'prop-types';
import {
  ButtonBoxwpr,
  Inputwrpr,
  Labelwrpr,
  MainTitleBox,
  MainTitlewrpr,
  SearchHeader,
  SearchPopwrpr,
  Searchwpr,
} from '../search-popup/index.sc';
import { SearchIcon } from '../../assets/icons/SearchIcon';
// import { Save } from '../../assets/icons/Save';
import { ContentBox } from '../search-popup/ContentBox';
// import Tabs from '../tabs';
// import { theme } from '../../constants/theme';
// import { PoptabTitleBox } from '../custom-drawer/mock';
import ListView from '../../assets/icons/ListView';
import GridView from '../../assets/icons/GridView';
import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosGet } from '../../service';
// import { useSelector } from 'react-redux';
// import useDebounce from '../../hooks/useDebounce';
// import { NewsltrContentBox } from '../newsletter-popup/NewsltrContentBox';
import { useGetSavedDashboardQueryData } from '../../hooks/useSaveDashboard';

const SavedDashboardPopup = ({
  mainTitle = 'All Dashboards',
  placeholder = 'Search',
  isNewsletter = false,
  toggler,
  handleClick = () => {},
  titleClick = () => {
    console.log();
  },
  isPopup = true,
  Frames,
  isIcons = true,
  isCheckBox,
}) => {
  const [checkeditems, setCheckedItems] = useState([]);
  const [searchTxt, setSearchTxt] = useState('');
  // const queryClient = useQueryClient();
  const pageLimit = 10;
  //   const [fiterType, setFiterType] = useState('');

  const dashboardType = 'all_dashboards';
  // const [searchQuery, setSearchQuery] = useState('');
  //   const [sortBy, setSortBy] = useState('');
  //   const [orderBy, setOrderBy] = useState('');
  //   const debouncedSearch = useDebounce(searchQuery, 1000);

  //   const getSavedSearches = ({ pageParam, fiterType }) => {
  //     return axiosGet('/saved-search', {
  //       limit: pageLimit,
  //       page: pageParam,
  //       fiterType,
  //     });
  //   };
  const { data: dashboardData, isLoading: dashboardLoading } =
    useGetSavedDashboardQueryData();

  const getSavedDashboard = ({
    pageParam,
    sortBy,
    orderBy,
    // debouncedSearch,
  }) => {
    const params = {};
    // if (dashboardType) {
    params.dashboardType = dashboardType;
    // }
    if (sortBy && orderBy) {
      params.sortBy = sortBy;
      params.OrderBy = orderBy;
    }
    // if (debouncedSearch) {
    //   params.searchType = debouncedSearch;
    // }
    return axiosGet('/saved-dashboard', {
      ...params,
      limit: pageLimit,
      page: pageParam,
    });
  };

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [
      'saved-dashboard-list',
      dashboardType,
      //   sortBy,
      //   orderBy,
      //   debouncedSearch,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getSavedDashboard({
        pageParam,
        // sortBy,
        // orderBy,
        // debouncedSearch,
      }),
    refetchOnWindowFocus: false,
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
  });

  //   const length = data?.pages[0].data.total;

  //   const getSharedSearches = ({ pageParam, fiterType }) => {
  //     return axiosGet('/shared-search', {
  //       limit: pageLimit,
  //       page: pageParam,
  //       fiterType,
  //     });
  //   };

  //   const {
  //     // isLoading,
  //     // error,
  //     data: sharedData,
  //     // isFetching,
  //     isLoading: sharedLoading,
  //     // hasNextPage,
  //     fetchNextPage: sharedFetchNextPage,
  //     // isFetchingNextPage,
  //   } = useInfiniteQuery(
  //     ['shared-searches', fiterType],
  //     async ({ pageParam = 1 }) => getSharedSearches({ pageParam, fiterType }),
  //     {
  //       refetchOnWindowFocus: false,
  //       getNextPageParam: (_, pages) => {
  //         return pages.length + 1;
  //       },
  //     }
  //   );

  //   const sharedSearchLength = sharedData?.pages[0].data.total;

  //   const selectedTheme = useSelector((store) => {
  //     return store?.theme.theme || {};
  //   });
  //   const [tab, setTab] = useState(0);

  //   const Titletabs = [
  //     {
  //       id: 0,
  //       title: <PoptabTitleBox title={`SAVED (${length || '00'})`} />,
  //       content: <></>,
  //       data,
  //       loadMore: fetchNextPage,
  //       isLoading,
  //     },
  //     {
  //       id: 1,
  //       title: (
  //         <PoptabTitleBox
  //           title={`SHARED WITH ME (${sharedSearchLength || '00'})`}
  //         />
  //       ),
  //       content: <></>,
  //       data: sharedData,
  //       loadMore: sharedFetchNextPage,
  //       isLoading: sharedLoading,
  //     },
  //   ];

  //   const handleTab = (index) => {
  //     setTab(index);
  //     setCheckedItems([]);
  //   };
  const handleFilter = (type) => {
    // setFiterType(type);
    // queryClient.invalidateQueries(['saved-searches', type]);
  };

  return (
    <SearchPopwrpr isNewsletter={isNewsletter}>
      {isPopup && (
        <SearchHeader>
          <MainTitleBox isNewsletter={isNewsletter}>
            <MainTitlewrpr isNewsletter={isNewsletter}>
              {mainTitle}
            </MainTitlewrpr>
            {!isNewsletter && false && <ButtonBoxwpr>Create New</ButtonBoxwpr>}
          </MainTitleBox>

          <Searchwpr isNewsletter={isNewsletter}>
            <Labelwrpr isNewsletter={isNewsletter}>
              <SearchIcon />
              <Inputwrpr
                placeholder={placeholder}
                value={searchTxt}
                onChange={(e) => setSearchTxt(e.target.value)}
              />
            </Labelwrpr>
            {false && <ListView />}
            {false && <GridView />}
          </Searchwpr>
        </SearchHeader>
      )}
      <ContentBox
        // data={data}
        dataAmx={dashboardData}
        checkeditems={checkeditems}
        isPopup={isPopup}
        Frames={Frames}
        handleLoad={fetchNextPage}
        handleCheckedItems={setCheckedItems}
        handleFilter={handleFilter}
        isLoading={dashboardLoading}
        handleClick={handleClick}
        titleClick={titleClick}
        toggler={toggler}
        isIcons={isIcons}
        isCheckBox={false}
        searchTxt={searchTxt}
      />
    </SearchPopwrpr>
  );
};

SavedDashboardPopup.propTypes = {
  mainTitle: Proptypes.string,
  placeholder: Proptypes.string,
  isNewsletter: Proptypes.bool,
  toggler: Proptypes.func,
  handleClick: Proptypes.func,
  isPopup: Proptypes.bool,
  Frames: Proptypes.arrayOf(object),
  isIcons: Proptypes.bool,
  titleClick: Proptypes.func,
  isCheckBox: Proptypes.bool,
};

export default SavedDashboardPopup;
