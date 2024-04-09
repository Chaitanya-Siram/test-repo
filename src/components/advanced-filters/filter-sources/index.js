import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ActionIconItem,
  ActionIconWrp,
  BorderDiv,
  ComponentBackdrop,
  CustomSourcesWrp,
  DropdownList,
  DropdownWrp,
  FilterBody,
  FilterFooter,
  FilterHeader,
  FilterItemTitle,
  FilterItemWrp,
  FilterTitle,
  FilterWrapper,
  FooterLeft,
  FooterRight,
  IconWrp,
  SearchLabel,
  SearchListContainer,
  SearchListItem,
  SelectedItemsContainer,
  SourceInputSearch,
  SourceInputSearchWrp,
  TitleBoxwpr,
} from './index.sc';
import { useSelector } from 'react-redux';
import { theme } from '../../../constants/theme';
import Close from '../../../assets/icons/Close';
import ArrowIcon from '../../../assets/icons/Arrow';
import { Button } from '../../button';
import MultiselectDropdown from '../../dropdown';
import Chip from '../../chips';
import Tabs from '../../tabs';
import {
  useAddSources,
  useCreateCustomResource,
  useCustomSorcesData,
  useDeleteSource,
  useSourceFilterData,
  useUpdateCustomSource,
} from '../../../hooks/useSearch';
import Export from '../../../assets/icons/Export';
import Edit from '../../../assets/icons/Edit';
import ResetIcon from '../../search-component/assets/icons/Reset';
import Delete from '../../../assets/icons/Delete';
import PortalTooltip from '../../portal-tooltip';
import DeletePopup from '../../delete-popup';
import DashboardPopup from '../../dasboard-popup';
import SaveSourcePopup from '../../save-source';
import {
  DropdownButton,
  DropdownContainer,
  IconContainer,
  Title,
  CountIconWrapper,
  Selection,
} from '../../dropdown/index.sc';
import Tooltip from '../../icon-tooltip';
import toast from 'react-hot-toast';
import { getTokenData } from '../../../constants/validateToken';
import useDebounce from '../../../hooks/useDebounce';

const TitleBox = ({ title = '' }) => {
  return (
    <TitleBoxwpr>
      <FilterTitle>{title}</FilterTitle>
    </TitleBoxwpr>
  );
};

const sourceTabs = [
  {
    id: 0,
    content: '',
    label: 'Sources',
    type: 'sources',
  },
  {
    id: 1,
    content: '',
    label: 'Custom Source',
    type: 'custom_source',
  },
];

// const idxToTab = {
//   0: 'sources',
//   1: 'custom_source',
// };

// const gapFromTop = 5;
const customSearchItemHeight = 1.6875;

const chipStyle = {
  borderRadius: '1.875rem',
  backgroundColor: '#ffffff',
  padding: '0.375rem 0.625rem',
  border: '1px solid #C3C7D9',
  color: '#000',
  fontSize: '0.625rem',
  fontWeight: 400,
  gap: '0.31rem',
};

const getFilteredOptions = (arr1, arr2) => {
  let res = [];
  res = arr1?.filter((el) => {
    return !arr2?.find((element) => {
      return element?.value === el?.value;
    });
  });
  return res;
};

const FilterSources = ({
  newWidth,
  borderWidth = 1,
  title = '',
  name = '',
  count = false,
  options = [],
  handleSelectFilter,
  selected,
  applyDisabled = false,
  icon = '',
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [chips, setChips] = useState(selected || null);
  const [filteredOptionsInclude, setFilteredOptionsInclude] = useState(
    getFilteredOptions([...options], selected?.exclude) || [...options]
  );
  const [filteredOptionsExclude, setFilteredOptionsExclude] = useState(
    getFilteredOptions([...options], selected?.include) || [...options]
  );

  const [includeSearchKey, setIncludeSearchKey] = useState('');
  const [excludeSearchKey, setExcludeSearchKey] = useState('');

  const debouceInSearchKey = useDebounce(includeSearchKey, 700);
  const debounceExcludeSearchKey = useDebounce(excludeSearchKey, 700);

  const { data: inSourceData } = useSourceFilterData(
    debouceInSearchKey,
    !!debouceInSearchKey
  );
  const { data: exSourceData } = useSourceFilterData(
    debounceExcludeSearchKey,
    !!debounceExcludeSearchKey
  );
  const dropdownRef = useRef();

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  useEffect(() => {
    if (inSourceData?.isSuccessful) {
      if (Array.isArray(inSourceData?.data?.data)) {
        setFilteredOptionsInclude(
          getFilteredOptions(
            [...inSourceData?.data?.data],
            selected?.include
          ) || [...inSourceData?.data?.data]
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inSourceData]);

  useEffect(() => {
    if (exSourceData?.isSuccessful) {
      if (Array.isArray(exSourceData?.data?.data)) {
        setFilteredOptionsExclude(
          getFilteredOptions(
            [...exSourceData?.data?.data],
            selected?.exclude
          ) || [...exSourceData?.data?.data]
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exSourceData]);

  // custom source tab states
  const [index, setIndex] = useState(0);
  const [customSearchText, setCustomSearchText] = useState('');
  const [toolTipPos, setToolTipPos] = useState({ left: 0, top: 0 });
  const [enableTooltip, setEnableTooltip] = useState(false);

  const userInfo = getTokenData();

  const { isLoading: customSourceLoading, data: customSourceData } =
    useCustomSorcesData(userInfo?.user_id);
  const { mutateAsync: createCustomResource } = useCreateCustomResource(
    userInfo?.user_id
  );
  const { mutateAsync: addFitlersTotheSource } = useAddSources(
    userInfo?.user_id
  );
  const { mutateAsync: updateCustomSource } = useUpdateCustomSource(
    userInfo?.user_id
  );

  const { mutateAsync: deleteCustomSource } = useDeleteSource(
    userInfo?.user_id
  );

  const customSourcesData = customSourceData?.data;

  const [selectedCustomSource, setSelectedCustomSource] = useState({
    index: undefined,
    source: customSourcesData ? customSourcesData?.details[0] : {},
  });

  const [customSourceChips, setCustomSourceChips] = useState(
    {
      include: customSourcesData ? customSourcesData?.details[0]?.include : [],
      exclude: customSourcesData ? customSourcesData?.details[0]?.exclude : [],
    } || null
  );
  const [customOptionsInclude, setCustomOptionsInclude] = useState(
    getFilteredOptions(
      [...options],
      customSourcesData?.details[0]?.exclude
    ) || [...options]
  );
  const [customOptionsExclude, setCustomOptionsExclude] = useState(
    getFilteredOptions(
      [...options],
      customSourcesData?.details[0]?.include
    ) || [...options]
  );
  const [sourceSelected, setSourceSelected] = useState(-1);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [hoverIndex, setHoverIndex] = useState();

  useEffect(() => {
    if (index === 1) {
      setSelectedCustomSource({
        index: undefined,
        source: {},
      });
      setCustomSourceChips({
        include: customSourcesData?.details[0]?.include,
        exclude: customSourcesData?.details[0]?.exclude,
      });
      if (applyDisabled) {
        handleSelectFilter &&
          handleSelectFilter('sources', {
            include: customSourcesData?.details[0]?.include,
            exclude: customSourcesData?.details[0]?.exclude,
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customSourcesData]);

  useEffect(() => {
    if (dropdownOpen) {
      setIndex(0);
      setChips({
        include: selected?.include || [],
        exclude: selected?.exclude || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownOpen]);

  const tabs = sourceTabs?.map((ele, i) => ({
    ...ele,
    title: <TitleBox title={ele.label} />,
    id: i,
  }));

  const handleTabs = (index) => {
    setIndex(index);
    if (index === 0) {
      if (applyDisabled) {
        handleSelectFilter &&
          handleSelectFilter('sources', {
            ...chips,
          });
      }
    } else {
      if (applyDisabled) {
        handleSelectFilter &&
          handleSelectFilter('sources', {
            include: customSourcesData?.details[0]?.include,
            exclude: customSourcesData?.details[0]?.exclude,
          });
      } else {
        setCustomSourceChips({
          include: customSourcesData?.details[0]?.include,
          exclude: customSourcesData?.details[0]?.exclude,
        });
      }
    }

    handleCloseDeletePopup();
  };

  const handleCustomSearch = (e) => {
    setCustomSearchText(e.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    handleCloseDeletePopup();
  };
  // console.log(chips, 'what chips');
  const handleReceiveSelectedItems = (
    ddName,
    selectedOptions,
    custom = false
  ) => {
    if (!custom) {
      setChips({
        ...chips,
        [ddName]: selectedOptions,
      });
      if (ddName === 'include') {
        const finalOptions = getFilteredOptions(options, selectedOptions);
        setFilteredOptionsExclude(finalOptions);
      } else {
        const finalOptions = getFilteredOptions(options, selectedOptions);
        setFilteredOptionsInclude(finalOptions);
      }
      if (applyDisabled) {
        handleSelectFilter &&
          handleSelectFilter('sources', {
            ...chips,
            [ddName]: selectedOptions,
          });
      }
    } else {
      setCustomSourceChips({
        ...customSourceChips,
        [ddName]: selectedOptions,
      });
      if (ddName === 'include') {
        const finalOptions = getFilteredOptions(options, selectedOptions);
        setCustomOptionsExclude(finalOptions);
      } else {
        const finalOptions = getFilteredOptions(options, selectedOptions);
        setCustomOptionsInclude(finalOptions);
      }
      if (applyDisabled) {
        handleSelectFilter &&
          handleSelectFilter('sources', {
            ...customSourceChips,
            [ddName]: selectedOptions,
          });
      }
    }
  };

  const handleRemoveChip = (chip, ddName, custom = false) => {
    if (!custom) {
      const currentOptions = [...chips[ddName]] || [];
      const filteredOptions = currentOptions.filter(
        (option) => option.value !== chip.value
      );
      setChips({
        ...chips,
        [ddName]: filteredOptions,
      });
      if (ddName === 'include') {
        const finalOptions = getFilteredOptions(options, filteredOptions);
        setFilteredOptionsExclude(finalOptions);
      } else {
        const finalOptions = getFilteredOptions(options, filteredOptions);
        setFilteredOptionsInclude(finalOptions);
      }
      if (applyDisabled) {
        handleSelectFilter &&
          handleSelectFilter('sources', {
            ...chips,
            [ddName]: filteredOptions,
          });
      }
    } else {
      const currentOptions = [...customSourceChips[ddName]] || [];
      const filteredOptions = currentOptions.filter(
        (option) => option.value !== chip.value
      );
      setCustomSourceChips({
        ...customSourceChips,
        [ddName]: filteredOptions,
      });
      if (ddName === 'include') {
        const finalOptions = getFilteredOptions(options, filteredOptions);
        setCustomOptionsExclude(finalOptions);
      } else {
        const finalOptions = getFilteredOptions(options, filteredOptions);
        setCustomOptionsInclude(finalOptions);
      }
      if (applyDisabled) {
        handleSelectFilter &&
          handleSelectFilter('sources', {
            ...customSourceChips,
            [ddName]: filteredOptions,
          });
      }
    }
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
      setSourceSelected(-1);
      setEnableTooltip(false);
      setToolTipPos({
        left: 0,
        top: 0,
      });
    }
  };

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, []);

  const applyChanges = () => {
    if (index === 1) {
      handleSelectFilter &&
        handleSelectFilter('sources', {
          include: customSourceChips?.include,
          exclude: customSourceChips?.exclude,
        });
    } else {
      handleSelectFilter &&
        handleSelectFilter('sources', {
          include: chips?.include,
          exclude: chips?.exclude,
        });
    }
    toggleDropdown();
  };

  const cancelChanges = () => {
    if (index === 1) {
      setCustomSourceChips({
        include: selected?.include || [],
        exclude: selected?.exclude || [],
      });
    } else {
      setChips({
        include: selected?.include || [],
        exclude: selected?.exclude || [],
      });
    }

    toggleDropdown();
  };

  const handleSelectCustomSource = (item, idx) => {
    setSelectedCustomSource({
      index: idx,
      source: item,
    });
    setCustomOptionsInclude(
      getFilteredOptions(
        [...options],
        customSourcesData?.details[idx]?.exclude
      ) || [...options]
    );
    setCustomOptionsExclude(
      getFilteredOptions(
        [...options],
        customSourcesData?.details[idx]?.include
      ) || [...options]
    );
    setCustomSourceChips({
      include: [...item?.include],
      exclude: [...item?.exclude],
    });
    if (applyDisabled) {
      handleSelectFilter &&
        handleSelectFilter('sources', {
          include: [...item?.include],
          exclude: [...item?.exclude],
        });
    }
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
    setSourceSelected(-1);
  };

  const handleCloseDeletePopup = (event) => {
    event && event?.stopPropagation();
    setSourceSelected(-1);
    setEnableTooltip(false);
    setToolTipPos({
      left: 0,
      top: 0,
    });
  };

  const handleActionIcon = (event, option, icon, index) => {
    if (icon === 'edit') {
      handleCloseDeletePopup();
      setShowEditPopup((old) => !old);
      setSourceSelected(index);
    }
    if (icon === 'delete') {
      if (sourceSelected === index) {
        handleCloseDeletePopup();
      } else {
        setSourceSelected(index); // Open the popup for the clicked row index
        setEnableTooltip(true);
        setToolTipPos({
          ...toolTipPos,
          left: event.clientX,
          top: event.clientY,
        });
      }
    }
  };

  const handleDeleteItem = async (index) => {
    try {
      const customSource = customSourceData?.data?.details[sourceSelected];
      await deleteCustomSource(customSource?.id, {
        onSuccess: (data) => {
          console.log('delted successfuly:', data);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveSource = async () => {
    if (index === 0) {
      // for sources tab
      setShowEditPopup(true);
    } else {
      // for custom source
      // call put api with the source and include , exclude
      const selelctedSouce =
        selectedCustomSource?.index !== -1
          ? customSourceData?.data?.details[selectedCustomSource?.index]
          : {};
      if (selelctedSouce?.id) {
        const includedSources = customSourceChips?.include?.map((source) => {
          return {
            source_name: source?.label,
            source_value: source.value,
            customsourceid: selelctedSouce.id,
            filter_type: 1,
          };
        });

        const exclededSources = customSourceChips?.exclude?.map((source) => {
          return {
            source_name: source?.label,
            source_value: source.value,
            customsourceid: selelctedSouce.id,
            filter_type: 2,
          };
        });

        await addFitlersTotheSource([...includedSources, ...exclededSources], {
          onSuccess: () => {
            console.log('Source is created');
            toast.success('Custom source changes saved !');
          },
          onError: (data) => {
            console.log('Error while adding fitlers', data);
          },
        });
      }

      // customSourceData?.data?.details[sourceSelected]
    }
    // toggleDropdown();
  };

  const resetHandleSaveSource = (index) => {
    index === 0 ? setChips([]) : setCustomSourceChips([]);
    setSelectedCustomSource({
      index: undefined,
      source: customSourcesData ? customSourcesData?.details[0] : {},
    });
  };

  const getCount = () => {
    if (!selected) return 0;

    const includeLength = selected?.include?.length || 0;
    const excludeLength = selected?.exclude?.length || 0;

    return includeLength + excludeLength;
  };

  const handleMouseEnter = (e, index) => {
    setHoverIndex(index);
  };
  const handleMouseLeave = (e) => {
    setHoverIndex();
  };

  const handleSaveSourcePopup = async (data, isEdit) => {
    try {
      if (isEdit) {
        const payload = {
          name: data?.name,
          description: data?.description,
          id: data?.id,
        };
        await updateCustomSource(payload, {
          onSuccess: () => {
            console.log('Custom Source Updated Successfully');
          },
        });
      } else {
        const payload = {
          name: data?.name,
          description: data?.description,
          user: userInfo?.user_id,
        };
        await createCustomResource(payload, {
          onSuccess: async (data) => {
            const customsourceid = data?.data?.id;
            const includedSources = chips?.include?.map((source) => {
              return {
                source_name: source?.label,
                source_value: source.value,
                customsourceid,
                filter_type: 1,
              };
            });
            const exclededSources = chips?.exclude?.map((source) => {
              return {
                source_name: source?.label,
                source_value: source.value,
                customsourceid,
                filter_type: 2,
              };
            });
            await addFitlersTotheSource(
              [...includedSources, ...exclededSources],
              {
                onSuccess: () => {
                  console.log('Source is created');
                },
                onError: (data) => {
                  console.log('Error while adding fitlers', data);
                },
              }
            );
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSourceSelected(-1);
    }
  };

  const handleSearchKey = (key, name) => {
    if (name === 'include') {
      setIncludeSearchKey(key);
    } else {
      setExcludeSearchKey(key);
    }
  };

  return (
    <>
      <ComponentBackdrop
        className={`backdrop ${dropdownOpen ? 'active' : ''}`}
        onClick={handleOutsideClick}
      ></ComponentBackdrop>
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
            {count && <Selection>{getCount()}</Selection>}
            <ArrowIcon
              className={'dropdown-arrow-icon'}
              fill={theme[selectedTheme].text}
              isOpen={dropdownOpen}
            />
          </CountIconWrapper>
        </DropdownButton>
        <DropdownList open={dropdownOpen}>
          <FilterWrapper>
            <FilterHeader>
              <Tabs
                items={tabs}
                variant="underline"
                activeColor={theme[selectedTheme].primary}
                inactiveColor={theme[selectedTheme].secondaryText}
                onChange={handleTabs}
                isContent={false}
                gapitems="1rem"
                bottomBorderWidth="3px"
                paddingWrapper="0.6rem 0rem"
                currentTab={index}
                defaultActive={false}
              />
              <IconWrp onClick={toggleDropdown}>
                <Close
                  height="1.125rem"
                  width="1.125rem"
                  color={theme[selectedTheme].text}
                />
              </IconWrp>
            </FilterHeader>
            <BorderDiv></BorderDiv>
            {index === 0 ? (
              // sources tab
              <FilterBody>
                <FilterItemWrp>
                  <FilterItemTitle>
                    Include <strong>all</strong> of these
                  </FilterItemTitle>
                  <DropdownWrp>
                    <MultiselectDropdown
                      title="Included Sources"
                      name="include"
                      options={filteredOptionsInclude}
                      selected={chips?.include}
                      onSelect={handleReceiveSelectedItems}
                      count={true}
                      // newWidth="10.5"
                      borderWidth="0"
                      dropdownListHeight="15"
                      deSelectAll={true}
                      selectAll={false}
                      hideFooter={true}
                      handleSearchKey={handleSearchKey}
                    />
                  </DropdownWrp>
                  <SelectedItemsContainer>
                    {chips?.include?.map((chip, i) => (
                      <Chip
                        key={i}
                        title={chip?.label}
                        style={chipStyle}
                        customCloseButton={
                          <Close
                            height="0.4375rem"
                            width="0.4375rem"
                            color={theme[selectedTheme].closeButton}
                          />
                        }
                        onCloseClick={() => handleRemoveChip(chip, 'include')}
                      />
                    ))}
                  </SelectedItemsContainer>
                </FilterItemWrp>
                <FilterItemWrp>
                  <FilterItemTitle>
                    <strong>Exclude</strong> all of these
                  </FilterItemTitle>
                  <DropdownWrp>
                    <MultiselectDropdown
                      title="Excluded"
                      name="exclude"
                      options={filteredOptionsExclude}
                      selected={chips?.exclude}
                      onSelect={handleReceiveSelectedItems}
                      count={true}
                      // newWidth="10.5"
                      borderWidth="0"
                      dropdownListHeight="8"
                      deSelectAll={true}
                      selectAll={false}
                      hideFooter={true}
                      handleSearchKey={handleSearchKey}
                    />
                  </DropdownWrp>
                  <SelectedItemsContainer>
                    {chips?.exclude?.map((chip, i) => (
                      <Chip
                        key={i}
                        title={chip?.label}
                        style={chipStyle}
                        customCloseButton={
                          <Close
                            height="0.4375rem"
                            width="0.4375rem"
                            color={theme[selectedTheme].text}
                          />
                        }
                        onCloseClick={() => handleRemoveChip(chip, 'exclude')}
                      />
                    ))}
                  </SelectedItemsContainer>
                </FilterItemWrp>
              </FilterBody>
            ) : (
              // custom sources tab
              <CustomSourcesWrp>
                <FilterItemWrp className="custom">
                  <FilterTitle>{customSourcesData?.label}</FilterTitle>
                  <SourceInputSearchWrp className="dropdown-search">
                    <SourceInputSearch
                      placeholder="Search"
                      value={customSearchText}
                      onChange={handleCustomSearch}
                    />
                  </SourceInputSearchWrp>
                  <SearchListContainer>
                    {!customSourceLoading ? (
                      customSourceData?.data?.details
                        ?.filter((x) =>
                          x?.name
                            ?.toLowerCase()
                            .includes(customSearchText?.toLowerCase())
                        )
                        ?.map((search, i) => (
                          <SearchListItem
                            className={
                              selectedCustomSource?.index === i
                                ? 'selected-wrp'
                                : ''
                            }
                            customSearchItemHeight={customSearchItemHeight}
                            key={i}
                            onMouseEnter={(e) => handleMouseEnter(e, i)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <SearchLabel
                              onClick={() =>
                                handleSelectCustomSource(search, i)
                              }
                              className={
                                selectedCustomSource?.index === i
                                  ? 'selected'
                                  : ''
                              }
                            >
                              {search?.name}
                            </SearchLabel>
                            {hoverIndex === i && (
                              <ActionIconWrp>
                                <ActionIconItem
                                  onClick={(event) =>
                                    handleActionIcon(event, search, 'edit', i)
                                  }
                                >
                                  <Tooltip content="Edit">
                                    <Edit
                                      size="0.875rem"
                                      color={
                                        hoverIndex === i &&
                                        selectedCustomSource?.index === i
                                          ? '#ffffff'
                                          : '#585858'
                                      }
                                    />
                                  </Tooltip>
                                </ActionIconItem>
                                <ActionIconItem
                                  onClick={(event) =>
                                    handleActionIcon(event, search, 'delete', i)
                                  }
                                  className={
                                    sourceSelected === i ? 'icon-active' : ''
                                  }
                                >
                                  <Tooltip content="Delete">
                                    <Delete
                                      size="0.875rem"
                                      color={
                                        hoverIndex === i &&
                                        selectedCustomSource?.index === i
                                          ? '#ffffff'
                                          : '#585858'
                                      }
                                    />
                                  </Tooltip>
                                </ActionIconItem>
                              </ActionIconWrp>
                            )}
                            {enableTooltip && sourceSelected === i && (
                              <PortalTooltip
                                isOpen={true}
                                pos={toolTipPos}
                                align={
                                  toolTipPos.left > window.innerWidth / 2
                                    ? 'left'
                                    : 'right'
                                }
                              >
                                <DeletePopup
                                  index={i}
                                  setOpenedIndex={setSourceSelected}
                                  handleDeleteItem={handleDeleteItem}
                                  handleCloseDeletePopup={
                                    handleCloseDeletePopup
                                  }
                                />
                              </PortalTooltip>
                            )}
                          </SearchListItem>
                        ))
                    ) : (
                      <div>Loading...</div>
                    )}
                  </SearchListContainer>
                </FilterItemWrp>
                <FilterItemWrp className="custom">
                  <FilterItemTitle>
                    Include <strong>all</strong> of these
                  </FilterItemTitle>
                  <DropdownWrp>
                    <MultiselectDropdown
                      title="Included Sources"
                      name="include"
                      options={customOptionsInclude}
                      selected={customSourceChips?.include}
                      onSelect={(ddName, selected) =>
                        handleReceiveSelectedItems(ddName, selected, true)
                      }
                      count={true}
                      // newWidth="10.5"
                      borderWidth="0"
                      dropdownListHeight="8"
                      deSelectAll={true}
                      selectAll={false}
                      hideFooter={true}
                    />
                  </DropdownWrp>
                  <SelectedItemsContainer>
                    {customSourceChips?.include?.map((chip, i) => (
                      <Chip
                        key={i}
                        title={chip?.label}
                        style={chipStyle}
                        customCloseButton={
                          <Close
                            height="0.4375rem"
                            width="0.4375rem"
                            color={theme[selectedTheme].closeButton}
                          />
                        }
                        onCloseClick={() =>
                          handleRemoveChip(chip, 'include', true)
                        }
                      />
                    ))}
                  </SelectedItemsContainer>
                </FilterItemWrp>
                <FilterItemWrp className="custom">
                  <FilterItemTitle>
                    <strong>Exclude</strong> all of these
                  </FilterItemTitle>
                  <DropdownWrp>
                    <MultiselectDropdown
                      title="Excluded"
                      name="exclude"
                      options={customOptionsExclude}
                      selected={customSourceChips?.exclude}
                      onSelect={(ddName, selected) =>
                        handleReceiveSelectedItems(ddName, selected, true)
                      }
                      count={true}
                      // newWidth="10.5"
                      borderWidth="0"
                      dropdownListHeight="8"
                      deSelectAll={true}
                      selectAll={false}
                      openFrom="right"
                      hideFooter={true}
                    />
                  </DropdownWrp>
                  <SelectedItemsContainer>
                    {customSourceChips?.exclude?.map((chip, i) => (
                      <Chip
                        key={i}
                        title={chip?.label}
                        style={chipStyle}
                        customCloseButton={
                          <Close
                            height="0.4375rem"
                            width="0.4375rem"
                            color={theme[selectedTheme].text}
                          />
                        }
                        onCloseClick={() =>
                          handleRemoveChip(chip, 'exclude', true)
                        }
                      />
                    ))}
                  </SelectedItemsContainer>
                </FilterItemWrp>
              </CustomSourcesWrp>
            )}
            <FilterFooter>
              <FooterLeft>
                <Button
                  title={index === 0 ? 'Save Custom Source' : 'Save Changes'}
                  backgroundColor={theme[selectedTheme].background}
                  color={theme[selectedTheme].primary}
                  onClick={handleSaveSource}
                  iconPosition="left"
                  border={theme[selectedTheme].primary}
                  icon={<Export />}
                />
                <Button
                  title={'Reset'}
                  backgroundColor={theme[selectedTheme].background}
                  color={theme[selectedTheme].primary}
                  onClick={() => resetHandleSaveSource(index)}
                  iconPosition="left"
                  border={theme[selectedTheme].primary}
                  icon={<ResetIcon />}
                />
              </FooterLeft>
              {!applyDisabled && (
                <FooterRight>
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
                </FooterRight>
              )}
            </FilterFooter>
            <DashboardPopup
              popContent={
                <SaveSourcePopup
                  heading="Save Custom Source"
                  primaryHeading="Name"
                  toggler={handleCloseEditPopup}
                  selectedItem={
                    sourceSelected !== -1
                      ? customSourceData?.data?.details[sourceSelected]
                      : {}
                  }
                  handleSaveDashboard={handleSaveSourcePopup}
                />
              }
              padding="1.88rem"
              open={showEditPopup}
              toggler={handleCloseEditPopup}
              borderRadius="0.625rem"
              width={'45vw'}
            />
          </FilterWrapper>
        </DropdownList>
      </DropdownContainer>
    </>
  );
};

export default FilterSources;

FilterSources.propTypes = {
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

TitleBox.propTypes = {
  title: PropTypes.string,
};
