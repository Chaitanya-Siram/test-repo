import React from 'react';
import Proptypes from 'prop-types';
import {
  SubTextLabel,
  //   SummaryContent,
  SummaryTitle,
  SummaryValue,
  SummaryValuesCon,
  SummaryViewWrapper,
} from './index.sc';
import Carousel from '../carousel';
import { formatNumber } from '../../utils';
import { colorBox } from '../../graphs/utils/graphConst';

const setData = (rawData) => {
  const inData = JSON.parse(JSON.stringify(rawData?.data || {}));
  const labels = inData?.labels
    ? inData?.labels
    : [{ label: 'label', value: 'value' }];
  const data = inData.data || [];

  const filteredData = data;
  const formattedData = [];
  // process data object with multiple values
  for (let k = 0; k < labels.length; k++) {
    const items = [];
    for (let i = 0; i < filteredData.length; i++) {
      const value = filteredData[i][labels[k].value];
      const currentItem = JSON.parse(JSON.stringify(filteredData[i]));
      labels.forEach((ele) => {
        delete currentItem[ele.value];
      });
      const item = {
        ...currentItem,
        title: rawData.title,
        label: filteredData[i].label,
        value: parseInt(value),
        accValue:
          (formattedData[k - 1] && formattedData[k - 1][i]?.accValue
            ? formattedData[k - 1][i]?.accValue
            : 0) + parseInt(value),
        labelText: labels[k].label,
        index: i,
        color: labels[k].color
          ? labels[k].color
          : data[i].color
          ? data[i].color
          : colorBox[i % colorBox.length],
      };
      items.push(item);
    }
    formattedData.push(items);
  }
  const graphData = formattedData;

  return graphData;
  // console.log("this.graphData", this.graphData);
};

const SummaryView = ({ data }) => {
  const { title = '', label = '', value } = data;
  return (
    <SummaryViewWrapper>
      <SummaryTitle>{title}</SummaryTitle>
      <SummaryValuesCon>
        <SubTextLabel>{label}</SubTextLabel>
        <SummaryValue>{formatNumber(value) || ''}</SummaryValue>
      </SummaryValuesCon>
    </SummaryViewWrapper>
  );
};

SummaryView.propTypes = {
  data: Proptypes.object,
};

const generateSlidesComponent = (slidesData) => {
  const slidesList = slidesData.slice(0, 10).map((ele, i) => {
    return {
      component: <SummaryView key={`summary-view-slides-${i}`} data={ele} />,
    };
  });

  return slidesList;
};

const GraphSummaryView = ({ rawData }) => {
  const slideData = setData(rawData || {});
  const slides = generateSlidesComponent(slideData[0] || []);
  return <Carousel slides={slides} absoluteDots={true} />;
};

export default GraphSummaryView;

GraphSummaryView.propTypes = {
  data: Proptypes.object,
  rawData: Proptypes.object,
};
