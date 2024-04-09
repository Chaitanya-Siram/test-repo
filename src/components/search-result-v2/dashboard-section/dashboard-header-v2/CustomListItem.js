// Custom-styled list item component for the children options
import React from 'react';
import PropTypes from 'prop-types';
import { Div, ListItems } from './CustomStyleItem.sc';
export const CustomListItem = ({ label, onClick }) => {
  return (
    <Div>
      <ListItems onClick={onClick}>{label}</ListItems>
    </Div>
  );
};

CustomListItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
