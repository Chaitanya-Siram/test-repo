import React from 'react';
import PropTypes from 'prop-types';

const RedirectIcon = ({ width = '25', height = '26' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.4 0.397461H4.4C1.97032 0.397461 0 2.41704 0 4.90746V21.3075C0 23.7979 1.97032 25.8175 4.4 25.8175H20.4C22.8297 25.8175 24.8 23.7979 24.8 21.3075V4.90746C24.8 2.41704 22.8297 0.397461 20.4 0.397461ZM22.4 21.3075C22.4 21.8504 22.1891 22.3725 21.8141 22.7569C21.4391 23.1413 20.9297 23.3575 20.4 23.3575H4.4C3.29532 23.3575 2.4 22.4398 2.4 21.3075V4.90746C2.4 3.77516 3.29532 2.85746 4.4 2.85746H20.4C20.9297 2.85746 21.4391 3.07367 21.8141 3.45803C22.1891 3.84239 22.4 4.3645 22.4 4.90746V21.3075Z"
        fill="#425DF8"
      />
      <path
        d="M16.4 7.36719H9.20003V9.82719H13.5048L6.70483 16.7972L8.40015 18.5349L15.2002 11.5649V15.9773H17.6002V8.59731C17.6002 7.91827 17.0625 7.36719 16.4 7.36719Z"
        fill="#425DF8"
      />
    </svg>
  );
};

RedirectIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default RedirectIcon;
