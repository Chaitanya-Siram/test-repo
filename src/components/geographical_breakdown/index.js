import React from 'react';
import Proptypes from 'prop-types';
import GeoBreakDownTile from './Tile';

const GeoBreakDown = ({ data }) => {
  return (
    <>
      {data.data.map((tile, i) => (
        <GeoBreakDownTile
          key={i}
          data={tile.value}
          change={tile.change}
          isIncreased={tile.isIncreased}
          title={tile.label}
        />
      ))}
    </>
  );
};

GeoBreakDown.propTypes = {
  data: Proptypes.object,
};

export default GeoBreakDown;
