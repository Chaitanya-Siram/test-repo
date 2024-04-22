import React, { useRef, useState } from 'react';
import Proptypes from 'prop-types';
import {
  ChartName,
  FullSlot,
  IconBox,
  Iconwpr,
  // IconBox,
  // Iconwpr,
  SlotBody,
  SlotBodyMain,
  SlotDetailsMainWrp,
  SlotDetailsWrp,
  SlotGraphItem,
  SlotHeader,
  SlotHeaderLeft,
  SlotTitle,
  // SlotFooter,
} from './index.sc';
// import Edit2 from '../../../assets/icons/Edit2';
// import { VerticleDots } from '../../../assets/icons/VerticleDots';
// import Loader from '../../loader';
import { graphTypes, widgetMapping } from '../../../constants/widgets';
import PortalTooltip from '../../portal-tooltip';
import AuthorImpactTooltip from './author-impact-tooltip';
import {
  // CommentaryLabel,
  // CommentarySection,
  SlotOverviewWrapper,
} from '../../search-result/index.sc';
import SlotOverview from '../../search-result/slot-details/SlotOverview';
import DownloadIcon from '../../../assets/icons/DownloadIcon';
import SimpleReusableDropDown from '../../simple-dropdown';
import { VerticleDots } from '../../../assets/icons/VerticleDots';
import { useSelector } from 'react-redux';
import { theme } from '../../../constants/theme';

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
      data={widget}
      config={finalConfig}
      resetSelection={resetSelection}
    />
  );
};

const AuthorImpact = ({
  widget,
  loader,
  type = 'dashboard',
  dashboardType = 'overview',
  canvas = false,
  resetSelection = false,
  handleOnClick = () => {},
  customClassName = 'authorimpact',
  downloadFunction,
  setSelectedComponent,
  graphDownloading,
  editChart,
  widgetClassName,
}) => {
  const [enableTooltip, setEnableTooltip] = useState(false);
  const [toolTipPos, setToolTipPos] = useState({ left: 0, top: 0 });
  const [tooltipData, setTooltipData] = useState();
  const [openActionDropdown, setOpenActionDropDown] = useState(false);
  const containerRef = useRef(null);
  const downloadRef = useRef(null);

  const tooltipEnabled = false;
  const graphData = widget;

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

  const handleOptionIcon = (e, componentName) => {
    e.stopPropagation();
    setSelectedComponent(componentName);
    setOpenActionDropDown(!openActionDropdown);
  };

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

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const defaultConfig = {
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
    handleOnClick,
  };
  return (
    <>
      <FullSlot
        className={
          dashboardType === 'brand' || dashboardType === 'custom'
            ? widgetClassName
            : 'graph-widget'
        }
        // selected={idx === selected}
        // onClick={(e) => handleClick(idx, e)}
        ref={containerRef}
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
                <SlotTitle>{widget?.title || 'Author Impact'}</SlotTitle>
              </SlotHeaderLeft>
              {(dashboardType === 'brand' || dashboardType === 'custom') && (
                <IconBox>
                  <>
                    <Iconwpr
                      width={'1.5rem'}
                      height={'1.5rem'}
                      onClick={(e) => {
                        handleOptionIcon(e, graphData.component);
                      }}
                      ref={downloadRef}
                      className="hide-downloading"
                    >
                      <VerticleDots
                        color={
                          openActionDropdown
                            ? theme[selectedTheme].primary
                            : theme[selectedTheme].inActiverticalDots
                        }
                      />
                      <SimpleReusableDropDown
                        isOpen={openActionDropdown}
                        options={actionDropDownOptions}
                        graphDownloading={graphDownloading}
                        setIsOpen={setOpenActionDropDown}
                      />
                    </Iconwpr>
                  </>
                </IconBox>
              )}
            </SlotHeader>
            {type === 'dashboard' && (
              <SlotOverviewWrapper>
                <SlotOverview summary={widget?.summary} />
              </SlotOverviewWrapper>
            )}
            <SlotBody type={type} className="commentary">
              <SlotBodyMain>
                {widget &&
                  Object.entries(widget?.data)?.map(([key, value], index) => {
                    return (
                      <SlotGraphItem key={index}>
                        <ChartName>{key.split('_').join(' ')}</ChartName>
                        {generateGraphComponent(
                          { ...value, key },
                          defaultConfig,
                          type,
                          dashboardType,
                          canvas,
                          resetSelection
                        )}
                      </SlotGraphItem>
                    );
                  })}
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
                    leftAlign={40} // width of authorImpact tooltip
                    boxShadow={'rgba(0, 0, 0, 0.2) 0px 10px 20px 0px'}
                  >
                    <AuthorImpactTooltip tooltipData={tooltipData} />
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

export default AuthorImpact;

AuthorImpact.defaultProps = {
  type: 'dashboard',
};

AuthorImpact.propTypes = {
  widget: Proptypes.object,
  loader: Proptypes.bool,
  type: Proptypes.string,
  dashboardType: Proptypes.string,
  canvas: Proptypes.bool,
  resetSelection: Proptypes.bool,
  handleOnClick: Proptypes.func,
  handleUpdatedChart: Proptypes.func,
  customClassName: Proptypes.string,
  downloadFunction: Proptypes.func,
  setSelectedComponent: Proptypes.func,
  graphDownloading: Proptypes.bool,
  editChart: Proptypes.object,
  widgetClassName: Proptypes.string,
};
