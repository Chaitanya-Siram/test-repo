import React from 'react';
import { FullSlot } from './index.sc';
import SlotDetails from '../search-result/slot-details';
import { useDashboardData } from '../../hooks/useSearch';
import ResultOverTime from '../search-result/dashboard-section/result-over-time';

const ShowSingleGraphPdf = () => {
  const { searchId, dashboardType, dashboardId, component } =
    Object.fromEntries(new URLSearchParams(window.location.search));
  const {
    isLoading,
    // error: searchError,
    data: dashboardData,
    // isFetching,
  } = useDashboardData(searchId, dashboardType, false, dashboardId);
  const slotWidget = dashboardData?.data?.data?.dashboardDetails.find(
    (data) => data.component === component
  );
  const customWidget = dashboardData?.data?.data?.customWidgets;
  if (isLoading) {
    return <></>;
  }

  return (
    <FullSlot
      className="graph-widget"
      // key={`custom-widget-${i}`}
      // onClick={(e) => handleClick(0, e)}
    >
      {component === 'result_over_time' ? (
        <ResultOverTime
          widget={customWidget}
          actionOption={false}
          showChangeGraphOptions={false}
        />
      ) : (
        <SlotDetails
          widget={slotWidget}
          actionOption={false}
          editOption={false}
        />
      )}
    </FullSlot>
  );
};

export default ShowSingleGraphPdf;
