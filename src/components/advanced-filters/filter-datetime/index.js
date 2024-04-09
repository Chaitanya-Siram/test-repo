import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  DateRangeValue,
  // CountIconWrapper,
  // DropdownButton,
  // DropdownContainer,
  DropdownList,
  DropdownListItem,
  FilterBody,
  FilterFooter,
  ListWrp,
  OptionTitle,
  // Title,
} from './index.sc';
import { useSelector } from 'react-redux';
import { theme } from '../../../constants/theme';
import ArrowIcon from '../../../assets/icons/Arrow';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import '../../Calendar/Calendar.css';
import { formatDate } from '../../../utils';
import {
  DropdownButton,
  DropdownContainer,
  IconContainer,
  Title,
  CountIconWrapper,
} from '../../dropdown/index.sc';
import { Button } from '../../button';

const FilterDateTime = ({
  newWidth,
  borderWidth = 1,
  title = '',
  name = '',
  dropdownListHeight = 10.5,
  options = [],
  handleSelectFilter,
  selected,
  icon = '',
  applyDisabled,
}) => {
  const optionSelected = [...options].find(
    (option) => option.value === selected?.value
  );

  const initialRange = [
    {
      startDate: !isNaN(new Date(selected?.start))
        ? new Date(selected?.start)
        : new Date(),
      endDate: !isNaN(new Date(selected?.end))
        ? new Date(selected?.end)
        : addDays(new Date(), 7),
      key: 'selection',
    },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const [selectedOption, setSelectedOption] = useState(optionSelected || null);
  const [range, setRange] = useState(initialRange);
  const [ddWidth, setDdwidth] = useState();
  const [prevSelectedOption, setPrevSelectedOPtion] = useState(optionSelected);
  const [prevRange, setPrevRange] = useState(initialRange);
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (dropdownOpen) {
      const initialRange = [
        {
          startDate: !isNaN(new Date(selected?.start))
            ? new Date(selected?.start)
            : new Date(),
          endDate: !isNaN(new Date(selected?.end))
            ? new Date(selected?.end)
            : addDays(new Date(), 7),
          key: 'selection',
        },
      ];
      setRange(initialRange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownOpen]);

  const handleOption = (option) => {
    setSelectedOption(option);
    let value = option;
    if (option?.value !== 'custom_range') {
      setPrevSelectedOPtion(option);
      setPrevRange([]);
      handleSelectFilter && handleSelectFilter(name, value);
      toggleDropdown();
    } else {
      const start = range[0]?.startDate;
      const end = range[0]?.endDate;
      value = {
        start,
        end,
      };
      // handleSelectFilter && handleSelectFilter(name, value);
    }
  };

  const handleRangeChange = (item) => {
    // if (selectedOption?.value === 'custom_range' && !!onApplyClick()) {
    setRange([item?.selection]);
    // }
    // const start = item?.selection?.startDate;
    // const end = item?.selection?.endDate;
    // const value = {
    //   start,
    //   end,
    // };
    // if (applyDisabled) {
    //   handleSelectFilter && handleSelectFilter(name, value);
    // }
  };

  const onApplyClick = () => {
    try {
      handleSelectFilter &&
        handleSelectFilter(name, {
          start: range[0]?.startDate,
          end: range[0]?.endDate,
        });
      setPrevRange(range);
      setPrevSelectedOPtion({});
    } catch (error) {
      console.log(error?.message);
    } finally {
      toggleDropdown();
    }
  };

  const onCancelClick = () => {
    try {
      // const initialRange = [
      //   {
      //     startDate: !isNaN(new Date(selected?.start))
      //       ? new Date(selected?.start)
      //       : new Date(),
      //     endDate: !isNaN(new Date(selected?.end))
      //       ? new Date(selected?.end)
      //       : addDays(new Date(), 7),
      //     key: 'selection',
      //   },
      // ];

      if (prevSelectedOption?.value !== 'custom_range') {
        // const value = prevSelectedOption;
        // handleSelectFilter && handleSelectFilter(name, value);
        selected?.value && setSelectedOption(prevSelectedOption);
        selected?.start && setRange(prevRange);
        // toggleDropdown();
      } else {
        setRange(prevRange);
        // const start = initialRange[0]?.startDate;
        // const end = initialRange[0]?.endDate;
        // const value = {
        //   start,
        //   end,
        // };
        // handleSelectFilter && handleSelectFilter(name, value);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toggleDropdown();
      // setRange([]);
      // setSelectedOption((prev) => prev);
    }
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);

      // If the custom range is selected and the Apply button was not clicked
      if (
        prevSelectedOption === selectedOption &&
        optionSelected?.value !== undefined
      ) {
        // const value = prevSelectedOption;
        // handleSelectFilter && handleSelectFilter(name, value);
        selected?.value &&
          optionSelected?.value !== undefined &&
          setSelectedOption(selected);

        // toggleDropdown();
        selected?.start &&
          setRange(initialRange) &&
          prevRange?.length > 0 &&
          optionSelected?.value === undefined &&
          setSelectedOption({ label: 'Custom Range', value: 'custom_range' });
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSelectedLabel = () => {
    if (selectedOption || selected) {
      // const value = selectedOption?.value;
      if (selected?.start && range.length) {
        return `${formatDate(range[0]?.startDate, 'dd/MM')} to ${formatDate(
          range[0].endDate,
          'dd/MM'
        )}`;
      }

      return range.length
        ? prevSelectedOption?.label
        : selected?.start || optionSelected?.value === undefined
        ? `${formatDate(prevRange[0]?.startDate, 'dd/MM')} to ${formatDate(
            prevRange[0].endDate,
            'dd/MM'
          )}`
        : selectedOption?.label;
    } else {
      return title;
    }
  };

  const getFormattedDate = () => {
    return `${formatDate(range[0]?.startDate, 'dd/MM/yyyy')} to ${formatDate(
      range[0]?.endDate,
      'dd/MM/yyyy'
    )}`;
  };

  useEffect(() => {
    setDdwidth(
      dropdownRef &&
        dropdownRef?.current?.offsetWidth /
          parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }, [selectedOption]);

  return (
    <DropdownContainer ref={dropdownRef} newWidth={newWidth}>
      <DropdownButton
        className="dropdown-btn"
        active={dropdownOpen}
        onClick={toggleDropdown}
        borderWidth={borderWidth}
      >
        {icon ? <IconContainer>{icon}</IconContainer> : ''}
        <Title>{getSelectedLabel()}</Title>
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
      <ListWrp
        className={selectedOption?.value === 'custom_range' ? 'custom' : ''}
      >
        <FilterBody>
          {selectedOption?.value === 'custom_range' && dropdownOpen && (
            <DateRange
              onChange={(item) => handleRangeChange(item, selectedOption)}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={2}
              direction="horizontal"
              className="calendarElement"
            />
          )}
          <DropdownList
            open={dropdownOpen}
            dropdownListHeight={dropdownListHeight}
            newWidth={ddWidth || newWidth}
          >
            {options.map((option, i) => (
              <DropdownListItem
                key={i}
                className={
                  selectedOption?.value === option?.value ? 'selected' : ''
                }
                onClick={() => handleOption(option)}
              >
                <OptionTitle>{option.label}</OptionTitle>
              </DropdownListItem>
            ))}
          </DropdownList>
        </FilterBody>
        {
          // !applyDisabled &&
          selectedOption?.value === 'custom_range' && dropdownOpen && (
            <FilterFooter>
              <DateRangeValue>{getFormattedDate()}</DateRangeValue>
              <Button
                title={'Cancel'}
                backgroundColor={theme[selectedTheme].background}
                color={theme[selectedTheme].primary}
                onClick={onCancelClick}
                border={theme[selectedTheme].primary}
              />
              <Button
                title="Apply"
                backgroundColor={theme[selectedTheme].primary}
                onClick={onApplyClick}
              />
            </FilterFooter>
          )
        }
      </ListWrp>
    </DropdownContainer>
  );
};

export default FilterDateTime;

FilterDateTime.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  newWidth: PropTypes.string,
  borderWidth: PropTypes.string,
  count: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  dropdownListHeight: PropTypes.string,
  handleSelectFilter: PropTypes.func,
  selected: PropTypes.object,
  icon: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  applyDisabled: PropTypes.bool,
};
