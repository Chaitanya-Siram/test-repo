import React from 'react';
import Proptypes from 'prop-types';
import {
  LegendColor,
  LegendLabel,
  LegendValue,
  TooltipBody,
  TooltipBodyLabel,
  TooltipLegendContainer,
  TooltipLegendWrp,
  TooltipSubTitle,
  // TooltipSubTitleValue,
  TooltipTitle,
  TooltipTitleValue,
  TooltipWrapper,
} from './index.sc';
import { TooltipBodyValue } from '../search-result/index.sc';
import { colorBox } from '../../graphs/utils/graphConst';

const GraphTooltip = ({ tooltipData, widget }) => {
  const type = widget?.data?.labels?.length > 1 ? 'two-d' : 'one-d';
  const labels = widget?.data?.labels;
  const { data, rawData } = tooltipData;

  let tooltip1d = {};
  let tooltip2d = {};

  if (type === 'two-d') {
    tooltip2d = {
      title: widget?.data?.title,
      titleValue: rawData?.label,
      subTitle: widget?.data?.subtitle,
      subTitleValue: '',
      legendData: labels?.map((ele) => ({
        label: ele?.label,
        value: rawData ? rawData[ele?.value] ?? '0' : '',
        color: ele?.color,
      })),
    };
  } else {
    tooltip1d = {
      label:
        data?.label || data?.properties?.NAME || data?.properties?.brk_name,
      value: data?.value || data?.properties?.value,
    };
  }
  return (
    <>
      {type === 'one-d' ? (
        <TooltipWrapper className="one-d">
          <TooltipTitle>{tooltip1d?.label}</TooltipTitle>
          <TooltipBody>
            <TooltipBodyLabel>Total Articles</TooltipBodyLabel>
            <TooltipBodyValue>
              {tooltip1d?.value?.toLocaleString('en-US')}
            </TooltipBodyValue>
          </TooltipBody>
        </TooltipWrapper>
      ) : (
        <TooltipWrapper className="two-d">
          <TooltipTitle className="two-d">
            {/* {tooltip2d?.title || 'title'} */}
            {tooltip2d?.title}
          </TooltipTitle>
          <TooltipTitleValue>{tooltip2d?.titleValue}</TooltipTitleValue>
          <TooltipSubTitle>{tooltip2d?.subTitle}</TooltipSubTitle>
          {/* <TooltipSubTitleValue>75002</TooltipSubTitleValue> */}

          <TooltipLegendWrp>
            {tooltip2d?.legendData?.map((ele, i) => (
              <TooltipLegendContainer key={i}>
                <LegendColor bgColor={ele?.color || colorBox[i]}></LegendColor>
                <LegendLabel>{ele?.label}</LegendLabel>
                <LegendValue>
                  {ele?.value && ele?.value?.toLocaleString('en-US')}
                </LegendValue>
              </TooltipLegendContainer>
            ))}
          </TooltipLegendWrp>
        </TooltipWrapper>
      )}
    </>
  );
};

export default GraphTooltip;

GraphTooltip.propTypes = {
  type: Proptypes.string,
  tooltipData: Proptypes.object.isRequired,
  widget: Proptypes.object,
};
