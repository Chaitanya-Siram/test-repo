// This function contains title, description and outer padding and shadow. After checking graph if we don't need we can
// remove it and directly use the graph wherever we want.
import React from 'react';
import Proptypes from 'prop-types';
import { VerticleDots } from '../../assets/icons/VerticleDots';
import { Boxwrpr, Deswrpr, TitleBox, Titlewrpr } from './index.sc';
// import HorizontalMultiBar from '.';

const Sentiments = ({
  title = 'Sentiments',
  des = 'Commentary - Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  shoPoAndNe = false,
  themes,
}) => {
  return (
    <Boxwrpr>
      <TitleBox>
        <Titlewrpr>{title}</Titlewrpr>
        <VerticleDots />
      </TitleBox>
      {/* <HorizontalMultiBar themes={themes} shoPoAndNe={shoPoAndNe} /> */}
      <Deswrpr>{des}</Deswrpr>
    </Boxwrpr>
  );
};

Sentiments.propTypes = {
  title: Proptypes.string,
  des: Proptypes.string,
  shoPoAndNe: Proptypes.bool,
  themes: Proptypes.array,
};

export default Sentiments;
