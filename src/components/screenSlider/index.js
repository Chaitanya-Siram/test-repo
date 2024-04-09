import React, { useState } from 'react';
import ChevronLeft from '../../assets/icons/ChevronLeft';
import ChevronRight from '../../assets/icons/ChevronRight';
import PropTypes from 'prop-types';
import UberTiles from '../uber-tiles';
import {
  Button,
  ArrowButtonsCircle,
  ArticleWrapper,
  Dashboard,
  IconContainer,
  IconHeader,
  ScreenWrapper,
  TileContainer,
  ArticleHeader,
  ArticleTitle,
} from './index.sc';
import Edit from '../../assets/icons/Edit';
import Share from '../../assets/icons/Share';
import Add from '../../assets/icons/Add';

const TileArray = [
  {
    title: 'Total Articles',
    data: 342353534432432,
    change: 32.1,
    isIncreased: true,
  },
  { title: 'Total Reach', data: 34823874, change: 16.2, isIncreased: false },
  {
    title: 'Total Ad Value Equivalency',
    data: 34823874,
    change: 32.1,
    isIncreased: true,
  },
];

const DashboardBox = ({ isDefault, isDashboardFullWidth, width }) => {
  return (
    <Dashboard
      default={isDefault}
      width={width}
      IsfullWidth={isDashboardFullWidth}
    >
      <IconHeader>
        <div></div>
        <IconContainer>
          <Button>
            <Edit />
          </Button>
          <Button>
            <Share />
          </Button>
          <Button>
            <Add />
          </Button>
        </IconContainer>
      </IconHeader>
      <TileContainer>
        {TileArray.map((tile, i) => (
          <UberTiles
            key={i}
            data={tile.data}
            change={tile.change}
            isIncreased={tile.isIncreased}
            title={tile.title}
          />
        ))}
      </TileContainer>
    </Dashboard>
  );
};

DashboardBox.propTypes = {
  isDefault: PropTypes.bool,
  isDashboardFullWidth: PropTypes.bool,
  width: PropTypes.string,
};

const ScreenSlider = ({
  dashboardWidth = '65vw',
  widthArticleCont = '35vw',
  titleArticle = 'All Articles',
}) => {
  const [isArticleFullWidth, setIsArticleFullWidth] = useState(false);
  const [isDashboardFullWidth, setIsDashboardFullWidth] = useState(false);

  // const timeout = setTimeout(() => {
  //   if (isDefault) setShowFullCrcl(true);
  //   console.log('timeout');
  // }, 2000);

  const handleChevronLeftClick = () => {
    if (!isDashboardFullWidth) {
      setIsArticleFullWidth(true);

      // clearTimeout(timeout);
    } else {
      setIsDashboardFullWidth(false);
    }
  };

  const handleChevronRightClick = () => {
    if (!isArticleFullWidth) {
      setIsDashboardFullWidth(true);
    } else {
      setIsArticleFullWidth(false);
    }
  };

  return (
    <>
      <ScreenWrapper>
        <ArrowButtonsCircle
          displayVal={!(isArticleFullWidth || isDashboardFullWidth)}
          isLeft={isArticleFullWidth}
        >
          <Button onClick={handleChevronLeftClick}>
            <ChevronLeft
              color={
                !(isArticleFullWidth || isDashboardFullWidth)
                  ? '#675EF2'
                  : '#FFFFFF'
              }
            />
          </Button>
          <Button onClick={handleChevronRightClick}>
            <ChevronRight
              color={
                !(isArticleFullWidth || isDashboardFullWidth)
                  ? '#675EF2'
                  : '#FFFFFF'
              }
            />
          </Button>
        </ArrowButtonsCircle>
        <DashboardBox
          isDashboardFullWidth={isDashboardFullWidth}
          isDefault={!(isArticleFullWidth || isDashboardFullWidth)}
          width={dashboardWidth}
        />
        <ArticleWrapper
          default={!(isArticleFullWidth || isDashboardFullWidth)}
          width={widthArticleCont}
          IsfullWidth={isArticleFullWidth}
        >
          <ArticleHeader>
            <ArticleTitle>{titleArticle}</ArticleTitle>
          </ArticleHeader>
        </ArticleWrapper>
      </ScreenWrapper>
    </>
  );
};

ScreenSlider.propTypes = {
  dashboardWidth: PropTypes.string,
  widthArticleCont: PropTypes.string,
  titleArticle: PropTypes.string,
};

export default ScreenSlider;
