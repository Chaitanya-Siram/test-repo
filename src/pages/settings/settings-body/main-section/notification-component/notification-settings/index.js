import React, { useEffect, useState } from 'react';
import {
  HeaderText,
  MainWrp,
  NotificationsWrp,
  OptionDescrWrp,
  OptionLabel,
  OptionText,
  OptionWrp,
  OptionsWrp,
  HeaderWrp,
  SubText,
} from './index.sc';
import ToggleSwitch from '../../../../../../components/toggle-switch';
import { theme } from '../../../../../../constants/theme';
// import { Notifications } from '../../../../../../constants/mock';
import { useSelector } from 'react-redux';
import { axiosGet } from '../../../../../../service';
import { useQuery } from '@tanstack/react-query';

const NotificationsSettings = () => {
  const getNotificationSettings = () => {
    return axiosGet('/notification-settings', {}, {});
  };

  const { data: notificationSettings = [], isError } = useQuery({
    queryKey: ['notification-settings'],
    queryFn: getNotificationSettings,
    refetchOnWindowFocus: false,
  });
  const allSettingsData = notificationSettings?.data?.data;

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (allSettingsData && !isError) {
      setNotifications(allSettingsData);
    } else {
      setNotifications([]);
    }
  }, [allSettingsData, isError]);

  function handleClick(optionType, optionNumber) {
    const updatedNotifications = [...notifications];

    updatedNotifications[optionType].options[optionNumber].selected =
      !updatedNotifications[optionType].options[optionNumber].selected;

    setNotifications(updatedNotifications);
  }

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  return (
    <MainWrp>
      {notifications.map((item, i) => {
        return (
          <NotificationsWrp key={i}>
            <HeaderWrp>
              <HeaderText>{item.label}</HeaderText>
              <SubText>{item.subText}</SubText>
            </HeaderWrp>
            <OptionsWrp>
              {item.options.map((option, j) => {
                return (
                  <OptionWrp key={j}>
                    <ToggleSwitch
                      accentColor={theme[selectedTheme].primary}
                      checked={option.selected}
                      onChange={() => handleClick(i, j)}
                    />
                    <OptionDescrWrp>
                      <OptionLabel>{option.optionLabel}</OptionLabel>
                      <OptionText>{option.optionText}</OptionText>
                    </OptionDescrWrp>
                  </OptionWrp>
                );
              })}
            </OptionsWrp>
          </NotificationsWrp>
        );
      })}
    </MainWrp>
  );
};

export default NotificationsSettings;
