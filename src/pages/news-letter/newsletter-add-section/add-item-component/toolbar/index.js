/* eslint-disable array-callback-return */
import React from 'react';
import {
  IconTxtWrp,
  IconWrp,
  RotateWrp,
  ToolBarWrp,
  ToolTipTxt,
} from './index.sc';
import Proptypes from 'prop-types';
// import ToolBarSplit from '../../../../../assets/icons/ToolBarSplit';
import ToolBarArrowUp from '../../../../../assets/icons/ToolBarArrowUp';
import ToolBarTrash from '../../../../../assets/icons/ToolBarTrash';
import NewsletterSettingsIcon from '../../../../../assets/icons/NewsLetterSettingsIcon';

const ToolBar = ({
  splitRow,
  arrowClick,
  deleteClick,
  type,
  title,
  onClickEdit,
}) => {
  return (
    <ToolBarWrp>
      {/* {[title?.rowItems?.componentType].toString() !== 'article' && (
        <IconWrp onClick={splitRow}>
          <ToolBarSplit />
        </IconWrp>
      )} */}
      {title.columnComponent.componentType !== 'text' &&
        title.columnComponent.type !== 'article2' && (
          <IconTxtWrp onClick={onClickEdit}>
            {/* <IconWrp onClick={onClickEdit}> */}
            <NewsletterSettingsIcon />
            {/* </IconWrp> */}
            <ToolTipTxt> Settings</ToolTipTxt>
          </IconTxtWrp>
        )}
      <IconTxtWrp onClick={() => arrowClick('up')}>
        <IconWrp>
          <ToolBarArrowUp />
        </IconWrp>
        <ToolTipTxt>Move section up</ToolTipTxt>
      </IconTxtWrp>
      <IconTxtWrp onClick={() => arrowClick('down')}>
        <RotateWrp>
          <ToolBarArrowUp />
        </RotateWrp>
        <ToolTipTxt>Move section down</ToolTipTxt>
      </IconTxtWrp>
      <IconTxtWrp onClick={deleteClick}>
        <IconWrp>
          <ToolBarTrash />
        </IconWrp>
        <ToolTipTxt>Delete Section</ToolTipTxt>
      </IconTxtWrp>
    </ToolBarWrp>
  );
};

ToolBar.propTypes = {
  splitRow: Proptypes.func,
  arrowClick: Proptypes.func,
  deleteClick: Proptypes.func,
  type: Proptypes.string,
  title: Proptypes.array,
  onClickEdit: Proptypes.func,
};

export default ToolBar;
