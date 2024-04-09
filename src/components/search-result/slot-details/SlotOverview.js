import React, { Fragment } from 'react';
import Proptypes from 'prop-types';
import {
  SlotOverviewHeader,
  SlotOverviewSubHeader,
  SlotOverviewWrp,
  VerticalCol,
} from '../index.sc';
import { formatNumber } from '../../../utils';

const SlotOverview = ({ summary = {} }) => {
  // console.log(summary, 'summary');
  return (
    <>
      {summary?.data?.length > 0 ? (
        <SlotOverviewWrp className="flex-row">
          {summary?.data?.map((summary, i) => {
            const { value, midSuffix } = formatNumber(
              summary?.value,
              false,
              true
            );

            return (
              <VerticalCol key={i}>
                <SlotOverviewHeader>
                  {value} {midSuffix}
                </SlotOverviewHeader>
                <SlotOverviewSubHeader>{summary?.label}</SlotOverviewSubHeader>
              </VerticalCol>
            );
          })}
        </SlotOverviewWrp>
      ) : (
        <SlotOverviewWrp>
          <SlotOverviewHeader>{summary?.value || ''}</SlotOverviewHeader>
          <SlotOverviewSubHeader>{summary?.label || ''}</SlotOverviewSubHeader>
        </SlotOverviewWrp>
      )}
    </>
  );
};

export default SlotOverview;

SlotOverview.propTypes = {
  summary: Proptypes.object,
};
