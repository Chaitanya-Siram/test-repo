import React, { useState } from 'react';
import {
  SentimemtsCampaignButton,
  SentimemtsCampaignWrapper,
} from './index.sc';
import HappyFace from '../../assets/icons/HappyFace';
import FaceRed from '../../assets/icons/FaceRed';
import FaceGrey from '../../assets/icons/FaceGrey';
import GreenFace from '../../assets/icons/GreenFace';

const sentiments = [
  { id: 1, label: 'Positive', type: 'positive' },
  { id: 2, label: 'Negative', type: 'negative' },
  { id: 3, label: 'Neutral', type: 'neutral' },
];

const SentimemtsCampaign = (props) => {
  const [selectedOption, setSelectedOption] = useState(sentiments[0].type);

  const handleSelectedOption = (newValue) => {
    setSelectedOption(newValue);
  };
  return (
    <SentimemtsCampaignWrapper>
      {sentiments.map((sentiment, i) => (
        <SentimemtsCampaignButton
          key={i}
          style={{
            ...(selectedOption === sentiment.type && {
              background: 'var(--others-green, #00B929)',
              border: '1px solid var(--border-2, #00B929)',
              color: '#ffffff',
            }),
          }}
          onClick={() => {
            handleSelectedOption(sentiment.type);
          }}
        >
          {sentiment.type === selectedOption ? (
            <HappyFace />
          ) : sentiment.type === 'positive' ? (
            <GreenFace />
          ) : sentiment.type === 'negative' ? (
            <FaceRed />
          ) : (
            <FaceGrey />
          )}
          {sentiment.label}
        </SentimemtsCampaignButton>
      ))}
    </SentimemtsCampaignWrapper>
  );
};

SentimemtsCampaign.propTypes = {};

export default SentimemtsCampaign;
