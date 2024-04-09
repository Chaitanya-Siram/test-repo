import React from 'react';
import { AddWrapper, Line, Icon } from './index.sc';
import Proptypes from 'prop-types';

const AddArticleComponent = ({ show, onClickAdd, idx }) => {
  return (
    <AddWrapper show={show} className={`add-article-component-${idx ?? ''}`}>
      <Icon onClick={onClickAdd}></Icon>
      <Line />
    </AddWrapper>
  );
};

AddArticleComponent.propTypes = {
  show: Proptypes.bool,
  onClickAdd: Proptypes.func,
  idx: Proptypes.func,
};

export default AddArticleComponent;
