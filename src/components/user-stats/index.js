import React from 'react';
import Proptypes from 'prop-types';
import { UberTextTitle, UberTilesWrp, UserTilesMainWrp } from './index.sc';
import UberTiles from '../uber-tiles';

const UberStats = ({ data }) => {
  return (
    <UserTilesMainWrp>
      <UberTextTitle>{data.title}</UberTextTitle>
      <UberTilesWrp>
        {data.data.map((tile, i) => (
          <UberTiles
            key={i}
            data={tile.value}
            change={tile.change}
            isIncreased={tile.isIncreased}
            title={tile.label}
          />
        ))}
      </UberTilesWrp>
    </UserTilesMainWrp>
  );
};

UberStats.propTypes = {
  data: Proptypes.object,
};

export default UberStats;
