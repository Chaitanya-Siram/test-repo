import React from 'react';
import PropTypes from 'prop-types';
import { widgetMapping } from '../../constants/widgets';
import Carousel from '../carousel';

const getSidesData = (rawData, config) => {
  const mainData = JSON.parse(JSON.stringify(rawData?.data));
  const dataLength = mainData.length;
  const splicedData = mainData.filter(
    (ele, i) => i < (config.maxData || dataLength)
  );

  const inData = { ...rawData, data: splicedData };

  const slides = [];
  const { data, labels } = inData;

  if (labels?.length > 1) {
    const tempSlide = { ...inData };
    const { data: tempData } = inData;

    tempData.slice(0, 8).forEach((item) => {
      const tempDataArr = [];
      labels.forEach((element) => {
        tempDataArr.push({
          ...item[element.value],
          ...element,
          label: element.label,
          value: item[element.value],
        });
      });
      tempSlide.data = JSON.parse(JSON.stringify(tempDataArr));
      tempSlide.labels = [{ label: 'label', value: 'value' }];
      slides.push(JSON.parse(JSON.stringify(tempSlide)));
    });
  } else {
    const totalPoints = data?.length;
    const pointsPerslide = 1;
    if (totalPoints > pointsPerslide) {
      const tempData = JSON.parse(JSON.stringify(inData));
      for (let i = 0; i < Math.ceil(totalPoints / pointsPerslide); i++) {
        tempData.data = JSON.parse(
          JSON.stringify(
            data.slice(i * pointsPerslide, (i + 1) * pointsPerslide)
          )
        );
        slides.push(JSON.parse(JSON.stringify(tempData)));
      }
    } else {
      slides.push(inData);
    }
  }
  return slides;
};

const generateGraphComponent = (slidesData, config) => {
  const { bentoView } =
    (widgetMapping[config?.dashboardType] &&
      widgetMapping[config?.dashboardType][config?.component]) ||
    {};
  const ComponentEle = bentoView[config?.type]?.graphComponent;
  const slidesList = slidesData.map((ele) => {
    return {
      component: <ComponentEle key={''} data={ele} config={config} />,
    };
  });

  return slidesList;
};

const L1Carousel = ({ data, config }) => {
  const slidesData = JSON.parse(JSON.stringify(getSidesData(data, config)));
  const slidesList = generateGraphComponent(slidesData, config);
  return <Carousel slides={slidesList} />;
};

L1Carousel.propTypes = {
  data: PropTypes.object,
  config: PropTypes.object,
};

export default L1Carousel;
