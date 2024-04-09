import React, { useState } from 'react';
import * as Style from './index.sc';
import { brandWidgets, standardDashboards } from '../../constants/widgets';
import PropTypes from 'prop-types';
import WriteIcon from '../../assets/icons/WriteIcon';
import PortalTooltip from '../portal-tooltip';

const CustomDashboardCanvas = ({
  handleItemClick,
  selectedItems,
  dashType = '',
  subDashType = '',
}) => {
  const standardDashboardIndex = standardDashboards.findIndex(
    (ele) => ele.value === dashType
  );

  const getDashboardtypes = (index) => {
    if (index !== -1) {
      if (dashType === 'brand') {
        const brandData = JSON.parse(JSON.stringify(brandWidgets));
        const graphs = Object.keys(brandWidgets).filter((key) => {
          return brandData[key]?.type === subDashType;
        });
        const widgets = {};
        graphs.forEach((graph) => {
          widgets[graph] = brandData[graph];
        });
        return [{ ...standardDashboards[index], widgets }];
      } else {
        return [standardDashboards[index]];
      }
    }
    return standardDashboards;
  };
  const widgetMap = getDashboardtypes(standardDashboardIndex);

  const handleSelect = (dashboardType, widgetName) => {
    let selectedList = JSON.parse(JSON.stringify(selectedItems));
    selectedList = selectedList[dashboardType]
      ? selectedList
      : { ...selectedList, [dashboardType]: {} };
    const prevValue = selectedList[dashboardType]
      ? selectedList[dashboardType][widgetName]
      : false;
    selectedList[dashboardType][widgetName] = !prevValue;
    handleItemClick(selectedList);
  };
  const [toolTipPos, setToolTipPos] = useState({ left: 0, top: 0 });
  const [tooltipData, setTooltipData] = useState();
  const [enableTooltip, setEnableTooltip] = useState(false);
  const handleMouseEnter = (data, e) => {
    setTooltipData(data.img);
    setToolTipPos({
      ...toolTipPos,
      left: e.clientX,
      top: e.clientY - 10,
    });
    setEnableTooltip(true);
  };
  const handleMouseMove = (e) => {
    setToolTipPos({
      ...toolTipPos,
      left: e.clientX,
      top: e.clientY - 10,
    });
  };
  const handleMouseLeave = () => {
    setEnableTooltip(false);
  };
  const handleSelectAll = (boardWidgets, board) => {
    const widgets = { ...boardWidgets };
    Object.keys(widgets).forEach((widget) => {
      widgets[widget] = true;
    });
    const selectedList = { ...selectedItems, [board]: widgets };
    handleItemClick(selectedList);
  };
  const handleDeSelectAll = (boardWidgets, board) => {
    const widgets = { ...boardWidgets };
    Object.keys(widgets).forEach((widget) => {
      widgets[widget] = false;
    });
    const selectedList = { ...selectedItems, [board]: widgets };
    handleItemClick(selectedList);
  };

  return (
    <Style.Wrapper>
      {widgetMap.map((board, i) => (
        <Style.WidgetGroup key={`board-${i}`}>
          <Style.Header>
            {board.label}
            {selectedItems[board.value] &&
            Object.keys(selectedItems[board.value])?.filter(
              (item) => selectedItems[board.value][item]
            ).length >= Object.keys(board.widgets).length ? (
              <Style.SelectAll
                onClick={() => handleDeSelectAll(board.widgets, board.value)}
              >
                Deselect All
              </Style.SelectAll>
            ) : (
              <Style.SelectAll
                onClick={() => handleSelectAll(board.widgets, board.value)}
              >
                Select All
              </Style.SelectAll>
            )}
          </Style.Header>
          <Style.Widgets>
            {Object.keys(board.widgets).map((item, idx) => (
              <Style.Widget
                key={item + idx}
                onClick={() => handleSelect(board.value, item)}
                selected={selectedItems[board.value]?.[item]}
                onMouseEnter={(e) => handleMouseEnter(board.widgets[item], e)}
                onMouseLeave={(e) => handleMouseLeave(board.widgets[item], e)}
                onMouseMove={(e) => handleMouseMove(e)}
              >
                <Style.WidgetHeaderWrapper>
                  <Style.WidgetHeader>
                    {board.widgets[item].label}
                  </Style.WidgetHeader>
                  <Style.WidgetIconWrapper>
                    {selectedItems[board.value]?.[item] && (
                      <WriteIcon stroke="#fff" />
                    )}
                  </Style.WidgetIconWrapper>
                </Style.WidgetHeaderWrapper>
                <Style.WidgetDesc>
                  {board.widgets[item].description}
                </Style.WidgetDesc>
              </Style.Widget>
            ))}
          </Style.Widgets>
          {
            <PortalTooltip
              isOpen={enableTooltip}
              pos={toolTipPos}
              // align={toolTipPos.left > window.innerWidth / 2 ? 'left' : 'right'}
              vAlign={
                toolTipPos.top > window.innerHeight / 2 ? 'top' : 'bottom'
              }
              leftAlign={40} // width of authorImpact tooltip
            >
              <Style.WidgetTooltipWrapper>
                <Style.WidgetTooltipImage src={tooltipData} />
              </Style.WidgetTooltipWrapper>
            </PortalTooltip>
          }
        </Style.WidgetGroup>
      ))}
    </Style.Wrapper>
  );
};

CustomDashboardCanvas.propTypes = {
  handleItemClick: PropTypes.func.isRequired,
  selectedItems: PropTypes.object.isRequired,
  dashType: PropTypes.string,
  subDashType: PropTypes.string,
};

export default CustomDashboardCanvas;
