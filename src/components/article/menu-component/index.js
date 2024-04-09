import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Dot, DotsContainer, Menu, MenuItem } from './index.sc';

const MenuComponent = ({ options = [], handleAction }) => {
  const ITEM_HEIGHT = '2';
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleSelect = (e) => {
    const { innerText } = e.target;
    handleAction && handleAction(innerText);
    setMenuOpen(!menuOpen);
  };

  return (
    <Container>
      <DotsContainer onClick={toggleMenu}>
        <Dot />
        <Dot />
        <Dot />
      </DotsContainer>
      {menuOpen && (
        <Menu ITEM_HEIGHT={ITEM_HEIGHT}>
          {options.map((option, index) => (
            <MenuItem
              ITEM_HEIGHT={ITEM_HEIGHT}
              key={index}
              onClick={handleSelect}
            >
              <span>{option}</span>
            </MenuItem>
          ))}
        </Menu>
      )}
    </Container>
  );
};

MenuComponent.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  handleAction: PropTypes.func,
};

export default MenuComponent;
