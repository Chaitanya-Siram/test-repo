import React from 'react';
import { BackToTopWrp, BacktoTopTag } from './index.sc';
import Proptypes from 'prop-types';

const BackToTop = ({ moveTop = () => {}, visible }) => {
  return (
    <BackToTopWrp>
      <BacktoTopTag
        visible={true}
        onClick={() => {
          const handleClick = () => {
            const targetElement = document.getElementById('newsletter-top');
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          };

          handleClick();
        }}
      >
        Back to Top
      </BacktoTopTag>
    </BackToTopWrp>
  );
};

export default BackToTop;

BackToTop.propTypes = {
  moveTop: Proptypes.func,
  visible: Proptypes.bool,
};
