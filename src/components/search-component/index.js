import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import SearchBar from '../search-bar';
import {
  AddContentContainer,
  AddItemContainer,
  AddWordWrp,
  ErrorBtn,
  ErrorCtnWrp,
  ErrorDsp,
  ErrorSpan,
  ErrorTitle,
  ErrorWrp,
  ExpandedContainer,
  FilterWrapper,
  GuidedSearchSection,
  GuidedTextWrp,
  HeaderLeftCon,
  IconText,
  InputWrp,
  KeywordItem,
  KeywordValue,
  KeywordValueInput,
  KeywordWrap,
  // RecentSearchWrp,
  SaveCount,
  // IconWrapper,
  SavedSearchContainer,
  SearchBarWrapper,
  SearchComponentWrapper,
  SearchesContainer,
  SectionHeader,
  SectionTitle,
  TextAreaCon,
  TextAreaLabel,
  ToggleContainer,
  ToggleLabel,
  WrapperContainer,
} from './index.sc';
// import { recentSearches } from './utils';
// import SaveIcon from './assets/icons/Save';
import { theme } from '../../constants/theme';
import { Button } from '../button';
import DashboardPopup from '../dasboard-popup';
import SearchPopup from '../search-popup/SearchPopContent';
import ToggleSwitch from '../toggle-switch';
// import RecentSearch from './RecentSearch';
// import SearchIcon from './assets/icons/SearchIcon';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { axiosPutRequest } from '../../service';
// import { useParams } from 'react-router';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  checkMismatchedQuotes,
  getDateRange,
  isCorrectParenthesisOrder,
  replaceOperators,
} from '../../constants/utils';
import { getTokenData } from '../../constants/validateToken';
import {
  useSavedSearchQueryCount,
  useUpdateSaveSearchQueryData,
} from '../../hooks/useSaveSearch';
import {
  getSearchQueryStatus,
  usePostSearchDataV1,
  useSearchFilterData,
} from '../../hooks/useSearch';
import { getSearchParams } from '../../utils';
import CustomConfirmationPopUp from '../customize-confirmation-popup';
import SaveSourcePopup from '../save-source';
import { Frames } from '../search-popup/contents';
import FilterComponent from './filter';
import { Iconwrp } from '../search-result/index.sc';
import Close from '../../assets/icons/Close';
import Done from '../../assets/icons/Done';
import AddKeyword from '../search-result/dashboard-section/dashboard-header/AddKeyword';
import { inBuiltOperators } from '../search-bar/CustomInBuiltConfig';
// import toast from 'react-hot-toast';

const SearchComponent = ({
  onSearchInputFocus,
  isFocused,
  handleSearchValue,
  onGuidedToggleFocus,
  guidedSection,
  handleCancelSearch,
  isEditMode = false,
  isSearchResult = false,
  searchedDetails,
  createSearch = false,
  handleChangeQuery,
  searchDetailsQuery,
}) => {
  // const { searchId } = useParams();
  const authInfo = getTokenData();
  const searchedQuery = searchDetailsQuery;
  const searchFilter = searchedDetails?.filter || {
    languages: [{ label: 'English', value: 'en' }],
    locations: [{ label: 'United States', value: 'us' }],
  };
  const [value, setValue] = useState('');
  const [guidedSearch, setGuidedSearch] = useState({
    all: '',
    none: '',
    any: '',
  });
  const [showSaved, setShowSaved] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [filter, setFilter] = useState(searchFilter);
  const [savePopup, setSavePopup] = useState(false);
  const [selectedItem, setSeleteditem] = useState({});
  const [btnTxt, setBtnTxt] = useState(isEditMode ? 'Update' : 'Search');
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [isDashboardsAssociated, setIsDashboardsAssociated] = useState(false);
  const [errorPopUp, setErrorPopUp] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [allDataList, setAllDataList] = useState([]);
  const [noneDataList, setNoneDataList] = useState([]);
  const [anyDataList, setAnyDataList] = useState([]);
  const [allEditing, setAllEditing] = useState(false);
  const [allIndex, setAllIndex] = useState(undefined);
  const [allValue, setAllValue] = useState('');
  const [noneEditing, setNoneEditing] = useState(false);
  const [noneIndex, setNoneIndex] = useState(undefined);
  const [noneValue, setNoneValue] = useState('');
  const [anyValue, setAnyValue] = useState('');
  const [anyEditing, setAnyEditing] = useState(false);
  const [anyIndex, setAnyIndex] = useState(undefined);
  const [saveKeyWord, setSaveKeyWord] = useState('');
  const [hoverDataAll, setHoverDataAll] = useState();
  const [hoverDataNone, setHoverDataNone] = useState();
  const [hoverDataAny, setHoverDataAny] = useState();

  // const queryClient = useQueryClient();
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const { data: searchCount, isLoading: isFetchingAccount } =
    useSavedSearchQueryCount(authInfo?.user_id);

  // const handleSearchUpdate = (payload) => {
  //   return axiosPutRequest(
  //     '/api/search',
  //     {
  //       searchId,
  //     },
  //     payload
  //   );
  // };

  const {
    mutateAsync: postSearchAsync,
    data: postData,
    isSuccess,
    isError,
    error,
  } = usePostSearchDataV1();

  const {
    // isLoading,
    // error,
    data,
  } = useSearchFilterData(authInfo?.user_id);

  const { mutateAsync: updateSearchData } = useUpdateSaveSearchQueryData(
    authInfo?.user_id
  );

  const searchFilterOptions = data?.data || [];

  // const {
  //   mutate: updateSearch,
  //   // data: putData,
  //   // isSuccess: isUpdateSuccess,
  //   // isError: isUpdateError,
  //   // error: updateSearchError,
  // } = useMutation({
  //   mutationFn: handleSearchUpdate,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['search-data', searchId] });
  //     queryClient.invalidateQueries({ queryKey: ['dashboard-data', searchId] });
  //     queryClient.invalidateQueries({
  //       queryKey: ['articles', 0, 'totalArticles'],
  //     });
  //   },
  // });

  // const searchFilterOptions = searchFilterData?.data?.data;
  const [selectedTab, setSeletedTab] = useState(1);
  const handleChange = (event) => {
    const { value } = event.target;
    const transformedQuery = value.split(' ');
    const lastword = transformedQuery.pop();
    let query = transformedQuery.join(' ');
    query = (replaceOperators(query) + ' ' + lastword)?.trimStart();
    setValue(query);
    handleChangeQuery && handleChangeQuery(query);
  };

  const handleSearch = async () => {
    try {
      setBtnTxt('Please Wait...');
      if (!guidedSection && !value.trim()) {
        toast.error('Query should not be empty.');
        return;
      }
      let payload = {};
      let searchFilters = {};

      let filterData = searchFilterOptions.find(
        (filter) => filter.value === 'mediaTypes'
      );
      if (
        filter?.mediaTypes === undefined ||
        filter?.mediaTypes.length === filterData?.options?.length
      ) {
        if (filterData) {
          payload = { ...payload, mediaTypes: filterData?.options };
        }
      } else {
        payload = { ...payload, mediaTypes: filter?.mediaTypes };
        const mediaTypes = filter?.mediaTypes?.map((x) => x.value);
        searchFilters = { ...searchFilters, media_types: mediaTypes };
      }

      filterData = searchFilterOptions.find(
        (filter) => filter.value === 'languages'
      );
      if (
        filter?.languages === undefined ||
        filter?.languages?.length === filterData?.options?.length
      ) {
        if (filterData) {
          payload = { ...payload, languages: filterData?.options };
        }
      } else {
        payload = { ...payload, languages: filter?.languages };
        const languages = filter?.languages?.map((x) => x.value);
        searchFilters = { ...searchFilters, languages };
      }

      filterData = searchFilterOptions.find(
        (filter) => filter.value === 'locations'
      );
      if (
        filter?.locations === undefined ||
        filter?.locations?.length === filterData?.options?.length
      ) {
        if (filterData) {
          payload = { ...payload, locations: filterData?.options };
        }
      } else {
        payload = { ...payload, locations: filter?.locations };
        const locations = filter?.locations?.map((x) => x.value);
        searchFilters = { ...searchFilters, countries: locations };
      }
      if (filter?.spam_exclusions?.length > 0) {
        payload = { ...payload, spam_exclusions: filter?.spam_exclusions };
        const spamExclusions = filter?.spam_exclusions?.map((x) => x.value);
        searchFilters = { ...searchFilters, spam_exclusions: spamExclusions };
      }

      filterData = searchFilterOptions.find(
        (filter) => filter.value === 'sentiment'
      );
      if (
        filter?.sentiment === undefined ||
        filter?.sentiment?.length === filterData?.options?.length
      ) {
        if (filterData) {
          payload = { ...payload, sentiment: filterData?.options };
        }
      } else {
        payload = { ...payload, sentiment: filter?.sentiment };
        const sentiment = filter?.sentiment?.map((x) => x.value);
        searchFilters = { ...searchFilters, sentiments: sentiment };
      }

      if (filter?.dateTime === undefined) {
        searchFilters = { ...searchFilters, dateTime: '' };
        payload = {
          ...payload,
          dateTime: {
            label: 'Last 1 week',
            value: 'last_1_week',
          },
        };
      } else {
        const dateTime = filter?.dateTime?.value;
        payload = {
          ...payload,
          dateTime: {
            ...filter?.dateTime,
            value: filter?.dateTime?.end
              ? 'custom_range'
              : filter?.dateTime?.value,
          },
        };

        searchFilters = {
          ...searchFilters,
          dateTime: filter?.dateTime?.end ? 'custom_range' : dateTime,
        };
      }

      if (filter?.keywords) {
        const keywords = filter?.keywords;
        payload = {
          ...payload,
          keywords: filter?.keywords,
        };
        if (keywords?.placement?.query) {
          searchFilters = {
            ...searchFilters,
            keyword_placement: keywords?.placement?.query,
            keyword_placement_range:
              keywords?.placement?.range?.defaultValue?.length > 0
                ? keywords?.placement?.range?.defaultValue[1]
                : 100,
          };
        }
        if (keywords?.include?.query) {
          searchFilters = {
            ...searchFilters,
            keywords_includes: keywords.include.query?.split(','),
            keywords_includes_case_sensitive: keywords.include?.caseSensitive,
          };
        }

        if (keywords?.exclude?.query) {
          searchFilters = {
            ...searchFilters,
            keywords_excludes: keywords.exclude.query?.split(','),
            keywords_excludes_case_sensitive: keywords.exclude?.caseSensitive,
          };
        }
      }

      if (filter?.sources) {
        const sources = filter?.sources;
        payload = {
          ...payload,
          sources: filter?.sources,
        };
        if (
          sources?.include ||
          (Array.isArray(sources?.include) && sources?.include > 0)
        ) {
          searchFilters = {
            ...searchFilters,
            source_includes: sources.include?.map((x) => x.value),
          };
        }

        if (
          sources?.exclude ||
          (Array.isArray(sources?.exclude) && sources?.exclude > 0)
        ) {
          searchFilters = {
            ...searchFilters,
            source_excludes: sources.exclude?.map((x) => x.value),
          };
        }
      }

      let startDate, endDate;
      if (searchFilters?.dateTime === 'custom_range') {
        endDate = format(filter?.dateTime?.end, 'yyyy-MM-dd');
        startDate = format(filter?.dateTime?.start, 'yyyy-MM-dd');
      } else {
        const dateRange = getDateRange(searchFilters?.dateTime);
        startDate = dateRange?.startDate;
        endDate = dateRange?.endDate;
      }

      searchFilters = {
        ...searchFilters,
        start_date: startDate,
        end_date: endDate,
        search_type: guidedSection ? 'guided' : 'simple',
        simple_query: guidedSection ? '' : replaceOperators(value)?.trim(),
        page_number: 1,
        page_size: 50,
        save_recent_search: true,
        refresh_api: true,
        // user_id: authInfo?.user_id,
      };
      if (guidedSection) {
        searchFilters = {
          ...searchFilters,
          guided_all_of_these: guidedSearch?.all
            ?.split(',')
            .map((x) => x.trim()),
          guided_none_of_these: guidedSearch?.none
            ?.split(',')
            .map((x) => x.trim()),
          guided_any_of_these: guidedSearch?.any
            ?.split(',')
            .map((x) => x.trim()),
        };
      }

      if (isEditMode) {
        guidedSection && guidedSearch?.all === '' && guidedSearch?.any === ''
          ? setErrorPopUp(true)
          : handleSearchValue &&
          handleSearchValue(
            guidedSection ? guidedSearch : replaceOperators(value)
          );
      } else {
        if (!guidedSection) {
          if (!value.trim()) {
            toast.error('Query should not be empty.');
            return;
          }
          if (!checkMismatchedQuotes(value.trim())) {
            toast.error('Mismatched quotes present in query.');
            return;
          }
          if (!isCorrectParenthesisOrder(value.trim())) {
            toast.error('Mismatched Parenthesis present in query.');
            return;
          }
          const formatedQuery = replaceOperators(value)?.trim();
          const splitQuery = formatedQuery?.split(' ');
          if (
            inBuiltOperators.includes(
              splitQuery[splitQuery?.length - 1]?.toLowerCase()?.trim()
            ) ||
            inBuiltOperators.includes(splitQuery[0]?.toLowerCase()?.trim())
          ) {
            toast.error('Kindly check the Query text box.');
            return;
          }
        }
        if (
          guidedSection &&
          guidedSearch?.all === '' &&
          guidedSearch?.any === ''
        ) {
          setErrorPopUp(true);
        } else {
          const data = await getSearchQueryStatus(searchFilters);
          if (!data?.data) {
            toast.error(
              '"AND" and "OR" operator not allowed at same level, Please use parentheses to group terms correctly.'
            );
            return;
          }
          await postSearchAsync(searchFilters, {
            onSuccess: (postData) => {
              handleSearchValue &&
                handleSearchValue(postData?.data, {
                  filter: payload,
                  query: guidedSection ? guidedSearch : replaceOperators(value),
                  isGuidedSearch: guidedSection,
                });
            },
          });
          handleCancelSearch && handleCancelSearch(); // onGuidedToggleFocus(false) onSearchInputFocus(false);
        }
      }
      // setValue('');
    } catch (error) {
      console.log(error);
    } finally {
      isEditMode ? setBtnTxt('Update') : setBtnTxt('Search');
      setIsSubmit(false);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(error, 'post error');
      handleSearchValue && handleSearchValue(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, postData?.data, handleSearchValue, error]);

  useEffect(() => {
    if (searchedQuery !== undefined && searchedQuery !== null) {
      if (typeof searchedQuery === 'string') {
        setValue(searchedQuery);
      } else if (typeof searchedQuery === 'object') {
        const updatedQueryAll =
          searchedQuery?.all !== '' ? searchedQuery?.all?.split(',') : [];
        const updatedQueryNone =
          searchedQuery?.none !== '' ? searchedQuery?.none?.split(',') : [];
        const updatedQueryAny =
          searchedQuery?.any !== '' ? searchedQuery?.any?.split(',') : [];
        setAllDataList(updatedQueryAll);
        setNoneDataList(updatedQueryNone);
        setAnyDataList(updatedQueryAny);
        setGuidedSearch(searchedQuery);
      } else {
        console.log('else type');
      }
    }
  }, [searchedQuery, isEditMode]);

  useEffect(() => {
    if (isEditMode) {
      setBtnTxt('Update');
    } else {
      setBtnTxt('Search');
    }
  }, [isEditMode]);

  const handleInputFocus = () => {
    onSearchInputFocus && onSearchInputFocus(true);
  };

  const handleGuidedToggle = (data) => {
    const { checked } = data;
    onGuidedToggleFocus(checked);
    if (!isFocused) {
      onSearchInputFocus && onSearchInputFocus(checked);
    }
  };

  const handleGuidedSearch = (e) => {
    const { name, value } = e.target;
    setGuidedSearch({
      ...guidedSearch,
      [name]: value,
    });
    handleChangeQuery &&
      handleChangeQuery({
        ...guidedSearch,
        [name]: value,
      });
  };

  const handleShowSavedSearches = (e) => {
    setShowSaved(!showSaved);
  };

  const handleFilterChange = (data) => {
    // const { name, options } = data;
    setFilter(data);
  };

  const navigate = useNavigate();

  const handleClick = (item) => {
    let searchParams = JSON.parse(item?.search_params);
    searchParams = getSearchParams(searchParams);
    navigate(`/search-results/${item.id}/overview/${item.recent_search_id}`, {
      state: {
        data: null,
        filters: searchParams?.filters,
        isGuidedSearch: searchParams?.isGuidedSearch,
        savedSearchData: item,
      },
    });
  };
  const [deletedbtn, setDeletedbtn] = useState(false);
  const handleSavedDelete = () => {
    setDeletedbtn(() => true);
  };
  const handleSaveSearch = async ({ name, description }) => {
    if (selectedTab === 1) {
      await updateSearchData(
        {
          id: selectedItem?.id,
          title: name,
          description,
          search_params: selectedItem?.search_params,
        },
        {
          onSuccess: () => {
            toast.success(' Dashboard Updated successfully ');
          },
        }
      );
    }
  };
  const handleReceiveAllKeyword = (data) => {
    const finalData = [...allDataList, data];
    const finalStr = finalData?.toString();
    setAllDataList(finalData);
    setGuidedSearch({
      ...guidedSearch,
      all: finalStr,
    });
    handleChangeQuery &&
      handleChangeQuery({
        ...guidedSearch,
        all: finalStr,
      });
  };

  const handleReceiveNoneKeyword = (data) => {
    const finalData = [...noneDataList, data];
    const finalStr = finalData?.toString();
    setNoneDataList(finalData);
    setGuidedSearch({
      ...guidedSearch,
      none: finalStr,
    });
    handleChangeQuery &&
      handleChangeQuery({
        ...guidedSearch,
        none: finalStr,
      });
  };

  const handleReceiveAnyKeyword = (data) => {
    const finalData = [...anyDataList, data];
    const finalStr = finalData?.toString();
    setAnyDataList(finalData);
    setGuidedSearch({
      ...guidedSearch,
      any: finalStr,
    });
    handleChangeQuery &&
      handleChangeQuery({
        ...guidedSearch,
        any: finalStr,
      });
  };

  const handleShowCloseIcon = (item, i, key) => {
    if (key === 'all') {
      setHoverDataAll(i + item);
    } else if (key === 'none') {
      setHoverDataNone(i + item);
    } else if (key === 'any') {
      setHoverDataAny(i + item);
    }
  };
  const handleHideCloseIcon = (key) => {
    if (key === 'all') {
      setHoverDataAll();
    } else if (key === 'none') {
      setHoverDataNone();
    } else if (key === 'any') {
      setHoverDataAny();
    }
  };

  const handleEditClick = (item, index, isEditCheck, saveKeyWordText) => {
    if (saveKeyWordText === 'all') {
      setAllEditing(!isEditCheck);
      setAllIndex(index);
      setAllValue(item);
    } else if (saveKeyWordText === 'none') {
      setNoneEditing(!isEditCheck);
      setNoneIndex(index);
      setNoneValue(item);
    } else if (saveKeyWordText === 'any') {
      setAnyEditing(!isEditCheck);
      setAnyIndex(index);
      setAnyValue(item);
    }

    setSaveKeyWord(saveKeyWordText);
  };

  const changeHandler = (e) => {
    if (e.target.name === 'all') {
      setAllValue(e.target.value);
    } else if (e.target.name === 'none') {
      setNoneValue(e.target.value);
    } else if (e.target.name === 'any') {
      setAnyValue(e.target.value);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' && allValue && saveKeyWord === 'all') {
      const updatedAllData = allDataList?.map((item, ind) => {
        if (ind === index) {
          item = allValue;
        } else {
          return item;
        }
        return item;
      });
      setAllDataList(updatedAllData);
      setAllEditing(false);
    } else if (event.key === 'Enter' && noneValue && saveKeyWord === 'none') {
      const updatedNoneData = noneDataList?.map((item, ind) => {
        if (ind === index) {
          item = noneValue;
        } else {
          return item;
        }
        return item;
      });
      setNoneDataList(updatedNoneData);
      setNoneEditing(false);
    } else if (event.key === 'Enter' && anyValue && saveKeyWord === 'any') {
      const updatedAnyData = anyDataList?.map((item, ind) => {
        if (ind === index) {
          item = anyValue;
        } else {
          return item;
        }
        return item;
      });
      setAnyDataList(updatedAnyData);
      setAnyEditing(false);
    }
  };

  const handleBlur = (event, index) => {
    event.key = 'Enter';
    if (saveKeyWord === 'all') {
      handleKeyDown(event, index);
      setAllEditing(false);
      setAllValue('');
    } else if (saveKeyWord === 'none') {
      handleKeyDown(event, index);
      setNoneEditing(false);
      setNoneValue('');
    } else if (saveKeyWord === 'any') {
      handleKeyDown(event, index);
      setAnyEditing(false);
      setAnyValue('');
    }
  };

  const handleRemoveKeyword = (item, idx) => {
    let updatedArray = [];
    if (item === 'all') {
      updatedArray = allDataList.filter((ele, i) => i !== idx);
      setAllDataList(updatedArray);
      const finalStr = updatedArray?.toString();
      setGuidedSearch({
        ...guidedSearch,
        all: finalStr,
      });
      handleChangeQuery &&
        handleChangeQuery({
          ...guidedSearch,
          all: finalStr,
        });
    } else if (item === 'none') {
      updatedArray = noneDataList.filter((ele, i) => i !== idx);
      setNoneDataList(updatedArray);
      const finalStr = updatedArray?.toString();
      setGuidedSearch({
        ...guidedSearch,
        none: finalStr,
      });
      handleChangeQuery &&
        handleChangeQuery({
          ...guidedSearch,
          none: finalStr,
        });
    } else if (item === 'any') {
      updatedArray = anyDataList.filter((ele, i) => i !== idx);
      setAnyDataList(updatedArray);
      const finalStr = updatedArray?.toString();
      setGuidedSearch({
        ...guidedSearch,
        any: finalStr,
      });
      handleChangeQuery &&
        handleChangeQuery({
          ...guidedSearch,
          any: finalStr,
        });
    }
  };

  return (
    <>
      <SearchComponentWrapper>
        {!isSearchResult && !isEditMode && (
          <>
            <SectionHeader>
              <HeaderLeftCon>
                {/* <SearchIcon
                  width="18"
                  height="18"
                  strokeColor={theme[selectedTheme].text}
                /> */}
                <SectionTitle>New Search</SectionTitle>
                {isFocused && (
                  <ToggleContainer>
                    <ToggleSwitch
                      accentColor={theme[selectedTheme].primary}
                      checked={guidedSection}
                      onChange={handleGuidedToggle}
                    />
                    <ToggleLabel>Guided Search</ToggleLabel>
                  </ToggleContainer>
                )}
              </HeaderLeftCon>
            </SectionHeader>
            <WrapperContainer className={isFocused ? 'active' : ''}>
              <FilterWrapper className={!isEditMode ? 'filter-wrapper' : ''}>
                {isFocused && (
                  <FilterComponent
                    handleFilterChange={handleFilterChange}
                    createSearch={createSearch}
                    searchFilter={filter}
                  />
                )}
              </FilterWrapper>
            </WrapperContainer>
          </>
        )}
        {guidedSection || typeof searchedQuery === 'object' ? (
          <GuidedSearchSection>
            <TextAreaCon className="br-left">
              <GuidedTextWrp theme={theme[selectedTheme]}>
                <TextAreaLabel htmlFor="all">
                  Include <strong>all of these</strong>
                </TextAreaLabel>
                <AddContentContainer>
                  <AddItemContainer theme={theme[selectedTheme]}>
                    {allDataList?.map((item, i) => (
                      <KeywordWrap key={i}>
                        {!(allEditing && i === allIndex) ? (
                          <KeywordItem
                            key={i}
                            onMouseEnter={() =>
                              handleShowCloseIcon(item, i, 'all')
                            }
                            onMouseLeave={() =>
                              handleHideCloseIcon(item, i, 'all')
                            }
                            theme={theme[selectedTheme]}
                          >
                            <KeywordValue
                              onClick={() =>
                                handleEditClick(item, i, allEditing, 'all')
                              }
                            >
                              {item}
                            </KeywordValue>
                            {hoverDataAll === i + item ? (
                              <Iconwrp
                                onClick={() => handleRemoveKeyword('all', i)}
                              >
                                <Close
                                  color={theme[selectedTheme].primary}
                                  width="14"
                                  height="14"
                                />
                              </Iconwrp>
                            ) : (
                              <Iconwrp>
                                <Done />
                              </Iconwrp>
                            )}
                          </KeywordItem>
                        ) : (
                          <KeywordItem theme={theme[selectedTheme]}>
                            <AddWordWrp>
                              <InputWrp
                                onClick={() =>
                                  handleEditClick(item, i, allEditing, 'all')
                                }
                                theme={theme[selectedTheme]}
                              >
                                <KeywordValueInput
                                  className="add"
                                  name="all"
                                  placeholder="Enter Keyword"
                                  autoFocus
                                  value={allValue}
                                  onChange={changeHandler}
                                  onKeyDown={(e) => handleKeyDown(e, i)}
                                  onBlur={(e) => handleBlur(e, i)}
                                  theme={theme[selectedTheme]}
                                />
                              </InputWrp>
                            </AddWordWrp>
                          </KeywordItem>
                        )}
                      </KeywordWrap>
                    ))}
                    <AddKeyword
                      handleSendKeyword={handleReceiveAllKeyword}
                      isDisabled={false}
                    />
                  </AddItemContainer>
                </AddContentContainer>
              </GuidedTextWrp>
            </TextAreaCon>
            <TextAreaCon>
              <GuidedTextWrp theme={theme[selectedTheme]}>
                <TextAreaLabel htmlFor="none">
                  Include <strong>none of these</strong>
                </TextAreaLabel>
                <AddContentContainer>
                  <AddItemContainer theme={theme[selectedTheme]}>
                    {noneDataList?.map((item, i) => (
                      <KeywordWrap key={i}>
                        {!(noneEditing && i === noneIndex) ? (
                          <KeywordItem
                            key={i}
                            onMouseEnter={() =>
                              handleShowCloseIcon(item, i, 'none')
                            }
                            onMouseLeave={() =>
                              handleHideCloseIcon(item, i, 'none')
                            }
                            theme={theme[selectedTheme]}
                          >
                            <KeywordValue
                              onClick={() =>
                                handleEditClick(item, i, noneEditing, 'none')
                              }
                            >
                              {item}
                            </KeywordValue>
                            {hoverDataNone === i + item ? (
                              <Iconwrp
                                onClick={() => handleRemoveKeyword('none', i)}
                              >
                                <Close
                                  color={theme[selectedTheme].primary}
                                  width="14"
                                  height="14"
                                />
                              </Iconwrp>
                            ) : (
                              <Iconwrp>
                                <Done />
                              </Iconwrp>
                            )}
                          </KeywordItem>
                        ) : (
                          <KeywordItem theme={theme[selectedTheme]}>
                            <AddWordWrp>
                              <InputWrp
                                onClick={() =>
                                  handleEditClick(item, i, noneEditing, 'none')
                                }
                                theme={theme[selectedTheme]}
                              >
                                <KeywordValueInput
                                  className="add"
                                  name="none"
                                  placeholder="Enter Keyword"
                                  autoFocus
                                  value={noneValue}
                                  onChange={changeHandler}
                                  onKeyDown={(e) => handleKeyDown(e, i)}
                                  onBlur={(e) => handleBlur(e, i)}
                                  theme={theme[selectedTheme]}
                                />
                              </InputWrp>
                            </AddWordWrp>
                          </KeywordItem>
                        )}
                      </KeywordWrap>
                    ))}
                    <AddKeyword
                      handleSendKeyword={handleReceiveNoneKeyword}
                      isDisabled={false}
                    />
                  </AddItemContainer>
                </AddContentContainer>
              </GuidedTextWrp>
            </TextAreaCon>
            <TextAreaCon className="border-right br-right">
              <GuidedTextWrp theme={theme[selectedTheme]}>
                <TextAreaLabel htmlFor="any">
                  Include <strong>any of these</strong>
                </TextAreaLabel>
                <AddContentContainer>
                  <AddItemContainer theme={theme[selectedTheme]}>
                    {anyDataList?.map((item, i) => (
                      <KeywordWrap key={i}>
                        {!(anyEditing && i === anyIndex) ? (
                          <KeywordItem
                            key={i}
                            onMouseEnter={() =>
                              handleShowCloseIcon(item, i, 'any')
                            }
                            onMouseLeave={() =>
                              handleHideCloseIcon(item, i, 'any')
                            }
                            theme={theme[selectedTheme]}
                          >
                            <KeywordValue
                              onClick={() =>
                                handleEditClick(item, i, anyEditing, 'any')
                              }
                            >
                              {item}
                            </KeywordValue>
                            {hoverDataAny === i + item ? (
                              <Iconwrp
                                onClick={() => handleRemoveKeyword('any', i)}
                              >
                                <Close
                                  color={theme[selectedTheme].primary}
                                  width="14"
                                  height="14"
                                />
                              </Iconwrp>
                            ) : (
                              <Iconwrp>
                                <Done />
                              </Iconwrp>
                            )}
                          </KeywordItem>
                        ) : (
                          <KeywordItem theme={theme[selectedTheme]}>
                            <AddWordWrp>
                              <InputWrp
                                onClick={() =>
                                  handleEditClick(item, i, anyEditing, 'none')
                                }
                                theme={theme[selectedTheme]}
                              >
                                <KeywordValueInput
                                  className="add"
                                  name="any"
                                  placeholder="Enter Keyword"
                                  autoFocus
                                  value={anyValue}
                                  onChange={changeHandler}
                                  onKeyDown={(e) => handleKeyDown(e, i)}
                                  onBlur={(e) => handleBlur(e, i)}
                                  theme={theme[selectedTheme]}
                                />
                              </InputWrp>
                            </AddWordWrp>
                          </KeywordItem>
                        )}
                      </KeywordWrap>
                    ))}
                    <AddKeyword
                      handleSendKeyword={handleReceiveAnyKeyword}
                      isDisabled={false}
                    />
                  </AddItemContainer>
                </AddContentContainer>
              </GuidedTextWrp>
              ;
            </TextAreaCon>
          </GuidedSearchSection>
        ) : (
          <>
            <SearchBarWrapper id="coach-search-bar-wrp" isFocused={isFocused}>
              <SearchBar
                value={value}
                onChange={handleChange}
                onFocus={handleInputFocus}
                isFocused={isFocused}
              />
            </SearchBarWrapper>
          </>
        )}
        <ExpandedContainer className={isFocused ? 'expanded' : ''}>
          {/* {!isSearchResult && (
            <RecentSearchWrp className={isFocused ? 'expanded' : ''}>
              <RecentSearch results={recentSearches} />
            </RecentSearchWrp>
          )} */}
          {/* {isSearchResult && isEditMode && (
            <ToggleContainer>
              <ToggleSwitch
                accentColor={theme[selectedTheme].primary}
                checked={guidedSection}
                onChange={handleGuidedToggle}
              />
              <ToggleLabel>Guided Search</ToggleLabel>
            </ToggleContainer>
          )} */}
          {!isSearchResult && !isEditMode && (
            <SavedSearchContainer onClick={handleShowSavedSearches}>
              {/* <SaveSearchIcon strokeColor={theme[selectedTheme].text} /> */}
              <SaveCount>
                {!isFetchingAccount
                  ? JSON.stringify(searchCount?.data?.total_saved_searches)
                  : 0}
              </SaveCount>
              <IconText>Saved</IconText>
            </SavedSearchContainer>
          )}
          {isFocused && (
            <SearchesContainer>
              <Button
                title={'Cancel'}
                backgroundColor={theme[selectedTheme].background}
                color={theme[selectedTheme].primary}
                onClick={(e) => {
                  handleCancelSearch && handleCancelSearch('CANCEL');
                }}
                border={theme[selectedTheme].primary}
              />
              <Button
                title={btnTxt}
                backgroundColor={theme[selectedTheme].primary}
                onClick={handleSearch}
              />
            </SearchesContainer>
          )}
        </ExpandedContainer>
      </SearchComponentWrapper>

      <DashboardPopup
        toggler={setShowSaved}
        open={showSaved}
        popContent={
          <SearchPopup
            Frames={Frames}
            titleClick={handleClick}
            setConfirmationPopUp={setConfirmationPopUp}
            deletedbtn={deletedbtn}
            setDeletedbtn={setDeletedbtn}
            setSeleteditem={setSeleteditem}
            setSavePopup={setSavePopup}
            setSeletedTab={setSeletedTab}
            setIsDashboardsAssociated={setIsDashboardsAssociated}
          />
        }
        padding="0px"
        Cross={true}
        borderRadius="0.75rem"
      />
      <DashboardPopup
        open={confirmationPopUp}
        toggler={setConfirmationPopUp}
        popContent={
          <CustomConfirmationPopUp
            Heading={'Delete Saved Searches'}
            SecondHeading={
              isDashboardsAssociated
                ? 'A saved search or multiple saved searches is associated with Dashboards. Are you sure you want to delete?'
                : 'Are you sure you want to delete?'
            }
            toggler={(bool) => {
              setConfirmationPopUp(bool);
              setIsDashboardsAssociated(false);
            }}
            handleDelete={handleSavedDelete}
          />
        }
        padding="0"
        borderRadius="0.75rem"
        width="35rem"
      />
      <DashboardPopup
        popContent={
          <SaveSourcePopup
            heading="Save Saved Search"
            toggler={(value) => {
              setSavePopup(value);
              setSeleteditem('');
            }}
            primaryHeading="Saved Search Name"
            selectedItem={{
              name: selectedItem?.title,
              description: selectedItem?.description,
            }}
            handleSaveDashboard={handleSaveSearch}
          />
        }
        open={savePopup}
        toggler={setSavePopup}
        padding="0"
        borderRadius="0.625rem"
        width={'43.75rem'}
      />
      <DashboardPopup
        open={errorPopUp}
        toggler={setErrorPopUp}
        popContent={
          <ErrorWrp>
            <ErrorCtnWrp>
              <ErrorTitle>Error</ErrorTitle>
              <ErrorDsp>
                <ErrorSpan>Unable to execute your search query.</ErrorSpan>
                <br />
                Please add at least one Keyword to include in ‘any’ or ‘all’
                criteria.
              </ErrorDsp>
            </ErrorCtnWrp>
            <ErrorBtn onClick={() => setErrorPopUp(false)}>Got it</ErrorBtn>
          </ErrorWrp>
        }
        padding="0"
        borderRadius="0.75rem"
        width="25rem"
        Cross={true}
      />
    </>
  );
};

export default SearchComponent;

SearchComponent.propTypes = {
  onSearchInputFocus: PropTypes.func,
  onGuidedToggleFocus: PropTypes.func,
  handleSearchValue: PropTypes.func,
  handleCancelSearch: PropTypes.func,
  isFocused: PropTypes.bool,
  guidedSection: PropTypes.bool,
  isEditMode: PropTypes.bool,
  isSearchResult: PropTypes.bool,
  searchedDetails: PropTypes.object,
  createSearch: PropTypes.bool,
  handleChangeQuery: PropTypes.func,
  searchDetailsQuery: PropTypes.object || PropTypes.bool,
};
