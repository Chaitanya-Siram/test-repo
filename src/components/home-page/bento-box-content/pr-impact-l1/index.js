import React from 'react';
import PurePieGraph from '../../../../graphs/PieChart/graphWrapper';
import { actualOneDT2 } from '../../../../constants/mock';
import {
  Legend,
  LegendDesc,
  LegendIndicator,
  LegendWrp,
  LegendsWrp,
  PRImpactDetails,
  PRImpactWrp,
  SubTitle,
  Title,
  ValueContent,
} from './index.sc';

const PRImpactL1 = () => {
  return (
    <PRImpactWrp>
      <PurePieGraph
        data={actualOneDT2}
        config={{
          startAngle: (-1 * Math.PI) / 2,
          endAngle: Math.PI / 2,
          enableArcBG: '#F0F2F5',
          arcDividerStrokeColor: 'none',
          innerRadius: 0.2, // 0.01 - 0.5
          arcLabel: false,
          enablePolyline: false,
        }}
      />
      <PRImpactDetails>
        <ValueContent>35%</ValueContent>
        <Title>+2% vs previous period</Title>
        <SubTitle>Total impact for JAN - SEP, 2021</SubTitle>
        <LegendsWrp>
          <LegendWrp>
            <Legend>
              <LegendIndicator color={'#ED3F47'} />
              POOR
            </Legend>
            <LegendDesc>Less than 0%</LegendDesc>
          </LegendWrp>
          <LegendWrp>
            <Legend>
              <LegendIndicator color={'#FF8C00'} /> GOOD
            </Legend>
            <LegendDesc>Between 0-40%</LegendDesc>
          </LegendWrp>
          <LegendWrp>
            <Legend>
              <LegendIndicator color={'#00CE75'} />
              EXCELLENT
            </Legend>
            <LegendDesc>Above 40%</LegendDesc>
          </LegendWrp>
        </LegendsWrp>
      </PRImpactDetails>
    </PRImpactWrp>
  );
};

export default PRImpactL1;
