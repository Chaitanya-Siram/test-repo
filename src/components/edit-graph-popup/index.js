import React, { useState } from 'react';
import {
  BtnWrp,
  ChartInputWrp,
  ChartNameText,
  ChartTypeWrp,
  ContentWrp,
  GraphName,
  GraphTypeBox,
  GraphTypeWrp,
  InputBox,
  PopUpWrp,
  TitleWrp,
} from './index.sc';
import Proptypes from 'prop-types';
import { Button } from '../button';
import { theme } from '../../constants/theme';
import { useSelector } from 'react-redux';
import { widgetMapping } from '../../constants/widgets';
import { useParams } from 'react-router-dom';
const EditGraphPopup = ({
  popupIsOpen,
  handleEditClick,
  widgetTitle,
  widget,
  handleClose,
  handleEdit,
}) => {
  const { dashboardType } = useParams();
  const [editChart, setEditChart] = useState({
    chartName: widgetTitle,
    chartType: widget.graphType || '',
  });
  function chartTypes(widgetType) {
    const allowedGraphs =
      widgetMapping[dashboardType || 'overview'][widgetType]?.allowedGraphTypes;
    return allowedGraphs;
  }
  function handleGraphSubmit(e) {
    e.stopPropagation();
    handleEditClick(e, { ...editChart, chartName: widget?.title }, editChart);
    handleEdit && handleEdit({ ...editChart, chartName: editChart?.chartName });
  }
  const handleEditChart = (name, value) => {
    setEditChart({ ...editChart, [name]: value });
  };

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  return (
    <>
      <PopUpWrp isOpen={popupIsOpen}>
        <TitleWrp>Edit Chart</TitleWrp>
        <ContentWrp>
          <ChartInputWrp>
            <ChartNameText>Name of Chart</ChartNameText>
            <InputBox
              type="text"
              name="chartName"
              placeholder="Please enter chart name"
              value={editChart.chartName}
              onChange={(e) => handleEditChart(e.target.name, e.target.value)}
            />
          </ChartInputWrp>
          <ChartTypeWrp>
            {chartTypes(widget?.component)?.length > 0 && (
              <ChartNameText>Chart Type</ChartNameText>
            )}
            <GraphTypeWrp>
              {chartTypes(widget?.component)?.map((graphType, i) => (
                <GraphTypeBox
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditChart('chartType', graphType?.value);
                  }}
                  selected={graphType?.value === editChart?.chartType}
                >
                  <GraphName>{graphType?.label}</GraphName>
                </GraphTypeBox>
              ))}
            </GraphTypeWrp>
          </ChartTypeWrp>
          <BtnWrp>
            <Button
              title={'Cancel'}
              backgroundColor={theme[selectedTheme].background}
              color={theme[selectedTheme].primary}
              onClick={handleClose}
              border={theme[selectedTheme].primary}
            />
            <Button
              title={'Submit'}
              backgroundColor={'#675ef2'}
              onClick={handleGraphSubmit}
            />
          </BtnWrp>
        </ContentWrp>
      </PopUpWrp>
    </>
  );
};
EditGraphPopup.propTypes = {
  popupIsOpen: Proptypes.bool,
  handleEditClick: Proptypes.func,
  widgetTitle: Proptypes.string,
  widget: Proptypes.object,
  handleClose: Proptypes.func,
  handleEdit: Proptypes.func,
};
export default EditGraphPopup;
