import React, { useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import {
  GraphNoDataText,
  // CommentaryLabel,
  // CommentarySection,
  // BottomDeswpr,
  // BottomInfowpr,
  // GraphTypeBtn,
  // GraphTypeBtnWrapper,
  IconBox,
  Iconwpr,
  LegendSection,
  LineShow,
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
  SlotOverviewWrapper,
  // SlotHeaderRight,
  // SlotSubTitle,
  SlotTitle,
  SlotTypeTitle,
  // TopInfowpr,
} from '../index.sc';
// import Loader from '../../loader';
import PortalTooltip from '../../portal-tooltip';
import { graphTypes, widgetMapping } from '../../../constants/widgets';
import Edit2 from '../../../assets/icons/Edit2';
import { VerticleDots } from '../../../assets/icons/VerticleDots';
import GraphLegend from '../../graph-legend';
import GraphTooltip from '../../graph-tooltip';
import DashboardPopup from '../../dasboard-popup';
import EditGraphPopup from '../../edit-graph-popup';
import SlotOverview from './SlotOverview';
import CircularLoading from '../../../assets/icons/loading/circularLoading';
import { trimmedData } from '../../../utils';
import { LinearLine } from '../../../graphs';
import SimpleReusableDropDown from '../../simple-dropdown';
import DownloadIcon from '../../../assets/icons/DownloadIcon';
import { useParams } from 'react-router-dom';

const gridXTicksCount = 6;

const generateGraphComponent = (
  widget,
  defaultConfig,
  type,
  dashboardType,
  canvas,
  resetSelection = false,
  rerender
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

  const maxData =
    type === 'dashboard' || type === 'l2'
      ? graphTypes[widget.graphType]?.maxData
      : bentoView[type]?.maxData;

  const dataCount = widget?.data?.data?.length;
  const xTicksCount = dataCount < gridXTicksCount ? dataCount : gridXTicksCount;

  const canvasConfig = { gridXTicks: xTicksCount };

  let finalConfig = {
    ...(type === 'dashboard' || type === 'l2'
      ? graphTypes[widget.graphType]?.config
      : bentoView[type]?.config),
    ...defaultConfig,
    ...widgetDetails,
    ...(canvas && canvasConfig),
    ...(type === 'dashboard' ? {} : { handleOnClick: undefined }),
  };
  if (
    finalConfig?.component === 'sentiment_over_time' ||
    finalConfig?.component === 'coverage_over_time' ||
    finalConfig?.component === 'reach_over_time' ||
    finalConfig?.component === 'media_type' ||
    finalConfig?.component === 'coverage_over_time' ||
    finalConfig?.component === 'reach_over_time' ||
    finalConfig?.component === 'industry_coverage_by_source' ||
    finalConfig?.component === 'industry_coverage_over_time' ||
    finalConfig?.component === 'people_coverage_over_time' ||
    finalConfig?.component === 'people_media_type'
  ) {
    finalConfig = {
      ...finalConfig,
      singleLineWrp: false,
      showAllLabels: true,
    };
  }
  return widget?.shouldShowGraph ? (
    <GraphComponent
      data={trimmedData(widget.data, maxData)}
      config={finalConfig}
      resetSelection={resetSelection}
      rerender={rerender}
    />
  ) : (
    <GraphNoDataText>No Data</GraphNoDataText>
  );
};

const SlotDetails = ({
  widget,
  loader,
  type = 'dashboard',
  dashboardType = 'overview',
  canvas = false,
  legend = false,
  commentary = false,
  resetSelection = false,
  handleOnClick = () => {},
  handleUpdatedChart = () => {},
  handleShowDownloadPopUp = () => {},
  overRideSlot,
  editOption = false,
  actionOption = false,
  downloadFunction,
  setSelectedComponent,
  graphDownloading,
  widgetClassName,
  searchId,
  chartNames,
  handleGraphTitleUpdate = () => {},
  editChart,
  isSavePopup,
}) => {
  const { dashboardId } = useParams();
  const [enableTooltip, setEnableTooltip] = useState(false);
  const [toolTipPos, setToolTipPos] = useState({ left: 0, top: 0 });
  const [tooltipData, setTooltipData] = useState();
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [tooltipEvent, setTooltipEvent] = useState({});
  const [openActionDropdown, setOpenActionDropDown] = useState(false);
  const [editChart2, setEditChart2] = useState({
    chartName: editChart?.chartName || widget?.title,
    chartType: widget.graphType || '',
  });
  const [rerender, setRerender] = useState(false);

  const containerRef = useRef(null);
  const downloadRef = useRef(null);

  const handleClickOutside = (event) => {
    if (downloadRef.current && !downloadRef.current.contains(event.target)) {
      setOpenActionDropDown(false);
    }
  };
  const graphData = widget;

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setRerender((old) => !old);
  }, [widget]);

  // const handleDownloadSingleGraph = () => {
  //   downloadFunction();
  // };
  const actionDropDownOptions = [
    {
      label: 'Download as Image',
      icon: <DownloadIcon color="#161A34" />,
      type: 'Image',
      clickFunction: (option) => {
        downloadFunction(option, containerRef, graphData, editChart?.chartName);
        setOpenActionDropDown(false);
      },
    }, // Replace <Icon1 /> with your actual icon component
    {
      label: 'Download as Pdf',
      icon: <DownloadIcon color="#161A34" />,
      type: 'PDF',
      clickFunction: (option) => {
        downloadFunction(option, containerRef, graphData, editChart?.chartName);
        setOpenActionDropDown(false);
      },
    },
  ];

  // const [activeBtn, setActiveBtn] = useState('trendline');
  // console.log(widgetMapping[dashboardType][widget.component], 'dashboardType');

  // console.log(widgetMapping, widget.component, 'this is in slot details');
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

  let legendData = [];
  const twoD = graphData?.data?.labels?.length > 1;

  if (graphData?.data?.legends?.length > 0) {
    legendData = [...graphData.data.legends];
  } else {
    if (twoD) {
      legendData = graphData?.data?.labels.map((ele) => ({
        label: ele?.label,
        value: ele?.label?.replaceAll(' ', '').toLowerCase(),
        color: ele?.color,
      }));
    } else {
      legendData = graphData?.data?.legends?.map((ele) => ({
        label: ele?.label,
        value: ele?.value,
        color: ele?.color,
      }));
    }
  }

  const handleGraphEditClick = (e) => {
    // e.preventDefault();
    setPopupIsOpen(!popupIsOpen);
  };

  const handleUpdateGraph = async (e, data, updatedChartData) => {
    e.stopPropagation();
    // console.log(data, 'edit data');
    handleUpdatedChart(data);
    const chartData = chartNames?.data?.find(
      (chart) => chart?.default_name === graphData?.title
    );
    handleGraphTitleUpdate(
      updatedChartData,
      data,
      chartData,
      widgetClassName,
      data?.chartType
    );
    handleGraphEditClick(e);
    // if (searchId !== 'custom-search') {
    //   onUpdateChartNames(updatedChartData);
    // }
  };

  const handleEditChart = (data) => {
    setEditChart2(data);
  };

  const handleOptionIcon = (e, componentName) => {
    e.stopPropagation();
    setSelectedComponent(componentName);
    setOpenActionDropDown(!openActionDropdown);
  };

  const showLineBar = () => {
    const { bentoView } =
      (widgetMapping[dashboardType] &&
        widgetMapping[dashboardType][graphData.component]) ||
      {};

    const GraphComponent =
      type === 'dashboard' || type === 'l2'
        ? graphTypes[graphData.graphType]?.component
        : bentoView[type]?.component;

    return GraphComponent === LinearLine;
  };

  return (
    <SlotDetailsMainWrp
      type={type}
      ref={containerRef}
      className={widgetClassName}
    >
      {/* <button onClick={() => setResetSelection(true)}>reset</button> */}

      <SlotDetailsWrp className="sentiment-graph-download">
        <SlotHeader>
          <SlotHeaderLeft>
            <SlotTitle>
              {dashboardId ? editChart?.chartName : editChart2?.chartName}
              {dashboardType === 'custom' && (
                <SlotTypeTitle
                  type={widgetMapping[dashboardType][widget.component]?.type}
                >
                  {widgetMapping[dashboardType][
                    widget.component
                  ]?.type?.toUpperCase()}
                </SlotTypeTitle>
              )}
            </SlotTitle>
            {/* <SlotSubTitle>{widget.subTitle}</SlotSubTitle> */}
          </SlotHeaderLeft>

          <IconBox type={type} isSavePopup={isSavePopup}>
            {/* <Iconwpr width={'1.5rem'} height={'1.5rem'} onClick={handleClick}>
          <ExpandIcon />
        </Iconwpr> */}
            {/* {overRideSlot && (
          <Iconwpr onClick={handleShowDownloadPopUp}>
            <ComponentIcon color="gray" />
          </Iconwpr>
        )} */}
            {editOption && (
              <Iconwpr
                width={'1.5rem'}
                height={'1.5rem'}
                onClick={handleGraphEditClick}
                className="hide-downloading"
              >
                <Edit2 />
              </Iconwpr>
            )}
            {actionOption && (
              <>
                <Iconwpr
                  width={'1.5rem'}
                  height={'1.5rem'}
                  onClick={(e) => {
                    console.log('it is calling');
                    handleOptionIcon(e, graphData.component);
                  }}
                  ref={downloadRef}
                  className="hide-downloading"
                >
                  <VerticleDots
                    color={openActionDropdown ? '#675ef2' : '#5C5E60'}
                  />
                  <SimpleReusableDropDown
                    isOpen={openActionDropdown}
                    options={actionDropDownOptions}
                    graphDownloading={graphDownloading}
                    setIsOpen={setOpenActionDropDown}
                  />
                </Iconwpr>
              </>
            )}
          </IconBox>

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
        {type === 'dashboard' && (
          <SlotOverviewWrapper
            style={{ marginLeft: '10px', marginTop: '10px' }}
          >
            <SlotOverview summary={graphData?.data?.summary} />
          </SlotOverviewWrapper>
        )}
        <SlotBody
          type={type}
          className={`${type === 'dashboard' && legend ? 'legend' : ''} ${
            type === 'dashboard' && commentary ? 'commentary' : ''
          }`}
        >
          {loader ? (
            <CircularLoading
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          ) : (
            generateGraphComponent(
              graphData,
              defaultConfig,
              type,
              dashboardType,
              canvas,
              resetSelection,
              rerender
            )
          )}
          {showLineBar() && Object.keys(tooltipEvent).length > 0 && (
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
              isAlign={true}
            >
              <GraphTooltip
                tooltipData={tooltipData}
                type="two-d"
                widget={graphData}
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
      <DashboardPopup
        open={popupIsOpen}
        toggler={handleGraphEditClick}
        width={'40%'}
        popContent={
          <EditGraphPopup
            popupIsOpen={popupIsOpen}
            handleEditClick={handleUpdateGraph}
            handleClose={handleGraphEditClick}
            widgetTitle={editChart?.chartName}
            handleEdit={handleEditChart}
            widget={graphData}
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
  resetSelection: Proptypes.bool,
  handleOnClick: Proptypes.func,
  handleUpdatedChart: Proptypes.func,
  handleShowDownloadPopUp: Proptypes.func,
  overRideSlot: Proptypes.bool,
  editOption: Proptypes.bool,
  actionOption: Proptypes.bool,
  downloadFunction: Proptypes.func,
  setSelectedComponent: Proptypes.func,
  graphDownloading: Proptypes.bool,
  widgetClassName: Proptypes.string,
  searchId: Proptypes.string,
  chartNames: Proptypes.object || undefined,
  handleGraphTitleUpdate: Proptypes.func,
  editChart: Proptypes.object,
  isSavePopup: Proptypes.bool,
};

export default SlotDetails;
