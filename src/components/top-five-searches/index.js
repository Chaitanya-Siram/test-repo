import React from 'react';
import PropTypes from 'prop-types';
import {
  ArticleImg,
  ArticleWrp,
  ArticleWrpL,
  ArticleWrpR,
  ArticlesWrp,
  DescrText,
  MainWrp,
  TabTitle,
  TitleText,
} from './index.sc';

const TopFiveSearches = ({ items }) => {
  const data = items?.data;
  const topFiveArticles = data.slice(0, 5);
  return (
    <MainWrp>
      <TabTitle>Top 5 Articles</TabTitle>
      <ArticlesWrp>
        {topFiveArticles.map((item, i) => {
          return (
            <ArticleWrp
              key={i}
              to={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArticleWrpL>
                <ArticleImg src={item?.imgURL} />
              </ArticleWrpL>
              <ArticleWrpR>
                <TitleText>{item?.description}</TitleText>
                <DescrText>
                  {' '}
                  {item?.publisher} | {item?.author} | {item?.date} |{' '}
                  {item?.place} | {item?.matchingKeywords} | {item?.newstype}{' '}
                </DescrText>
              </ArticleWrpR>
            </ArticleWrp>
          );
        })}
      </ArticlesWrp>
    </MainWrp>
  );
};

TopFiveSearches.propTypes = {
  items: PropTypes.object,
};

export default TopFiveSearches;
