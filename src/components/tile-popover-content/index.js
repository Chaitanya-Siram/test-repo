import React from 'react';
import { BoxWrapper, Contentwpr, Titlewpr } from './index.sc';
import PropTypes from 'prop-types';

const TilePopovrCont = ({ title, mainContent }) => {
  return (
    <Contentwpr>
      <Titlewpr>{title || 'Title'}</Titlewpr>
      <BoxWrapper>{mainContent}</BoxWrapper>
    </Contentwpr>
  );
};

TilePopovrCont.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
  mainContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
};

export default TilePopovrCont;
