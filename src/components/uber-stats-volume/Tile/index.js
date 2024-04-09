import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '../../../utils';
import ArrowIncrease from '../../../assets/icons/ArrowIncrease';
import ArrowDecrease from '../../../assets/icons/ArrowDecrease';
import {
  Change,
  ChangeWrp,
  PercentWrp,
  Tile,
  TileData,
  TileDataWrp,
  TileTitle,
} from './index.sc';

const UberStatsVolumeTile = ({
  title,
  data,
  isIncreased,
  change,
  handleClick = () => {},
}) => {
  const { value, midSuffix } = formatNumber(data, true, true);

  return (
    <Tile onClick={handleClick}>
      <TileDataWrp>
        <ChangeWrp>
          <TileData>
            {title === 'Total AVE' && '~$'}
            {value}
            <PercentWrp> {midSuffix}</PercentWrp>
          </TileData>
          <Change isIncreased={isIncreased}>
            {isIncreased ? <ArrowIncrease /> : <ArrowDecrease />}
            {change}%
          </Change>
        </ChangeWrp>
      </TileDataWrp>
      <TileTitle>{title}</TileTitle>
    </Tile>
  );
};

UberStatsVolumeTile.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isIncreased: PropTypes.bool,
  change: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleClick: PropTypes.bool,
};

export default UberStatsVolumeTile;
