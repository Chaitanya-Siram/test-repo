import React from 'react';
import Proptypes from 'prop-types';
import { MainWrp, UberTilesText, UberTilesWrp } from './index.sc';
import UberStatsSentimentTile from './Tile/index';

const UberStatsSentiment = ({ data }) => {
  return (
    <MainWrp>
      <UberTilesWrp>
        {data.data.map((tile, i) => (
          <UberStatsSentimentTile
            key={i}
            data={tile.value}
            change={tile.change}
            isIncreased={tile.isIncreased}
            title={tile.label}
            sentimentType={tile.sentimentType}
          />
        ))}
      </UberTilesWrp>
      <UberTilesText>
        Shows the volume trend with respect to the previous period.
      </UberTilesText>
    </MainWrp>
  );
};

UberStatsSentiment.propTypes = {
  data: Proptypes.object,
};

export default UberStatsSentiment;
