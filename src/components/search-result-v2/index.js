import React, { useState } from 'react';
import AppBG from '../app-bg';
import AppHeader from '../app-header';
// import ChevronLeft from '../../assets/icons/ChevronLeft';
// import ChevronRight from '../../assets/icons/ChevronRight';
import {
  // Btn,
  // BtnWrp,
  NonEditModeContainer,
  SearchPageWrp,
  SearchResultWrp,
  SearchSection,
  SearchWrp,
  HeaderContainer,
  SaveSearchBtn,
  SearchMainWrp,
  WrapperContainer,
  SectionHeader,
  CrossButtonWrp,
  ButtonText,
  SearchTextWrp,
  SearchQueryBox,
  SearchText,
  Iconwrp,
  IconWraper,
  ArticleSectionComponentWrp,
} from './index.sc';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardPopup from '../dasboard-popup';
import DashSearchDrwr from '../dashboard-saved-search-drawer';
import { SearchFocusBackdrop } from '../home-page/search-section/index.sc';
import { convertObjToString } from '../../utils';
import Spinner from '../spinner';
import { useDashboardData, useSearchData } from '../../hooks/useSearch';
// import DashboardSectionComponent from './dashboard-section';
import ArticleSectionComponent from './article-section';
import AddtoCanvas from '../add-to-canvas';
import { CanvasList } from '../custom-drawer/mock';
import { theme } from '../../constants/theme';
import { useSelector } from 'react-redux';
import FilterComponent from '../search-component/filter';
import SearchPopup from '../search-popup/SearchPopContent';
import { Frames } from '../search-popup/contents';
import SearchComponent from '../search-component';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosPutRequest } from '../../service';
import AppFooter from '../app-footer';
import bgsr from '../../assets/img/bg/bg_sr.svg';
import ArrowLeft from '../../assets/icons/ArrowLeft';
import Arrow from '../../assets/icons/Arrow';
import XCirlcle from '../../assets/icons/XCirlcle';
import DashboardInnerContainer from '../search-result/dashboard-section/DashboardInnerContainer';
import DashboardHeaderV2 from './dashboard-section/dashboard-header-v2';

const articleTypeDefault = {
  widget: undefined,
  graphSelection: undefined,
};

const SearchResultV2 = () => {
  const { searchId } = useParams();
  // const [activeScreen, setActiveScreen] = useState('');
  const [loader, setLoader] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [guidedSection, setGuidedSection] = useState(false);
  const [showSavedSearch, setShowSavedSearch] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showNewCandrwr, setShowNewCandrwr] = useState(false);
  const [floatingPagination, setfloatingPagination] = useState(false);
  const [articlePosition, setArticlePosition] = useState('');
  // const [active, setActive] = useState(0);
  // const [guidedSearch, setGuidedSearch] = useState({
  //   all: '',
  //   none: '',
  //   any: '',
  // });
  // const [value, setValue] = useState('');
  const [filterState, setFilterState] = useState();
  const queryClient = useQueryClient();
  const activeScreen = '';
  const navigate = useNavigate();
  // const maxWords = 10;

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const [type, setType] = useState('totalArticles');

  const {
    isLoading: searchDataLoading,
    // error: searchError,
    data: searchData,
    // isFetching,
  } = useSearchData(searchId);

  const handleSearchUpdate = (payload) => {
    return axiosPutRequest(
      '/api/search',
      {
        searchId,
      },
      payload
    );
  };

  const { mutate: updateSearch } = useMutation({
    mutationFn: handleSearchUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['search-data', searchId] });
      queryClient.invalidateQueries({
        queryKey: ['dashboard-data', searchId],
      });
      queryClient.invalidateQueries({
        queryKey: ['articles'],
      });
    },
  });

  const searchedDetails = searchData?.data || {};
  const searchedQuery = searchedDetails?.query;

  const {
    // isLoading: dashboardDataLoading,
    // error: searchError,
    data: dashboardData,
    // isFetching,
  } = useDashboardData(searchId);

  // const tabKeywords = dashboardData?.data?.data?.keywords;
  const tileDetails = dashboardData?.data?.data?.summary || [];
  const dashboardDetails = dashboardData?.data?.data?.dashboardDetails || [];
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

  // const onBtnClick = (screen) => {
  //   setLoader(true);
  //   setActiveScreen(activeScreen === '' ? screen : '');
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 500);
  // };

  // const handleSearchEdit = () => {
  //   setEditMode((old) => !old);
  //   setIsSearchFocused(true);
  // };

  // const handleSearchInputFocus = (isFocused) => {
  //   setIsSearchFocused(isFocused);
  // };

  const handleGuidedToggle = () => {
    setGuidedSection((old) => !old);
  };

  const handleSearchValue = (data) => {
    console.log(data, 'searchResult->data');
    // call search update api
    const updatePayload = {
      ...data,
      filter: filterState,
    };
    updateSearch(updatePayload);
  };

  const handleCancelSearch = () => {
    setGuidedSection(false);
    setEditMode(false);
  };

  const handleCancelSearchResult = () => {
    navigate('/');
  };

  const handleBackdropClick = () => {
    handleCancelSearch();
  };
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
  const handleEditMode = () => {
    setEditMode(true);
  };
  // const handleUpdateSearch = () => {};
  const handleShowSavedSearches = (e) => {
    e.stopPropagation();
    setShowSaved((old) => !old);
  };

  const handleFilterChange = (data) => {
    // const { name, options } = data;
    console.log(data, 'onFilterChange');
    setFilterState(data);
    // call update api
  };

  const [articleType, setArticleType] = useState(articleTypeDefault);
  if (searchDataLoading) {
    return <Spinner />;
  }

  console.log(filterState, 'filterState');
  // const handlePage = (pageNum) => {
  //   setPage(pageNum);
  //   queryClient.invalidateQueries(['articles', pageNum, type]);
  // };

  const handleSaveSearch = () => {
    setShowSavedSearch((old) => !old);
  };

  const setArticleTypeClose = () => {
    setArticleType(articleTypeDefault);
  };

  const handleClick = (index) => {
    setLoader(true);
    setfloatingPagination(true);
    let position = '';
    if (index % 2 !== 0) {
      position = 'left';
    } else {
      position = 'right';
    }
    setArticlePosition(position);
    setLoader(false);
  };

  return (
    <SearchPageWrp>
      <AppBG bg1h={'11.5%'} bg1={bgsr} />
      <AppHeader />
      <SearchFocusBackdrop
        className={`backdrop ${editMode ? 'active' : ''}`}
        onClick={handleBackdropClick}
      ></SearchFocusBackdrop>
      <SearchMainWrp activeScreen={activeScreen}>
        <SearchSection>
          <SearchWrp className={`search-wrapper ${editMode ? 'active' : ''}`}>
            <NonEditModeContainer>
              <HeaderContainer>
                <SectionHeader>
                  <CrossButtonWrp onClick={handleCancelSearchResult}>
                    <ArrowLeft
                      color={theme[selectedTheme].text}
                      width="32"
                      height="32"
                    />
                  </CrossButtonWrp>
                  <SearchTextWrp>
                    <SearchText>GUCCI</SearchText>
                    <Iconwrp onClick={handleShowSavedSearches}>
                      <Arrow
                        size="1rem"
                        className={'dropdown-arrow-icon'}
                        fill={theme[selectedTheme].text}
                      />
                    </Iconwrp>
                  </SearchTextWrp>
                  <SaveSearchBtn onClick={handleSaveSearch}>
                    <ButtonText>Save</ButtonText>
                  </SaveSearchBtn>
                </SectionHeader>
                <FilterComponent
                  searchFilter={searchedDetails?.filter}
                  handleFilterChange={handleFilterChange}
                  editMode={editMode}
                  searchResult={true}
                />
                <SearchQueryBox
                  className={editMode ? 'hide' : ''}
                  onClick={handleEditMode}
                >
                  {truncateQuery(searchedQuery)}
                </SearchQueryBox>
              </HeaderContainer>
              <WrapperContainer className={editMode ? 'active' : ''}>
                <SearchComponent
                  // onSearchInputFocus={handleSearchInputFocus}
                  onGuidedToggleFocus={handleGuidedToggle}
                  isFocused={editMode}
                  handleSearchValue={handleSearchValue}
                  guidedSection={guidedSection}
                  handleCancelSearch={handleCancelSearch}
                  isEditMode={editMode}
                  isSearchResult={true}
                  searchedDetails={searchedDetails}
                />
              </WrapperContainer>
            </NonEditModeContainer>
          </SearchWrp>
          <DashboardPopup
            toggler={setShowSaved}
            open={showSaved}
            popContent={<SearchPopup Frames={Frames} titleClick={() => {}} />}
            padding="0px"
            Cross={true}
            borderRadius="0.75rem"
          />
        </SearchSection>
        <SearchResultWrp activeScreen={activeScreen}>
          <DashboardHeaderV2></DashboardHeaderV2>
          <DashboardInnerContainer
            setClickedPosition={handleClick}
            dashboardDetails={dashboardDetails}
            activeScreen={activeScreen}
            tileDetails={tileDetails}
            selected={null}
            loader={loader}
            setSelected={() => {}}
            setArticleType={setArticleType}
            overRideSlot={false}
            articlePosition={articlePosition}
          />
          <ArticleSectionComponentWrp articlePosition={articlePosition}>
            <IconWraper
              onClick={() => setArticlePosition('')}
              articlePosition={articlePosition}
            >
              <XCirlcle />
            </IconWraper>
            <ArticleSectionComponent
              articleType={articleType}
              activeScreen={activeScreen}
              setArticleTypeClose={setArticleTypeClose}
              page={page}
              setPage={setPage}
              type={type}
              setType={setType}
              setTotal={0}
              articlePosition={articlePosition}
              floatingPagination={floatingPagination}
            />
          </ArticleSectionComponentWrp>
        </SearchResultWrp>
      </SearchMainWrp>
      <AppFooter />
      <DashboardPopup
        popContent={<DashSearchDrwr toggler={setShowSavedSearch} />}
        padding="1.88rem"
        open={showSavedSearch}
        toggler={setShowSavedSearch}
        borderRadius="0.625rem"
        width={'45vw'}
      />
      <AddtoCanvas
        open={showNewCandrwr}
        toggler={setShowNewCandrwr}
        CanvasList={CanvasList}
      />
    </SearchPageWrp>
  );
};

export default SearchResultV2;
