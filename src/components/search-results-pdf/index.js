import React, { useEffect, useState, useMemo } from 'react';

import {
  Btn,
  BtnWrp,
  NonEditModeContainer,
  SearchResultWrp,
  SearchSection,
  SearchWrp,
  HeaderContainer,
  SearchMainWrp,
  SectionHeader,
  SearchTextWrp,
  SearchText,
  ArticleMainWrapper,
  DashboardSection,
} from './index.sc';
import { useDashboardData, useSearchData } from '../../hooks/useSearch';
// import Spinner from '../spinner';
import ArrowLeft from '../../assets/icons/ArrowLeft';
import DashboardInnerContainer from '../search-result/dashboard-section/DashboardInnerContainer';
import ArticleSectionComponent from './article-section';

const articleTypeDefault = {
  widget: undefined,
  graphSelection: undefined,
};
const findIndexByTitle = (arr = [], title = '') =>
  [...arr].findIndex((obj) => obj?.title === title);

const updateState = (stateArray, newState, index) =>
  index === -1
    ? stateArray
    : [...stateArray.slice(0, index), newState, ...stateArray.slice(index + 1)];

const SearchResultPdf = () => {
  const { searchId } = Object.fromEntries(
    new URLSearchParams(window.location.search)
  );
  const [activeScreen, setActiveScreen] = useState('');
  const [loader, setLoader] = useState(false);
  const [resetSelection, setResetSelection] = useState(true);
  const [selected, setSelected] = useState(null);
  const [articlePosition, setArticlePosition] = useState('');
  // const [guidedSearch, setGuidedSearch] = useState({
  //   all: '',
  //   none: '',
  //   any: '',
  // });
  // const [value, setValue] = useState('');
  const paginationWidth = '40.5vw';
  // const maxWords = 10;

  const [type, setType] = useState('totalArticles');

  const {
    isLoading: searchDataLoading,
    // error: searchError,
    // isFetching,
  } = useSearchData(searchId);
  //  const setResetSelection = (value) => {};

  const {
    isLoading: dashboardDataLoading,
    // error: searchError,
    data: dashboardData,
    // isFetching,
  } = useDashboardData(searchId);
  // const tabKeywords = dashboardData?.data?.data?.keywords;
  const tileDetails = dashboardData?.data?.data?.summary || [];
  // const InitialLoader = dashboardDataLoading;
  const dashboardDetails = useMemo(
    () => dashboardData?.data?.data?.dashboardDetails || [],
    [dashboardData]
  );
  // const dashboardDetails = dashboardData?.data?.data?.dashboardDetails || [];
  const customWidgetDetails = dashboardData?.data?.data?.customWidgets;
  const x = dashboardDetails.length;
  const [selectGraph, setSelectedGraph] = useState([]);
  console.log('l;oading', dashboardDataLoading);
  // const [showFeatures, SetShowFeature] = useState(false);

  const [dashboardState, setDashboardState] = useState([...dashboardDetails]);

  useEffect(() => {
    setDashboardState([...dashboardDetails]);
  }, [dashboardDetails]);

  const handleUpdatedChart = (data) => {
    const { chartType: updatedChartType, chartName: chartTitle } = data;

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

  const onBtnClick = (screen) => {
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

  const [page, setPage] = useState(0);

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

  // const handleUpdateSearch = () => {};

  const [articleType, setArticleType] = useState(articleTypeDefault);
  if (searchDataLoading) {
    // return <Spinner />;
  }

  // console.log(filterState, 'filterState');
  // const handlePage = (pageNum) => {
  //   setPage(pageNum);
  //   queryClient.invalidateQueries(['articles', pageNum, type]);
  // };

  const setArticleTypeClose = () => {
    setArticleType(articleTypeDefault);
  };
  // const handleClick = (index) => {
  //   setLoader(true);
  //   setfloatingPagination(floatingPagination);
  //   let position = '';
  //   if (index % 2 !== 0) {
  //     position = 'left';
  //   } else {
  //     position = 'right';
  //   }
  //   setArticlePosition(position);
  //   setLoader(false);
  // };
  // console.log(InitialLoader, 'loader');
  return (
    <SearchMainWrp activeScreen={activeScreen}>
      <SearchSection>
        <SearchWrp className={'search-wrapper'}>
          <NonEditModeContainer>
            <HeaderContainer>
              <SectionHeader>
                <SearchTextWrp>
                  <SearchText>GUCCI</SearchText>
                </SearchTextWrp>
              </SectionHeader>
            </HeaderContainer>
          </NonEditModeContainer>
        </SearchWrp>
      </SearchSection>
      <BtnWrp top="15.9rem" activeScreen={activeScreen}>
        <Btn
          className={activeScreen === 'dashboard' ? 'inactive' : ''}
          onClick={() => onBtnClick('article')}
          rotate={true}
          id="open-article"
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
          id="open-dashboard"
        >
          <ArrowLeft
            color={activeScreen === '' ? '#161A34' : '#FFFFFF'}
            width="1.375rem"
            height="1.875rem"
          />
        </Btn>
      </BtnWrp>

      <SearchResultWrp activeScreen={activeScreen}>
        {activeScreen === 'dashboard' && (
          <DashboardSection
            activeScreen={activeScreen}
            className={activeScreen === 'dashboard' ? 'active' : ''}
          >
            <DashboardInnerContainer
              dashboardDetails={dashboardState}
              tileDetails={tileDetails}
              customWidgetDetails={customWidgetDetails}
              loader={loader}
              articleType={articleType}
              setArticleType={setArticleType}
              overRideSlot={activeScreen !== 'dashboard'}
              setClickedPosition={() => {}}
              articlePosition={''}
              handleUpdatedChart={handleUpdatedChart}
              setResetSelection={setResetSelection}
              setSelected={setSelected}
              selected={selected}
              setArticlePosition={setArticlePosition}
              resetSelection={resetSelection}
              setArticleTypeClose={setArticleTypeClose}
              selectGraph={selectGraph}
              setSelectedGraph={setSelectedGraph}
              handleShowDownloadPopUp={handleShowDownloadPopUp}
              editOption={false}
              showChangeGraphOptions={false}
              actionOption={false}
            />
          </DashboardSection>
        )}

        {activeScreen === 'article' && (
          <ArticleMainWrapper
            className={`articleMainWrapper ${
              activeScreen === 'dashboard' ? 'active' : ''
            }`}
            activeScreen={activeScreen}
          >
            <ArticleSectionComponent
              articleType={articleType}
              activeScreen={activeScreen}
              setArticleTypeClose={setArticleTypeClose}
              page={page}
              setPage={setPage}
              type={type}
              setType={setType}
              id={searchId}
              setArticlePosition={setArticlePosition}
              articlePosition={articlePosition}
              floatingPagination={true}
              setSelected={setSelected}
              resetSelection={resetSelection}
              setSelectedGraph={setSelectedGraph}
              setResetSelection={setResetSelection}
              pageWidth={paginationWidth}
              showFullTitle={true}
            />
          </ArticleMainWrapper>
        )}
      </SearchResultWrp>
    </SearchMainWrp>
  );
};

export default SearchResultPdf;
