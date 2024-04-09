import React from 'react';
import PropTypes from 'prop-types';

import {
  Article,
  ArticleContent,
  ArticleSubText,
  ArticleTitle,
  ReachText,
  ReachWrp,
} from './index.sc';
import ReachIcon from '../../../assets/icons/ReachIcon';
import { formatNumber } from '../../../utils';

const ArticleCard = ({ title, content, link, date, country, reach }) => {
  return (
    <Article>
      <ArticleTitle>{title}</ArticleTitle>
      <ArticleContent>{content}</ArticleContent>
      <ArticleSubText>
        {link} | {date} | {country}
      </ArticleSubText>
      <ReachWrp>
        <ReachIcon />
        <ReachText>Reach {formatNumber(reach)}</ReachText>
      </ReachWrp>
    </Article>
  );
};

ArticleCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  link: PropTypes.string,
  date: PropTypes.string,
  country: PropTypes.string,
  reach: PropTypes.number,
};

export default ArticleCard;
