import React from 'react';
import PropTypes from 'prop-types';

const XCirlcle = ({ width = '21', height = '21' }) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M12.2008 4.64629L11.3548 3.80029L8.00078 7.15429L4.64678 3.80029L3.80078 4.64629L7.15478 8.00029L3.80078 11.3543L4.64678 12.2003L8.00078 8.84629L11.3548 12.2003L12.2008 11.3543L8.84678 8.00029L12.2008 4.64629Z"
        fill="#161A34"
      />
    </svg>
  );
};
XCirlcle.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default XCirlcle;
