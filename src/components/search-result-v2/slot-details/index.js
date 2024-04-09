import React, { useState } from 'react';
import Proptypes from 'prop-types';
import {
  CommentaryLabel,
  CommentarySection,
  // BottomDeswpr,
  // BottomInfowpr,
  // GraphTypeBtn,
  // GraphTypeBtnWrapper,
  IconBox,
  Iconwpr,
  LegendSection,
  // Line,
  // GraphTypeBtn,
  // GraphTypeBtnWrapper,
  SlotBody,
  // SlotBodyTabBody,
  // SlotBodyTabWrp,
  SlotDetailsMainWrp,
  SlotDetailsWrp,
  SlotFooter,
  SlotHeader,
  SlotHeaderLeft,
  // SlotHeaderRight,
  SlotSubTitle,
  SlotTitle,
  // TopInfowpr,
} from '../index.sc';
import Loader from '../../loader';
import PortalTooltip from '../../portal-tooltip';
import { graphTypes, widgetMapping } from '../../../constants/widgets';
import Edit2 from '../../../assets/icons/Edit2';
// import ExpandIcon from '../../../assets/icons/ExpandIcon';
import { VerticleDots } from '../../../assets/icons/VerticleDots';
import GraphLegend from '../../graph-legend';
import GraphTooltip from '../../graph-tooltip';
import DashboardPopup from '../../dasboard-popup';
import EditGraphPopup from '../../edit-graph-popup';

const gridXTicksCount = 6;

const generateGraphComponent = (
  widget,
  defaultConfig,
  type,
  dashboardType,
  canvas
) => {
  // console.log(widgetMapping, dashboardType, widget.component);

  const widgetDetails = {
    dashboardType,
    type,
    component: widget?.component,
  };

  const { bentoView } =
    (widgetMapping[dashboardType] &&
      widgetMapping[dashboardType][widget?.component]) ||
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

  return <GraphComponent data={widget.data} config={finalConfig} />;
};

const SlotDetails = ({
  widget,
  loader,
  type = 'dashboard',
  dashboardType = 'overview',
  canvas = false,
  legend = false,
  commentary = false,
  handleOnClick = () => {},
}) => {
  const [enableTooltip, setEnableTooltip] = useState(false);
  const [toolTipPos, setToolTipPos] = useState({ left: 0, top: 0 });
  const [tooltipData, setTooltipData] = useState();
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  // const [activeBtn, setActiveBtn] = useState('trendline');

  // console.log(widgetMapping, widget.component, 'this is in slot details');
  const tooltipEnabled =
    widgetMapping[dashboardType][widget.component]?.tooltipEnabled || false;

  const handleMouseEnter = (event, d, i) => {
    if (tooltipEnabled) {
      setEnableTooltip(true);
      setToolTipPos({
        ...toolTipPos,
        left: event.clientX,
        top: event.clientY - 10,
      });
      const tData = d.data || d;
      setTooltipData({ data: tData, rawData: d?.rawData });
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

  // const handleTabBtnClick = (e, tab) => {
  //   e.stopPropagation();
  //   setActiveBtn(tab);
  // };

  // const reducedHeight =
  //   widget?.information && widget?.bottomDescription
  //     ? 3
  //     : widget?.information
  //     ? 2
  //     : widget?.bottomDescription
  //     ? 1
  //     : 0;

  // console.log('reduced height: ', reducedHeight);
  const handleClick = (e) => {
    e.stopPropagation();
    console.log('clicked');
  };

  let legendData = [];
  const twoD = widget?.data?.labels?.length > 1;

  if (twoD) {
    legendData = widget?.data?.labels.map((ele) => ({
      label: ele?.label,
      value: ele?.label?.replaceAll(' ', '').toLowerCase(),
      color: ele?.color,
    }));
  } else {
    legendData = widget?.data?.data?.map((ele) => ({
      label: ele?.label,
      value: ele?.value,
      color: ele?.color,
    }));
  }

  const handleGraphEditClick = () => {
    setPopupIsOpen(!popupIsOpen);
  };

  const handleUpdateGraph = (data) => {
    console.log(data, 'edit data');
    handleGraphEditClick();
  };

  return (
    <SlotDetailsMainWrp>
      <IconBox>
        {/* <Iconwpr width={'1.5rem'} height={'1.5rem'} onClick={handleClick}>
          <ExpandIcon />
        </Iconwpr> */}
        <Iconwpr
          width={'1.5rem'}
          height={'1.5rem'}
          onClick={handleGraphEditClick}
        >
          <Edit2 />
        </Iconwpr>
        <Iconwpr width={'1.5rem'} height={'1.5rem'} onClick={handleClick}>
          <VerticleDots />
        </Iconwpr>
      </IconBox>
      <SlotDetailsWrp>
        <SlotHeader>
          <SlotHeaderLeft>
            <SlotTitle>{widget.title}</SlotTitle>
            <SlotSubTitle>{widget.subTitle}</SlotSubTitle>
          </SlotHeaderLeft>
          {/* {widget.enableTabs && (
            <SlotHeaderRight>
              <GraphTypeBtnWrapper>
                <GraphTypeBtn
                  className={activeBtn === 'trendline' ? 'active' : ''}
                  onClick={(e) => handleTabBtnClick(e, 'trendline')}
                >
                  Trendline
                </GraphTypeBtn>
                <GraphTypeBtn
                  className={activeBtn === 'bar' ? 'active' : ''}
                  onClick={(e) => handleTabBtnClick(e, 'bar')}
                >
                  Bar
                </GraphTypeBtn>
              </GraphTypeBtnWrapper>
            </SlotHeaderRight>
          )} */}
        </SlotHeader>
        <SlotBody
          className={`${legend ? 'legend' : ''} ${
            commentary ? 'commentary' : ''
          }`}
        >
          {/* {widget.enableTabs && <SlotBodyTabWrp></SlotBodyTabWrp>}
          <SlotBodyTabBody enableTabs={widget.enableTabs}> */}
          {/* {widget?.information && (
              <TopInfowpr>{widget?.information}</TopInfowpr>
            )} */}
          {loader ? (
            <Loader />
          ) : (
            generateGraphComponent(
              widget,
              defaultConfig,
              type,
              dashboardType,
              canvas
            )
          )}
          {/* </SlotBodyTabBody> */}
          {/* {widget?.bottomDescription && (
              <BottomDeswpr>{widget?.bottomDescription}</BottomDeswpr>
            )} */}
          {tooltipEnabled && enableTooltip && (
            <PortalTooltip
              isOpen={true}
              pos={toolTipPos}
              align={toolTipPos.left > window.innerWidth / 2 ? 'left' : 'right'}
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
        </SlotBody>
        {/* {console.log(widget)} */}
        {(legend || commentary) && (
          <SlotFooter>
            {legend && legendData?.length <= 6 && (
              <LegendSection>
                <GraphLegend legendData={legendData} />
              </LegendSection>
            )}
            {commentary && (
              <CommentarySection>
                <CommentaryLabel>
                  Commentary - Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit
                </CommentaryLabel>
              </CommentarySection>
            )}
          </SlotFooter>
        )}
      </SlotDetailsWrp>
      <DashboardPopup
        open={popupIsOpen}
        toggler={handleGraphEditClick}
        popContent={
          <EditGraphPopup
            popupIsOpen={popupIsOpen}
            handleEditClick={handleUpdateGraph}
            widgetTitle={widget.title}
            widget={widget}
          />
        }
      />
    </SlotDetailsMainWrp>
    // <Line />
    // <BottomInfowpr>
    //     {widget?.bottomInformation ||
    //       'Insights : Media engagement of “covid vaccine” increased by 22% in jan 2021 “covid vaccine” increased by 22% in jan 2021'}
    //   </BottomInfowpr>
  );
};

SlotDetails.defaultProps = {
  type: 'dashboard',
};

SlotDetails.propTypes = {
  widget: Proptypes.object,
  loader: Proptypes.bool,
  type: Proptypes.string,
  dashboardType: Proptypes.string,
  canvas: Proptypes.bool,
  legend: Proptypes.bool,
  commentary: Proptypes.bool,
  handleOnClick: Proptypes.func,
};

export default SlotDetails;
