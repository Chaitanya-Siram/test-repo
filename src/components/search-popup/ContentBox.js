import React, { useEffect, useRef, useState } from 'react';
import Proptypes, { object } from 'prop-types';
import {
  CheckBox,
  ChipText,
  ContentHeader,
  ContentsContainer,
  Contentwrpr,
  DeleteMainWrp,
  DeleteTextWpr,
  Deswrpr,
  DropDownWrp,
  EditIconWrp,
  EditOption,
  Elewrp,
  FramRightpr,
  FrameIconwrpr,
  Frametxt,
  Framewrpr,
  Framleftpr,
  Iconwrpr,
  InputSearchBar,
  ItemIconWrp,
  ItemWrp,
  LeftWrp,
  MainBox,
  RightSideWrp,
  SearchIconWrp,
  SearchIconwpr,
  SharedIconCir,
  // SharedIconCir,
  SharedIconsCont,
  TextWrp,
  Textwrpr,
  TitleHeadingWrp,
  Titlewrpr,
  TopHeader,
} from './index.sc';
import { SearchDone } from '../../assets/icons/SearchDone';
// import { Save } from '../../assets/icons/Save';
import { VerticleDots } from '../../assets/icons/VerticalDots';
// import { Triangle } from '../../assets/icons/Triangle';
import { debounce } from '../../constants/debounce';
import { dashboardChips } from '../../constants/dashboard';
import ChevronDown from '../../assets/icons/ChevronDown';
import SearchIcon2 from '../../assets/icons/SearchIcon2';
import DownPolygon from '../../assets/icons/DownPolygon';
import OptionDropdwn from '../option-dropdown';
import { dashbordtypeList } from '../DashbordList/mock';
import XCirlcle from '../../assets/icons/XCirlcle';
import BookMarkIcon2 from '../../assets/icons/BookMarkIcon2';
import { theme } from '../../constants/theme';
import { useSelector } from 'react-redux';
import Delete1 from '../../assets/icons/Delete1';
import toast from 'react-hot-toast';
import {
  useAddDashboardBookmark,
  useDelDashboardBookmark,
} from '../../hooks/useSaveDashboard';
import {
  useAddNewsletterBookmark,
  useDelNewsletterBookmark,
} from '../../hooks/useSaveNewsLetter';
import { formatDate } from '../../utils';

export const color = ['#8D84F0', '#FF8582', '#FEC572'];

export const ContentBox = ({
  dataAmx,
  data,
  checkeditems,
  isPopup,
  Frames,
  isCheckBox = true,
  handleCheckedItems,
  handleFilter,
  handleLoad,
  pageLimit = 10,
  isLoading = false,
  isIcons = true,
  bookMardClick,
  dotClick,
  toggler,
  isNewsletter = false,
  handleClick = () => {},
  titleClick = () => {},
  savedIcon = false,
  isTriangle = false,
  showRecent = false,
  sortBy = '',
  orderBy = '',
  dashboardType = 'Recent',
  setDashboardType = () => {},
  setSearchType = () => {},
  showChip = true,
  searchQuery = '',
  bookmarkedItems = [],
  handleBookmarkedItems = () => {},
  handleDelete = () => {},
  handleEditDelete = () => {},
  setSavePopup = () => {},
  setSeleteditem = () => {},
  setBookMarkedOrder = () => {},
  searchTxt,
  updateCheckBox,
  newsLetterTab = '',
}) => {
  const [allChecked, setAllChecked] = useState(false);
  // const [allBookmarked, setAllBookmarked] = useState(false);
  const length = data?.pages[0]?.data?.length;
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [seletedOption, setSelectedOption] = useState(null);
  const [allBookmarked, setAllBookmarked] = useState([]);
  const [delAllBookmarked, setDelAllBookmarked] = useState([]);
  const { mutateAsync: addBookmark } = useAddNewsletterBookmark();
  const { mutateAsync: addDashboardBookmark } = useAddDashboardBookmark();
  const { mutateAsync: deleteBookmark } = useDelNewsletterBookmark();
  const { mutateAsync: deleteDashboardBookmark } = useDelDashboardBookmark();
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const compareParameter = isNewsletter ? 'id' : 'id';

  // useEffect(() => {
  //   setAllChecked(false);
  // }, [updateCheckBox]);

  // useEffect(() => {
  //   let items = [];
  //   for (let i = 0; i < data?.pages?.length; i++) {
  //     const page = data?.pages?.[i];
  //     items = [...items, ...page?.data?.data];
  //   }
  //   const filteredItems = items?.filter((obj) => obj?.bookmarked === true);
  //   handleBookmarkedItems(filteredItems);
  // }, [data?.pages, handleBookmarkedItems]);

  const checkboxHandler = (item) => {
    item.checked = !item.checked;
    if (
      checkeditems.some(
        (obj) => obj[compareParameter] === item[compareParameter]
      )
    ) {
      handleCheckedItems(
        checkeditems.filter(
          (obj) => obj[compareParameter] !== item[compareParameter]
        )
      );
      setAllChecked(false);
    } else {
      handleCheckedItems([...checkeditems, item]);
      if (
        [...checkeditems, item].length === length ||
        [...checkeditems, item].length === data?.pages[0]?.data?.length ||
        [...checkeditems, item].length === dataAmx?.data?.length
      ) {
        setAllChecked(true);
      }
    }
  };

  const bookmarkHandler = (item) => {
    const checkIfKeyExist = (keyName) => {
      const keyExist = Object.keys(item).some((key) => key === keyName);
      return keyExist;
    };
    const newsletterBookmarkIds = {
      newsLetterIds: [item.id],
    };
    const bookmarkId = {
      dashboard_ids: [item.id],
    };
    if (!item.is_bookmark) {
      if (checkIfKeyExist('is_bookmark')) {
        handleBookmarkedItems([item.id]);
        addDashboardBookmark(bookmarkId, {
          onSuccess: () => {
            toast.success('Added bookmark');
            handleBookmarkedItems([]);
          },
        });
      }
    } else {
      if (checkIfKeyExist('is_bookmark')) {
        handleBookmarkedItems([item.id]);
        deleteDashboardBookmark(bookmarkId, {
          onSuccess: () => {
            toast.success('Removed bookmark');
            handleBookmarkedItems([]);
          },
        });
      }
    }
    if (!item?.bookmark && checkIfKeyExist('bookmark')) {
      if (checkIfKeyExist('bookmark')) {
        handleBookmarkedItems([item.id]);
        addBookmark(newsletterBookmarkIds, {
          onSuccess: () => {
            toast.success('Added bookmark');
            handleBookmarkedItems([]);
          },
        });
      }
    } else {
      if (checkIfKeyExist('bookmark')) {
        handleBookmarkedItems([item.id]);
        deleteBookmark(newsletterBookmarkIds, {
          onSuccess: () => {
            toast.success('Removed bookmark');
            handleBookmarkedItems([]);
          },
        });
      }
    }
    // const arrCopy = [...bookmarkedItems];
    // const index = arrCopy.findIndex(
    //   (obj) => obj[compareParameter] === item[compareParameter]
    // );

    // if (index !== -1 && arrCopy[index]?.bookmarked) {
    //   handleBookmarkedItems(arrCopy.filter((obj, i) => i !== index));
    // } else {
    //   const obj = {
    //     ...item,
    //     bookmarked: true,
    //   };
    //   handleBookmarkedItems([...arrCopy, obj]);
    // }
  };

  const handleAllcheck = (isChecked) => {
    if (isChecked) {
      let items = [];
      if (dataAmx?.data) {
        for (let i = 0; i < dataAmx.data?.length; i++) {
          // for (let i = 0; i < data?.pages?.data?.data?.length; i++) {
          // const page = data?.pages?.data?.data[i];
          const page = dataAmx.data[i];
          items = [...items, page];
          items.map((obj) => ({ ...obj, checked: true }));
        }
        handleCheckedItems([...items]);
        setAllChecked(true);
      } else {
        const pageIndex = sortedData.map((data, i) => {
          return data;
        });
        // items = [...items, pageIndex];
        // items.map((obj) => ({ ...obj, checked: true }));
        // }
        handleCheckedItems(pageIndex);
        setAllChecked(true);
      }
    } else {
      handleCheckedItems([]);
      setAllChecked(false);
    }
  };

  // const handleAllBookmark = (isBookmarked) => {
  //   if (isBookmarked) {
  //     let items = [];
  //     for (let i = 0; i < data.pages.length; i++) {
  //       const page = data.pages[i];
  //       items = [...items, ...page.data.data];
  //       items.map((obj) => ({ ...obj, bookmarked: true }));
  //     }
  //     handleBookmarkedItems([...items]);
  //     setAllBookmarked(true);
  //   } else {
  //     handleBookmarkedItems([]);
  //     setAllBookmarked(false);
  //   }
  // };

  const handleContentClick = (e, item) => {
    e.stopPropagation();
    handleClick(item);
    if (toggler) toggler(false);
  };

  const handleFrameClick = (e, item, click, type) => {
    e.stopPropagation();
    if (click) {
      click(item, type);
    }
  };

  const getSortingKey = () => {
    const hasNameProperty =
      data?.pages[0]?.data?.some((obj) => sortBy in obj) ||
      dataAmx?.data?.some((obj) => sortBy in obj);
    return hasNameProperty ? sortBy : 'title';
  };

  const mapSortingKey = (key) => {
    switch (key) {
      case 'created_by_name':
        return 'created_by_name';
      case 'created_on':
        return 'created_on';
      case 'updated_on':
        return 'updated_on';
      case 'send_type':
        return 'send_type';
      case 'send_time':
        return 'send_time';
      default:
        return key;
    }
  };

  const sortingKey = mapSortingKey(getSortingKey());

  const sortedData = [...(data?.pages[0]?.data || dataAmx?.data || [])].sort(
    (a, b) => {
      if (orderBy === 'asc') {
        // asc order
        return a[sortingKey]?.localeCompare(b[sortingKey]);
      } else if (orderBy === 'desc') {
        // desc order
        return b[sortingKey]?.localeCompare(a[sortingKey]);
      }
      return 0; // Default case
    }
  );

  const listBoxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const handleLoadClick = debounce(() => {
        handleLoad();
      }, 1000);
      const { scrollTop, scrollHeight, clientHeight } = listBoxRef.current;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        data?.pages?.length * 10 < length
      ) {
        handleLoadClick();
      }
    };

    const currentListBoxRef = listBoxRef.current;

    currentListBoxRef.addEventListener('scroll', handleScroll);

    return () => {
      currentListBoxRef.removeEventListener('scroll', handleScroll);
    };
  }, [handleLoad, data?.pages?.length, length]);

  const handleDashboard = (item) => {
    setShow(false);
    setDashboardType(item.value);
  };
  const toggleDropdown = () => {
    setShowSearch(!showSearch);
    setTimeout(() => {
      setShow(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
  };
  const tooltipRef = useRef(null);
  // for closing the edit/delete div if we click outside the div
  useEffect(() => {
    function handleClickOutside() {
      setShowEditOptions(false);
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const addData = dataAmx?.data?.filter((item) => !item.is_bookmark);
    const delData = dataAmx?.data?.filter((item) => item.is_bookmark);

    const idArray1 = addData?.map((item) => item.id);
    const idArray2 = delData?.map((item) => item.id);

    setAllBookmarked(idArray1);
    setDelAllBookmarked(idArray2);
  }, [dataAmx]);

  const allDataIsBookmarked = () => {
    return dataAmx?.data?.every((item) => item.is_bookmark);
  };

  const handleAllBookmarked = async (addedBookmark, removedBookmark) => {
    try {
      if (addedBookmark?.length > 0) {
        const bookmarkId = { dashboard_ids: addedBookmark };
        await addDashboardBookmark(bookmarkId, {
          onSuccess: () => toast.success('Bookmarked All'),
        });
      } else if (removedBookmark?.length > 0 && addedBookmark.length === 0) {
        const bookmarkId = { dashboard_ids: removedBookmark };
        await deleteDashboardBookmark(bookmarkId, {
          onSuccess: () => toast.success('Removed All'),
        });
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      {showRecent && (
        <>
          <TopHeader>
            <LeftWrp onClick={() => setShow(!show)}>
              {!isNewsletter && <ChevronDown color="#656B8A" />}

              <TextWrp>{dashboardType || 'Recent'}</TextWrp>
            </LeftWrp>
            <>
              <RightSideWrp>
                {showSearch && (
                  <>
                    <InputSearchBar
                      onChange={(e) => {
                        setSearchType(e.target.value);
                      }}
                      ref={inputRef}
                      value={searchQuery}
                      type="text"
                      placeholder="Search"
                    />
                    <div
                      onClick={() => {
                        setSearchType('');
                        setShowSearch(false);
                      }}
                    >
                      <XCirlcle width={'1.2rem'} height="1.2rem" />
                    </div>
                  </>
                )}
                <SearchIconWrp onClick={toggleDropdown}>
                  <SearchIcon2
                    color="#656B8A"
                    width="1.25rem"
                    height="1.25rem"
                  />
                </SearchIconWrp>
              </RightSideWrp>
            </>
            <DropDownWrp>
              {show && !isNewsletter && (
                <OptionDropdwn
                  items={dashbordtypeList}
                  activeIndex={
                    dashbordtypeList.findIndex(
                      (item) => item.value === dashboardType
                    ) || 0
                  }
                  handleClick={handleDashboard}
                />
              )}
            </DropDownWrp>
          </TopHeader>
        </>
      )}
      <ContentHeader isNewsletter={isNewsletter}>
        <Framleftpr isPopup={isPopup}>
          {isCheckBox && (
            <CheckBox
              type="checkbox"
              checked={allChecked}
              onChange={() => handleAllcheck(!allChecked)}
            />
          )}
          <Framewrpr onClick={() => handleFilter(Frames[0].type)} point={true}>
            <Frametxt isActive={sortBy === Frames[0].type && orderBy !== ''}>
              {Frames[0].label}
            </Frametxt>
            {isTriangle && (
              <DownPolygon
                fill={
                  sortBy === Frames[0].type && orderBy !== ''
                    ? '#675EF2'
                    : '#585858'
                }
                isOpen={sortBy === Frames[0].type && orderBy === 'asc'}
              />
            )}
          </Framewrpr>
        </Framleftpr>
        <FramRightpr isPopup={isPopup}>
          {Frames.slice(1, Frames?.length).map((frame, i) =>
            newsLetterTab === 1 ? (
              ![
                'created_on',
                'send_time',
                'updated_on',
                'created_by_name',
              ].includes(frame?.type) && (
                <Framewrpr
                  key={i}
                  point={frame?.type !== 'sharedwith'}
                  onClick={() => {
                    if (frame?.type !== 'sharedwith') {
                      handleFilter(frame.type);
                    }
                  }}
                >
                  <Frametxt isActive={sortBy === frame.type && orderBy !== ''}>
                    {frame?.label}
                  </Frametxt>

                  {isTriangle && frame?.type !== 'sharedwith' && (
                    <DownPolygon
                      fill={
                        sortBy === frame.type && orderBy !== ''
                          ? '#675EF2'
                          : '#585858'
                      }
                      isOpen={sortBy === frame.type && orderBy === 'asc'}
                    />
                  )}
                </Framewrpr>
              )
            ) : (
              <Framewrpr
                key={i}
                point={frame?.type !== 'sharedwith'}
                onClick={() => {
                  if (frame?.type !== 'sharedwith') {
                    handleFilter(frame.type);
                  }
                }}
              >
                <Frametxt isActive={sortBy === frame.type && orderBy !== ''}>
                  {frame?.label}
                </Frametxt>

                {isTriangle && frame?.type !== 'sharedwith' && (
                  <DownPolygon
                    fill={
                      sortBy === frame.type && orderBy !== ''
                        ? '#675EF2'
                        : '#585858'
                    }
                    isOpen={sortBy === frame.type && orderBy === 'asc'}
                  />
                )}
              </Framewrpr>
            )
          )}
          {isIcons && newsLetterTab !== 1 && (
            <FrameIconwrpr
              onClick={() => {
                // handleFilter('Bookmark');
                handleAllBookmarked(allBookmarked, delAllBookmarked);
              }}
            >
              {savedIcon && (
                <BookMarkIcon2
                  color={
                    savedIcon && allDataIsBookmarked()
                      ? theme[selectedTheme].primary
                      : 'white'
                  }
                  stroke={
                    savedIcon && allDataIsBookmarked()
                      ? theme[selectedTheme].primary
                      : '#585858'
                  }
                />
              )}
            </FrameIconwrpr>
          )}
          {dotClick && <FrameIconwrpr dotClick={dotClick}></FrameIconwrpr>}
        </FramRightpr>
      </ContentHeader>
      <ContentsContainer ref={listBoxRef}>
        {!isLoading
          ? sortedData
              ?.filter((x) => {
                if (searchTxt) {
                  return (
                    x?.title ||
                    x?.name?.toLowerCase().includes(searchTxt?.toLowerCase())
                  );
                }
                return true;
              })
              .map((content, j) => (
                <Contentwrpr
                  onClick={(e) => handleContentClick(e, content)}
                  isPopup={isPopup}
                  key={j}
                >
                  <MainBox isPopup={isPopup}>
                    {isCheckBox && (
                      <CheckBox
                        checked={
                          checkeditems?.some(
                            (obj) =>
                              obj[compareParameter] ===
                              content[compareParameter]
                          ) || allChecked
                        }
                        onChange={() => checkboxHandler(content)}
                        type="checkbox"
                      />
                    )}
                    {false && (
                      <SearchIconwpr>
                        <SearchDone />
                      </SearchIconwpr>
                    )}
                    {content.titleNode ? (
                      content.titleNode
                    ) : (
                      <Textwrpr>
                        <TitleHeadingWrp>
                          <Titlewrpr
                            onClick={() => {
                              titleClick(content);
                            }}
                          >
                            {content.newsletter_title ||
                              content.title ||
                              content.name}
                          </Titlewrpr>
                          {showChip && (
                            <ChipText
                              bgcolor={dashboardChips[content.type]?.color}
                            >
                              {dashboardChips[content.type]?.label}
                            </ChipText>
                          )}
                        </TitleHeadingWrp>
                        <Deswrpr>
                          {content.description || content?.newsletter_content}
                        </Deswrpr>
                      </Textwrpr>
                    )}
                  </MainBox>
                  <FramRightpr isPopup={isPopup}>
                    {Frames.slice(1, Frames?.length - 1).map((frame, i) =>
                      // content[frame.type] &&
                      !(typeof content[frame.type] === 'object') &&
                      !Array.isArray(content[frame.type]) ? (
                        newsLetterTab === 1 ? (
                          ![
                            'created_on',
                            'updated_on',
                            'send_time',
                            'created_by_name',
                          ].includes(frame?.type) && (
                            <ItemWrp key={`${i}`} isNewsletter={isNewsletter}>
                              <Elewrp
                                onClick={(e) =>
                                  handleFrameClick(
                                    e,
                                    content,
                                    frame.frameClick,
                                    frame.type
                                  )
                                }
                                key={i}
                              >
                                {content[frame.type]}
                                <br />
                                <br />
                                {frame.type === 'send_type' &&
                                content.send_type === 'daily'
                                  ? content?.send_type_option
                                      .map(
                                        (day) =>
                                          `${'  '}  ${
                                            day.charAt(0) + day.substring(1, 3)
                                          }`
                                      )
                                      .join(',')
                                  : frame.type === 'send_type' &&
                                    content.send_type === 'monthly'
                                  ? `${'  '} ${content?.send_type_option}`
                                  : frame.type === 'send_type' &&
                                    content.send_type === 'onetime'
                                  ? `${'  '}  ${formatDate(
                                      content?.send_type_option
                                    )}`
                                  : ''}
                              </Elewrp>
                            </ItemWrp>
                          )
                        ) : (
                          <ItemWrp key={`${i}`} isNewsletter={isNewsletter}>
                            <Elewrp
                              onClick={(e) =>
                                handleFrameClick(
                                  e,
                                  content,
                                  frame.frameClick,
                                  frame.type
                                )
                              }
                              key={i}
                            >
                              {content[frame.type]}
                              <br />
                              <br />
                              {frame.type === 'send_type' &&
                              content.send_type === 'daily'
                                ? content?.send_type_option
                                    .map(
                                      (day) =>
                                        `${'  '}  ${
                                          day.charAt(0) + day.substring(1, 3)
                                        }`
                                    )
                                    .join(',')
                                : frame.type === 'send_type' &&
                                  content.send_type === 'monthly'
                                ? `${'  '} ${content?.send_type_option}`
                                : frame.type === 'send_type' &&
                                  content.send_type === 'onetime'
                                ? `${'  '}  ${formatDate(
                                    content.send_type_option
                                  )}`
                                : ''}
                            </Elewrp>
                          </ItemWrp>
                        )
                      ) : (
                        <ItemWrp key={`${i}`}>
                          <Elewrp
                            onClick={(e) =>
                              handleFrameClick(
                                e,
                                content,
                                frame.frameClick,
                                frame.type
                              )
                            }
                            key={i}
                          >
                            {content[frame.type]?.dateType}
                            {content[frame.type]?.value.join(', ')}
                          </Elewrp>
                        </ItemWrp>
                      )
                    )}
                    {content.created_by_name && (
                      <ItemWrp>
                        <SharedIconsCont>
                          {/* <SharedIconCir key={j} backgroundColor={color[j]}>
                            GS
                          </SharedIconCir> */}
                          {content?.recipients?.map((ele, i) => {
                            if (i < 3) {
                              return (
                                <SharedIconCir
                                  key={i}
                                  backgroundColor={color[i]}
                                  title={ele}
                                >
                                  {ele.charAt(0).toUpperCase()}
                                </SharedIconCir>
                              );
                            }

                            // if (i > 2) {
                            //   <SharedIconCir backgroundColor="#999999">
                            //     +{i - 2}
                            //   </SharedIconCir>;
                            // }
                            return '';
                          })}
                          {content?.recipients?.length > 2 &&
                            content?.recipients?.length - 3 !== 0 && (
                              <SharedIconCir backgroundColor="#999999">
                                +{content?.recipients?.length - 3}
                              </SharedIconCir>
                            )}
                        </SharedIconsCont>
                      </ItemWrp>
                    )}
                    {isIcons && newsLetterTab !== 1 && (
                      // <Elewrp width="2rem">
                      <>
                        <ItemIconWrp>
                          {bookMardClick && (
                            <Iconwrpr onClick={() => bookmarkHandler(content)}>
                              <BookMarkIcon2
                                color={
                                  content?.is_bookmark || content?.bookmark
                                    ? theme[selectedTheme].primary
                                    : 'white'
                                }
                                stroke={
                                  content?.is_bookmark || content?.bookmark
                                    ? theme[selectedTheme].primary
                                    : '#585858'
                                }
                              />
                            </Iconwrpr>
                          )}
                        </ItemIconWrp>
                        <ItemIconWrp>
                          {dotClick && (
                            <Iconwrpr
                              onClick={() => {
                                setShowEditOptions((prev) => !prev);
                                setSelectedOption(j);
                              }}
                            >
                              <VerticleDots />
                            </Iconwrpr>
                          )}
                          {showEditOptions && seletedOption === j && (
                            <EditIconWrp
                              open={showEditOptions}
                              ref={tooltipRef}
                            >
                              <EditOption
                                onClick={() => {
                                  setSavePopup(true);
                                  setSeleteditem(content);
                                }}
                              >
                                Edit
                              </EditOption>
                              <EditOption
                                onClick={() => handleEditDelete(content)}
                              >
                                Delete
                              </EditOption>
                            </EditIconWrp>
                          )}
                        </ItemIconWrp>
                      </>
                      // </Elewrp>
                    )}
                  </FramRightpr>
                </Contentwrpr>
              ))
          : 'Loading...'}
      </ContentsContainer>
      {checkeditems.length > 0 && (
        <DeleteMainWrp onClick={() => handleDelete(checkeditems)}>
          <Delete1 color="white" />
          <DeleteTextWpr>Delete</DeleteTextWpr>
        </DeleteMainWrp>
      )}
    </>
  );
};

ContentBox.propTypes = {
  dataAmx: Proptypes.object,
  data: Proptypes.oneOfType([
    Proptypes.object,
    Proptypes.arrayOf(object),
    Proptypes.string,
  ]),
  handleLoad: Proptypes.func,
  checkeditems: Proptypes.arrayOf(object),
  isPopup: Proptypes.bool,
  isCheckBox: Proptypes.bool,
  Frames: Proptypes.arrayOf(object),
  handleCheckedItems: Proptypes.func,
  handleFilter: Proptypes.func,
  pageLimit: Proptypes.number,
  isLoading: Proptypes.bool,
  isIcons: Proptypes.bool,
  dotClick: Proptypes.bool,
  bookMardClick: Proptypes.bool,
  handleClick: Proptypes.func,
  toggler: Proptypes.func,
  titleClick: Proptypes.func,
  isNewsletter: Proptypes.bool,
  savedIcon: Proptypes.bool,
  isTriangle: Proptypes.bool,
  showRecent: Proptypes.bool,
  orderBy: Proptypes.string,
  sortBy: Proptypes.string,
  dashboardType: Proptypes.string,
  searchQuery: Proptypes.string,
  setDashboardType: Proptypes.func,
  setSearchType: Proptypes.func,
  bookmarkedItems: Proptypes.arrayOf(object),
  handleBookmarkedItems: Proptypes.func,
  showChip: Proptypes.bool,
  handleDelete: Proptypes.func,
  handleEditDelete: Proptypes.func,
  setSavePopup: Proptypes.func,
  setSeleteditem: Proptypes.func,
  setBookMarkedOrder: Proptypes.func,
  searchTxt: Proptypes.string,
  updateCheckBox: Proptypes.string,
  newsLetterTab: Proptypes.string,
};
