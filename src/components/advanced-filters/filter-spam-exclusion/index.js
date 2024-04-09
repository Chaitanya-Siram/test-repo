import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  BorderDiv,
  // CountIconWrapper,
  // DropdownButton,
  // DropdownContainer,
  DropdownList,
  DropdownWrp,
  FilterBody,
  FilterFooter,
  FilterHeader,
  FilterItemWrp,
  FilterTitle,
  FilterWrapper,
  SelectedItemsContainer,
  // Title,
} from './index.sc';
import { useSelector } from 'react-redux';
import { theme } from '../../../constants/theme';
import Close from '../../../assets/icons/Close';
import ArrowIcon from '../../../assets/icons/Arrow';
import { Button } from '../../button';
import MultiselectDropdown from '../../dropdown';
import Chip from '../../chips';
import {
  DropdownButton,
  DropdownContainer,
  IconContainer,
  Title,
  CountIconWrapper,
  Selection,
} from '../../dropdown/index.sc';

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

const FilterSpamExclusion = ({
  newWidth,
  borderWidth = 1,
  title = '',
  name = '',
  options = [],
  handleSelectFilter,
  applyDisabled = false,
  selected,
  icon = '',
  count,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [chips, setChips] = useState(selected || null);
  const dropdownRef = useRef();

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleReceiveSelectedItems = (ddName, selectedOptions) => {
    setChips(selectedOptions);
    handleSelectFilter && handleSelectFilter(name, selectedOptions);
  };

  const handleRemoveChip = (chip) => {
    const currentOptions = [...chips] || [];
    const filteredOptions = currentOptions.filter(
      (option) => option.value !== chip.value
    );
    setChips(filteredOptions);
    handleSelectFilter && handleSelectFilter(name, filteredOptions);
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

  const getCount = () => {
    if (!chips) {
      return 0;
    } else {
      const count = chips?.length || 0;
      return count;
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
            <FilterTitle>Spam Exclusions</FilterTitle>
            {/* <IconWrp onClick={toggleDropdown}>
              <Close height="18" width="18" color={theme[selectedTheme].text} />
            </IconWrp> */}
          </FilterHeader>
          <FilterBody>
            <FilterItemWrp>
              <DropdownWrp>
                <MultiselectDropdown
                  title="Exclusion list "
                  name="exclusion_list"
                  options={options}
                  selected={chips}
                  onSelect={handleReceiveSelectedItems}
                  count={true}
                  //   newWidth="10.5"
                  borderWidth="0"
                  dropdownListHeight="8"
                  deSelectAll={true}
                  selectAll={false}
                  hideFooter={true}
                />
              </DropdownWrp>
              <SelectedItemsContainer>
                {chips?.map((chip, i) => (
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
                    onCloseClick={() => handleRemoveChip(chip)}
                  />
                ))}
              </SelectedItemsContainer>
            </FilterItemWrp>
          </FilterBody>
          {!applyDisabled && (
            <>
              <BorderDiv />
              <FilterFooter>
                <Button
                  title="Cancel"
                  backgroundColor={theme[selectedTheme].background}
                  color={theme.dark.secondaryText}
                  onClick={toggleDropdown}
                  btnStyle={{
                    width: '6.18rem',
                    borderRadius: '0.313rem',
                    border: '1px solid #535770',
                  }}
                />
                <Button
                  title="Apply"
                  backgroundColor={theme[selectedTheme].primary}
                  color={theme.dark.text}
                  onClick={toggleDropdown}
                  btnStyle={{ width: '6.18rem', borderRadius: '0.313rem' }}
                />
              </FilterFooter>
            </>
          )}
        </FilterWrapper>
      </DropdownList>
    </DropdownContainer>
  );
};

export default FilterSpamExclusion;

FilterSpamExclusion.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  newWidth: PropTypes.string,
  borderWidth: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSelectFilter: PropTypes.func,
  applyDisabled: PropTypes.bool,
  selected: PropTypes.arrayOf(PropTypes.object),
  icon: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  count: PropTypes.bool,
};
