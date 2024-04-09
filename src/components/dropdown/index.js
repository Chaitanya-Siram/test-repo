import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CountIconWrapper,
  DropdownButton,
  DropdownContainer,
  DropdownFooter,
  DropdownInputSearch,
  DropdownList,
  DropdownListItem,
  IconContainer,
  OptionTitle,
  ScrollableWrapper,
  Selection,
  Title,
} from './index.sc';
// import { ReactComponent as ArrowIcon } from './assets/arrow.svg';
import ArrowIcon from './assets/Arrow';
import CheckBox from '../checkbox';
import { theme } from '../../constants/theme';
import { useSelector } from 'react-redux';
import { Button } from '../button';

const MultiselectDropdown = ({
  title = '',
  name,
  options = [],
  selected,
  newWidth,
  newHeight,
  onSelect,
  count = false,
  borderWidth = 1,
  isEditMode = false,
  dropdownListHeight = 14.5,
  deSelectAll = false,
  selectAll = true,
  openFrom = 'left',
  showButtons = false,
  icon = '',
  newSearch = false,
  hideFooter = false,
  handleSearchKey,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(
    selected || (deSelectAll ? [] : [...options])
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([...options]);
  const dropdownRef = useRef();

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  useEffect(() => {
    setSelectedOptions(selected || (deSelectAll ? [] : [...options]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleOption = (option) => {
    const isOptionSelected = selectedOptions.some(
      (item) => item.value === option.value
    );
    if (isOptionSelected) {
      const optionsSelected = selectedOptions.filter(
        (item) => item.value !== option.value
      );
      if (!newSearch && !hideFooter) {
        setSelectedOptions(optionsSelected);
      } else {
        setSelectedOptions(optionsSelected);
        onSelect && onSelect(name, optionsSelected);
      }
    } else {
      const optionsSelected = [...selectedOptions, option];
      if (!newSearch && !hideFooter) {
        setSelectedOptions(optionsSelected);
      } else {
        setSelectedOptions(optionsSelected);
        onSelect && onSelect(name, optionsSelected);
      }
      // setSelectedOptions(optionsSelected);
      // onSelect && onSelect(name, optionsSelected);
    }
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
      if (!newSearch && !hideFooter) {
        setSelectedOptions(selected || (deSelectAll ? [] : [...options])); // setSelectedOptions(selected || (deSelectAll ? [] : [...options]));
      }
    }
  };

  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      const optionsSelected = [];
      if (!newSearch && !hideFooter) {
        setSelectedOptions(optionsSelected);
      } else {
        setSelectedOptions(optionsSelected);
        onSelect && onSelect(name, optionsSelected);
      }
      // onSelect(name, optionsSelected);
    } else {
      const optionsSelected = [...options];
      if (!newSearch && !hideFooter) {
        setSelectedOptions(optionsSelected);
      } else {
        setSelectedOptions(optionsSelected);
        onSelect && onSelect(name, optionsSelected);
      }
      // onSelect(name, optionsSelected);
    }
  };

  const handleSearchDropdown = (query) => {
    setSearchText(query);
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOptions(filtered);
    handleSearchKey && handleSearchKey(query, name);
  };

  useEffect(() => {
    if (selected) setSelectedOptions(selected);
    else {
      if (deSelectAll) {
        setSelectedOptions([]);
      } else {
        setSelectedOptions([...options]);
      }
    }
    setFilteredOptions([...options]);
  }, [selected, options, isEditMode, deSelectAll]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApply = () => {
    onSelect && onSelect(name, selectedOptions);
    toggleDropdown();
  };

  const getLength = () => {
    if (options) {
      if (selected) {
        return selected.length === options.length ? 'All' : selected?.length;
      } else if (selectedOptions) {
        return selectedOptions.length === options.length
          ? 'All'
          : selectedOptions?.length;
      }
      return 'All';
    }
    return 'All';
  };

  const selectedSet = new Set(selectedOptions.map((option) => option.value));
  function customSort(a, b) {
    const aInSelected = selectedSet.has(a.value);
    const bInSelected = selectedSet.has(b.value);
    const selectedComparison = bInSelected - aInSelected;
    return selectedComparison !== 0 ? selectedComparison : 0;
  }

  return (
    <DropdownContainer
      ref={dropdownRef}
      newWidth={newWidth}
      newHeight={newHeight}
    >
      <DropdownButton
        className="dropdown-btn"
        active={dropdownOpen}
        onClick={toggleDropdown}
        borderWidth={borderWidth}
      >
        {icon ? <IconContainer>{icon}</IconContainer> : ''}
        {/* title now has display: inline-block; and max-width: 100%; to ensure that it
        respects the maximum width of the container while allowing the ellipsis
        effect to work. */}
        <Title>{title}</Title>
        <CountIconWrapper>
          {count && <Selection>{getLength()}</Selection>}
          <ArrowIcon
            className={'dropdown-arrow-icon'}
            fill={theme[selectedTheme].text}
            isOpen={dropdownOpen}
          />
        </CountIconWrapper>
      </DropdownButton>
      <DropdownList
        open={dropdownOpen}
        dropdownListHeight={dropdownListHeight}
        className={openFrom === 'right' ? 'open-from-right' : 'open-from-left'}
      >
        <DropdownListItem className="dropdown-search">
          <DropdownInputSearch
            placeholder="Search"
            value={searchText}
            onChange={(e) => handleSearchDropdown(e.target.value)}
          />
        </DropdownListItem>
        <ScrollableWrapper dropdownListHeight={dropdownListHeight}>
          {selectAll && !searchText && (
            <DropdownListItem onClick={handleSelectAll}>
              <CheckBox
                checked={selectedOptions.length === options.length}
                onChange={handleSelectAll}
                backgroundColor={theme[selectedTheme].primary}
                checkedColor={theme[selectedTheme].logoText}
                borderColor={theme[selectedTheme].primary}
              />
              <OptionTitle>All</OptionTitle>
            </DropdownListItem>
          )}
          {filteredOptions?.sort(customSort)?.map((option, i) => (
            <DropdownListItem
              key={i}
              onClick={() => {
                if (!option.disable) {
                  toggleOption(option);
                }
              }}
              style={{
                color: option?.disable
                  ? theme[selectedTheme].disabledBtnColor
                  : 'initial',
              }}
            >
              <CheckBox
                checked={selectedOptions.some(
                  (ele) => ele.value === option.value
                )}
                onChange={() => {
                  if (!option.disable) {
                    toggleOption(option);
                  }
                }}
                backgroundColor={theme[selectedTheme].primary}
                checkedColor={theme[selectedTheme].logoText}
                borderColor={theme[selectedTheme].primary}
              />
              <OptionTitle>{option.label}</OptionTitle>
            </DropdownListItem>
          ))}
        </ScrollableWrapper>
        {!newSearch && !hideFooter && (
          <DropdownFooter>
            <Button
              title={'Cancel'}
              backgroundColor={theme[selectedTheme].background}
              color={theme[selectedTheme].primary}
              onClick={() => {
                setSelectedOptions(
                  selected || (deSelectAll ? [] : [...options])
                );
                toggleDropdown();
              }}
              border={theme[selectedTheme].primary}
            />
            <Button
              title={'Submit'}
              backgroundColor={theme[selectedTheme].primary}
              onClick={handleApply}
            />
          </DropdownFooter>
        )}
      </DropdownList>
    </DropdownContainer>
  );
};

export default MultiselectDropdown;

MultiselectDropdown.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.arrayOf(PropTypes.object),
  newWidth: PropTypes.string,
  onSelect: PropTypes.func,
  count: PropTypes.bool,
  borderWidth: PropTypes.string,
  isEditMode: PropTypes.bool,
  dropdownListHeight: PropTypes.string,
  deSelectAll: PropTypes.bool,
  selectAll: PropTypes.bool,
  openFrom: PropTypes.string,
  newHeight: PropTypes.string,
  showButtons: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  newSearch: PropTypes.bool,
  hideFooter: PropTypes.bool,
  handleSearchKey: PropTypes.func,
};
