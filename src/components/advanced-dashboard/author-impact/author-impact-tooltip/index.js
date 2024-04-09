import React from 'react';
import Proptypes from 'prop-types';
import {
  LegendWrp,
  SlotBody,
  SlotBodyMain,
  SlotDetailsWrp,
  TooltipTitle,
  TooltipWrapper,
} from './index.sc';
// import PortalTooltip from '../../../portal-tooltip';
import { graphTypes, widgetMapping } from '../../../../constants/widgets';
import GraphLegend from '../../../graph-legend';

const gridXTicksCount = 6;

const generateGraphComponent = (
  widget,
  defaultConfig = {},
  type,
  dashboardType,
  canvas,
  resetSelection = false
) => {
  const widgetDetails = {
    dashboardType,
    type,
    component: widget.component,
  };

  const { bentoView } =
    (widgetMapping[dashboardType] &&
      widgetMapping[dashboardType]?.widget?.component) ||
    {};

  const GraphComponent =
    type === 'dashboard' || type === 'l2'
      ? graphTypes[widget.graphType]?.component
      : bentoView[type]?.component;

  const dataCount = widget?.data?.data?.length;
  const xTicksCount = dataCount < gridXTicksCount ? dataCount : gridXTicksCount;

  const canvasConfig = { gridXTicks: xTicksCount };

  const finalConfig = {
    ...(type === 'dashboard' || type === 'l2'
      ? graphTypes[widget.graphType].config
      : bentoView[type]?.config),
    ...defaultConfig,
    ...widgetDetails,
    ...(canvas && canvasConfig),
  };

  return (
    <GraphComponent
      data={widget}
      config={finalConfig}
      resetSelection={resetSelection}
    />
  );
};

const AuthorImpactTooltip = ({
  type = 'dashboard',
  dashboardType = 'overview',
  canvas = false,
  resetSelection = false,
  tooltipData,
}) => {
  const { data, rawData } = tooltipData;

  //   const [enableTooltip, setEnableTooltip] = useState(false);
  //   const [toolTipPos, setToolTipPos] = useState({ left: 0, top: 0 });
  //   const [tooltipData, setTooltipData] = useState();

  //   const tooltipEnabled = true;

  //   const handleMouseEnter = (event, d, i) => {
  //     if (tooltipEnabled) {
  //       setEnableTooltip(true);
  //       setToolTipPos({
  //         ...toolTipPos,
  //         left: event.clientX,
  //         top: event.clientY - 10,
  //       });
  //       const tData = d.data || d;
  //       setTooltipData({ data: tData, rawData: d?.rawData });
  //     }
  //   };

  //   const handleMouseMove = (event, d, i) => {
  //     if (tooltipEnabled) {
  //       setToolTipPos({
  //         ...toolTipPos,
  //         left: event.clientX,
  //         top: event.clientY - 10,
  //       });
  //     }
  //   };
  //   const handleMouseLeave = (event, d, i) => {
  //     if (tooltipEnabled) {
  //       setToolTipPos({
  //         left: 0,
  //         top: 0,
  //       });
  //       setEnableTooltip(false);
  //       setTooltipData();
  //     }
  //   };

  //   const defaultConfig = {
  //     handleMouseEnter,
  //     handleMouseMove,
  //     handleMouseLeave,
  //     handleOnClick,
  //   };

  const legendData = rawData?.tooltipInfo?.labels || [];

  return (
    <>
      <TooltipWrapper>
        <TooltipTitle>{data?.label || 'title'}</TooltipTitle>
        {legendData?.length <= 6 && (
          <LegendWrp>
            <GraphLegend legendData={legendData} />
          </LegendWrp>
        )}
        <SlotDetailsWrp>
          <SlotBody>
            <SlotBodyMain>
              {generateGraphComponent(
                rawData?.tooltipInfo,
                // defaultConfig,
                {},
                type,
                dashboardType,
                canvas,
                resetSelection
              )}
              {/* {enableTooltip && (
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
                  <AuthorImpactTooltip
                    tooltipData={tooltipData}
                    widget={widget}
                  />
                </PortalTooltip>
              )} */}
            </SlotBodyMain>
          </SlotBody>
        </SlotDetailsWrp>
      </TooltipWrapper>
    </>
  );
};

export default AuthorImpactTooltip;

AuthorImpactTooltip.propTypes = {
  tooltipData: Proptypes.object.isRequired,
  widget: Proptypes.object,
  type: Proptypes.string,
  dashboardType: Proptypes.string,
  canvas: Proptypes.bool,
  resetSelection: Proptypes.bool,
};
