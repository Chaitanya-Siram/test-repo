import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  DropdownWrap,
  CreateDashboardButton,
  ButtonTextTwo,
  PopoverAbsContainer,
} from './index.sc';
import DropDownButton from '../../assets/icons/DropDownButton';
import Popover from './Popover';

export default function ReusableDropDown({
  dropdownArray,
  label,
  frontIcon,
  navigation,
  childNavigation,
  id,
}) {
  const [showCustomComponent, setShowCustomComponent] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(); // Ref to store the reference of the dropdown container

  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown container
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowCustomComponent(false);
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Attach the event listener to the dropdown container when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setShowCustomComponent(!showCustomComponent);
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <DropdownWrap id={id} ref={dropdownRef}>
      <CreateDashboardButton onClick={handleClick}>
        {frontIcon}
        <ButtonTextTwo>{label}</ButtonTextTwo>
        <DropDownButton
          size={'1rem'}
          color={'#ffffff'}
          isOpen={dropdownOpen}
        ></DropDownButton>
      </CreateDashboardButton>
      {showCustomComponent && (
        <PopoverAbsContainer>
          <Popover
            navigation={navigation}
            childNavigation={childNavigation}
            dropdownArray={dropdownArray}
            setShowCustomComponent={setShowCustomComponent}
          />
        </PopoverAbsContainer>
      )}
    </DropdownWrap>
  );
}

ReusableDropDown.propTypes = {
  label: PropTypes.string.isRequired,
  dropdownArray: PropTypes.array.isRequired,
  frontIcon: PropTypes.element,
  navigation: PropTypes.func,
  childNavigation: PropTypes.func,
  id: PropTypes.string,
};
