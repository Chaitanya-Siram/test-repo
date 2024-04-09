import React from 'react';
import PropTypes, { object } from 'prop-types';

import { ArticleNumber, ArticleType, ArticlesWrp, Content } from './index.sc';

const ArticlesCard = ({ articles }) => {
  return (
    <ArticlesWrp>
      {articles.map((item, i) => {
        return (
          <Content key={i}>
            <ArticleNumber>{item.number}</ArticleNumber>
            <ArticleType>{item.title}</ArticleType>
          </Content>
        );
      })}
    </ArticlesWrp>
  );
};

ArticlesCard.propTypes = {
  articles: PropTypes.arrayOf(object),
};

export default ArticlesCard;
