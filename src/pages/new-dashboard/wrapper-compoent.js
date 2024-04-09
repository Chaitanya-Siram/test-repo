import React from 'react';
// import CreateDashboard from '.';
import { useParams } from 'react-router';
import Proptypes from 'prop-types';

const WrapperCompoent = (props) => {
  const { searchId, dashboardType, dashboardId } = useParams();

  return (
    <React.Fragment key={`${searchId}/${dashboardType}/${dashboardId || 0}`}>
      {props?.children}
    </React.Fragment>
  );
};

export default WrapperCompoent;

WrapperCompoent.propTypes = {
  children: Proptypes.any,
};
