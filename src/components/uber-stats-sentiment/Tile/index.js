import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '../../../utils';
import {
  ArticleTypeWrp,
  Change,
  ChangeWrp,
  PercentWrp,
  Tile,
  TileData,
  TileDataWrp,
  TypeText,
  TypeWrp,
} from './index.sc';
import PositiveEmoji from '../../../assets/icons/PositiveEmoji';
import NegativeEmoji from '../../../assets/icons/NegativeEmoji';
import NeturalEmoji from '../../../assets/icons/NeturalEmoji';
// import ArrowUp from '../../../assets/icons/ArrowUp';
import ArrowIncrease from '../../../assets/icons/ArrowIncrease';
import ArrowDecrease from '../../../assets/icons/ArrowDecrease';

const emojiList = [
  {
    sentiment: 'positive',
    emoji: <PositiveEmoji />,
  },
  {
    sentiment: 'negative',
    emoji: <NegativeEmoji />,
  },
  {
    sentiment: 'neutral',
    emoji: <NeturalEmoji />,
  },
];

const UberStatsSentimentTile = ({
  title,
  data,
  isIncreased,
  change,
  sentimentType,
  handleClick = () => {},
}) => {
  const { value, midSuffix } = formatNumber(data, false, true);

  const emojiType = (sentiment) => {
    const emoji = emojiList.find((type) => type.sentiment === sentiment);
    const data = {
      ...emoji,
      arrow: isIncreased ? <ArrowIncrease /> : <ArrowDecrease />,
    };
    return data;
  };

  return (
    <Tile onClick={handleClick}>
      <TileDataWrp>
        <TypeWrp isIncreased={isIncreased}>
          <ArticleTypeWrp sentimentType={sentimentType}>
            {emojiType(sentimentType)?.emoji}
            <TypeText sentimentType={sentimentType}>
              {sentimentType} Articles
            </TypeText>
          </ArticleTypeWrp>
        </TypeWrp>
        <ChangeWrp>
          <TileData>
            {value} <PercentWrp>{midSuffix}</PercentWrp>
          </TileData>
          <Change>
            {emojiType(sentimentType)?.arrow}
            {change} %
          </Change>
        </ChangeWrp>
      </TileDataWrp>
    </Tile>
  );
};

UberStatsSentimentTile.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isIncreased: PropTypes.bool,
  change: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleClick: PropTypes.bool,
  sentimentType: PropTypes.string,
};

export default UberStatsSentimentTile;
