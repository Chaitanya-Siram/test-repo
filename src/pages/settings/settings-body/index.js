import React, { useEffect, useMemo, useState } from 'react';
import Leftbar from './leftbar';
import MainSection from './main-section';
import { MainWrp } from './index.sc';
import createLeftbarItems from './utils';
import Proptypes from 'prop-types';
import { useNavigate } from 'react-router';

const SettingsBody = ({ tab1, handlePopupClick }) => {
  const [selected, setSelected] = useState(tab1 || 'myaccount');
  const navigate = useNavigate();

  useEffect(() => {
    setSelected(tab1);
  }, [tab1]);

  const onLeftbarTabChange = (tab) => {
    setSelected(tab);
    navigate(`/settings/${tab}`);
  };

  const leftbarItems = useMemo(
    () => createLeftbarItems(handlePopupClick),
    [handlePopupClick]
  );

  const getSelectedTabComponent = () => {
    const selectedItem = leftbarItems.find((item) => item.value === selected);

    if (selectedItem) {
      return selectedItem.component;
    }

    return <div>Something went wrong</div>;
  };

  return (
    <MainWrp>
      <Leftbar
        leftbarItems={leftbarItems}
        selected={selected}
        onLeftbarTabChange={onLeftbarTabChange}
      />
      <MainSection component={getSelectedTabComponent()} />
    </MainWrp>
  );
};

SettingsBody.propTypes = {
  tab1: Proptypes.string,
  handlePopupClick: Proptypes.func,
};

export default SettingsBody;
