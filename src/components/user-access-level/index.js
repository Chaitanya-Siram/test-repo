import React from 'react';
import Proptypes from 'prop-types';
import {
  AccessLevelWrp,
  AccessLeveltext,
  BtnWrp,
  ClickText,
  ContentWrp,
  HeadingText,
  LearnMoreText,
  MainWrp,
  PopupWrp,
  StrikedText,
  TextWrp,
  UserContentWrp,
  UserNameText,
  UserWrp,
} from './index.sc';
import AccessLevelArrow from '../../assets/icons/AccessLevelArrow';
import Avatar from '../avatar';
import { Button } from '../button';
import { theme } from '../../constants/theme';
import { useSelector } from 'react-redux';

const accessLevels = [
  { label: 'Admin', value: 'admin', level: 1 },
  { label: 'Analyst', value: 'analyst', level: 2 },
  { label: 'User', value: 'user', level: 3 },
];

const UserAccessLevelPopup = ({ data, setOpenedIndex, handlePopupClick }) => {
  function handleSubmit() {
    setOpenedIndex(-1);
  }

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  function changeLevel(currentAccessLevel) {
    const type = accessLevels.find(
      (level) => level.value === currentAccessLevel
    );

    const requiredLevel = type.level - 1;

    const newAccessLevel = accessLevels.find(
      (level) => level.level === requiredLevel
    );

    if (!newAccessLevel) {
      return 'Admin';
    } else {
      return newAccessLevel.label;
    }
  }

  return (
    <PopupWrp>
      <MainWrp>
        <ContentWrp>
          <HeadingText>Confirm Changes</HeadingText>
          <UserWrp>
            <UserContentWrp>
              <Avatar name={data.name.title} />
              <TextWrp>
                <UserNameText>{data.name.title}</UserNameText>
                <AccessLevelWrp>
                  {data.access_level !== 'admin' && (
                    <StrikedText>{data.access_level}</StrikedText>
                  )}
                  {data.access_level !== 'admin' && <AccessLevelArrow />}
                  <AccessLeveltext>
                    {changeLevel(data.access_level)}
                  </AccessLeveltext>
                </AccessLevelWrp>
              </TextWrp>
            </UserContentWrp>
          </UserWrp>
          <LearnMoreText>
            Learn more about{' '}
            <ClickText onClick={handlePopupClick}>User Access Levels</ClickText>
          </LearnMoreText>
        </ContentWrp>
        <BtnWrp>
          <Button
            title={'Cancel'}
            backgroundColor={'#F6F7FB'}
            color={'#000000'}
            onClick={() => setOpenedIndex(-1)}
            // btnStyle={addBtnStyle}
          />
          {data.access_level !== 'admin' && (
            <Button
              title={'Submit'}
              backgroundColor={theme[selectedTheme].primary}
              onClick={handleSubmit}
            />
          )}
        </BtnWrp>
      </MainWrp>
    </PopupWrp>
  );
};

UserAccessLevelPopup.propTypes = {
  data: Proptypes.object,

  setOpenedIndex: Proptypes.func,
  handlePopupClick: Proptypes.func,
};

export default UserAccessLevelPopup;
