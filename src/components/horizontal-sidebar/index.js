import React from 'react';
import Proptypes from 'prop-types';
import {
  Bar,
  BarBoxwrper,
  Barwrpr,
  LabelWrapper,
  TextBoxwrper,
  Textwpr,
  ThemeContainer,
  Titlewrpr,
} from './index.sc';

const HorizontalSideBar = ({
  label = 'theme 2',
  negative = 40,
  positive = 60,
}) => {
  return (
    <ThemeContainer>
      <LabelWrapper>{label}</LabelWrapper>
      <BarBoxwrper>
        <Barwrpr width={'100%'}>
          <TextBoxwrper
            width={negative}
            min={negative > 50 ? '' : 'fit-content'}
          >
            <Textwpr>Negative</Textwpr>
            <Titlewrpr>
              {negative} <span>%</span>
            </Titlewrpr>
          </TextBoxwrper>
          <TextBoxwrper
            width={positive}
            min={positive > 50 ? positive + '%' : 'fit-content'}
          >
            <Textwpr>Positive</Textwpr>
            <Titlewrpr>
              {positive} <span>%</span>
            </Titlewrpr>
          </TextBoxwrper>
        </Barwrpr>
        <Barwrpr width="11.25rem">
          <Bar color="#ED3F47" width={negative} />
          <Bar color="#00CE75" width={positive} />
        </Barwrpr>
      </BarBoxwrper>
    </ThemeContainer>
  );
};

HorizontalSideBar.propTypes = {
  label: Proptypes.string,
  negative: Proptypes.string,
  positive: Proptypes.string,
};

export default HorizontalSideBar;
