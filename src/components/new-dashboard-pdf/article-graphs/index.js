// import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
// import Spinner from '../spinner';
import PropTypes from 'prop-types';

import {
  ArticleSectionComponentWrp,
  IconWrapper,
  SearchMainWrp,
  SearchResultWrp,
} from './index.sc';
import DashboardSectionComponent from '../../search-result/dashboard-section';
import XCirlcle from '../../../assets/icons/XCirlcle';
import ArticleSectionComponent from '../../search-result/article-section';
import AdvancedDashboard from '../advanced-dashboard';

const articleTypeDefault = {
  widget: undefined,
  graphSelection: undefined,
};

const dashboardConfig = {
  standard: ['brand', 'industry', 'people'],
  advanced: [
    'campaign',
    'authorimpact',
    'sentiments',
    'congruence',
    'primpact',
  ],
};

const ArticleGraph = ({
  tileDetails,
  dashboardDetails,
  advancedWidgetDetails,
  customCanvas,
}) => {
  // const [activeScreen, setActiveScreen] = useState('dashboard');
  const [floatingPagination, setfloatingPagination] = useState(false);
  const [articlePosition, setArticlePosition] = useState('');
  const [resetSelection, setResetSelection] = useState(true);
  const [selected, setSelected] = useState(null);

  // const [loader, setLoader] = useState(false);
  // const [guidedSearch, setGuidedSearch] = useState({
  //   all: '',
  //   none: '',
  //   any: '',
  // });
  // const [value, setValue] = useState('');
  const activeScreen = 'dashboard';
  const loader = false;
  console.log(resetSelection);
  // const queryClient = useQueryClient();
  const [type, setType] = useState('totalArticles');

  // const onBtnClick = (screen) => {
  //   setLoader(true);
  //   setActiveScreen(activeScreen === '' ? screen : '');
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 500);
  // };
  const x = dashboardDetails.length;
  const [selectGraph, setSelectedGraph] = useState(new Array(x).fill(true));

  useEffect(() => {
    if (selected == null) {
      setSelectedGraph(new Array(x).fill(true));
    }
  }, [x, selected]);
  const [page, setPage] = useState(0);
  const paginationWidth = '45vw';
  const [articleType, setArticleType] = useState(articleTypeDefault);

  const setArticleTypeClose = () => {
    setArticleType(articleTypeDefault);
  };

  const handleClick = (index) => {
    let position = '';
    if (index % 2 !== 0) {
      position = 'left';
    } else {
      position = 'right';
    }
    setArticlePosition(position);
    setfloatingPagination(true);
    // this is to remove eslint warning
  };

  // const handlePage = (pageNum) => {
  //   setPage(pageNum);
  //   queryClient.invalidateQueries(['articles', pageNum, type]);
  // };
  const { searchId, dashboardType } = Object.fromEntries(
    new URLSearchParams(window.location.search)
  );

  return (
    <SearchMainWrp className="p-relative">
      {/* <BtnWrp top="2rem" activeScreen={activeScreen}>
        <Btn
          className={activeScreen === 'dashboard' ? 'inactive' : ''}
          onClick={() => onBtnClick('article')}
        >
          <ChevronLeft color={activeScreen === '' ? '#675EF2' : '#FFFFFF'} />
        </Btn>
        <Btn
          className={activeScreen === 'article' ? 'inactive' : ''}
          onClick={() => onBtnClick('dashboard')}
        >
          <ChevronRight color={activeScreen === '' ? '#675EF2' : '#FFFFFF'} />
        </Btn>
      </BtnWrp> */}
      <SearchResultWrp activeScreen={activeScreen}>
        {dashboardConfig.advanced.includes(dashboardType) ? (
          <AdvancedDashboard
            activeScreen={activeScreen}
            loader={loader}
            articleType={articleType}
            setArticleType={setArticleType}
            advancedWidgetDetails={advancedWidgetDetails}
            overView={false}
            setClickedPosition={handleClick}
            articlePosition={articlePosition}
          />
        ) : (
          <DashboardSectionComponent
            activeScreen={activeScreen}
            loader={loader}
            articleType={articleType}
            setArticleType={setArticleType}
            tileDetails={tileDetails}
            dashboardDetails={dashboardDetails}
            overView={false}
            setClickedPosition={handleClick}
            articlePosition={articlePosition}
            setResetSelection={setResetSelection}
            setSelected={setSelected}
            selected={selected}
            setArticlePosition={setArticlePosition}
            resetSelection={resetSelection}
            setArticleTypeClose={setArticleTypeClose}
            selectGraph={selectGraph}
            setSelectedGraph={setSelectedGraph}
            dashboardType={dashboardType}
            customCanvas={customCanvas}
          />
        )}
        <ArticleSectionComponentWrp articlePosition={articlePosition}>
          <IconWrapper
            articlePosition={articlePosition}
            onClick={() => {
              setArticlePosition('');
              setArticleTypeClose();
              setSelected(null);
              setResetSelection(false);
            }}
          >
            <XCirlcle />
          </IconWrapper>
          <ArticleSectionComponent
            articleType={articleType}
            activeScreen={activeScreen}
            setArticleTypeClose={setArticleTypeClose}
            page={page}
            setPage={setPage}
            type={type}
            setType={setType}
            floatingPagination={floatingPagination}
            articlePosition={articlePosition}
            id={parseInt(searchId)}
            setArticlePosition={setArticlePosition}
            setSelected={setSelected}
            pageWidth={paginationWidth}
          />
        </ArticleSectionComponentWrp>
      </SearchResultWrp>
    </SearchMainWrp>
  );
};

ArticleGraph.propTypes = {
  tileDetails: PropTypes.array,
  dashboardDetails: PropTypes.array,
  advancedWidgetDetails: PropTypes.object,
  customCanvas: PropTypes.object,
};

export default ArticleGraph;
