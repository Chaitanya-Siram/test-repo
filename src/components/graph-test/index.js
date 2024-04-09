import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
// import { CoolColumn3D } from '../../graphs';
// import { coolColumn3DConfig } from '../../constants/widgets';
import styled from 'styled-components';
// import { BigBubble } from '../../graphs';
// import Butterfly from '../../graphs/Butterfly/graphWrapper.js';
// import HorizontalMultiBar from '../horizontal-bar/index.js';
import { initialValues } from '../../graphs/utils/graphConst.js';
import WordCloud from '../../graphs/WordCloud/wc.js';
import parseText from './wc.js';

// export const campaignMonitor = {
//   title: 'Defect Distribution',
//   subtitle: '2020-04-17',
//   summary: { label: '55%', subLabel: '132/237' },
//   data: [
//     { label: 'campaign 1', xValue: 22, yValue: 12500000, radius: '.2' },
//     { label: 'campaign 2', xValue: 43, yValue: 25000000, radius: '.5' },
//     { label: 'campaign 3', xValue: 64, yValue: 15000000, radius: '.3' },
//     { label: 'campaign 4', xValue: 85, yValue: 22555550, radius: '.15' },
//   ],
//   labels: [
//     {
//       label: 'label',
//       value: 'xValue',
//     },
//     {
//       label: 'label',
//       value: 'yValue',
//     },
//     {
//       label: 'label',
//       value: 'radius',
//     },
//   ],
//   info: [],
// };

// export const oneD = {
//   title: 'Sentiment Analysis',
//   subTitle: 'Total Articles',
//   summary: {
//     subtext: '',
//     value: '',
//     widgetName: '',
//   },
//   data: [
//     { label: 'Positive', value: 50, color: '#DE1D83' }, // 1140000
//     { label: 'Negative', value: 20, color: '#FFC786' }, // 380000
//     { label: 'Neutral', value: 30, color: '#8DD3FF' }, // 380000
//     { label: 'Neutral1', value: 30, color: '#8DD3FF' }, // 380000
//     { label: 'Positive1', value: 50, color: '#DE1D83' }, // 1140000
//     { label: 'Negative1', value: 20, color: '#FFC786' }, // 380000
//     { label: 'Neutral2', value: 30, color: '#8DD3FF' }, // 380000
//     { label: 'Positive3', value: 50, color: '#DE1D83' }, // 1140000
//     { label: 'Negative3', value: 20, color: '#FFC786' }, // 380000
//     { label: 'Neutral3', value: 30, color: '#8DD3FF' }, // 380000
//     { label: 'Positive34', value: 50, color: '#DE1D83' }, // 1140000
//     { label: 'Negative34', value: 20, color: '#FFC786' }, // 380000
//     { label: 'Neutral34', value: 30, color: '#8DD3FF' }, // 380000
//     { label: 'Positive35', value: 50, color: '#DE1D83' }, // 1140000
//     { label: 'Negative35', value: 20, color: '#FFC786' }, // 380000
//     { label: 'Neutral35', value: 30, color: '#8DD3FF' }, // 380000

//     { label: 'Positivess', value: 50, color: '#DE1D83' }, // 1140000
//     { label: 'Negativess', value: 20, color: '#FFC786' }, // 380000
//     { label: 'Neutralss', value: 30, color: '#8DD3FF' }, // 380000
//     { label: 'Neutral1ss', value: 30, color: '#8DD3FF' }, // 380000
//     { label: 'Positive1ss', value: 50, color: '#DE1D83' }, // 1140000
//     { label: 'Negative1ss', value: 20, color: '#FFC786' }, // 380000
//     { label: 'Neutral2ss', value: 30, color: '#8DD3FF' }, // 380000
//     { label: 'Positive3ss', value: 50, color: '#DE1D83' }, // 1140000
//     { label: 'Negative3ss', value: 20, color: '#FFC786' }, // 380000
//     { label: 'Neutral3ss', value: 30, color: '#8DD3FF' }, // 380000
//     { label: 'Positive34ss', value: 50, color: '#DE1D83' }, // 1140000
//     { label: 'Negative34ss', value: 20, color: '#FFC786' }, // 380000
//     { label: 'Neutral34ss', value: 30, color: '#8DD3FF' }, // 380000
//     { label: 'Positive35ss', value: 50, color: '#DE1D83' }, // 1140000
//     { label: 'Negative35ss', value: 20, color: '#FFC786' }, // 380000
//     { label: 'Neutral35ss', value: 30, color: '#8DD3FF' }, // 380000
//   ],
//   labels: [
//     {
//       label: 'label',
//       value: 'value',
//     },
//   ],
//   info: [],
// };

// const butterFly2D = {
//   title: 'Defect Distribution',
//   subtitle: '',
//   summary: [{ label: '', subLabel: '' }],
//   data: [
//     { label: 'Theme 1', positive: 110, negative: 50 },
//     { label: 'Theme 2', positive: 80, negative: 110 },
//     { label: 'Theme 3', positive: 115, negative: 30 },
//     { label: 'Theme 4', positive: 60, negative: 40 },
//   ],
//   labels: [
//     { label: 'Positive', value: 'positive', color: 'green' },
//     { label: 'Negative', value: 'negative', color: 'red' },
//   ],
//   info: [],
// };

const GraphWrp = styled.div`
  width: 65rem;
  height: 25rem;
  margin: auto;
`;

// Define the handleOnClick function
const handleOnClick = (item) => {
  console.log('Clicked:', item);
};
const handleMouseEnter = (event, item) => {
  console.log('Mouse entered:', item);
};

const handleMouseMove = (event, item) => {
  console.log('Mouse moved:', item);
};

const handleMouseLeave = (event, item) => {
  console.log('Mouse left:', item);
};

const config = {
  ...initialValues,
  handleOnClick,
  handleMouseEnter,
  handleMouseMove,
  handleMouseLeave,
};

const GraphTest = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.text('./words.txt').then(parseText).then(setData);
  }, []);

  return (
    <GraphWrp>
      {/* <CoolColumn3D data={cbs} config={coolColumn3DConfig} /> */}
      {/* <ScatterPlot3D
        data={campaignMonitor}
        config={{
          xAxisType: 'number',
          yAxisType: 'number',
          yLabelAlignment: 75,
          yAxisTicksFormat: true,
          gridXTicks: 6,
          gridYTicks: 6,
        }}
      /> */}
      {/* <BigBubble data={oneD} config={{}} /> */}
      {/* <Butterfly data={butterFly2D} config={{}} /> */}
      {/* <HorizontalMultiBar data={butterFly2D} config={config} /> */}
      <div className="wordcloud item-b ">
        <svg width="800" height="800">
          <WordCloud
            words={data}
            // forCarol={chosenCarol}
            width={800}
            height={200}
            angle={0}
            fontSizeLarge={45}
            fontSizeSmall={10}
            showCounts={false}
            countSize={5}
            config={config}
          />
        </svg>
      </div>
    </GraphWrp>
  );
};

export default GraphTest;
