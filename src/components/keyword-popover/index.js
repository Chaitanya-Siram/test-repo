import React from 'react';
import Proptypes from 'prop-types';
import { KeyWord, MainWrp } from './index.sc';

const KeywordPopover = ({ items }) => {
  return (
    <>
      <MainWrp>
        {items.map((key, i) => (
          <KeyWord key={i}>
            {key}
            {i < items.length - 1 && ','}
          </KeyWord>
        ))}
      </MainWrp>
    </>
  );
};

export default KeywordPopover;

KeywordPopover.propTypes = {
  items: Proptypes.arrayOf(Proptypes.string),
};
