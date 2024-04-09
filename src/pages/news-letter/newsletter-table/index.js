import React, { useState } from 'react';
import {
  ButtonText,
  CrossButtonWrp,
  HeaderRightWrapper,
  HeaderTitlewpr,
  Inputwrpr,
  Labelwrpr,
  NewsLetterButton,
  NewsPagewpr,
  NewsltrHeader,
  Newsltrwpr,
  Searchwpr,
  TopWrapper,
} from './index.sc';

import { useNavigate } from 'react-router';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  axiosGet,
  axiosGetAPI,
  axiosPostRequest,
  axiosPutRequest,
  axiosUpdate,
  get,
} from '../../../service';
import AppBG from '../../../components/app-bg';
import AppHeader from '../../../components/app-header';
import ArrowLeft from '../../../assets/icons/ArrowLeft';
import { ContentBox } from '../../../components/search-popup/ContentBox';
import { NewsletterFrames } from '../../../components/search-popup/contents';
import AppFooter from '../../../components/app-footer';
import useDebounce from '../../../hooks/useDebounce';
import Add2 from '../../../assets/icons/Add2';
import DashboardPopup from '../../../components/dasboard-popup';
import CustomConfirmationPopUp from '../../../components/customize-confirmation-popup';
import SaveSourcePopup from '../../../components/save-source';
import { useSelector } from 'react-redux';
import Tabs from '../../../components/tabs';
import { PoptabTitleBox } from '../../../components/custom-drawer/mock';
import { theme } from '../../../constants/theme';
import { SearchIcon } from '../../../assets/icons/SearchIcon';
import { getTokenData } from '../../../constants/validateToken';
import { API, getAuthHeaders } from '../../../constants';
import {
  deleteNewsLetterById,
  useDeleteNewsletterById,
} from '../../../hooks/useSaveNewsLetter';
import toast from 'react-hot-toast';

const NewsletterList = () => {
  const [checkeditems, setCheckedItems] = useState([]);
  const queryClient = useQueryClient();
  const pageLimit = 10;
  const [searchQuery, setSearchType] = useState('');
  const [count, setCount] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 1000);
  const [NewsLetterType, setNewsletterType] = useState('Recent');
  const [savePopup, setSavePopup] = useState(false);
  const [selectedItem, setSeleteditem] = useState({});
  // const [fiterType, setFiterType] = useState('');
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  const authInfo = getTokenData();

  const getSavedNewsletter = ({
    pageParam,
    sortBy,
    orderBy,
    debouncedSearch,
  }) => {
    const params = {};
    if (NewsLetterType) {
      params.newsLetterType = NewsLetterType;
    }
    if (sortBy && orderBy) {
      params.sortBy = sortBy;
      params.OrderBy = orderBy;
    }
    if (debouncedSearch) {
      params.searchType = debouncedSearch;
    }
    // return axiosGet('/saved-newsletters', {
    return get(
      `${API}/newsletter`,
      { ...getAuthHeaders() }
      // {
      //   ...params,
      //   limit: pageLimit,
      //   page: pageParam,
      //   userid: authInfo?.user_id,
      // }
    );
  };
  const getSendNewsletter = ({
    pageParam,
    sortBy,
    orderBy,
    debouncedSearch,
  }) => {
    const params = {};
    if (NewsLetterType) {
      params.newsLetterType = NewsLetterType;
    }
    if (sortBy && orderBy) {
      params.sortBy = sortBy;
      params.OrderBy = orderBy;
    }
    if (debouncedSearch) {
      params.searchType = debouncedSearch;
    }
    // return axiosGet('/send-newsletters', {
    return get(`${API}/newslettersent?newsletterId=`, { ...getAuthHeaders() });
  };
  const {
    // isLoading,
    // error,
    data: sentNewSletter,
    // isFetching,
    isLoading: sendLoading,
    // hasNextPage,
    fetchNextPage: sendFetchNextPage,
    // isFetchingNextPage,
  } = useInfiniteQuery(
    ['send-newsletters', NewsLetterType, sortBy, orderBy, debouncedSearch],
    async ({ pageParam = 1 }) =>
      getSendNewsletter({ pageParam, sortBy, orderBy, debouncedSearch }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    }
  );
  const {
    // isLoading,
    // error,
    data,
    // isFetching,
    isLoading,
    // hasNextPage,
    fetchNextPage,
    // isFetchingNextPage,
  } = useInfiniteQuery(
    ['saved-newsletters', NewsLetterType, sortBy, orderBy, debouncedSearch],
    async ({ pageParam = 1 }) =>
      getSavedNewsletter({ pageParam, sortBy, orderBy, debouncedSearch }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    }
  );
  const sendnewsLetterLength = sentNewSletter?.pages[0]?.data?.length;
  const length = data?.pages[0]?.data?.length;

  const handleLoadMore = () => {
    fetchNextPage();
  };

  // const handleFilter = (type) => {
  //   setFiterType(type);
  //   // queryClient.invalidateQueries(['saved-searches', type]);
  // };
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [deleteData, setDeleteData] = useState([]);
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
        setSortBy('');
        setCount(0);
      }
    } else {
      setCount((prev) => 0);
      setSortBy(sortItemType);
      setOrderBy('asc');
      setCount((prev) => prev + 1);
    }
  };
  const navigate = useNavigate();
  const handleClick = (item) => {
    // navigate(`/news-letter/${item.newsLetterId}`);
    if (Titletabs[tab].id === 1) {
      navigate(`/news-letter/${item.newsletterid}`, {
        state: item,
      });
    } else {
      navigate(`/news-letter/${item.id}`, {
        state: item,
      });
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  const navigateNewsletter = () => {
    navigate('/create-news-letter');
  };

  const handleDeleteNewsletter = (items) => {
    return axiosPostRequest(
      '/delete-saved-newsletters',
      {},
      {
        data: items,
      }
    );
  };

  const { mutate: deleteSavedNewsletters } = useMutation({
    // mutationFn: handleDeleteNewsletter
    mutationFn: deleteNewsLetterById,
    onSuccess: () => {
      if (tab === 0) {
        queryClient.invalidateQueries({
          queryKey: [
            'saved-newsletters',
            NewsLetterType,
            sortBy,
            orderBy,
            debouncedSearch,
          ],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [
            'send-newsletters',
            NewsLetterType,
            sortBy,
            orderBy,
            debouncedSearch,
          ],
        });
        setCheckedItems([]);
      }
    },
  });

  const Titletabs = [
    {
      id: 0,
      title: <PoptabTitleBox title={`Saved (${length || '00'})`} />,
      content: <></>,
      data,
      loadMore: fetchNextPage,
      isLoading,
    },
    {
      id: 1,
      title: (
        <PoptabTitleBox
          title={`Sent Newsletters (${sendnewsLetterLength || '00'})`}
        />
      ),
      content: <></>,
      data: sentNewSletter,
      loadMore: sendFetchNextPage,
      isLoading: sendLoading,
    },
  ];
  const [tab, setTab] = useState(0);

  const handleDelete = (data) => {
    setConfirmationPopUp(true);
    if (data.length > 0) {
      const deletePayload = data.map((item) => item.id);
      setDeleteData(deletePayload);
    }
  };
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const handleTab = (index) => {
    setTab(index);
    //  setSeletedTab(index);
    setCheckedItems([]);
  };
  const handleEditDelete = (data) => {
    setConfirmationPopUp(true);
    setDeleteData([data?.id]);
  };
  const handleConfirmDelete = () => {
    setConfirmationPopUp(false);
    deleteSavedNewsletters(deleteData);
  };
  const handleSaveNewsLetter = ({ name, description }) => {
    // axiosPutRequest(
    //   '/edit-saved-newsletters',
    axiosUpdate(
      `${API}/newsletter`,
      {
        ...selectedItem,
        newsLetterId: selectedItem?.id,
        newsletter_title: name,
        newsletter_content: description,
      },
      {
        ...getAuthHeaders(),
      }
    ).then(() => {
      queryClient.invalidateQueries({
        queryKey: [
          'saved-newsletters',
          // NewsLetterType,
          // sortBy,
          // orderBy,
          // debouncedSearch,
        ],
      });
    });
  };

  return (
    <NewsPagewpr>
      <AppBG />
      <AppHeader />
      <Newsltrwpr>
        <NewsltrHeader>
          <CrossButtonWrp onClick={handleClose}>
            <ArrowLeft color={'#656B8A'} width="2rem" />
          </CrossButtonWrp>
          <HeaderRightWrapper>
            {/* <HeaderTitlewpr>Newsletters ({length})</HeaderTitlewpr> */}
            <HeaderTitlewpr>
              Newsletters ({Titletabs[tab].data?.pages[0]?.data?.length || '00'}
              )
            </HeaderTitlewpr>
            <NewsLetterButton onClick={navigateNewsletter}>
              <Add2 height={'1rem'} color={'#ffffff'} />
              <ButtonText>Create Newsletter</ButtonText>
            </NewsLetterButton>
          </HeaderRightWrapper>
        </NewsltrHeader>
        <TopWrapper>
          <Tabs
            activeColor={theme[selectedTheme].primary}
            inactiveColor={theme[selectedTheme].secondaryText}
            items={Titletabs || []}
            wraperBorderWidth="0"
            gapitems="1rem"
            bottomBorderWidth="3px"
            onChange={handleTab}
            defaultActive={false}
            currentTab={tab}
          />
          <Searchwpr isNewsletter={false}>
            <Labelwrpr isNewsletter={false}>
              <SearchIcon />
              <Inputwrpr
                placeholder={'Search'}
                onChange={(e) => setSearchType(e.target.value)}
              />
            </Labelwrpr>
          </Searchwpr>
        </TopWrapper>
        <ContentBox
          data={Titletabs[tab].data}
          checkeditems={checkeditems}
          bookmarkedItems={bookmarkedItems}
          isPopup={false}
          Frames={NewsletterFrames}
          handleLoad={handleLoadMore}
          handleCheckedItems={setCheckedItems}
          handleBookmarkedItems={setBookmarkedItems}
          handleFilter={handleFilter}
          isLoading={isLoading}
          titleClick={handleClick}
          handleClick={() => {}}
          toggler={() => {}}
          isIcons={true}
          isCheckBox={parseInt(tab) === 0}
          isNewsletter={true}
          bookMardClick={true}
          dotClick={parseInt(tab) === 0}
          savedIcon={true}
          isTriangle={true}
          showRecent={false}
          sortBy={sortBy}
          orderBy={orderBy}
          dashboardType={NewsLetterType}
          setDashboardType={setNewsletterType}
          setSearchType={setSearchType}
          searchQuery={searchQuery}
          showChip={false}
          handleDelete={handleDelete}
          handleEditDelete={handleEditDelete}
          setSavePopup={setSavePopup}
          setSeleteditem={setSeleteditem}
          newsLetterTab={Titletabs[tab].id}
        />
      </Newsltrwpr>
      <DashboardPopup
        popContent={
          <SaveSourcePopup
            heading="Rename Newsletter"
            toggler={(value) => {
              setSavePopup(value);
              setSeleteditem('');
            }}
            primaryHeading="Newsletter Name"
            selectedItem={{
              name: selectedItem?.newsletter_title,
              description: selectedItem?.newsletter_content,
            }}
            handleSaveDashboard={handleSaveNewsLetter}
          />
        }
        open={savePopup}
        toggler={setSavePopup}
        padding="0"
        borderRadius="0.625rem"
        width={'43.75rem'}
      />
      <DashboardPopup
        open={confirmationPopUp}
        toggler={setConfirmationPopUp}
        popContent={
          <CustomConfirmationPopUp
            Heading={'Delete Newsletters'}
            SecondHeading={'Are you sure you want to delete?'}
            toggler={setConfirmationPopUp}
            handleDelete={handleConfirmDelete}
          />
        }
        padding="0"
        borderRadius="0.625rem"
        width="35rem"
      />
      <AppFooter />
    </NewsPagewpr>
  );
};

export default NewsletterList;
