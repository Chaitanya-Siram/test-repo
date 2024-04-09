import React from 'react';
import Proptypes from 'prop-types';
import PurePieGraph from '../../../../graphs/PieChart/graphWrapper';
import {
  Legend,
  LegendDesc,
  LegendIndicator,
  LegendWrp,
  LegendsWrp,
  PRImpactDetails,
  PRImpactWrp,
  PrImpactContainer,
  SubTitle,
  Title,
  ValueContent,
} from './index.sc';

const PRImpactHeader = ({ graphData }) => {
  return (
    <PRImpactWrp>
      <PrImpactContainer>
        <PurePieGraph
          data={graphData}
          config={{
            startAngle: (-1 * Math.PI) / 2,
            endAngle: Math.PI / 2,
            enableArcBG: '#F0F2F5',
            arcDividerStrokeColor: 'none',
            innerRadius: 0.2, // 0.01 - 0.5
            arcLabel: false,
            enablePolyline: false,
            enableNeedle: true,
          }}
        />
        <PRImpactDetails>
          <ValueContent>{graphData?.summary?.rawValue}%</ValueContent>
          {/* <Title style={{ opacity: '0' }}>+2% vs previous period</Title> */}
          <SubTitle style={{ opacity: '0' }}>
            Total impact for JAN - SEP, 2021
          </SubTitle>
        </PRImpactDetails>
      </PrImpactContainer>
      <LegendsWrp>
        <LegendWrp>
          <Legend>
            <LegendIndicator color={'#ED3F47'} />
            POOR
          </Legend>
          <LegendDesc>Between 0-10%</LegendDesc>
        </LegendWrp>
        <LegendWrp>
          <Legend>
            <LegendIndicator color={'#FF8C00'} /> GOOD
          </Legend>
          <LegendDesc>Between 10-40%</LegendDesc>
        </LegendWrp>
        <LegendWrp>
          <Legend>
            <LegendIndicator color={'#00CE75'} />
            EXCELLENT
          </Legend>
          <LegendDesc>Above 40%</LegendDesc>
        </LegendWrp>
      </LegendsWrp>
    </PRImpactWrp>
  );
};

export default PRImpactHeader;

PRImpactHeader.propTypes = {
  graphData: Proptypes.object,
};
