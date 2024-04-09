import React from 'react';
import { SenitmentWrp, SentimentContainer } from './index.sc';
import PropTypes from 'prop-types';
import SmileIcon from '../../assets/icons/SmileIcon';
import NegativeIcon from '../../assets/icons/NegativeEmoji';
import NeutralIcon from '../../assets/icons/NeturalEmoji';

const SentimentComponent = ({ sentiment }) => {
  return (
    <SentimentContainer sentiment={sentiment?.toLowerCase()}>
      {/* <span>{icon}</span> */}

      {sentiment?.toLowerCase() === 'pos' ? (
        <SmileIcon width="1.5rem" height="1.5rem" />
      ) : sentiment?.toLowerCase() === 'neg' ? (
        <NegativeIcon width="1.5rem" height="1.5rem" />
      ) : (
        <NeutralIcon width="1.5rem" height="1.5rem" />
      )}
      {sentiment?.toLowerCase() === 'pos' ? (
        <span>Positive</span>
      ) : sentiment?.toLowerCase() === 'neg' ? (
        <span>Negative</span>
      ) : (
        <span>Neutral</span>
      )}
    </SentimentContainer>
  );
};

SentimentComponent.propTypes = {
  sentiment: PropTypes.string,
};

export default SentimentComponent;
