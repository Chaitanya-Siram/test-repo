import React, { useCallback, useEffect, useState } from 'react';
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
} from './index.sc';
import { SearchIcon } from '../../assets/icons/SearchIcon';
// import { Save } from '../../assets/icons/Save';
import { ContentBox } from './ContentBox';
import Tabs from '../tabs';
import { theme } from '../../constants/theme';
import { PoptabTitleBox } from '../custom-drawer/mock';
import ListView from '../../assets/icons/ListView';
import GridView from '../../assets/icons/GridView';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { axiosPostRequest, axiosGet } from '../../service';
import { useSelector } from 'react-redux';
import { getTokenData } from '../../constants/validateToken';
import {
  useDeleteSearchQueryData,
  useGetSavedSearchQueryData,
  useSavedSearchQueryCount,
} from '../../hooks/useSaveSearch';
import toast from 'react-hot-toast';
// import { NewsltrContentBox } from '../newsletter-popup/NewsltrContentBox';

const SearchPopup = ({
  mainTitle = 'Saved Searches',
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
  showChip,
  isTriangle = true,
  setConfirmationPopUp,
  deletedbtn,
  setDeletedbtn,
  setSeleteditem,
  setSavePopup,
  setSeletedTab,
  setIsDashboardsAssociated,
}) => {
  const [checkeditems, setCheckedItems] = useState([]);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const queryClient = useQueryClient();
  const pageLimit = 10;
  const [fiterType, setFiterType] = useState('');

  const [searchTxt, setSearchTxt] = useState('');

  const authInfo = getTokenData();

  const getSavedSearches = ({ pageParam, fiterType }) => {
    return axiosGet('/saved-search', {
      limit: pageLimit,
      page: pageParam,
      fiterType,
    });
  };

  const {
    // isLoading,
    // error,
    // isFetching,
    // hasNextPage,
    fetchNextPage,
    // isFetchingNextPage,
  } = useInfiniteQuery(
    ['saved-searches', fiterType],
    async ({ pageParam = 1 }) => getSavedSearches({ pageParam, fiterType }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    }
  );

  const { data: savedSearchData, isLoading } = useGetSavedSearchQueryData(
    authInfo?.user_id,
    { orderBy: 'name' }
  );

  const { data: totalSavedSearches } = useSavedSearchQueryCount(
    authInfo?.user_id
  );

  const { mutateAsync: deleteSavedSearchQuery } = useDeleteSearchQueryData(
    authInfo?.user_id
  );

  const getSharedSearches = ({ pageParam, fiterType }) => {
    return axiosGet('/shared-search', {
      limit: pageLimit,
      page: pageParam,
      fiterType,
    });
  };

  const {
    // isLoading,
    // error,
    data: sharedData,
    // isFetching,
    isLoading: sharedLoading,
    // hasNextPage,
    fetchNextPage: sharedFetchNextPage,
    // isFetchingNextPage,
  } = useInfiniteQuery(
    ['shared-searches', fiterType],
    async ({ pageParam = 1 }) => getSharedSearches({ pageParam, fiterType }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    }
  );

  const sharedSearchLength = sharedData?.pages[0].data.total;
  const [deletedData, setDeletedData] = useState([]);
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const [tab, setTab] = useState(0);
  const Titletabs = [
    {
      id: 0,
      title: (
        <PoptabTitleBox
          title={`Saved (${
            totalSavedSearches?.data?.total_saved_searches || '00'
          })`}
        />
      ),
      content: <></>,
      dataAmx: savedSearchData?.data,
      loadMore: fetchNextPage,
      isLoading,
    },
    {
      id: 1,
      title: (
        <PoptabTitleBox
          title={`Shared With Me (${sharedSearchLength || '00'})`}
        />
      ),
      content: <></>,
      // Temp data
      data: sharedData,
      // Data from Amx
      dataAmx: [],
      loadMore: sharedFetchNextPage,
      isLoading: sharedLoading,
    },
  ];

  const handleTab = (index) => {
    setTab(index);
    setSeletedTab(index);
    setCheckedItems([]);
  };

  const [orderBy, setOrderBy] = useState('');
  const [count, setCount] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const handleFilter = (sortItemType) => {
    setFiterType(sortItemType);
    // queryClient.invalidateQueries(['saved-searches', type]);
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

  const handleDeleteSearches = (items) => {
    return axiosPostRequest(
      '/delete-saved-searches',
      {},
      {
        data: items,
      }
    );
  };

  const { mutate: deleteSavedSearches } = useMutation({
    mutationFn: handleDeleteSearches,
    onSuccess: () => {
      if (tab === 0) {
        queryClient.invalidateQueries({
          queryKey: ['saved-searches', fiterType],
        });
        setCheckedItems([]);
      } else {
        queryClient.invalidateQueries({
          queryKey: ['shared-searches', fiterType],
        });
        setCheckedItems([]);
      }
    },
  });

  const handleDelete = useCallback(async () => {
    setConfirmationPopUp(false);
    setIsDashboardsAssociated && setIsDashboardsAssociated(false);
    const payload = {
      ids: deletedData?.map((x) => x.id),
    };
    await deleteSavedSearchQuery(payload, {
      onSuccess: () => {
        toast.success('Deleted Saved Search successfully');
      },
    });
    setDeletedbtn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedData, deleteSavedSearches, setConfirmationPopUp, setDeletedbtn]);

  const handleConfirmDeletePopUp = (data) => {
    setConfirmationPopUp(true);
    setIsDashboardsAssociated &&
      setIsDashboardsAssociated(data?.some((x) => x.dashboard_count > 0));
    if (data.length > 0) {
      setDeletedData([...data]);
    }
  };
  useEffect(() => {
    if (deletedbtn) {
      handleDelete();
    }
  }, [deletedbtn, handleDelete]);

  const handleEditDelete = async (data) => {
    setConfirmationPopUp(true);
    setIsDashboardsAssociated &&
      setIsDashboardsAssociated(data.dashboard_count > 0);
    setDeletedData([data]);
  };

  return (
    <>
      <SearchPopwrpr isNewsletter={isNewsletter}>
        {isPopup && (
          <SearchHeader>
            <MainTitleBox isNewsletter={isNewsletter}>
              <MainTitlewrpr isNewsletter={isNewsletter}>
                {mainTitle}
              </MainTitlewrpr>
              {!isNewsletter && false && (
                <ButtonBoxwpr>Create New</ButtonBoxwpr>
              )}
            </MainTitleBox>
            <Tabs
              activeColor={theme[selectedTheme].primary}
              inactiveColor={theme[selectedTheme].secondaryText}
              items={Titletabs || []}
              paddingWrapper={isNewsletter ? '0.5rem 0 0' : '0.5rem 1.25rem 0'}
              wraperBorderWidth="0"
              gapitems="1rem"
              bottomBorderWidth="3px"
              onChange={handleTab}
            />
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
          data={Titletabs[tab].data}
          dataAmx={Titletabs[tab].dataAmx}
          checkeditems={checkeditems}
          isPopup={isPopup}
          Frames={Frames}
          bookmarkedItems={bookmarkedItems}
          handleBookmarkedItems={setBookmarkedItems}
          handleLoad={Titletabs[tab].loadMore}
          handleCheckedItems={setCheckedItems}
          handleFilter={handleFilter}
          isLoading={Titletabs[tab].isLoading}
          handleClick={handleClick}
          titleClick={titleClick}
          toggler={toggler}
          isIcons={isIcons}
          isCheckBox={isCheckBox}
          showChip={showChip}
          isTriangle={isTriangle}
          orderBy={orderBy}
          sortBy={sortBy}
          handleDelete={handleConfirmDeletePopUp}
          bookMardClick={true}
          dotClick={true}
          savedIcon={true}
          setSeleteditem={setSeleteditem}
          setSavePopup={setSavePopup}
          handleEditDelete={handleEditDelete}
          searchTxt={searchTxt}
        />
      </SearchPopwrpr>
    </>
  );
};

SearchPopup.propTypes = {
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
  showChip: Proptypes.bool,
  isTriangle: Proptypes.bool,
  deletedbtn: Proptypes.bool,
  setConfirmationPopUp: Proptypes.func,
  setDeletedbtn: Proptypes.func,
  setSeleteditem: Proptypes.func,
  setSavePopup: Proptypes.func,
  setSeletedTab: Proptypes.func,
  setIsDashboardsAssociated: Proptypes.func,
};

export default SearchPopup;
