import React from 'react';
import PropTypes from 'prop-types';

const Language = ({ size = '1.25rem' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
    >
      <rect x="0.615234" width={size} height={size} fill="white" />
      <path
        d="M11.248 12.232L9.40069 10.4066L9.42251 10.3847C10.688 8.97383 11.5898 7.35202 12.1207 5.63565H14.2516V4.18111H9.16069V2.72656H7.70614V4.18111H2.61523V5.62838H10.7389C10.2516 7.03202 9.48069 8.36293 8.43342 9.52656C7.75705 8.77747 7.19705 7.95565 6.75342 7.0902H5.29887C5.82978 8.27565 6.55705 9.39565 7.46614 10.4066L3.76433 14.0575L4.79705 15.0902L8.43342 11.4538L10.6952 13.7157L11.248 12.232ZM15.3425 8.54474H13.888L10.6152 17.272H12.0698L12.8843 15.0902H16.3389L17.1607 17.272H18.6152L15.3425 8.54474ZM13.4371 13.6357L14.6152 10.4866L15.7934 13.6357H13.4371Z"
        fill="#161A34"
      />
    </svg>
  );
};

export default Language;

Language.propTypes = {
  size: PropTypes.string,
};
