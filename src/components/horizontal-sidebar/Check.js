// This function contains title, description and outer padding and shadow. After checking graph if we don't need we can
// remove it and directly use the graph wherever we want.
import React from 'react';
import HorizontalSideBar from '.';
import styled from 'styled-components';
import { Titlewrpr } from './index.sc';
import Proptypes from 'prop-types';

const OuterBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  background: #ffffff;
`;

const Theme = ({
  title = 'Sentiments',
  label = 'theme 2',
  negative = 40,
  positive = 60,
}) => {
  return (
    <OuterBox style={{ justifyContent: 'space-between', display: 'flex' }}>
      <Titlewrpr>{title}</Titlewrpr>
      <HorizontalSideBar
        label={label}
        negative={negative}
        positive={positive}
      />
    </OuterBox>
  );
};

Theme.propTypes = {
  title: Proptypes.string,
  label: Proptypes.string,
  negative: Proptypes.number,
  positive: Proptypes.number,
};

export default Theme;
