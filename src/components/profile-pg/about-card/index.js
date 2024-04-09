import React from 'react';
import { AboutNameText, AboutText, AboutWrp } from './index.sc';
import PropTypes from 'prop-types';

const AboutCard = ({ name, about }) => {
  return (
    <AboutWrp>
      <AboutNameText>About {name}</AboutNameText>
      <AboutText>{about}</AboutText>
    </AboutWrp>
  );
};

AboutCard.propTypes = {
  name: PropTypes.string,
  about: PropTypes.string,
};

export default AboutCard;
