import React, { useState } from 'react';
import { axiosGet } from '../../service';
import { useQuery } from '@tanstack/react-query';
import SlotDetails from '../../components/search-result/slot-details';
import {
  FullSlot,
  HalfSlot,
  SlotWrp,
} from '../../components/search-result/index.sc';
import { SlotBorder } from './index.sc';
import { overviewWidgets } from '../../constants/widgets';

const AllWidgets = () => {
  const [widgets, setWidgets] = useState({});
  const [noDataFromResponse, setNoDataFromResponse] = useState(true);

  const getWidgets = () => {
    return axiosGet('/all-widgets', {}, {});
  };

  // useQuery({
  //   queryKey: ['widgets'],
  //   queryFn: () => getWidgets(),
  //   refetchOnWindowFocus: false,
  //   onSuccess: (data) => {
  //     if (data?.data?.data.length === 0) {
  //       setNoDataFromResponse(true);
  //     } else {
  //       const {
  //         overViewDetails: overview,
  //         brandDashboard: brand,
  //         industryDashboard: industry,
  //         peopleDashboard: people,
  //       } = data?.data?.data;

  //       setWidgets({ overview, brand, industry, people });
  //     }
  //   },
  // });

  if (noDataFromResponse) {
    return <div>Data is not available</div>;
  }
  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <SlotWrp>
        {Object.keys(widgets).length &&
          Object.keys(widgets).map((ele) => {
            return widgets[ele].map((widget, i) => {
              return overviewWidgets[widget.component]?.slotType === 'full' ? (
                <FullSlot className="graph-widget" key={`widget-${i}`}>
                  <SlotBorder>
                    <SlotDetails
                      widget={widget}
                      dashboardType={ele}
                      legend={true}
                      commentary={true}
                    />
                  </SlotBorder>
                </FullSlot>
              ) : (
                <HalfSlot className="graph-widget" key={`widget-${i}`}>
                  <SlotBorder>
                    <SlotDetails
                      widget={widget}
                      dashboardType={ele}
                      legend={true}
                      commentary={true}
                    />
                  </SlotBorder>
                </HalfSlot>
              );
            });
          })}
      </SlotWrp>
    </div>
  );
};

export default AllWidgets;
