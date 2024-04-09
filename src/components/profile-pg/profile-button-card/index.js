import React from 'react';
import PropTypes from 'prop-types';

import { ButtonWrp } from './index.sc';
import ConnectedBtnIcon from '../../../assets/icons/ConnectedBtnIcon';
import { Button } from '../../button';

import { theme } from '../../../constants/theme';
import { useSelector } from 'react-redux';

const ProfileButtonCard = ({ isConnected = true, setIsConnected }) => {
  function handleClick() {
    setIsConnected(!isConnected);
  }
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  return (
    <ButtonWrp onClick={handleClick}>
      {!isConnected ? (
        <Button
          title="Connect"
          backgroundColor={theme[selectedTheme].primary}
          btnStyle={{
            width: '100%',
          }}
        />
      ) : (
        <>
          <Button
            title="Connected"
            backgroundColor={theme[selectedTheme].primary}
            icon={<ConnectedBtnIcon />}
            btnStyle={{
              width: '100%',
            }}
          />
        </>
      )}
    </ButtonWrp>
  );
};

ProfileButtonCard.propTypes = {
  isConnected: PropTypes.bool,
  setIsConnected: PropTypes.func,
};

export default ProfileButtonCard;
