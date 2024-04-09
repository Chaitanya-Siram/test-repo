import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { BottomWrp, MainWrp } from './index.sc';
import Tabs from '../../../../../components/tabs';
import { TitleBox } from '../../../../../components/tabs/TabTitle';
import NotificationsSettings from './notification-settings';
import Alerts from './notification-alerts';
import { theme } from '../../../../../constants/theme';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

const NotificationTabs = [
  {
    id: 0,
    content: '',
    label: 'Notifications',
    type: 'notifications',
  },
  {
    id: 1,
    content: '',
    label: 'Alerts',
    type: 'alerts',
  },
];

const tabToIndex = {
  notifications: 0,
  alerts: 1,
};
const indexToTab = {
  0: 'notifications',
  1: 'alerts',
};

const NotificationComponent = () => {
  const { tab1, tab2 } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tab2) {
      navigate(`/settings/${tab1}/${indexToTab[0]}`);
    }
  }, [navigate, tab1, tab2]);
  const [index, setIndex] = useState(tabToIndex[tab2] || 0);

  const tabs = NotificationTabs?.map((ele, i) => ({
    ...ele,
    title: <TitleBox isHideDes={true} title={ele.label} />,
    id: i,
  }));

  const handleTabs = (index) => {
    setIndex(index);
    navigate(`/settings/${tab1}/${indexToTab[index]}`);
  };

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const isOneofTabs = NotificationTabs.find((tab) => tab.type === tab2);

  return (
    <MainWrp>
      <Tabs
        items={!tabs ? [{}] : tabs}
        onChange={handleTabs}
        activeColor={theme[selectedTheme].primary}
        inactiveColor={theme[selectedTheme].tabInactive}
        paddingWrapper="0"
        wraperBorderWidth="0"
        gapitems="1rem"
        bottomBorderWidth="3px"
        currentTab={index}
        defaultActive={false}
      />
      <div style={{ height: '1.88rem', borderTop: '1px solid #eceff3' }}></div>
      {!isOneofTabs ? (
        <div>Something went wrong</div>
      ) : (
        <BottomWrp>
          {index === 0 ? <NotificationsSettings /> : <Alerts />}
        </BottomWrp>
      )}
    </MainWrp>
  );
};

export default NotificationComponent;

NotificationComponent.propTypes = {
  notificationTab: Proptypes.string,
  handleUrlChange: Proptypes.func,
};
