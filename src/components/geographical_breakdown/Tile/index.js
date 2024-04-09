import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '../../../utils';
import ArrowIncrease from '../../../assets/icons/ArrowIncrease';
import ArrowDecrease from '../../../assets/icons/ArrowDecrease';
import {
  Change,
  Tile,
  TileData,
  TileDataWrp,
  TileRowWrp,
  TileTitle,
  TileTitleLabel,
} from './index.sc';
import { USStates } from '../../../graphs/WorldMapGraph/usStates';

const GeoBreakDownTile = ({
  title,
  data,
  isIncreased,
  change,
  handleClick = () => {},
}) => {
  const stateData = USStates.find((state) => state.stateNumber === title);
  const stateName = stateData ? stateData.stateName : '';
  const { value, fullSuffix } = formatNumber(data, true, true);

  return (
    <Tile onClick={handleClick}>
      <TileRowWrp>
        <TileTitle>{stateName}</TileTitle>
        <TileDataWrp>
          <TileData>
            {title === 'Total AVE' && '~$'}
            {value} {fullSuffix}
          </TileData>
          <Change isIncreased={isIncreased}>
            {isIncreased ? <ArrowIncrease /> : <ArrowDecrease />}
            {change}%
          </Change>
        </TileDataWrp>
      </TileRowWrp>
      <TileTitleLabel>{title}</TileTitleLabel>
    </Tile>
  );
};

GeoBreakDownTile.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isIncreased: PropTypes.bool,
  change: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleClick: PropTypes.bool,
};

export default GeoBreakDownTile;
