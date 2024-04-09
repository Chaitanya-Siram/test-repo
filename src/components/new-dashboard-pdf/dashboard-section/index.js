import React, { useEffect, useState } from 'react';

import { PropTypes } from 'prop-types';
// import Spinner from '../../spinner';
import { NewDashboardwpr } from './index.sc';
import ArticleGraph from '../article-graphs';

const DashboardSectionPdf = ({ dashboardData, dashboardDataLoading }) => {
  const advancedWidgetDetails = dashboardData?.advancedWidgets;

  const [dashboardDetails, setDashboardDetails] = useState(
    dashboardData?.dashboardDetails || []
  );

  useEffect(() => {
    if (dashboardData?.dashboardDetails) {
      setDashboardDetails(
        dashboardData.dashboardDetails.map((item) => ({
          ...item,
          checked: true,
        }))
      );
    } else {
      setDashboardDetails([]);
    }
  }, [dashboardData]);

  // if (dashboardDataLoading) {
  //   return <Spinner />;
  // }

  return (
    <NewDashboardwpr>
      <ArticleGraph
        dashboardDetails={dashboardDetails.filter((item) => item.checked) || []}
        advancedWidgetDetails={advancedWidgetDetails || {}}
        selected={null}
        loader={false}
        setSelected={() => {}}
      />
    </NewDashboardwpr>
  );
};

DashboardSectionPdf.propTypes = {
  dashboardData: PropTypes.object,
  dashboardDataLoading: PropTypes.bool,
};

export default DashboardSectionPdf;
