import React from 'react';
import PropTypes from 'prop-types';

import { JournalistScoreWrp, ScoreText, SubText } from './index.sc';

const JournalistScoreCard = ({ journalistScore }) => {
  return (
    <JournalistScoreWrp>
      <ScoreText>{journalistScore}</ScoreText>
      <SubText>Journalist Score</SubText>
    </JournalistScoreWrp>
  );
};

JournalistScoreCard.propTypes = {
  journalistScore: PropTypes.string,
};

export default JournalistScoreCard;
