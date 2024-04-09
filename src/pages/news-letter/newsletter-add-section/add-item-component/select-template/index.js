import React from 'react';
import NewsletterSettingsIcon from '../../../../../assets/icons/NewsLetterSettingsIcon';
import { DropDownList, DropDownListWrp, SelectTempIconWrp } from './index.sc';
import Proptypes from 'prop-types';
import {
  DropDownCheckBox,
  DropDownValue,
  DropDownValueWrp,
} from '../article-toolbar/index.sc';

const SelectTemplate = ({
  dropDownList,
  onClickHandler,
  setShowOpts,
  showOpts,
  showCheckBox = false,
  showOptions = true,
  align = 'right',
}) => {
  return (
    <>
      <SelectTempIconWrp
        onClick={() => setShowOpts && setShowOpts(!showOpts)}
        className="show-icon"
        showOpts={showOpts}
        align={align}
      >
        <NewsletterSettingsIcon />
      </SelectTempIconWrp>

      {showOpts && (
        <DropDownListWrp align={align}>
          {showOptions &&
            dropDownList?.map((data, index) => (
              <DropDownList
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  onClickHandler(data);
                }}
                style={{ margin: 0 }}
              >
                {data}
              </DropDownList>
            ))}
          {showCheckBox && (
            <DropDownValueWrp
            // onClick={(e) => onClickOption(dropdown, e.target.checked, e)}
            >
              <DropDownCheckBox type="checkbox" />
              <DropDownValue>Full Text</DropDownValue>
            </DropDownValueWrp>
          )}
        </DropDownListWrp>
      )}
    </>
  );
};

export default SelectTemplate;

SelectTemplate.propTypes = {
  showOpts: Proptypes.bool,
  setShowOpts: Proptypes.func,
  dropDownList: Proptypes.array,
  onClickHandler: Proptypes.func,
  showCheckBox: Proptypes.bool,
  showOptions: Proptypes.bool,
  align: Proptypes.string,
};
