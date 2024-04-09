import React from 'react';
import Proptypes from 'prop-types';

import {
  ArticleContent,
  ArticleContentBottom,
  ArticleKeyText,
  ArticleKeysWrp,
  ArticleKeywordsText,
  ArticleTitle,
  ArticleWrap,
} from './index.sc';

const HalfNewsArticle = ({ ele, searchSelect }) => {
  return (
    <ArticleWrap imageUrl={ele.image}>
      <ArticleContent>
        <ArticleTitle>{ele.title}</ArticleTitle>
        <ArticleContentBottom>
          <ArticleKeysWrp>
            <ArticleKeyText>ADWEEK |</ArticleKeyText>
            <ArticleKeyText>05/25/2023 |</ArticleKeyText>
            <ArticleKeyText>New York </ArticleKeyText>
          </ArticleKeysWrp>
          <ArticleKeywordsText>12 Matching Keywords</ArticleKeywordsText>
        </ArticleContentBottom>
      </ArticleContent>
    </ArticleWrap>
  );
};

HalfNewsArticle.propTypes = {
  ele: Proptypes.any,
  searchSelect: Proptypes.string,
};

export default HalfNewsArticle;
