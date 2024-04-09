import React from 'react';
import PropTypes from 'prop-types';

const BookMarkIcon2 = ({
  color = '#675EF2',
  stroke = '#585858',
  width = '19',
  height = '21',
}) => {
  return (
    // <svg
    //   width={width}
    //   height={height}
    //   viewBox="0 0 19 21"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     d="M15.1452 17.8164L9.93197 13.6497L4.71875 17.8164V4.48307C4.71875 4.04105 4.87568 3.61712 5.15501 3.30456C5.43435 2.992 5.8132 2.81641 6.20824 2.81641H13.6557C14.0507 2.81641 14.4296 2.992 14.7089 3.30456C14.9883 3.61712 15.1452 4.04105 15.1452 4.48307V17.8164Z"
    //     fill={color}
    //   />
    // </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 19 21"
      fill="none"
    >
      <path
        d="M14.6374 17.8164L9.42416 13.6497L4.21094 17.8164V4.48307C4.21094 4.04105 4.36787 3.61712 4.6472 3.30456C4.92653 2.992 5.30539 2.81641 5.70043 2.81641H13.1479C13.5429 2.81641 13.9218 2.992 14.2011 3.30456C14.4805 3.61712 14.6374 4.04105 14.6374 4.48307V17.8164Z"
        fill={color}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
BookMarkIcon2.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  stroke: PropTypes.string,
};
export default BookMarkIcon2;
