import React, { useState } from 'react';
import Proptypes from 'prop-types';
import {
  FullSlot,
  // IconBox,
  // Iconwpr,
  LegendBox,
  LegendCon,
  LegendItem,
  LegendLabel,
  SlotBody,
  SlotBodyHeader,
  SlotBodyHeaderRight,
  SlotBodyMain,
  SlotDetailsMainWrp,
  SlotDetailsWrp,
  // SlotFooter,
  SlotHeader,
  SlotHeaderLeft,
  SlotTitle,
} from './index.sc';
// import Edit2 from '../../../assets/icons/Edit2';
// import { VerticleDots } from '../../../assets/icons/VerticleDots';
import Loader from '../../loader';
// import PortalTooltip from '../../portal-tooltip';
// import GraphTooltip from '../../graph-tooltip';
// import { graphTypes, widgetMapping } from '../../../constants/widgets';
import { ScatterPlot3D } from '../../../graphs';
import PortalTooltip from '../../portal-tooltip';
import GraphTooltip from '../../graph-tooltip';
import {
  // CommentaryLabel,
  // CommentarySection,
  SlotOverviewWrapper,
} from '../../search-result/index.sc';
import SlotOverview from '../../search-result/slot-details/SlotOverview';
import { gridLine } from '../../../constants/widgets';

// const gridXTicksCount = 6;

// const generateGraphComponent = (
//   widget,
//   defaultConfig,
//   type,
//   dashboardType,
//   canvas,
//   resetSelection = false
// ) => {
//   // console.log(widgetMapping, dashboardType, widget.component);

//   const widgetDetails = {
//     dashboardType,
//     type,
//     component: widget.component,
//   };

//   const { bentoView } =
//     (widgetMapping[dashboardType] &&
//       widgetMapping[dashboardType][widget.component]) ||
//     {};

//   const GraphComponent =
//     type === 'dashboard' || type === 'l2'
//       ? graphTypes[widget.graphType].component
//       : bentoView[type]?.component;

//   const dataCount = widget?.data?.data?.length;
//   const xTicksCount = dataCount < gridXTicksCount ? dataCount : gridXTicksCount;

//   const canvasConfig = { gridXTicks: xTicksCount };

//   const finalConfig = {
//     ...(type === 'dashboard' || type === 'l2'
//       ? graphTypes[widget.graphType].config
//       : bentoView[type]?.config),
//     ...defaultConfig,
//     ...widgetDetails,
//     ...(canvas && canvasConfig),
//   };

//   return (
//     <GraphComponent
//       data={widget.data}
//       config={finalConfig}
//       resetSelection={resetSelection}
//     />
//   );
// };

const CampaignMonitor = ({
  widget,
  loader,
  type = 'dashboard',
  dashboardType = 'overview',
  canvas = false,
  resetSelection = false,
  handleOnClick = () => {},
  customClassName,
}) => {
  const [enableTooltip, setEnableTooltip] = useState(false);
  const [toolTipPos, setToolTipPos] = useState({ left: 0, top: 0 });
  const [tooltipData, setTooltipData] = useState();

  const tooltipEnabled = true;

  const handleMouseEnter = (event, d, i) => {
    if (tooltipEnabled) {
      setEnableTooltip(true);
      setToolTipPos({
        ...toolTipPos,
        left: event.clientX,
        top: event.clientY - 10,
      });
      const tData = d.data || d;
      setTooltipData({
        data: {
          ...tData,
          value: tData?.articleCount,
        },
        rawData: d?.rawData,
      });
    }
  };

  const handleMouseMove = (event, d, i) => {
    if (tooltipEnabled) {
      setToolTipPos({
        ...toolTipPos,
        left: event.clientX,
        top: event.clientY - 10,
      });
    }
  };
  const handleMouseLeave = (event, d, i) => {
    if (tooltipEnabled) {
      setToolTipPos({
        left: 0,
        top: 0,
      });
      setEnableTooltip(false);
      setTooltipData();
    }
  };

  const defaultConfig = {
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
    handleOnClick,
  };

  const legendData = [
    {
      label: 'X-Axis: Net Sentiment',
      color: '#ECEFF3',
    },
    {
      label: 'Y-Axis: Reach',
      color: '#ECEFF3',
    },
    {
      label: 'Size of Bubbles = No of Articles',
      color: '#ECEFF3',
    },
  ];

  return (
    <>
      <FullSlot className="graph-widget">
        <SlotDetailsMainWrp className={customClassName}>
          <SlotDetailsWrp>
            <SlotHeader>
              <SlotHeaderLeft>
                <SlotTitle>Campaign Monitor</SlotTitle>
              </SlotHeaderLeft>
            </SlotHeader>
            <SlotBodyHeader>
              <SlotOverviewWrapper>
                <SlotOverview summary={widget?.summary} />
              </SlotOverviewWrapper>
              <SlotBodyHeaderRight>
                <LegendCon>
                  {legendData.map((ele, i) => {
                    return (
                      <LegendItem key={i}>
                        <LegendBox legendColor={ele?.color}></LegendBox>
                        <LegendLabel>{ele?.label}</LegendLabel>
                      </LegendItem>
                    );
                  })}
                </LegendCon>
              </SlotBodyHeaderRight>
            </SlotBodyHeader>
            <SlotBody type={type} className="commentary">
              <SlotBodyMain>
                {loader ? (
                  <Loader />
                ) : (
                  widget && (
                    <ScatterPlot3D
                      data={widget}
                      config={{
                        xAxisType: 'number',
                        yLabelAlignment: 30,
                        gridXTicks: 6,
                        gridYTicks: 6,
                        valueInPercent: true,
                        ...gridLine,
                        ...defaultConfig,
                      }}
                    />
                  )
                )}
                {enableTooltip && (
                  <PortalTooltip
                    isOpen={true}
                    pos={toolTipPos}
                    align={
                      toolTipPos.left > window.innerWidth / 2 ? 'left' : 'right'
                    }
                    vAlign={
                      toolTipPos.top > window.innerHeight / 2 ? 'top' : 'bottom'
                    }
                  >
                    <GraphTooltip
                      tooltipData={tooltipData}
                      type="two-d"
                      widget={widget}
                    />
                  </PortalTooltip>
                )}
              </SlotBodyMain>
            </SlotBody>
            {/* <SlotFooter>
              <CommentarySection>
                <CommentaryLabel>
                  Insights : Media engagement of “covid vaccine” increased by
                  22% in jan 2021
                </CommentaryLabel>
              </CommentarySection>
            </SlotFooter> */}
          </SlotDetailsWrp>
        </SlotDetailsMainWrp>
      </FullSlot>
    </>
  );
};

export default CampaignMonitor;

CampaignMonitor.defaultProps = {
  type: 'dashboard',
};

CampaignMonitor.propTypes = {
  widget: Proptypes.object,
  loader: Proptypes.bool,
  type: Proptypes.string,
  dashboardType: Proptypes.string,
  canvas: Proptypes.bool,
  resetSelection: Proptypes.bool,
  handleOnClick: Proptypes.func,
  customClassName: Proptypes.string,
};
