import React from 'react';
import PropTypes from 'prop-types';
// import L1Carousel from '.';
// import { PieGraph } from '../../graphs';
// import { pieData } from '../../constants/mock';
// import { actualOneD } from '../../graphs/utils/mockData';
import { widgetMapping } from '../../constants/widgets';
import Carousel from '../carousel';

// export const slides = [
//   {
//     component: (
//       <PieGraph
//         data={pieData}
//         config={{
//           arcLabel: false,
//           graphType: 'pie',
//         }}
//       />
//     ),
//   },
//   {
//     component: (
//       <PieGraph
//         data={actualOneD}
//         config={{
//           arcLabel: false,
//           graphType: 'pie',
//         }}
//       />
//     ),
//   },
//   {
//     component: (
//       <PieGraph
//         data={actualOneD}
//         config={{
//           arcLabel: false,
//           graphType: 'pie',
//         }}
//       />
//     ),
//   },
// ];

const getSidesData = (inData) => {
  const slides = [];
  const { data, labels } = inData;
  if (labels?.length > 1) {
    slides.push(inData);
  } else {
    const totalPoints = data?.length;
    const pointsPerslide = 5;
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

const Demo = ({ data, config }) => {
  const slidesData = JSON.parse(JSON.stringify(getSidesData(data)));
  const slidesList = generateGraphComponent(slidesData, config);
  return <Carousel slides={slidesList} />;
};

Demo.propTypes = {
  data: PropTypes.object,
  config: PropTypes.object,
};

export default Demo;
