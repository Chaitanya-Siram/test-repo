import React, { useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import {
  // CommentaryLabel,
  // CommentarySection,
  GraphTypeBtn,
  GraphTypeBtnWrapper,
  IconBox,
  Iconwpr,
  LegendSection,
  LineShow,
  // SlotBody,
  SlotDetailsMainWrp,
  SlotDetailsWrp,
  SlotFooter,
  SlotHeader,
  SlotHeaderLeft,
  SlotTitle,
} from './index.sc';
import { GraphNoDataText, SlotBody } from '../../index.sc';
import { graphTypes, widgetMapping } from '../../../../constants/widgets';
import { VerticleDots } from '../../../../assets/icons/VerticleDots';
// import Loader from '../../../loader';
import PortalTooltip from '../../../portal-tooltip';
import GraphTooltip from '../../../graph-tooltip';
import GraphLegend from '../../../graph-legend';
import CircularLoading from '../../../../assets/icons/loading/circularLoading';
import DownloadIcon from '../../../../assets/icons/DownloadIcon';
import SimpleReusableDropDown from '../../../simple-dropdown';

const gridXTicksCount = 6;

const tabChartConfig = {
  trendline: 'area',
  bar: 'column',
};

const generateGraphComponent = (
  widget,
  defaultConfig,
  type,
  dashboardType,
  canvas,
  resetSelection = false
) => {
  // console.log(widgetMapping, dashboardType, widget.component);

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

  return widget?.shouldShowGraph ? (
    <GraphComponent
      data={widget.data}
      config={finalConfig}
      resetSelection={resetSelection}
    />
  ) : (
    <GraphNoDataText>No Data</GraphNoDataText>
  );
};

const ResultOverTime = ({
  widget,
  loader,
  type = 'dashboard',
  dashboardType = 'overview',
  canvas = false,
  legend = false,
  commentary = false,
  resetSelection = false,
  handleOnClick = () => {},
  actionOption,
  showChangeGraphOptions = true,
  downloadFunction,
  setSelectedComponent,
  graphDownloading,
  widgetClassName,
}) => {
  const [enableTooltip, setEnableTooltip] = useState(false);
  const [toolTipPos, setToolTipPos] = useState({ left: 0, top: 0 });
  const [tooltipData, setTooltipData] = useState();
  const [tooltipEvent, setTooltipEvent] = useState({});
  const containerRef = useRef(null);

  const [activeBtn, setActiveBtn] = useState('trendline');
  const [selectedWidget, setSelectedWidget] = useState(
    widget[tabChartConfig[activeBtn]]
  );
  const [openActionDropdown, setOpenActionDropDown] = useState(false);
  const downloadRef = useRef(null);

  const handleClickOutside = (event) => {
    if (downloadRef.current && !downloadRef.current.contains(event.target)) {
      setOpenActionDropDown(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedWidget(
      JSON.parse(JSON.stringify(widget[tabChartConfig[activeBtn]]))
    );
  }, [activeBtn, widget]);

  const tooltipEnabled = true;

  const handleMouseEnter = (event, d, i) => {
    if (tooltipEnabled) {
      setEnableTooltip(true);
      setTooltipEvent({
        event,
        d,
        i,
      });
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
      setTooltipEvent({
        event,
        d,
        i,
      });
      setToolTipPos({
        ...toolTipPos,
        left: event.clientX,
        top: event.clientY - 10,
      });
    }
  };
  const handleMouseLeave = (event, d, i) => {
    if (tooltipEnabled) {
      setTooltipEvent({});
      setToolTipPos({
        left: 0,
        top: 0,
      });
      setEnableTooltip(false);
      setTooltipData();
    }
  };

  const customHandleClick = (event, d) => {
    handleOnClick(event, d, selectedWidget);
  };

  const defaultConfig = {
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
    handleOnClick: customHandleClick,
  };

  const actionDropDownOptions = [
    {
      label: 'Download as Image',
      icon: <DownloadIcon color="#161A34" />,
      clickFunction: (option) => {
        downloadFunction(option, containerRef, widget, selectedWidget?.title);
        setOpenActionDropDown(false);
      },
      type: 'Image',
    },
    {
      label: 'Download as Pdf',
      icon: <DownloadIcon color="#161A34" />,
      type: 'PDF',
      clickFunction: (option) => {
        downloadFunction(option, containerRef, widget, selectedWidget?.title);
        setOpenActionDropDown(false);
      },
    },
  ];

  let legendData = [];
  const twoD = selectedWidget?.data?.labels?.length > 1;

  if (twoD) {
    legendData = selectedWidget?.data?.labels.map((ele) => ({
      label: ele?.label,
      value: ele?.label?.replaceAll(' ', '').toLowerCase(),
      color: ele?.color,
    }));
  } else {
    legendData = selectedWidget?.data?.data?.map((ele) => ({
      label: ele?.label,
      value: ele?.value,
      color: ele?.color,
    }));
  }

  const handleTabBtnClick = (e, tab) => {
    e.stopPropagation();
    setActiveBtn(tab);
    // handleUpdatedChart({
    //   chartName: selectedWidget.title,
    //   chartType: tabChartConfig[tab],
    //   customWidget: true,
    // });
  };
  const handleOptionIcon = (e, componentName) => {
    e.stopPropagation();
    setSelectedComponent(componentName);
    setOpenActionDropDown(!openActionDropdown);
  };

  return (
    <SlotDetailsMainWrp ref={containerRef} className={widgetClassName}>
      <IconBox type={type}>
        {/* <Iconwpr width={'1.5rem'} height={'1.5rem'} onClick={handleClick}>
          <ExpandIcon />
        </Iconwpr> */}
        {showChangeGraphOptions && (
          <GraphTypeBtnWrapper className="set-opacity-downloading">
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
        )}

        {actionOption && (
          <Iconwpr
            width={'1.5rem'}
            height={'1.5rem'}
            onClick={(e) => handleOptionIcon(e, 'result_over_time')}
            ref={downloadRef}
            className="hide-downloading"
          >
            <VerticleDots color={openActionDropdown ? '#675ef2' : '#5C5E60'} />
            <SimpleReusableDropDown
              isOpen={openActionDropdown}
              options={actionDropDownOptions}
              graphDownloading={graphDownloading}
              setIsOpen={setOpenActionDropDown}
            />
          </Iconwpr>
        )}
      </IconBox>
      <SlotDetailsWrp>
        <SlotHeader>
          <SlotHeaderLeft style={{ marginLeft: '10px', marginTop: '10px' }}>
            <SlotTitle>{selectedWidget?.title}</SlotTitle>
            {/* <SlotSubTitle>{selectedWidget?.subTitle}</SlotSubTitle> */}
          </SlotHeaderLeft>
        </SlotHeader>
        <SlotBody
          type={type}
          className={`${type === 'dashboard' && legend ? 'legend' : ''} ${
            type === 'dashboard' && commentary ? 'commentary' : ''
          }`}
        >
          {loader ? (
            // <Loader />
            <CircularLoading width="1.8rem" height="1.8rem" size="0.3rem" />
          ) : (
            generateGraphComponent(
              selectedWidget,
              defaultConfig,
              type,
              dashboardType,
              canvas,
              resetSelection
            )
          )}
          {tabChartConfig[activeBtn] === 'area' &&
            Object.keys(tooltipEvent).length > 0 && (
              <LineShow xAxis={tooltipEvent?.event?.offsetX + 2}></LineShow>
            )}
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
                widget={selectedWidget}
              />
            </PortalTooltip>
          )}
        </SlotBody>
        {(legend || commentary) && (
          <SlotFooter>
            {legend && legendData?.length <= 6 && (
              <LegendSection>
                <GraphLegend legendData={legendData} />
              </LegendSection>
            )}
            {/* {commentary && (
              <CommentarySection>
                <CommentaryLabel>
                  Insights : Media engagement of “covid vaccine” increased by
                  22% in jan 2021
                </CommentaryLabel>
              </CommentarySection>
            )} */}
          </SlotFooter>
        )}
      </SlotDetailsWrp>
    </SlotDetailsMainWrp>
  );
};

ResultOverTime.defaultProps = {
  type: 'dashboard',
};

ResultOverTime.propTypes = {
  widget: Proptypes.object,
  loader: Proptypes.bool,
  type: Proptypes.string,
  dashboardType: Proptypes.string,
  canvas: Proptypes.bool,
  legend: Proptypes.bool,
  commentary: Proptypes.bool,
  actionOption: Proptypes.bool,
  resetSelection: Proptypes.bool,
  handleOnClick: Proptypes.func,
  handleUpdatedChart: Proptypes.func,
  showChangeGraphOptions: Proptypes.bool,
  downloadFunction: Proptypes.func,
  setSelectedComponent: Proptypes.func,
  graphDownloading: Proptypes.bool,
  widgetClassName: Proptypes.string,
};

export default ResultOverTime;
