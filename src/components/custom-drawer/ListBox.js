import React from 'react';
import ChevronRight from '../../assets/icons/ChevronRight';
import {
  Heaerlblwrp,
  Iconwpr,
  ListContainer,
  ListDiscwpr,
  ListLeft,
} from './index.sc';
import Proptypes from 'prop-types';

export const ListBox = ({ item, handleClick }) => {
  return (
    <ListContainer onClick={() => handleClick(item)}>
      <ListLeft>
        <Heaerlblwrp>{item.title}</Heaerlblwrp>
        <div style={{ display: 'flex' }}>
          <ListDiscwpr color="#585858" fontWeight="400">
            CREATED ON:
          </ListDiscwpr>
          <ListDiscwpr color="#585858" fontWeight="600">
            {item.date}
          </ListDiscwpr>
        </div>
      </ListLeft>
      {false && (
        <Iconwpr>
          <ChevronRight
            height="40px"
            width="40px"
            strokeWidth="0.4"
            color="#000000"
          />
        </Iconwpr>
      )}
    </ListContainer>
  );
};

ListBox.propTypes = {
  // title: Proptypes.string.isRequired,
  // date: Proptypes.string.isRequired,
  item: Proptypes.object.isRequired,
  handleClick: Proptypes.func,
};
