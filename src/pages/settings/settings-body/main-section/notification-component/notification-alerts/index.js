import React, { useEffect, useRef, useState } from 'react';
import {
  AlertWrp,
  AlertsWrp,
  ContentText,
  HeaderText,
  IconWrp,
  MainWrp,
  OptionContent,
  OptionLabel,
  OptionText,
  OtherText,
  StatusText,
  StatusWrp,
  SubText,
  TitleWrp,
} from './index.sc';
import MoreOptions from '../../../../../../assets/icons/MoreOptions';
import PlayCircle from '../../../../../../assets/icons/PlayCircle';
import PauseCircle from '../../../../../../assets/icons/PauseCircle';
import { AlertsOptions } from '../../../../../../constants/mock';
import AlertActionDropDown from './alert-action-dropdown';
import DashboardPopup from '../../../../../../components/dasboard-popup';
import EditAlertsPopup from '../../../../../../components/edit-alert-popup';
import CustomConfirmationPopUp from '../../../../../../components/customize-confirmation-popup';
import { axiosDelete, axiosGet } from '../../../../../../service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Alerts = () => {
  const getAlerts = () => {
    return axiosGet('/alerts');
  };
  const queryClient = useQueryClient();

  const { data: alertsData } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => getAlerts(),
    refetchOnWindowFocus: false,
  });

  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);

  const actionRef = useRef(null);

  const handleClickOutside = (event) => {
    if (actionRef.current && !actionRef.current.contains(event.target)) {
      setShowActionDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const deleteAlert = (id) => {
    return axiosDelete('/alerts', id);
  };

  const { mutate: deleteFunction } = useMutation({
    mutationFn: deleteAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });

  const editAlerts = () => {
    setShowEditPopup((prev) => !prev);
  };
  const handleDeleteAlert = () => {
    deleteFunction(selectedItem.id);
    setConfirmationPopUp((prev) => !prev);
  };

  const handleClickMoreOptions = (e, item) => {
    e.stopPropagation();
    setShowActionDropdown((prev) => !prev);
    setSelectedItem(item);
  };
  const handleConfirmDelete = () => {
    setConfirmationPopUp(false);
    setShowActionDropdown(false);
  };
  const cancelbutton = () => {
    setConfirmationPopUp(false);
  };

  const actionDropDownOptions = [
    {
      label: 'Edit',
      clickFunction: editAlerts,
    }, // Replace <Icon1 /> with your actual icon component
    {
      label: 'Delete',
      clickFunction: handleDeleteAlert,
    }, // Replace <Icon1 /> with your actual icon component
  ];

  return (
    <MainWrp>
      <HeaderText>{AlertsOptions.label}</HeaderText>
      <SubText>{AlertsOptions.subText}</SubText>
      <AlertsWrp>
        {alertsData?.data?.data?.map((option, i) => {
          return (
            <AlertWrp key={i}>
              <TitleWrp>
                <OptionLabel>{option?.title}</OptionLabel>
                <IconWrp
                  ref={actionRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickMoreOptions(e, option);
                  }}
                >
                  <div>
                    <MoreOptions
                      color={
                        showActionDropdown && selectedItem.id === option?.id
                          ? '#675ef2'
                          : '#5C5E60'
                      }
                    />
                  </div>

                  <AlertActionDropDown
                    isOpen={
                      showActionDropdown && selectedItem.id === option?.id
                    }
                    options={actionDropDownOptions}
                  />
                </IconWrp>
              </TitleWrp>
              <OptionText>{option.description}</OptionText>
              <OptionContent>
                {option.alertIsActive ? (
                  <StatusWrp>
                    <PlayCircle />
                    <StatusText alertIsActive={option.alertIsActive}>
                      Alerts Active for
                    </StatusText>
                  </StatusWrp>
                ) : (
                  <StatusWrp>
                    <PauseCircle />
                    <StatusText alertIsActive={option.alertIsActive}>
                      Alerts Paused
                    </StatusText>
                  </StatusWrp>
                )}
                <ContentText>
                  Search Volume increases by {option.volumebox.increase}%
                </ContentText>
                <ContentText>
                  Search Volume decreases by {option.volumebox.decrease}%
                </ContentText>
                <OtherText>{option.someText}</OtherText>
              </OptionContent>
            </AlertWrp>
          );
        })}
      </AlertsWrp>
      <DashboardPopup
        popContent={
          <EditAlertsPopup
            toggler={setShowEditPopup}
            selectedItem={selectedItem}
          />
        }
        padding="2rem"
        open={showEditPopup}
        toggler={setShowEditPopup}
        borderRadius="0.625rem"
        width={'45vw'}
      />
      <DashboardPopup
        open={confirmationPopUp}
        toggler={setConfirmationPopUp}
        popContent={
          <CustomConfirmationPopUp
            Heading={'Delete User'}
            SecondHeading={'Are you sure you want to delete?'}
            toggler={setConfirmationPopUp}
            handleDelete={handleConfirmDelete}
            handleCancel={cancelbutton}
          />
        }
        handleCancel={cancelbutton}
        padding="0"
        borderRadius="0.625rem"
        width="35rem"
      />
    </MainWrp>
  );
};

export default Alerts;
