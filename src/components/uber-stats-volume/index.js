import React from 'react';
import Proptypes from 'prop-types';
import { MainWrp, UberTilesText, UberTilesWrp } from './index.sc';
import UberStatsVolumeTile from './Tile/index';

const UberStatsVolume = ({ data }) => {
  return (
    <MainWrp>
      <UberTilesWrp>
        {data?.data?.map((tile, i) => (
          <UberStatsVolumeTile
            key={i}
            data={tile.value}
            change={tile.change}
            isIncreased={tile.isIncreased}
            title={tile.label}
          />
        ))}
      </UberTilesWrp>
      <UberTilesText>
        Shows the volume trend with respect to the previous period.
      </UberTilesText>
    </MainWrp>
  );
};

UberStatsVolume.propTypes = {
  data: Proptypes.object,
};

export default UberStatsVolume;
