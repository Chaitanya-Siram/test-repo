import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DropdownContainer = styled.div`
  position: absolute;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  height: auto;
  width: 9.5rem;
  margin-bottom: 2.5rem;
  padding: 0.5rem;
  background: #fff;
  border-radius: 0.5rem;
  z-index: 100;
  top: 2rem;
  left: -8rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const DropdownList = styled.ul`
  background-color: white;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DropdownItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ProfileDropdown = ({ items, isDropDownOpen, setIsDropdownOpen }) => {
  console.log(isDropDownOpen, 'show');
  return (
    <DropdownContainer isOpen={isDropDownOpen}>
      <DropdownList>
        {items.map((item, index) => (
          <DropdownItem key={index} onClick={item.action}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};
ProfileDropdown.propTypes = {
  items: PropTypes.any,
  isDropDownOpen: PropTypes.bool.isRequired,
  setIsDropdownOpen: PropTypes.func.isRequired,
};
export default ProfileDropdown;
