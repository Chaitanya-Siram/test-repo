import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ListItems } from './CustomListItems.sc';
import Arrow from '../../assets/icons/Arrow';
import { useSelector } from 'react-redux';
import { theme } from '../../constants/theme';
export default function CustomListItems({ label, onClick }) {
  const [show, setShow] = useState(false);
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  return (
    <ListItems
      onClick={onClick}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {label} {show && <Arrow fill={theme[selectedTheme].primary} />}
    </ListItems>
  );
}

CustomListItems.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
