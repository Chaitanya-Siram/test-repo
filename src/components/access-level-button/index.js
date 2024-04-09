import React from 'react';
import Proptypes from 'prop-types';
import { BtnText, BtnWrp } from './index.sc';
// import ChevronDown from '../../assets/icons/ChevronDown';
import { theme } from '../../constants/theme';
import { useSelector } from 'react-redux';
import AdminIcon from '../../assets/icons/AdminIcon';
import AnalystIcon from '../../assets/icons/AnalystIcon';

const AccessLevelBtn = ({ accessLevel, handleClick, isActive }) => {
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const handleButtonClick = () => {
    handleClick();
  };

  return (
    <BtnWrp onClick={handleButtonClick} clicked={isActive}>
      {accessLevel === 'admin' ? (
        <AdminIcon
          color={
            isActive ? theme[selectedTheme].primary : theme[selectedTheme].text
          }
        />
      ) : (
        <AnalystIcon
          color={
            isActive ? theme[selectedTheme].primary : theme[selectedTheme].text
          }
        />
      )}
      <BtnText clicked={isActive}>{accessLevel}</BtnText>
      {/* <ChevronDown
        size="1.0625rem"
        color={
          isActive ? theme[selectedTheme].primary : theme[selectedTheme].text
        }
      /> */}
    </BtnWrp>
  );
};

AccessLevelBtn.propTypes = {
  accessLevel: Proptypes.string,
  handleClick: Proptypes.func,
  isActive: Proptypes.bool,
};

export default AccessLevelBtn;
