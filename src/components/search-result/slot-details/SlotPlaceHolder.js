import React from 'react';
import PropTypes from 'prop-types';
import {
  SlotBody,
  SlotDetailsMainWrp,
  SlotDetailsWrp,
  SlotHeader,
  SlotHeaderLeft,
  SlotPlaceHolderImage,
  SlotSubTitle,
  SlotTitle,
} from '../index.sc';

const SlotPlaceHolder = ({ title, subTitle, body }) => {
  return (
    <SlotDetailsMainWrp>
      <SlotDetailsWrp>
        <SlotHeader>
          <SlotHeaderLeft>
            <SlotTitle>{title}</SlotTitle>
            {subTitle && <SlotSubTitle>{subTitle}</SlotSubTitle>}
          </SlotHeaderLeft>
        </SlotHeader>
        <SlotBody>
          <SlotPlaceHolderImage src={body} alt="" />
        </SlotBody>
      </SlotDetailsWrp>
    </SlotDetailsMainWrp>
  );
};

SlotPlaceHolder.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  body: PropTypes.string,
};
export default SlotPlaceHolder;
