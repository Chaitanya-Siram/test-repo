import React from 'react';
import Proptypes from 'prop-types';
import { AppBG1, AppBG2, AppBGWrp } from './index.sc';

const AppBG = ({ bg1h, bg1 }) => {
  return (
    <AppBGWrp>
      <AppBG1 bg1h={bg1h} bg1={bg1}></AppBG1>
      <AppBG2></AppBG2>
    </AppBGWrp>
  );
};

AppBG.propTypes = {
  bg1h: Proptypes.string,
  bg1: Proptypes.string,
};

export default AppBG;
