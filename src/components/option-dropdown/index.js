import React from 'react';
import { Dropdwnwpr, Itemwpr } from './index.sc';
import PropTypes from 'prop-types';

const OptionDropdwn = ({ items, handleClick, activeIndex }) => {
  const handleItem = (event, index) => {
    handleClick(items[index], index);
  };

  return (
    <Dropdwnwpr>
      {items.map((item, i) => (
        <Itemwpr
          active={i === activeIndex}
          onClick={(e) => {
            handleItem(e, i);
          }}
          key={i}
        >
          {item.label}
        </Itemwpr>
      ))}
    </Dropdwnwpr>
  );
};

OptionDropdwn.propTypes = {
  items: PropTypes.array,
  handleClick: PropTypes.func,
  activeIndex: PropTypes.number,
};

export default OptionDropdwn;
