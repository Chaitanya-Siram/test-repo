import React from 'react';
import styled from 'styled-components';
import placeHolder from '../../assets/img/img_placeholder.svg';

const PlaceHolderWrp = styled.div``;
const BentoPlaceholder = () => {
  return (
    <PlaceHolderWrp>
      <img src={placeHolder} alt={'Placeholder'} />
    </PlaceHolderWrp>
  );
};

export default BentoPlaceholder;
