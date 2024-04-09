import React, { useState } from 'react';
import Proptypes from 'prop-types';
import {
  FullSlot,
  // IconBox,
  // Iconwpr,
  SlotBody,
  SlotBodyHeader,
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
import { graphTypes, widgetMapping } from '../../../constants/widgets';
import PortalTooltip from '../../portal-tooltip';
import GraphTooltip from '../../graph-tooltip';
import PRImpactHeader from './pr-impact-header';
import // CommentaryLabel,
// CommentarySection,
'../../search-result/index.sc';

const gridXTicksCount = 6;

const generateGraphComponent = (
  widget,
  defaultConfig,
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
      widgetMapping[dashboardType][widget.component]) ||
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
      data={widget.data}
      config={finalConfig}
      resetSelection={resetSelection}
    />
  );
};

const PRImpact = ({
  widget,
  loader,
  type = 'dashboard',
  dashboardType = 'overview',
  canvas = false,
  resetSelection = false,
  handleOnClick = () => {},
  handleUpdatedChart,
  customClassName = 'primpatct',
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
        data: { ...tData, value: tData?.count },
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
  return (
    <>
      <FullSlot
        className="graph-widget"
        // selected={idx === selected}
        // onClick={(e) => handleClick(idx, e)}
      >
        <SlotDetailsMainWrp className={customClassName}>
          {/* <IconBox>
            <Iconwpr
              width={'1.5rem'}
              height={'1.5rem'}
              //   onClick={handleGraphEditClick}
            >
              <Edit2 />
            </Iconwpr>
            <Iconwpr
              width={'1.5rem'}
              height={'1.5rem'}
              //  onClick={handleClick}
            >
              <VerticleDots />
            </Iconwpr>
          </IconBox> */}
          <SlotDetailsWrp>
            <SlotHeader>
              <SlotHeaderLeft>
                <SlotTitle>PR Impact Scale</SlotTitle>
              </SlotHeaderLeft>
            </SlotHeader>
            <SlotBody type={type} className="commentary">
              <SlotBodyHeader>
                <PRImpactHeader graphData={widget?.gauge} />
              </SlotBodyHeader>
              <SlotBodyMain>
                {loader ? (
                  <Loader />
                ) : (
                  widget &&
                  generateGraphComponent(
                    widget?.column,
                    defaultConfig,
                    type,
                    dashboardType,
                    canvas,
                    resetSelection
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

export default PRImpact;

PRImpact.defaultProps = {
  type: 'dashboard',
};

PRImpact.propTypes = {
  widget: Proptypes.object,
  loader: Proptypes.bool,
  type: Proptypes.string,
  dashboardType: Proptypes.string,
  canvas: Proptypes.bool,
  resetSelection: Proptypes.bool,
  handleOnClick: Proptypes.func,
  handleUpdatedChart: Proptypes.func,
  customClassName: Proptypes.string,
};
