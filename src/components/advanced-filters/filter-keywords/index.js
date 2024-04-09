import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AddContentContainer,
  AddItemContainer,
  AddWordWrp,
  // BorderDiv,
  // CountIconWrapper,
  // DropdownButton,
  // DropdownContainer,
  DropdownList,
  FilterBody,
  FilterFooter,
  FilterHeader,
  FilterInputWrap,
  FilterItemTitle,
  FilterItemWrp,
  FilterSection,
  FilterSectionContainer,
  FilterTextAreaWrp,
  FilterTitle,
  FilterWrapper,
  InputWrp,
  KeywordItem,
  KeywordValue,
  KeywordValueInput,
  KeywordWrap,
  // IconWrp,
  RangeSelectorWrapper,
  SeparateBorder,
  // Title,
  // ToggleContainer,
  // ToggleLabel,
} from './index.sc';
// import Close from '../../../assets/icons/Close';
import ArrowIcon from '../../../assets/icons/Arrow';
import { Button } from '../../button';
import { useSelector } from 'react-redux';
import { theme } from '../../../constants/theme';
// import ToggleSwitch from '../../toggle-switch';
import RangeSlider from '../../range-slider';
import {
  DropdownButton,
  DropdownContainer,
  IconContainer,
  Title,
  CountIconWrapper,
} from '../../dropdown/index.sc';
import { Iconwrp } from '../../search-result/index.sc';
import Close from '../../../assets/icons/Close';
import Done from '../../../assets/icons/Done';
import AddKeyword from '../../search-result/dashboard-section/dashboard-header/AddKeyword';

const FilterKeywords = ({
  newWidth,
  borderWidth = 1,
  title = '',
  name: filterName = '',
  count = false,
  options = [],
  handleSelectFilter,
  selected,
  applyDisabled = false,
  icon = '',
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const keywordInitialState = {
    include: {
      query: selected?.include?.query || '',
      caseSensitive: selected?.include?.caseSensitive || false,
    },
    exclude: {
      query: selected?.exclude?.query || '',
      caseSensitive: selected?.exclude?.caseSensitive || false,
    },
    placement: {
      query: selected?.placement?.query || '',
      caseSensitive: selected?.placement?.caseSensitive || false,
      range: selected?.placement?.range || {
        min: 0,
        max: 100,
        defaultValue: [0, 100],
      },
    },
  };
  const [keywordState, setKeywordState] = useState({ ...keywordInitialState });
  const [includeDataList, setIncludeDataList] = useState([]);
  const [includeEditing, setIncludeEditing] = useState(false);
  const [includeIndex, setIncludeIndex] = useState(undefined);
  const [includeValue, setIncludeValue] = useState('');
  const [hoverDataInclude, setHoverDataInclude] = useState();
  const [excludeDataList, setExcludeDataList] = useState([]);
  const [excludeEditing, setExcludeEditing] = useState(false);
  const [excludeIndex, setExcludeIndex] = useState(undefined);
  const [excludeValue, setExcludeValue] = useState('');
  const [saveKeyWord, setSaveKeyWord] = useState('');
  const [hoverDataExclude, setHoverDataExclude] = useState();
  const [placementDataList, setPlacementDataList] = useState([]);
  const [placementEditing, setPlacementEditing] = useState(false);
  const [placementIndex, setPlacementIndex] = useState(undefined);
  const [placementValue, setPlacementValue] = useState('');
  const [hoverDataPlacement, setHoverDataPlacement] = useState();

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  useEffect(() => {
    if (dropdownOpen) {
      const updatedQueryInclue =
        keywordInitialState?.include?.query !== ''
          ? keywordInitialState?.include?.query?.split(',')
          : [];
      const updatedQueryExlude =
        keywordInitialState?.exclude?.query !== ''
          ? keywordInitialState?.exclude?.query?.split(',')
          : [];
      const updatedQueryPlacement =
        keywordInitialState?.placement?.query !== ''
          ? keywordInitialState?.placement?.query?.split(',')
          : [];
      setIncludeDataList(updatedQueryInclue);
      setExcludeDataList(updatedQueryExlude);
      setPlacementDataList(updatedQueryPlacement);
      setKeywordState(keywordInitialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // const handleTextChange = (event) => {
  //   const { name, value } = event.target;
  //   const updatedState = {
  //     ...keywordState,
  //     [name]: {
  //       ...keywordState[name],
  //       query: value,
  //     },
  //   };
  //   setKeywordState(updatedState);
  //   if (applyDisabled) {
  //     handleSelectFilter && handleSelectFilter(filterName, updatedState);
  //   }
  // };
  const handleRangeChange = (event) => {
    const { value } = event;

    const updatedState = {
      ...keywordState,
      placement: {
        ...keywordState.placement,
        range: { ...keywordState.placement.range, min: 0, defaultValue: value },
      },
    };
    setKeywordState(updatedState);
    if (applyDisabled) {
      handleSelectFilter && handleSelectFilter(filterName, updatedState);
    }
  };

  // const handleToggle = (event) => {
  //   const { name, checked } = event;
  //   const updatedState = {
  //     ...keywordState,
  //     [name]: {
  //       ...keywordState[name],
  //       caseSensitive: checked,
  //     },
  //   };
  //   setKeywordState(updatedState);
  //   if (applyDisabled) {
  //     handleSelectFilter && handleSelectFilter(filterName, updatedState);
  //   }
  // };

  const getUpdateKeyWordState = () => {
    const updateKeywordState = {
      include: {
        query: includeDataList?.toString() || '',
        caseSensitive: selected?.include?.caseSensitive || false,
      },
      exclude: {
        query: excludeDataList?.toString() || '',
        caseSensitive: selected?.exclude?.caseSensitive || false,
      },
      placement: {
        query: placementDataList?.toString() || '',
        caseSensitive: selected?.placement?.caseSensitive || false,
        range: keywordState?.placement?.range || {
          min: 0,
          max: 100,
          defaultValue: [0, 100],
        },
      },
    };
    return updateKeywordState;
  };

  const applyChanges = () => {
    const keywordState = getUpdateKeyWordState();
    handleSelectFilter && handleSelectFilter(filterName, keywordState);
    toggleDropdown();
  };

  const cancelChanges = () => {
    setKeywordState(keywordInitialState);
    toggleDropdown();
  };

  const handleReceiveIncludeKeyword = (data) => {
    const finalData = [...includeDataList, data];
    const queryStr = finalData?.toString();
    setIncludeDataList(finalData);
    const updatedState = {
      ...keywordState,
      include: {
        query: queryStr,
        caseSensitive: keywordInitialState?.include?.caseSensitive,
      },
    };
    setKeywordState(updatedState);
    if (applyDisabled) {
      handleSelectFilter && handleSelectFilter(filterName, updatedState);
    }
  };

  const handleReceiveExcludeKeyword = (data) => {
    const finalData = [...excludeDataList, data];
    const queryStr = finalData?.toString();
    setExcludeDataList(finalData);
    const updatedState = {
      ...keywordState,
      exclude: {
        query: queryStr,
        caseSensitive: keywordInitialState?.exclude?.caseSensitive,
      },
    };
    setKeywordState(updatedState);
    if (applyDisabled) {
      handleSelectFilter && handleSelectFilter(filterName, updatedState);
    }
  };

  const handleReceivePlacementKeyword = (data) => {
    const finalData = [...placementDataList, data];
    const queryStr = finalData?.toString();
    setPlacementDataList(finalData);
    const updatedState = {
      ...keywordState,
      placement: {
        query: queryStr,
        caseSensitive: keywordInitialState?.placement?.caseSensitive,
      },
    };
    setKeywordState(updatedState);
    if (applyDisabled) {
      handleSelectFilter && handleSelectFilter(filterName, updatedState);
    }
  };

  const handleShowCloseIcon = (item, i, key) => {
    if (key === 'include') {
      setHoverDataInclude(i + item);
    } else if (key === 'exclude') {
      setHoverDataExclude(i + item);
    } else if (key === 'placement') {
      setHoverDataPlacement(i + item);
    }
  };
  const handleHideCloseIcon = (key) => {
    if (key === 'include') {
      setHoverDataInclude();
    } else if (key === 'exclude') {
      setHoverDataExclude();
    } else if (key === 'placement') {
      setHoverDataPlacement();
    }
  };

  const handleEditClick = (item, index, isEditCheck, saveKeyWordText) => {
    if (saveKeyWordText === 'include') {
      setIncludeEditing(!isEditCheck);
      setIncludeIndex(index);
      setIncludeValue(item);
    } else if (saveKeyWordText === 'exclude') {
      setExcludeEditing(!isEditCheck);
      setExcludeIndex(index);
      setExcludeValue(item);
    } else if (saveKeyWordText === 'placement') {
      setPlacementEditing(!isEditCheck);
      setPlacementIndex(index);
      setPlacementValue(item);
    }

    setSaveKeyWord(saveKeyWordText);
  };

  const changeHandler = (e) => {
    if (e.target.name === 'include') {
      setIncludeValue(e.target.value);
    } else if (e.target.name === 'exclude') {
      setExcludeValue(e.target.value);
    } else if (e.target.name === 'placement') {
      setPlacementValue(e.target.value);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' && includeValue && saveKeyWord === 'include') {
      const updatedIncludeData = includeDataList?.map((item, ind) => {
        if (ind === index) {
          item = includeValue;
        } else {
          return item;
        }
        return item;
      });
      setIncludeDataList(updatedIncludeData);
      setIncludeEditing(false);
    } else if (
      event.key === 'Enter' &&
      excludeValue &&
      saveKeyWord === 'exclude'
    ) {
      const updatedExcludeData = excludeDataList?.map((item, ind) => {
        if (ind === index) {
          item = excludeValue;
        } else {
          return item;
        }
        return item;
      });
      setExcludeDataList(updatedExcludeData);
      setExcludeEditing(false);
    } else if (
      event.key === 'Enter' &&
      placementValue &&
      saveKeyWord === 'placement'
    ) {
      const updatedPlacemenData = placementDataList?.map((item, ind) => {
        if (ind === index) {
          item = placementValue;
        } else {
          return item;
        }
        return item;
      });
      setPlacementDataList(updatedPlacemenData);
      setPlacementEditing(false);
    }
  };

  const handleBlur = (event, index) => {
    event.key = 'Enter';
    if (saveKeyWord === 'include') {
      handleKeyDown(event, index);
      setIncludeEditing(false);
      setIncludeValue('');
    } else if (saveKeyWord === 'exclude') {
      handleKeyDown(event, index);
      setExcludeEditing(false);
      setExcludeValue('');
    } else if (saveKeyWord === 'placement') {
      handleKeyDown(event, index);
      setPlacementEditing(false);
      setPlacementValue('');
    }
  };

  const handleRemoveKeyword = (item, idx) => {
    let updatedArray = [];
    if (item === 'include') {
      updatedArray = includeDataList.filter((ele, i) => i !== idx);
      setIncludeDataList(updatedArray);
      const queryStr = updatedArray?.toString();
      const updatedState = {
        ...keywordState,
        include: {
          query: queryStr,
          caseSensitive: keywordInitialState?.include?.caseSensitive,
        },
      };
      setKeywordState(updatedState);
    } else if (item === 'exclude') {
      updatedArray = excludeDataList.filter((ele, i) => i !== idx);
      setExcludeDataList(updatedArray);
      const queryStr = updatedArray?.toString();
      const updatedState = {
        ...keywordState,
        exclude: {
          query: queryStr,
          caseSensitive: keywordInitialState?.exclude?.caseSensitive,
        },
      };
      setKeywordState(updatedState);
    } else if (item === 'placement') {
      updatedArray = placementDataList.filter((ele, i) => i !== idx);
      setPlacementDataList(updatedArray);
      const queryStr = updatedArray?.toString();
      const updatedState = {
        ...keywordState,
        placement: {
          query: queryStr,
          caseSensitive: keywordInitialState?.placement?.caseSensitive,
        },
      };
      setKeywordState(updatedState);
    }
  };

  return (
    <DropdownContainer ref={dropdownRef} newWidth={newWidth}>
      <DropdownButton
        className="dropdown-btn"
        active={dropdownOpen}
        onClick={toggleDropdown}
        borderWidth={borderWidth}
      >
        {icon ? <IconContainer>{icon}</IconContainer> : ''}
        <Title>{title}</Title>
        <CountIconWrapper>
          {/* {count && (
            <Selection>
              {selectedOptions.length === options.length
                ? 'All'
                : selectedOptions.length}
            </Selection>
          )} */}
          <ArrowIcon
            className={'dropdown-arrow-icon'}
            fill={theme[selectedTheme].text}
            isOpen={dropdownOpen}
          />
        </CountIconWrapper>
      </DropdownButton>
      <DropdownList open={dropdownOpen}>
        <FilterWrapper>
          <FilterSectionContainer>
            <FilterSection className="keywords">
              <FilterHeader>
                <FilterTitle>Keywords</FilterTitle>
                {/* <IconWrp onClick={toggleDropdown}>
                  <Close
                    height="18"
                    width="18"
                    color={theme[selectedTheme].text}
                  />
                </IconWrp> */}
              </FilterHeader>
              <FilterBody>
                <FilterItemWrp>
                  <FilterItemTitle>Include these in title</FilterItemTitle>
                  <FilterTextAreaWrp>
                    <FilterInputWrap theme={theme[selectedTheme]}>
                      <AddContentContainer>
                        <AddItemContainer theme={theme[selectedTheme]}>
                          {includeDataList?.map((item, i) => (
                            <KeywordWrap key={i}>
                              {!(includeEditing && i === includeIndex) ? (
                                <KeywordItem
                                  key={i}
                                  onMouseEnter={() =>
                                    handleShowCloseIcon(item, i, 'include')
                                  }
                                  onMouseLeave={() =>
                                    handleHideCloseIcon(item, i, 'include')
                                  }
                                  theme={theme[selectedTheme]}
                                >
                                  <KeywordValue
                                    onClick={() =>
                                      handleEditClick(
                                        item,
                                        i,
                                        includeEditing,
                                        'include'
                                      )
                                    }
                                    theme={theme[selectedTheme]}
                                  >
                                    {item}
                                  </KeywordValue>
                                  {hoverDataInclude === i + item ? (
                                    <Iconwrp
                                      onClick={() =>
                                        handleRemoveKeyword('include', i)
                                      }
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
                                        handleEditClick(
                                          item,
                                          i,
                                          includeEditing,
                                          'include'
                                        )
                                      }
                                      theme={theme[selectedTheme]}
                                    >
                                      <KeywordValueInput
                                        className="add"
                                        name="include"
                                        placeholder="Enter Keyword"
                                        autoFocus
                                        value={includeValue}
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
                            handleSendKeyword={handleReceiveIncludeKeyword}
                            isDisabled={false}
                          />
                        </AddItemContainer>
                      </AddContentContainer>
                    </FilterInputWrap>
                  </FilterTextAreaWrp>
                  {/* <ToggleContainer>
                    <ToggleSwitch
                      name="include"
                      accentColor={theme[selectedTheme].primary}
                      checked={keywordState.include.caseSensitive}
                      onChange={handleToggle}
                    />
                    <ToggleLabel>Case sensitive</ToggleLabel>
                  </ToggleContainer> */}
                </FilterItemWrp>
                <FilterItemWrp>
                  <FilterItemTitle>Exclude these in title</FilterItemTitle>
                  <FilterTextAreaWrp>
                    <FilterInputWrap theme={theme[selectedTheme]}>
                      <AddContentContainer>
                        <AddItemContainer theme={theme[selectedTheme]}>
                          {excludeDataList?.map((item, i) => (
                            <KeywordWrap key={i}>
                              {!(excludeEditing && i === excludeIndex) ? (
                                <KeywordItem
                                  key={i}
                                  onMouseEnter={() =>
                                    handleShowCloseIcon(item, i, 'exclude')
                                  }
                                  onMouseLeave={() =>
                                    handleHideCloseIcon(item, i, 'exclude')
                                  }
                                  theme={theme[selectedTheme]}
                                >
                                  <KeywordValue
                                    onClick={() =>
                                      handleEditClick(
                                        item,
                                        i,
                                        excludeEditing,
                                        'exclude'
                                      )
                                    }
                                    theme={theme[selectedTheme]}
                                  >
                                    {item}
                                  </KeywordValue>
                                  {hoverDataExclude === i + item ? (
                                    <Iconwrp
                                      onClick={() =>
                                        handleRemoveKeyword('exclude', i)
                                      }
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
                                        handleEditClick(
                                          item,
                                          i,
                                          excludeEditing,
                                          'exclude'
                                        )
                                      }
                                      theme={theme[selectedTheme]}
                                    >
                                      <KeywordValueInput
                                        className="add"
                                        name="exclude"
                                        placeholder="Enter Keyword"
                                        autoFocus
                                        value={excludeValue}
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
                            handleSendKeyword={handleReceiveExcludeKeyword}
                            isDisabled={false}
                          />
                        </AddItemContainer>
                      </AddContentContainer>
                    </FilterInputWrap>
                  </FilterTextAreaWrp>
                  {/* <ToggleContainer>
                    <ToggleSwitch
                      name="exclude"
                      accentColor={theme[selectedTheme].primary}
                      checked={keywordState.exclude.caseSensitive}
                      onChange={handleToggle}
                    />
                    <ToggleLabel>Case sensitive</ToggleLabel>
                  </ToggleContainer> */}
                </FilterItemWrp>
              </FilterBody>
            </FilterSection>
            <SeparateBorder></SeparateBorder>
            <FilterSection className="keywords-placement">
              <FilterHeader>
                <FilterTitle>Keywords Placement</FilterTitle>
              </FilterHeader>
              <FilterBody>
                <FilterItemWrp>
                  <FilterTextAreaWrp>
                    <FilterInputWrap theme={theme[selectedTheme]}>
                      <AddContentContainer>
                        <AddItemContainer theme={theme[selectedTheme]}>
                          {placementDataList?.map((item, i) => (
                            <KeywordWrap key={i}>
                              {!(placementEditing && i === placementIndex) ? (
                                <KeywordItem
                                  key={i}
                                  onMouseEnter={() =>
                                    handleShowCloseIcon(item, i, 'placement')
                                  }
                                  onMouseLeave={() =>
                                    handleHideCloseIcon(item, i, 'placement')
                                  }
                                  theme={theme[selectedTheme]}
                                >
                                  <KeywordValue
                                    onClick={() =>
                                      handleEditClick(
                                        item,
                                        i,
                                        placementEditing,
                                        'placement'
                                      )
                                    }
                                    theme={theme[selectedTheme]}
                                  >
                                    {item}
                                  </KeywordValue>
                                  {hoverDataPlacement === i + item ? (
                                    <Iconwrp
                                      onClick={() =>
                                        handleRemoveKeyword('placement', i)
                                      }
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
                                        handleEditClick(
                                          item,
                                          i,
                                          placementEditing,
                                          'placement'
                                        )
                                      }
                                      theme={theme[selectedTheme]}
                                    >
                                      <KeywordValueInput
                                        className="add"
                                        name="placement"
                                        placeholder="Enter Keyword"
                                        autoFocus
                                        value={placementValue}
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
                          {placementDataList?.length < 1 && (
                            <AddKeyword
                              handleSendKeyword={handleReceivePlacementKeyword}
                              isDisabled={false}
                            />
                          )}
                        </AddItemContainer>
                      </AddContentContainer>
                    </FilterInputWrap>
                  </FilterTextAreaWrp>
                  <RangeSelectorWrapper>
                    <FilterItemTitle>Specify Range</FilterItemTitle>
                    <RangeSlider
                      min={keywordState?.placement?.range?.min}
                      max={keywordState?.placement?.range?.max}
                      value={keywordState?.placement?.range?.defaultValue}
                      onChange={handleRangeChange}
                    ></RangeSlider>
                  </RangeSelectorWrapper>
                  {/* <ToggleContainer>
                    <ToggleSwitch
                      name="placement"
                      accentColor={theme[selectedTheme].primary}
                      checked={keywordState.placement?.caseSensitive}
                      onChange={handleToggle}
                    />
                    <ToggleLabel>Case sensitive</ToggleLabel>
                  </ToggleContainer> */}
                </FilterItemWrp>
              </FilterBody>
            </FilterSection>
          </FilterSectionContainer>
          {!applyDisabled && (
            <FilterFooter>
              <Button
                title={'Cancel'}
                backgroundColor={theme[selectedTheme].background}
                color={theme[selectedTheme].primary}
                onClick={cancelChanges}
                border={theme[selectedTheme].primary}
              />
              <Button
                title={'Apply'}
                backgroundColor={theme[selectedTheme].primary}
                onClick={applyChanges}
              />
            </FilterFooter>
          )}
        </FilterWrapper>
      </DropdownList>
    </DropdownContainer>
  );
};

export default FilterKeywords;

FilterKeywords.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  newWidth: PropTypes.string,
  borderWidth: PropTypes.string,
  count: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSelectFilter: PropTypes.func,
  selected: PropTypes.object,
  applyDisabled: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
