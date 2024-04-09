import React from 'react';
import PropTypes from 'prop-types';
// import of styled components
import { CardWrpr, Heading, Img } from './index.sc';

export default function DisplayCard({ text, bg, click }) {
  return (
    <CardWrpr onClick={click}>
      <Img background={bg}></Img>
      <Heading>{text}</Heading>
    </CardWrpr>
  );
}

DisplayCard.propTypes = {
  text: PropTypes.string.isRequired,
  bg: PropTypes.string,
  click: PropTypes.func,
};
