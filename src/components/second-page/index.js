import React from 'react';
import { DrawerWrapper } from './index.sc';
import TileSelector from '../tile-selector';
import { TileComponent } from '../custom-drawer/tile-component';
import { dashboardTabs } from '../../constants/dashboard';
import PropTypes from 'prop-types';

const SecondPage = ({ setDashboard }) => {
  const handleItemClick = (checkedItems) => {
    console.log(checkedItems);
    if (checkedItems.checked) setDashboard(checkedItems);
    else setDashboard();
  };
  return (
    <DrawerWrapper>
      <TileSelector
        board={{ label: '', value: '' }}
        elements={dashboardTabs || []}
        InnerChild={TileComponent}
        handleCheck={handleItemClick}
        isMultiselect={false}
      />
    </DrawerWrapper>
  );
};

SecondPage.propTypes = {
  setDashboard: PropTypes.func,
};

export default SecondPage;
