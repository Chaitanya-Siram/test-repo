import React, { useEffect, useRef, useState } from 'react';
import { ItemBoxwpr, ItemContainer, WriteIconwpr } from './index.sc';
import WriteIcon from '../../assets/icons/WriteIcon';
import Proptypes from 'prop-types';
import Popover from '../popover';
import TilePopovrCont from '../tile-popover-content';
import { Imgwpr } from '../tile-popover-content/index.sc';

const TileSelector = ({
  elements,
  board,
  handleCheck,
  isMultiselect = true,
  InnerChild,
  disableSelection = false,
  BydefaultChecked = false,
}) => {
  const [tiles, setTiles] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    setTiles(JSON.parse(JSON.stringify(elements)));
  }, [elements]);

  const handleClick = (i) => {
    if (isMultiselect) {
      const tempTiles = [...tiles];
      tempTiles[i].checked = !tempTiles[i].checked;
      setTiles(tempTiles);
      handleCheck(tempTiles, board);
    } else {
      const tempTiles = JSON.parse(JSON.stringify(elements));
      tempTiles[i].checked = !tiles[i].checked;
      setTiles(tempTiles);
      handleCheck(tempTiles[i], board);
    }
  };

  return (
    <ItemContainer ref={containerRef}>
      {tiles.map((tile, i) => (
        <Popover
          positioningWidth={containerRef.current?.offsetWidth}
          key={i}
          content={
            tile.img && (
              <TilePopovrCont
                title={tile.title || tile.label || 'Title'}
                mainContent={<Imgwpr src={tile.img} />}
              />
            )
          }
        >
          <ItemBoxwpr
            checked={tile.checked}
            BydefaultChecked={BydefaultChecked}
            onClick={() => {
              if (!disableSelection) handleClick(i);
            }}
          >
            <WriteIconwpr className="writeicon">
              <WriteIcon />
            </WriteIconwpr>
            <InnerChild data={tile} />
          </ItemBoxwpr>
        </Popover>
      ))}
    </ItemContainer>
  );
};

TileSelector.propTypes = {
  elements: Proptypes.arrayOf(Proptypes.object),
  handleCheck: Proptypes.func,
  isMultiselect: Proptypes.bool,
  selectAll: Proptypes.string,
  InnerChild: Proptypes.oneOfType([Proptypes.node, Proptypes.any]),
  disableSelection: Proptypes.bool,
  toDefaultWithState: Proptypes.any,
  board: Proptypes.object,
  BydefaultChecked: Proptypes.bool,
};

export default TileSelector;
