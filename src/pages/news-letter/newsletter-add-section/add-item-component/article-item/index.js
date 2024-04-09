import React from 'react';
import Proptypes from 'prop-types';
import {
  ArticleContentWrp,
  ArticleTags,
  ArticleTitle,
  ArticleWrp,
} from './index.sc';

const ArticleItem = ({ data }) => {
  return (
    <ArticleWrp background={data.image}>
      <ArticleContentWrp>
        <ArticleTitle>{data.title}</ArticleTitle>
        <ArticleTags>{data.tags.join(' | ')}</ArticleTags>
      </ArticleContentWrp>
    </ArticleWrp>
  );
};

ArticleItem.propTypes = {
  data: Proptypes.object,
};
export default ArticleItem;
