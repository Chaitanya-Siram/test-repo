import React, { memo } from 'react';
import Proptypes from 'prop-types';
import { ItemWrp, LeftbarItem, LeftbarWrp } from './index.sc';

const Leftbar = ({ selected, leftbarItems, onLeftbarTabChange }) => {
  const handleSelectTab = (tab) => {
    onLeftbarTabChange && onLeftbarTabChange(tab);
  };
  return (
    <LeftbarWrp>
      {leftbarItems.map((item, i) => (
        <ItemWrp
          key={i}
          className={selected === item.value ? 'active' : ''}
          onClick={() => handleSelectTab(item.value)}
        >
          <LeftbarItem className={selected === item.value ? 'active' : ''}>
            {item.label}
          </LeftbarItem>
        </ItemWrp>
      ))}
    </LeftbarWrp>
  );
};

export default memo(Leftbar);

Leftbar.propTypes = {
  selected: Proptypes.string,
  leftbarItems: Proptypes.array,
  onLeftbarTabChange: Proptypes.func,
};
