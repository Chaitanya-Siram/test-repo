import React from 'react';
import { CampNum, DateText, Description, CampaignWrapper } from './index.sc';
import Carousel from '../../../carousel';
import PropTypes from 'prop-types';
import { formatNumber } from '../../../../utils';

const Content = ({
  title = 'Campaign 2',
  subTitle = '05/11',
  description = '2.12M articles',
}) => {
  return (
    <CampaignWrapper>
      <CampNum>{title}</CampNum>
      <DateText>{subTitle}</DateText>
      <Description>{description}</Description>
    </CampaignWrapper>
  );
};

Content.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
};

const ContentArray = [
  {
    label: 'first',
    key: 1,
    component: (
      <Content
        title="Campaign 1"
        description={`${formatNumber(22445566)} Articles`}
      />
    ),
  },
  { label: 'first', key: 2, component: <Content /> },
  { label: 'first', key: 3, component: <Content /> },
  { label: 'first', key: 4, component: <Content /> },
];

const CampaignCarousel = () => {
  return <Carousel slides={ContentArray} dotSize=".6rem" />;
};

export default CampaignCarousel;
