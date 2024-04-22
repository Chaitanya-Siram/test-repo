import React, { useEffect, useRef, useState } from 'react';
import {
  BookIconwpr,
  ChipText,
  CloseWrp,
  Contentwpr,
  DashboardListwpr,
  Dropdownfildwpr,
  HeadingWrp,
  // InputSearch,
  InputSearchBar,
  ItemComponentwpr,
  Labeltxtwpr,
  ListBoxwpr,
  RightWrp,
  SearchWrapper,
  TextBoxwpr,
  Titletxtwpr,
  Typetxtwpr,
} from './index.sc';
import OptionDropdwn from '../option-dropdown';
import { dashbordtypeList } from './mock';
import ChevronDown from '../../assets/icons/ChevronDown';
import { theme } from '../../constants/theme';
import SearchIcon2 from '../../assets/icons/SearchIcon2';
// import { axiosGet } from '../../service';
import { useQueryClient } from '@tanstack/react-query';
import PropTypes, { object } from 'prop-types';
// import { Loadbtn, Loadbtnwpr } from '../search-popup/index.sc';
import { useSelector } from 'react-redux';
// import CreatedByIcon from '../../assets/icons/CreatedByIcon';
// import CreatedOnIcon from '../../assets/icons/CreatedOnIcon';
import BookMarkIcon2 from '../../assets/icons/BookMarkIcon2';
import { debounce } from '../../constants/debounce';
// import RedirectIcon from '../../assets/icons/RedirectIcon';
import { useNavigate } from 'react-router-dom';
import { dashboardChips } from '../../constants/dashboard';
import XCirlcle from '../../assets/icons/XCirlcle';
import { getDateParams } from '../../utils';
// import Spinner from '../spinner';
import {
  useAddDashboardBookmark,
  useDelDashboardBookmark,
} from '../../hooks/useSaveDashboard';
import toast from 'react-hot-toast';
import { useGetSavedSearchQueryData } from '../../hooks/useSaveSearch';
import { getTokenData } from '../../constants/validateToken';

const ItemComponent = ({
  data,
  dataAmx,
  active,
  handleClick,
  bookmarkedItems,
  handleBookmarked,
}) => {
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const navigate = useNavigate();
  const { mutateAsync: addBookmark } = useAddDashboardBookmark();
  const { mutateAsync: deleteBookmark } = useDelDashboardBookmark();
  const authInfo = getTokenData();
  const { data: savedSearches } = useGetSavedSearchQueryData(
    authInfo?.user_id,
    {
      orderBy: 'name',
    }
  );

  // useEffect(() => {
  //   // console.log(data, 'data');
  //   const filteredItems = data.filter((obj) => obj.bookmarked === true);
  //   handleBookmarked(filteredItems);
  // }, [data, handleBookmarked]);

  // handle bookmark
  const bookmarkHandler = (item) => {
    const bookmarkId = {
      dashboard_ids: [item.id],
    };
    if (!item.is_bookmark) {
      handleBookmarked([item.id]);
      addBookmark(bookmarkId, {
        onSuccess: () => {
          toast.success('Added bookmark');
          handleBookmarked([]);
        },
      });
    } else if (item.is_bookmark) {
      handleBookmarked([item.id]);
      deleteBookmark(bookmarkId, {
        onSuccess: () => {
          toast.success('Removed bookmark');
          handleBookmarked([]);
        },
      });
    }

    // const arrCopy = [...bookmarkedItems];
    // const index = arrCopy.findIndex((obj) => obj.id === item.id);

    // if (index !== -1 && arrCopy[index]?.bookmarked) {
    //   handleBookmarked(arrCopy.filter((obj, i) => i !== index));
    // } else {
    //   const obj = {
    //     ...item,
    //     bookmarked: true,
    //   };
    //   handleBookmarked([...arrCopy, obj]);
    // }
  };

  return (
    <>
      {dataAmx?.map((dashboard) => (
        <ItemComponentwpr
          active={active === dashboard.id}
          onClick={() => handleClick(dashboard)}
          key={dashboard.id}
        >
          <TextBoxwpr>
            <HeadingWrp>
              <Titletxtwpr
                active={active === dashboard.id}
                onClick={() => {
                  let searchParams = dashboard?.params;
                  const dateParams = getDateParams(searchParams?.dateTime);
                  searchParams = {
                    ...searchParams,
                    dateTime: dateParams,
                  };
                  const searchInfo = savedSearches?.data?.data?.find(
                    (x) =>
                      parseInt(dashboard.save_search_id) === parseInt(x?.id)
                  );
                  navigate(
                    `/dashboard/${dashboard?.save_search_id}/${dashboard?.type}/${dashboard.id}`,
                    {
                      state: {
                        data: null,
                        filters: searchParams,
                        savedDashboardData: dashboard,
                        recent_searchId: dashboard?.recent_search_id,
                        search_name:
                          searchInfo?.title || dashboard?.params?.search_name,
                      },
                    }
                  );
                }}
              >
                {dashboard.name}
              </Titletxtwpr>
              <ChipText bgcolor={dashboardChips[dashboard.type]?.color}>
                {dashboardChips[dashboard.type]?.label}
              </ChipText>
            </HeadingWrp>
            <Contentwpr>
              <Typetxtwpr active={active === dashboard.id}>Last:</Typetxtwpr>
              <Labeltxtwpr active={active === dashboard.id}>
                {dashboard.updated_on}
                {', '}by {dashboard.created_by_name}
              </Labeltxtwpr>
            </Contentwpr>
            {/* {active === dashboard.id && (
              <Contentwpr>
                <Labeltxtwpr active={active === dashboard.id}>
                  <CreatedByIcon
                    color={
                      active === dashboard.id
                        ? theme[selectedTheme].primary
                        : theme[selectedTheme].secondaryText
                    }
                  />
                  <Typetxtwpr active={active === dashboard.id}>
                    {dashboard.createBy}{' '}
                  </Typetxtwpr>
                </Labeltxtwpr>
                <Labeltxtwpr active={active === dashboard.id}>
                  <CreatedOnIcon
                    color={
                      active === dashboard.id
                        ? theme[selectedTheme].primary
                        : theme[selectedTheme].secondaryText
                    }
                  />
                  <Typetxtwpr active={active === dashboard.id}>
                    {dashboard.createOn}
                  </Typetxtwpr>
                </Labeltxtwpr>
                <Labeltxtwpr
                  onClick={() => navigate(`/dashboard/${active}/${dashType}`)}
                >
                  <RedirectIcon width="15" height="16" />
                </Labeltxtwpr>
              </Contentwpr>
            )} */}
          </TextBoxwpr>
          <BookIconwpr
            onClick={(e) => {
              e.stopPropagation();
              bookmarkHandler(dashboard);
            }}
          >
            <BookMarkIcon2
              color={
                dashboard.is_bookmark ? theme[selectedTheme].primary : 'white'
              }
              stroke={
                dashboard.is_bookmark ? theme[selectedTheme].primary : '#585858'
              }
            />
            {/* // if filled 675EF2 */}
          </BookIconwpr>
        </ItemComponentwpr>
      ))}
    </>
  );
};

ItemComponent.propTypes = {
  data: PropTypes.array,
  dataAmx: PropTypes.array,
  handleClick: PropTypes.func,
  active: PropTypes.number,
  bookmarkedItems: PropTypes.arrayOf(object),
  handleBookmarked: PropTypes.func,
};

// const InputSearchBar = React.forwardRef((props, ref) => (
//   <InputSearch ref={ref} {...props} />
// ));

const DashboardList = ({
  active,
  setActive,
  setListLoading,
  setLength,
  data,
  dataAmx,
  setFiterType,
  fetchNextPage,
  status,
  title,
  setSearchQuery,
  searchQuery,
}) => {
  // const title = 'Recent';
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const [searchShow, setSearchShow] = useState(false);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // const { token } = useSelector((store) => {
  //   return store?.user || {};
  // });
  const inputRef = useRef(null);

  const toggleDropdown = () => {
    setSearchShow(!searchShow);
    setTimeout(() => {
      setShow(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
  };

  useEffect(() => {
    setListLoading(status !== 'success');
  }, [status, setListLoading]);

  const handleActive = (item) => {
    setActive(item);
  };

  useEffect(() => {
    if (dataAmx) {
      setActive(dataAmx[0]);
    } else {
      setActive(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAmx]);
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const listBoxRef = useRef(null);
  // useEffect(() => {
  //   setLength(data?.pages[0].data.total);
  // }, [data?.pages, setLength]);

  useEffect(() => {
    const handleScroll = () => {
      const handleLoadClick = debounce(() => {
        fetchNextPage();
      }, 1000);
      const { scrollTop, scrollHeight, clientHeight } = listBoxRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        handleLoadClick();
      }
    };

    const currentListBoxRef = listBoxRef.current;

    currentListBoxRef.addEventListener('scroll', handleScroll);

    return () => {
      currentListBoxRef.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage]);

  const handleFilter = (type, index) => {
    setActiveIndex(index);
    setFiterType(type?.value);
    setShow(false);
    queryClient.invalidateQueries(['saved-searches', type?.value]);
  };

  return (
    <DashboardListwpr>
      <Dropdownfildwpr>
        {searchShow ? (
          <>
            <InputSearchBar
              onChange={(e) => setSearchQuery(e.target.value)}
              ref={inputRef}
              value={searchQuery}
              type="text"
              placeholder="Search"
            />
            <CloseWrp
              onClick={() => {
                setSearchQuery('');
                setSearchShow(false);
              }}
            >
              <XCirlcle width={'1.2rem'} height="1.2rem" />
            </CloseWrp>
          </>
        ) : (
          <RightWrp onClick={() => setShow(!show)}>
            <ChevronDown color={theme[selectedTheme].text} />
            <span>{title.charAt(0).toUpperCase() + title.slice(1)}</span>
          </RightWrp>
        )}
        <SearchWrapper onClick={toggleDropdown}>
          <SearchIcon2
            color={theme[selectedTheme].text}
            width="1.25rem"
            height="1.25rem"
          />
        </SearchWrapper>
        {show && (
          <OptionDropdwn
            items={dashbordtypeList}
            activeIndex={activeIndex}
            handleClick={handleFilter}
          />
        )}
      </Dropdownfildwpr>
      <ListBoxwpr ref={listBoxRef}>
        {/* {data?.pages?.map((page, i) => ( */}
        <React.Fragment>
          {status === 'success' ? (
            <ItemComponent
              // key={i}
              // data={!page?.data?.data ? [] : page?.data?.data}
              dataAmx={dataAmx}
              active={active}
              handleClick={handleActive}
              bookmarkedItems={bookmarkedItems}
              handleBookmarked={setBookmarkedItems}
            />
          ) : (
            'Loading...'
          )}
        </React.Fragment>
        {/* ))} */}
      </ListBoxwpr>
    </DashboardListwpr>
  );
};

DashboardList.propTypes = {
  active: PropTypes.number,
  title: PropTypes.string,
  searchQuery: PropTypes.string,
  setActive: PropTypes.func,
  setListLoading: PropTypes.func,
  setLength: PropTypes.func,
  data: PropTypes.object,
  dataAmx: PropTypes.array,
  fetchNextPage: PropTypes.func,
  setFiterType: PropTypes.func,
  setSearchQuery: PropTypes.func,
  status: PropTypes.any,
};

export default DashboardList;
