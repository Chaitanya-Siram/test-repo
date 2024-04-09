import React, { useEffect, useMemo, useState } from 'react';
import NotificationIncreaseIcon from '../../assets/icons/NotificationIncrease';
import PropTypes from 'prop-types';
import {
  ContentWrp,
  CountText,
  DayText,
  DayTextWrp,
  HeaderText,
  HeaderWrp,
  LinkWrp,
  MainWrp,
  NotificationCloseIconWrp,
  NotificationCountWrp,
  NotificationSettingIconWrp,
  NotificationWrp,
  PopupWrp,
} from './index.sc';
import Close from '../../assets/icons/Close';
import NotificationSettingIcon from '../../assets/icons/NotificationSettingIcon';
import IconNotificationComponent from './icon-notification-component';
import ImageNotificationComponent from './image-notification-component';
import { useNavigate } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosGet, axiosPutRequest } from '../../service';
import { getTokenData } from '../../constants/validateToken';

const NotificationPopup = ({
  notificationPopupIsOpen,
  handleNotificationPopup,
  isAlert,
}) => {
  const currentDate = useMemo(() => new Date(), []);
  const [currentData, setCurrentData] = useState([]);
  const tokenData = getTokenData();
  const queryClient = useQueryClient();

  const initialData = useMemo(
    () => [
      {
        day: 'Today',
        notifications: [],
      },
      {
        day: 'Older',
        notifications: [],
      },
    ],
    []
  );

  const getNotifications = () => {
    return axiosGet('/notifications', {}, {});
  };

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    refetchOnWindowFocus: false,
  });

  const updateIsRead = (data) => {
    return axiosPutRequest(
      '/notifications',
      { id: data.id },
      { ...data, isRead: true }
    );
  };

  const allNotificationData = notifications?.data?.data;
  const navigate = useNavigate();

  useEffect(() => {
    if (allNotificationData) {
      const finalNotificationData = JSON.parse(JSON.stringify(initialData));
      allNotificationData.forEach((notification) => {
        const updatedNotification = {
          ...notification,
          icon: notification?.isIncreased ? <NotificationIncreaseIcon /> : '',
        };
        const timeStamp = new Date(notification.timeStamp);
        if (timeStamp.toDateString() === currentDate.toDateString()) {
          finalNotificationData[0].notifications.push(updatedNotification);
        } else {
          finalNotificationData[1].notifications.push(updatedNotification);
        }
      });

      setCurrentData(finalNotificationData);
    }
  }, [currentDate, allNotificationData, initialData]);

  // function checkTimestamp(date) {
  //   const currentDate = new Date();

  //   const timestampDate = new Date(date);

  //   currentDate.setHours(0, 0, 0, 0);
  //   timestampDate.setHours(0, 0, 0, 0);

  //   const timeDiff = currentDate.getTime() - timestampDate.getTime();

  //   const oneDay = 24 * 60 * 60 * 1000;

  //   if (timeDiff < oneDay && timeDiff >= 0) {
  //     return 'today';
  //   } else if (timeDiff < 2 * oneDay && timeDiff >= oneDay) {
  //     return 'yesterday';
  //   } else {
  //     return 'Neither today nor yesterday';
  //   }
  // }
  const { mutate: updateFunc } = useMutation({
    mutationFn: updateIsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const handleClickNotificationSettings = () => {
    navigate('/settings/notifications/alerts');
    handleNotificationPopup();
  };

  const closeNotificationPopup = () => {
    handleNotificationPopup();
  };
  const handleChange = (data) => {
    if (!data?.read) {
      console.log(data, 'data');
      updateFunc({ ...data, isRead: true });
    }
  };

  return (
    <>
      {notificationPopupIsOpen && (
        <MainWrp
          isOpen={notificationPopupIsOpen}
          onClick={closeNotificationPopup}
        />
      )}
      <PopupWrp isOpen={notificationPopupIsOpen} isAlert={isAlert}>
        <HeaderWrp>
          <NotificationCloseIconWrp onClick={() => handleNotificationPopup()}>
            <Close />
          </NotificationCloseIconWrp>
          <NotificationSettingIconWrp onClick={handleClickNotificationSettings}>
            <NotificationSettingIcon />
          </NotificationSettingIconWrp>
          <HeaderText>{isAlert ? 'Alerts' : 'Notifications'}</HeaderText>
          <NotificationCountWrp>
            <CountText>
              {allNotificationData?.filter((items) => items?.isRead === false)
                .length || 0}
              New
            </CountText>
          </NotificationCountWrp>
        </HeaderWrp>
        <ContentWrp>
          {currentData.map((element) => (
            <div key={element.day}>
              <DayTextWrp>
                <DayText>{element.day}</DayText>
              </DayTextWrp>
              <NotificationWrp>
                {element.notifications.map((notification, i) => {
                  return (
                    <React.Fragment key={i}>
                      <LinkWrp to={notification?.path || ''}>
                        {notification.type === 'icon' && (
                          <IconNotificationComponent
                            data={notification}
                            handleChange={handleChange}
                          />
                        )}
                        {notification.type === 'image' && (
                          <ImageNotificationComponent
                            data={notification}
                            handleChange={handleChange}
                          />
                        )}
                      </LinkWrp>
                    </React.Fragment>
                  );
                })}
              </NotificationWrp>
            </div>
          ))}
        </ContentWrp>
      </PopupWrp>
    </>
  );
};

NotificationPopup.propTypes = {
  notificationPopupIsOpen: PropTypes.bool,
  handleNotificationPopup: PropTypes.func,
  isAlert: PropTypes.bool,
};

export default NotificationPopup;
