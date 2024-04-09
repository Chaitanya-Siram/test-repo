import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ArticleSection,
  CheckInp,
  IconBoxwpr,
  // IconWrapper,
  Iconwpr,
  Paginatewpr,
  SectionMainWrp,
  // Paginatewpr,
  SectionTitle,
  Sectionwpr,
  TabPopwpr,
  // IconWraper,
} from '../index.sc';
// import IconBox from '../IconBox';
import Tabs from '../../tabs';
import ArticleDetails from '../../articles/article-details';
import Articles from '../../articles';
// import Pagination from '../../pagination';
import {
  useArticleData,
  useGetAllHiddenArticlesBySearchId,
  useGetArticlesThemeData,
} from '../../../hooks/useSearch';
import { useMutation } from '@tanstack/react-query';
// import Spinner from '../../spinner';
import { TitleBox } from '../../tabs/TabTitle';
import {
  ArticleDetialtsWrp,
  DashboardListwpr,
  HeadingWrp,
  // LinkSpan,
  LoadingWrp,
  NoResultsDesp,
  NoResultsTitle,
  NoResultsWrp,
  TabButton,
  ThemeTabs,
  Themetabtxt,
} from './index.sc';
import { theme } from '../../../constants/theme';
import DownIcon from '../../../assets/icons/DownIcon';
import { useSelector } from 'react-redux';
import { axiosPostRequest } from '../../../service';
import { ArticleTheme } from '../../tabs/CardTitle';
import Pagination from '../../pagination';
import IconBox, { dropdownOptions } from '../IconBox';
// import useDebounce from '../../../hooks/useDebounce';
// import XCirlcle from '../../../assets/icons/XCirlcle';
import CircularLoading from '../../../assets/icons/loading/circularLoading';
import { addCountPrefix } from '../../../constants/utils';
import { VerticleDots } from '../../../assets/icons/VerticleDots';
import SimpleReusableDropDown from '../../simple-dropdown';
import SortDropdown from '../SortDropdown';
import { useLocation } from 'react-router-dom';
import { CustomPaginationWrapper } from '../../pagination/index.sc';

const ArticleSectionComponent = ({
  activeScreen,
  articleType,
  page,
  setPage,
  type,
  setType,
  id,
  articlePosition,
  floatingPagination,
  setSelected,
  setSelectedGraph,
  setResetSelection,
  showTabs = true,
  showFullTitle = true,
  showHeading = false,
  loader = false,
  articlesInfo,
  articlePagingInfo,
  isLoading,
  searchKey = '',
  setSearchKey = () => {},
  sortOrder,
  setSortOrder = () => {},
  titleTabs,
  setClickedPosition,
  setArticleType,
  onBtnClick,
  setSydicationActive,
  setSydicationArticles,
  sydicationActive,
  sydicationArticles,
  articlesRecentSearchId,
  setTriggerFetchUseEffect,
  storeArticleCommentsTags,
  storeComments,
  setStoreComments,
  storeTags,
  setStoreTags,
  getPayloadForSearch = () => {},
  query = '',
  filters = {},
  setIsCustomPagiNationFlag,
  resetAllChecked,
  toggleResetAllChecked,
  setTags,
  setSyndicationClick,
  name,
  syndicationClickData,
  activeTheme = [],
  setActiveTheme,
  checked = [],
  setChecked = () => {},
  setDownLoadArticleFlag = () => {},
  setDownloadSelected = () => {},
  isActiveScreenSelected,
  bookmarksLocal,
  hiddenArticlesLocal,
  liveArticleCount,
}) => {
  const [filter, setFilter] = useState('');
  const [hiddenArticle, setHiddenArticle] = useState();

  const limit = 50;

  const {
    // error: articleerror,
    data,
    // isFetching,
  } = useArticleData(
    limit,
    page,
    type,
    activeTheme,
    searchKey,
    sortOrder,
    filter,
    id,
    true,
    articleType.widget,
    articleType.graphSelection,
    sydicationArticles
  );
  // eslint-disable-next-line no-unused-vars
  const [total, setTotal] = useState();
  const [showTab, setShowTab] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openActionDropdown, setOpenActionDropDown] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [sortPopUp, setSortPopUp] = useState(false);
  const [hiddenArticleTigger, setHiddenArticleTigger] = useState(false);
  const [customPageNum, setCustomPageNum] = useState('');
  const [isCustomPagiNation, setIsCustomPagiNation] = useState(false);

  const showOptRef = useRef();
  const iconBoxRef = useRef(null);
  const { state } = useLocation();
  const recentSearchId = state?.savedSearchData?.recent_search_id;

  // eslint-disable-next-line no-unused-vars
  // const { data: themeTabs, isLoading: themeTabLoading } = useQuery({
  //   queryKey: ['themeTab', id],
  //   queryFn: () => axiosGet('/article-theme', { id }),
  //   refetchOnWindowFocus: false,
  //   enabled: !!id,
  // });

  const { data: articlesThemeData, isLoading: articleThemeLoading } =
    useGetArticlesThemeData(
      id !== 'custom-search' ? articlesRecentSearchId : articlesRecentSearchId,
      !!recentSearchId || !!articlesRecentSearchId
    );

  const themetabs = articlesThemeData?.data?.distinct_tags?.map((item, i) => {
    return { ...item, title: <ArticleTheme title={item} />, tag: item };
  });

  const handleTheme = (index, item) => {
    // console.log(item?.props?.title);

    setActiveTheme &&
      setActiveTheme((prev) => {
        if (prev.includes(item?.props?.title)) {
          return prev.filter((val) => val !== item?.props?.title);
        } else {
          return [...prev, item?.props?.title];
        }
      });
    setPage && setPage(0);
    setTriggerFetchUseEffect && setTriggerFetchUseEffect((old) => !old);
  };
  useEffect(() => {
    if (resetAllChecked) {
      setAllChecked(false);
      setChecked([]);
      toggleResetAllChecked && toggleResetAllChecked();
    }
  }, [resetAllChecked]);

  useEffect(() => {
    if (articlesThemeData?.data?.distinct_tags) {
      const allTags = articlesThemeData?.data?.distinct_tags;
      if (activeTheme?.length > 0) {
        setTags &&
          setTags((prevTags) =>
            prevTags?.filter((tag) => allTags.some((y) => y === tag))
          );
      }
    }
  }, [articlesThemeData?.data?.distinct_tags]);

  const handlePage = (pageNum) => {
    setPage(pageNum);
    setChecked([]);
    setAllChecked(false);
    setIsCustomPagiNationFlag(false);
  };

  const tabs = titleTabs?.map((ele, i) => ({
    ...ele,
    title: <TitleBox title={ele.label} des={ele.count} />,
    id: i,
  }));

  const handleChecked = (option) => {
    const newCategory = [...checked];
    if (checked.includes(option)) {
      newCategory.splice(checked.indexOf(option), 1);
      setAllChecked(false);
    } else {
      newCategory.push(option);
      if (newCategory.length === articlesInfo.length) {
        setAllChecked(true);
      }
    }
    setChecked(newCategory);
    // make a api call in seperate function
  };

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  // console.log(count, 'total count for pagination');

  useEffect(() => {
    setTotal(titleTabs?.find((x) => x.value === type)?.count || 0);
  }, [titleTabs, type]);

  const handleTabs = (index) => {
    setActiveTab(index);
    setShowTab(false);
    setType(tabs[index]?.value);
  };

  const updateBookmark = (payload) => {
    return axiosPostRequest('/articles', {}, payload);
  };

  const { mutate: mutateFunction } = useMutation({
    mutationFn: updateBookmark,
  });

  const bookMarkedArticles = data?.data?.data
    .filter((article) => article.bookmarked)
    .map((item) => item.id);
  const taggedArticles = data?.data?.data
    .filter((article) => article.tags !== '')
    .map((item) => item.id);

  const downLoadFunction = (value) => {
    mutateFunction({
      downloadType: value,
      selectedArticles:
        value === 'selected'
          ? checked
          : value === 'bookmarked'
          ? bookMarkedArticles
          : value === 'tagged'
          ? taggedArticles
          : [],
    });
  };

  const { data: allHiddenArticles, refetch: refetchHiddenArticles } =
    useGetAllHiddenArticlesBySearchId(
      id !== 'custom-search' ? articlesRecentSearchId : articlesRecentSearchId,
      (!!recentSearchId || !!articlesRecentSearchId) && hiddenArticleTigger
    );

  const actionDropDownOptions = [
    {
      label: activeScreen === 'article' ? 'Collapsed View' : 'Expand View',
      clickFunction: (option) => onBtnClick('article'),
    },
    {
      label: hiddenArticleTigger ? 'All Articles' : 'Hidden Articles',
      clickFunction: () => {
        setHiddenArticleTigger(!hiddenArticleTigger);
        // hiddenArticleTigger
        // ? refetchHiddenArticles()
        id !== 'custom-search'
          ? setTriggerFetchUseEffect((prev) => !prev)
          : setHiddenArticle((prev) => prev);
      },
    },
  ];

  const handleClickOutside = (event) => {
    if (showOptRef.current && !showOptRef.current.contains(event.target)) {
      setOpenActionDropDown(false);
    }
    if (iconBoxRef.current && !iconBoxRef.current.contains(event.target)) {
      setSortPopUp(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleOptionIcon = (e, componentName) => {
    e.stopPropagation();
    // setSelectedComponent(componentName);
    setOpenActionDropDown(!openActionDropdown);
  };

  const handleAllcheck = (isChecked) => {
    if (isChecked) {
      // for (let i = 0; i < articlesInfo?.length; i++) {
      //   const page = articlesInfo[i];
      // }
      const pageIndex = articlesInfo.map((data, i) => {
        return i;
      });
      setChecked(pageIndex);
      setAllChecked(true);
    } else {
      setChecked([]);
      setAllChecked(false);
    }
  };

  useEffect(() => {
    setSortOrder('relevance');
    // setHiddenArticleTigger(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articlePosition]);

  const handleSort = (value) => {
    setSortOrder(value);
    setSortPopUp(false);
  };

  useEffect(() => {
    if (Array.isArray(articlesInfo)) {
      setHiddenArticle([...articlesInfo]);
    }
  }, [articlesInfo]);

  const endValue = () => {
    if ((id === 'custom-search' || recentSearchId) && hiddenArticleTigger) {
      return allHiddenArticles?.data?.data?.length
        ? allHiddenArticles?.data?.data?.length || 0
        : Math.min(
            allHiddenArticles?.data?.paged?.pageNumber *
              allHiddenArticles?.data?.paged?.pageSize,
            allHiddenArticles?.data?.paged?.total
          ) || 0;
    } else {
      // eslint-disable-next-line no-unused-expressions
      return searchKey
        ? articlesInfo?.length || 0
        : Math.min(
            articlePagingInfo?.pageNumber * articlePagingInfo?.pageSize,
            articlePagingInfo?.unique || articlePagingInfo?.total
          );
    }
  };

  const startValue = () => {
    if ((id === 'custom-search' || recentSearchId) && hiddenArticleTigger) {
      return allHiddenArticles?.data?.paged?.total > 0
        ? (allHiddenArticles?.data?.paged?.pageNumber - 1) *
            allHiddenArticles?.data?.paged?.pageSize +
            1
        : 0;
    } else {
      return (articlePagingInfo?.unique || articlePagingInfo?.total) >= 1
        ? (articlePagingInfo?.pageNumber - 1) * articlePagingInfo?.pageSize + 1
        : 0;
    }
  };

  const cumstomPageHandler = (e) => {
    const regexPattern = /^[0-9]{1,10}$/;
    if (e.target.value.match(regexPattern)) {
      setCustomPageNum(e.target.value);
    } else {
      setCustomPageNum('');
    }
  };

  const onClickCustomPage = () => {
    setPage(parseInt(customPageNum) - parseInt(1));
    setChecked([]);
    setAllChecked(false);
    setIsCustomPagiNationFlag(true);
    setIsCustomPagiNation(false);
  };

  const getIndexes = (activeTheme) => {
    const indices = [];
    themetabs?.forEach((x, i) => {
      if (activeTheme?.includes(x?.tag)) {
        indices.push(i);
      }
    });
    return indices;
  };

  return (
    <>
      <ArticleSection
        activeScreen={activeScreen}
        articlePosition={articlePosition}
        className={activeScreen === 'article' ? 'active' : ''}
      >
        <SectionMainWrp>
          <Sectionwpr started={true}>
            <SectionTitle>
              {showHeading && 'All Articles'}
              {/* {(articleType.widget ||
              articleType.graphSelection ||
              floatingPagination) && (
              <> */}
              {/* {showFullTitle && articleType.widget ? (
                  <LinkSpan style={{ marginLeft: '0.25rem' }} color="#000000">
                    {articleType.widget ? '\\ ' + articleType.widget : ''}
                  </LinkSpan>
                ) : (
                  <></>
                )}
                {showFullTitle && articleType.graphSelection ? (
                  <LinkSpan color={theme.light.primary}>
                    {showFullTitle && articleType.graphSelection
                      ? '\\ ' + articleType.graphSelection
                      : articleType.graphSelection}
                  </LinkSpan>
                ) : ( */}
              {showFullTitle && <HeadingWrp>{showFullTitle}</HeadingWrp>}
              {sydicationActive && <HeadingWrp>Syndication</HeadingWrp>}
              {/* )} */}
              {/* {activeScreen !== 'dashboard' && (
                  <IconWrapper
                    onClick={() => {
                      handleClose();
                      setSelected(null);
                    }}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    <XCirlcle />
                  </IconWrapper>
                )} */}
              {/* </>
            )} */}
            </SectionTitle>
            &nbsp; &nbsp; <div> {' | '}</div>
            <TabButton onClick={() => setShowTab(!showTab)}>
              <Iconwpr>
                <DownIcon />
              </Iconwpr>
              {titleTabs?.find((x) => x?.value === type)?.label || ''}
              <span>
                (
                {addCountPrefix(
                  titleTabs?.find((x) => x?.value === type)?.count || 0
                )}
                )
              </span>
            </TabButton>
          </Sectionwpr>
          <Sectionwpr>
            <CheckInp
              type="checkbox"
              checked={allChecked}
              onChange={() => handleAllcheck(!allChecked)}
            />{' '}
            &nbsp;&nbsp;
            <IconBoxwpr
              width={'1.5rem'}
              height={'1.5rem'}
              onClick={(e) => handleOptionIcon(e, 'article')}
              ref={showOptRef}
              bgColor={'#fff'}
              className="hide-downloading"
            >
              <VerticleDots
                color={openActionDropdown ? '#675ef2' : '#5C5E60'}
              />
              <SimpleReusableDropDown
                isOpen={openActionDropdown}
                options={
                  articleType?.graphSelection
                    ? [actionDropDownOptions[1]]
                    : actionDropDownOptions
                }
                setIsOpen={setOpenActionDropDown}
              />
            </IconBoxwpr>
          </Sectionwpr>
        </SectionMainWrp>
        {showTab && (
          <TabPopwpr showTab={showTab}>
            <Tabs
              items={!tabs ? [{}] : tabs}
              widthItem={activeScreen === 'article' ? '7rem' : '20%'}
              variant="underline"
              activeColor="#675EF2"
              inactiveColor="#000000"
              onChange={handleTabs}
              isContent={false}
              bottomBorderWidth="3px"
              paddingWrapper="0.75rem 1rem"
              defaultActive={false}
              currentTab={activeTab}
            />
          </TabPopwpr>
        )}
        <ArticleDetialtsWrp>
          <ArticleDetails
            isSyndication={articleType.inSyndication}
            start={startValue()}
            end={endValue()}
            total={
              (id === 'custom-search' || recentSearchId) && hiddenArticleTigger
                ? allHiddenArticles?.data?.paged?.total
                : liveArticleCount ||
                  articlePagingInfo?.unique ||
                  articlePagingInfo?.total
            }
          />
          <DashboardListwpr
            ref={iconBoxRef}
            overflow="none"
            minWidth="none"
            width="auto"
            bgColor="none"
          >
            <TabButton
              onClick={() => setSortPopUp(!sortPopUp)}
              textColor={theme.light.closeButton}
              fontSize={'0.875rem'}
            >
              Sorted by{' '}
              {sortOrder === 'date'
                ? 'Date Published'
                : sortOrder
                    ?.replace(/_/g, ' ')
                    ?.replace(/(?:^|\s)\S/g, (c) => c.toUpperCase())}
              <Iconwpr
                style={{
                  transform: sortPopUp ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <DownIcon />
              </Iconwpr>
            </TabButton>
            <SortDropdown
              left="none"
              bottom="none"
              marginBottom="none"
              Open={sortPopUp}
              setIsDropdownOpen={handleSort}
              sortOrder={sortOrder}
              dropdownOptions={dropdownOptions}
              position={'bottom'}
            />
          </DashboardListwpr>
        </ArticleDetialtsWrp>
        {articlesInfo?.length >= 1 &&
        themetabs?.length > 0 &&
        showHeading &&
        !hiddenArticleTigger ? (
          <ThemeTabs>
            <Themetabtxt>Tags/Themes</Themetabtxt>
            <Tabs
              // items={!themeTabs?.data?.data ? [{}] : themetabs}
              items={themetabs}
              variant="card"
              activeColor={theme[selectedTheme].background}
              inactiveColor={theme[selectedTheme].tagsBorderColor}
              onChange={handleTheme}
              isContent={false}
              gapitems="0.4rem"
              bottomBorderWidth="0"
              wraperBorderWidth="0"
              activeCardBGColor={theme[selectedTheme].tagsBorderColor}
              inactiveCardBGColor={theme[selectedTheme].background}
              cardBorderRadius=".75rem"
              paddingWrapper="0.25rem 0 0"
              defaultActive={false}
              resetTab={true}
              currentTabList={getIndexes(activeTheme)}
            />
          </ThemeTabs>
        ) : (
          ''
        )}
        {Array.isArray(articlesInfo) && !loader && !isLoading ? (
          <Articles
            savedSearchId={id}
            articles={articlesInfo}
            articleView={activeScreen === 'article'}
            type={type}
            page={page}
            syndicationClickData={syndicationClickData}
            showTab={showTabs}
            floatingPagination={floatingPagination}
            handleChecked={handleChecked}
            checked={checked}
            allChecked={allChecked}
            setSydicationActive={setSydicationActive}
            setSydicationArticles={setSydicationArticles}
            sydicationActive={sydicationActive}
            sydicationArticles={sydicationArticles}
            allHiddenArticles={allHiddenArticles}
            articlesRecentSearchId={articlesRecentSearchId}
            setSyndicationClick={setSyndicationClick}
            setClickedPosition={setClickedPosition}
            setTriggerFetchUseEffect={setTriggerFetchUseEffect}
            storeArticleCommentsTags={storeArticleCommentsTags}
            storeComments={storeComments}
            setStoreComments={setStoreComments}
            storeTags={storeTags}
            hiddenArticleTigger={hiddenArticleTigger}
            setHiddenArticle={setHiddenArticle}
            hiddenArticle={hiddenArticle}
            setStoreTags={setStoreTags}
            name={name}
            refetchHiddleArticles={refetchHiddenArticles}
            showFullTitle={showFullTitle}
            bookmarksLocal={bookmarksLocal}
            hiddenArticlesLocal={hiddenArticlesLocal}
          />
        ) : (
          <LoadingWrp>
            <CircularLoading
              bgColor={theme[selectedTheme].primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </LoadingWrp>
        )}
        {articlesInfo?.length < 1 && !isLoading && !loader && (
          <NoResultsWrp>
            <NoResultsTitle>No Articles to Display</NoResultsTitle>
            <NoResultsDesp>Please update your search query</NoResultsDesp>
          </NoResultsWrp>
        )}
        {floatingPagination && (
          <Paginatewpr
            articlePosition={articlePosition}
            fullScreen={activeScreen === 'article'}
            activeScreen={activeScreen}
            isActiveScreenSelected={isActiveScreenSelected}
          >
            {articlePagingInfo?.unique || articlePagingInfo?.total ? (
              <Pagination
                page={
                  (id === 'custom-search' || recentSearchId) &&
                  hiddenArticleTigger
                    ? allHiddenArticles?.data?.paged?.pageNumber - 1
                    : articlePagingInfo?.pageNumber - 1
                }
                prevClick={handlePage}
                nextClick={handlePage}
                handlePage={handlePage}
                isCustomPagiNation={isCustomPagiNation}
                setIsCustomPagiNation={(flag) => setIsCustomPagiNation(flag)}
                customPageNum={customPageNum}
                cumstomPageHandler={(e) => cumstomPageHandler(e)}
                onClickCustomPage={() => onClickCustomPage()}
                total={
                  (id === 'custom-search' || recentSearchId) &&
                  hiddenArticleTigger
                    ? allHiddenArticles?.data?.paged?.total
                    : articlePagingInfo?.unique || articlePagingInfo?.total
                }
                align="end"
                limit={
                  (id === 'custom-search' || recentSearchId) &&
                  hiddenArticleTigger
                    ? allHiddenArticles?.data?.paged?.pageSize
                    : articlePagingInfo?.pageSize
                }
              />
            ) : (
              <CustomPaginationWrapper></CustomPaginationWrapper>
            )}
            {!hiddenArticleTigger && (
              <IconBox
                articleType={articleType}
                setClickedPosition={setClickedPosition}
                setArticleType={setArticleType}
                page={page}
                type={type}
                searchQuery={searchKey}
                setSearchQuery={setSearchKey}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                downLoadFunction={downLoadFunction}
                // downloading={downloadingPdf}
                filter={filter}
                setFilter={setFilter}
                checked={checked}
                setDownLoadArticleFlag={setDownLoadArticleFlag}
                setDownloadSelected={setDownloadSelected}
                key={showFullTitle || 'All articles'}
              />
            )}
          </Paginatewpr>

          // <DashboardPopup
        )}
      </ArticleSection>
    </>
  );
};

export default ArticleSectionComponent;

ArticleSectionComponent.propTypes = {
  activeScreen: PropTypes.string,
  articleType: PropTypes.object,
  page: PropTypes.number,
  setPage: PropTypes.func,
  type: PropTypes.string,
  setType: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  articlePosition: PropTypes.string,
  floatingPagination: PropTypes.bool,
  setSelected: PropTypes.func,
  setArticlePosition: PropTypes.func,
  setSelectedGraph: PropTypes.func,
  setResetSelection: PropTypes.func,
  showTabs: PropTypes.bool,
  showFullTitle: PropTypes.string,
  pageWidth: PropTypes.string,
  showHeading: PropTypes.bool,
  loader: PropTypes.bool,
  articlesInfo: PropTypes.array,
  articlePagingInfo: PropTypes.object,
  isLoading: PropTypes.bool,
  searchKey: PropTypes.string,
  setSearchKey: PropTypes.func,
  updateBookmark: PropTypes.func,
  sortOrder: PropTypes.string,
  setSortOrder: PropTypes.func,
  titleTabs: PropTypes.array || undefined,
  setClickedPosition: PropTypes.func,
  setArticleType: PropTypes.func,
  onBtnClick: PropTypes.func,
  setSydicationActive: PropTypes.func,
  setSydicationArticles: PropTypes.func,
  sydicationActive: PropTypes.bool,
  sydicationArticles: PropTypes.array,
  articlesRecentSearchId: PropTypes.string,
  setTriggerFetchUseEffect: PropTypes.func,
  storeArticleCommentsTags: PropTypes.func,
  storeComments: PropTypes.array,
  setStoreComments: PropTypes.func,
  storeTags: PropTypes.array,
  setStoreTags: PropTypes.func,
  getPayloadForSearch: PropTypes.func,
  query: PropTypes.string,
  filters: PropTypes.object,
  isCustomPagiNationFlag: PropTypes.bool,
  setIsCustomPagiNationFlag: PropTypes.func,
  resetAllChecked: PropTypes.bool,
  toggleResetAllChecked: PropTypes.func,
  setTags: PropTypes.func,
  setSyndicationClick: PropTypes.func,
  name: PropTypes.string,
  syndicationClickData: PropTypes.object,
  activeTheme: PropTypes.array,
  setActiveTheme: PropTypes.func,
  checked: PropTypes.array,
  setChecked: PropTypes.func,
  setDownLoadArticleFlag: PropTypes.func,
  setDownloadSelected: PropTypes.func,
  isActiveScreenSelected: PropTypes.bool,
  bookmarksLocal: PropTypes.array,
  hiddenArticlesLocal: PropTypes.array,
  liveArticleCount: PropTypes.number,
};
