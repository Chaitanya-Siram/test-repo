import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ istrue }) => {
  return istrue ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <mask
        id="mask0_3497_632"
        style={{ maskType: 'alpha' }}
        width="21"
        height="21"
        x="-1"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M-0.34 0.182H19.66V20.182H-0.34z"></path>
      </mask>
      <g mask="url(#mask0_3497_632)">
        <path
          fill="#000"
          d="M3.827 17.682c-.459 0-.85-.163-1.177-.49a1.605 1.605 0 01-.49-1.177V4.348c0-.458.163-.85.49-1.177.326-.326.718-.49 1.177-.49h11.666c.459 0 .851.164 1.178.49.326.327.49.72.49 1.177v8.334l-5 5H3.826zm7.5-1.667l4.166-4.167h-4.166v4.167zm-5.834-4.167H9.66v-1.666H5.493v1.666zm0-3.333h8.334V6.848H5.493v1.667z"
        ></path>
      </g>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <mask
        id="mask0_3497_5817"
        style={{ maskType: 'alpha' }}
        width="20"
        height="20"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H20V20H0z"></path>
      </mask>
      <g mask="url(#mask0_3497_5817)">
        <path
          fill="#585858"
          d="M4.167 15.833h7.5v-4.166h4.166v-7.5H4.167v11.666zm0 1.667c-.459 0-.851-.163-1.177-.49a1.605 1.605 0 01-.49-1.177V4.167c0-.459.163-.851.49-1.177.326-.327.718-.49 1.177-.49h11.666c.459 0 .851.163 1.177.49.327.326.49.718.49 1.177V12.5l-5 5H4.167zm1.666-5.833V10H10v1.667H5.833zm0-3.334V6.667h8.334v1.666H5.833z"
        ></path>
      </g>
    </svg>
  );
};

Comment.propTypes = {
  istrue: PropTypes.bool,
};

export default Comment;
