import React from 'react';
import Proptypes from 'prop-types';
import { LegendBox, LegendContainer, LegendLabel, LegendWrp } from './index.sc';
import { colorBox } from '../../graphs/utils/graphConst';

const GraphLegend = ({ legendData = [] }) => {
  return (
    <LegendWrp>
      {legendData.map((legend, i) => (
        <LegendContainer key={i}>
          <LegendBox bgColor={legend?.color || colorBox[i]}></LegendBox>
          <LegendLabel>{legend?.label}</LegendLabel>
        </LegendContainer>
      ))}
    </LegendWrp>
  );
};

export default GraphLegend;

GraphLegend.propTypes = {
  legendData: Proptypes.arrayOf(Proptypes.object),
};
