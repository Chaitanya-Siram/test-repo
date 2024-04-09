import React from 'react';
import { LoadingSpinner, LoadingSpinnerContainer } from './index.sc';

function Spinner() {
  return (
    <LoadingSpinnerContainer>
      <LoadingSpinner></LoadingSpinner>
    </LoadingSpinnerContainer>
  );
}

export default Spinner;
