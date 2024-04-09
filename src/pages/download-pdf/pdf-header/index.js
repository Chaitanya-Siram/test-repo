import React from 'react';
import { AppHeaderLeft, AppHeaderWrp, AppLogoSpan } from './index.sc';
import { AppLogo } from '../../../components/app-header/index.sc';

const PdfHeader = () => {
  return (
    <>
      <AppHeaderWrp>
        <AppHeaderLeft>
          <AppLogo to="/">
            <AppLogoSpan /> AlphaMetricX
          </AppLogo>
        </AppHeaderLeft>
      </AppHeaderWrp>
    </>
  );
};

export default PdfHeader;
