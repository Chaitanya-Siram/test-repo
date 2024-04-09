import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '../../utils';
import {
  Change,
  ChangeTxt,
  ChangeWrp,
  Loader,
  LoadingWrapper,
  Tile,
  TileData,
  TileDataWrp,
  TileTitle,
  TooltipTitle,
  TooltipValue,
  TooltipWrapper,
} from './index.sc';
import ArrowIncrease from '../../assets/icons/ArrowIncrease';
import ArrowDecrease from '../../assets/icons/ArrowDecrease';
import PortalTooltip from '../portal-tooltip';
import CircularLoading from '../../assets/icons/loading/circularLoading';

const SummaryTooltip = ({
  tooltipData = { label: '', value: '', isIncreased: null, change: '' },
}) => {
  const {
    label = '',
    value = '',
    isIncreased = null,
    change = '',
  } = tooltipData;
  return (
    <TooltipWrapper>
      <TooltipTitle>{label}</TooltipTitle>
      <TooltipValue>
        {label === 'Total AVE' && '~$'}
        {value?.toLocaleString('en-US')}
      </TooltipValue>
      <ChangeWrp>
        <Change isIncreased={isIncreased} isToolTip={true}>
          {isIncreased ? <ArrowIncrease /> : <ArrowDecrease />}
          {parseInt(change || 0)?.toLocaleString('en-US')}%{' '}
        </Change>{' '}
        &nbsp; &nbsp;
        <ChangeTxt>
          {isIncreased
            ? 'increase in comparision to previous period'
            : 'decrease in comparision to previous period'}
        </ChangeTxt>
      </ChangeWrp>
    </TooltipWrapper>
  );
};

const UberTiles = ({
  title,
  data,
  isIncreased,
  change,
  handleClick = () => {},
  isLoading = false,
}) => {
  const { value, midSuffix } = formatNumber(data, true, true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [toolTipPos, setToolTipPos] = useState({ left: 0, top: 0 });
  const [tooltipData, setTooltipData] = useState();

  const handleMouseEnter = (event) => {
    setShowTooltip(true);
    setToolTipPos({
      ...toolTipPos,
      left: event.clientX,
      top: event.clientY - 10,
    });
    setTooltipData({
      label: title,
      value: data,
      isIncreased,
      change,
    });
  };

  const handleMouseMove = (event) => {
    setToolTipPos({
      ...toolTipPos,
      left: event.clientX,
      top: event.clientY - 10,
    });
  };

  const handleMouseLeave = (e) => {
    setToolTipPos({
      left: 0,
      top: 0,
    });
    setTooltipData();
    setShowTooltip(false);
  };

  return (
    <Tile onClick={handleClick}>
      <TileDataWrp
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <TileData>
          {title === 'Total AVE' && value && '~$'}
          {value || '-'}
          {midSuffix}
        </TileData>
        <Change isIncreased={isIncreased} isToolTip={false}>
          {isIncreased ? <ArrowIncrease /> : <ArrowDecrease />}
          <span>{(parseInt(change) || 0)?.toLocaleString('en-US')}%</span>
        </Change>
      </TileDataWrp>
      <TileTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div>{title}</div>
          {isLoading && (
            <LoadingWrapper>
              <Loader size="0.25rem" width="0.8rem" height="0.8rem" />
            </LoadingWrapper>
          )}
        </div>
      </TileTitle>
      {showTooltip && (
        <PortalTooltip
          isOpen={true}
          pos={toolTipPos}
          align={toolTipPos.left > window.innerWidth / 2 ? 'left' : 'right'}
          vAlign={'top'}
        >
          <SummaryTooltip tooltipData={tooltipData} />
        </PortalTooltip>
      )}
    </Tile>
  );
};

UberTiles.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isIncreased: PropTypes.bool,
  change: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleClick: PropTypes.bool,
  isLoading: PropTypes.bool,
};

SummaryTooltip.propTypes = {
  tooltipData: PropTypes.object,
};

export default UberTiles;
