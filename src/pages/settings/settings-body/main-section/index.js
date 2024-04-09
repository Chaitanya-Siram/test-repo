import React from 'react';
import Proptypes from 'prop-types';
import { MainSectionWrp } from './index.sc';

const MainSection = ({ component }) => {
  return <MainSectionWrp>{component}</MainSectionWrp>;
};

export default MainSection;

MainSection.propTypes = {
  component: Proptypes.node,
};
