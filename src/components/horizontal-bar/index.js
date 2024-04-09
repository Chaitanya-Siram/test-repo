import React, { useEffect, useRef } from 'react';
import Proptypes from 'prop-types';
import * as d3 from 'd3';
import {
  Bar,
  BarBoxwrpe,
  BarContainer,
  Barwrpr,
  GraphBoxwrpr,
  GridLineLabel,
  GridMainLeft,
  GridMainRight,
  GridMainWrp,
  // GridWrp,
  GridWrpLeft,
  GridWrpRight,
  Gridline,
  LabelWrapper,
  LableSec,
} from './index.sc';
import {
  onClickFunc,
  onMouseEnterMoveLeave,
} from '../../graphs/utils/graphEvents';

const setData = (tempdata) => {
  const inData = JSON.parse(JSON.stringify(tempdata));
  const labels = inData?.labels
    ? inData?.labels
    : [{ label: 'label', value: 'value' }];
  const data = inData.data;
  const summary = inData.summary;

  const filteredData = data;
  const formattedData = [];

  for (let i = 0; i < filteredData.length; i++) {
    const items = [];
    for (let j = 0; j < labels.length; j++) {
      const value = filteredData[i][labels[j].value];
      const item = {
        data: filteredData[i],
        color: filteredData[i].color || labels[j].color,
        index: j,
        labelIndex: i,
        labelText: filteredData[i].label,
        label: labels[j].label,
        value,
      };
      items.push(item);
    }
    formattedData.push(items);
  }
  return { formattedData, summary, labels };
};

const getPercentStr = (max, value) => {
  if (Number.isNaN(max) || Number.isNaN(value)) {
    return '0%';
  }
  const percent = (value / max) * 100;
  return `${percent}%`;
};

const HorizontalMultiBar = ({ data, config }) => {
  const preparedData = setData(data);
  const { formattedData } = preparedData;
  const leftValueArr = formattedData.map((item) => item[0]?.value || 0);
  const rightValueArr = formattedData.map((item) => item[1]?.value || 0);
  const leftMax = Math.max(...leftValueArr);
  const rightMax = Math.max(...rightValueArr);
  console.log('formattedData', formattedData, leftValueArr, leftMax, rightMax);
  const barRefs = useRef([]);

  useEffect(() => {
    const parentContainer = d3.select('.graph-box-wrapper');

    // Attach the click event
    onClickFunc(parentContainer, 'bar', config);

    // Attach the mouse enter, move, and leave events
    onMouseEnterMoveLeave(
      parentContainer,
      'bar',
      config.handleMouseEnter,
      config.handleMouseMove,
      config.handleMouseLeave
    );

    return () => {
      parentContainer.selectAll('.bar').on('click', null);
      parentContainer.selectAll('.bar').on('mouseenter', null);
      parentContainer.selectAll('.bar').on('mousemove', null);
      parentContainer.selectAll('.bar').on('mouseleave', null);
    };
  }, [config]);

  return (
    <>
      <GraphBoxwrpr className="graph-box-wrapper">
        {formattedData.map((ele, i) => (
          <BarContainer key={i} id={`bar-container-${i}`}>
            <LabelWrapper>{ele[0]?.labelText || ''}</LabelWrapper>

            <BarBoxwrpe config={config}>
              {ele.map((item, j) => (
                <Barwrpr
                  key={`${i}${j}`}
                  first={j === 0}
                  last={j === ele.length - 1}
                >
                  {item.label === 'Positive' ? (
                    <>
                      <LableSec style={{ justifyContent: 'flex-end' }}>
                        <span>{item.value}</span>
                      </LableSec>
                      <Bar
                        className="bar"
                        ref={(el) => (barRefs.current[i] = el)}
                        width={getPercentStr(leftMax, item.value)}
                        color={item.color}
                      />
                    </>
                  ) : (
                    <>
                      <Bar
                        className="bar"
                        ref={(el) => (barRefs.current[i] = el)}
                        width={getPercentStr(rightMax, item.value)}
                        color={item.color}
                      />
                      <LableSec style={{ justifyContent: 'flex-start' }}>
                        <span>{item.value}</span>
                      </LableSec>
                    </>
                  )}
                </Barwrpr>
              ))}
            </BarBoxwrpe>
          </BarContainer>
        ))}
      </GraphBoxwrpr>
      <GridMainWrp>
        <GridMainLeft></GridMainLeft>
        <GridMainRight>
          <GridWrpLeft>
            {[...Array(5)].map((ele, i) => (
              <>
                <Gridline
                  key={`line-key-${i}`}
                  style={{
                    right: `${i * 20}%`,
                    display: i === 0 ? 'none' : 'block',
                  }}
                />
                <GridLineLabel style={{ right: `calc(${i * 20}% - 1.5rem)` }}>
                  {i === 0 ? '' : `${i * 20}%`}
                </GridLineLabel>
              </>
            ))}
          </GridWrpLeft>
          <GridWrpRight>
            {[...Array(5)].map((ele, i) => (
              <>
                <Gridline
                  key={`line-key-${i}`}
                  style={{ left: `${i * 20}%` }}
                />
                <GridLineLabel style={{ left: `calc(${i * 20}% - 1.5rem)` }}>
                  {`${i * 20}%`}
                </GridLineLabel>
              </>
            ))}
          </GridWrpRight>
        </GridMainRight>
      </GridMainWrp>
    </>
  );
};

HorizontalMultiBar.propTypes = {
  data: Proptypes.object,
  config: Proptypes.object,
};

export default HorizontalMultiBar;
