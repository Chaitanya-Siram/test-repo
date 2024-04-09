import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ArticleSection,
  IconBox,
  IconWrapper,
  Iconwpr,
  Paginatewpr,
  // Paginatewpr,
  SectionTitle,
  Sectionwpr,
  TabPopwpr,
  // IconWraper,
} from '../index.sc';
// import IconBox from '../IconBox';
import ArticleDetails from '../../articles/article-details';
import Articles from '../../articles';
// import Pagination from '../../pagination';
import { Titletabs } from '../../../constants/mock';
import { useArticleData } from '../../../hooks/useSearch';
import { useQuery, useQueryClient } from '@tanstack/react-query';
// import Spinner from '../../spinner';
import { TitleBox } from '../../tabs/TabTitle';
import {
  HeadingWrp,
  LinkSpan,
  LoadingWrp,
  TabButton,
  ThemeTabs,
  Themetabtxt,
} from './index.sc';
import { theme } from '../../../constants/theme';
import DownIcon from '../../../assets/icons/DownIcon';
import { useSelector } from 'react-redux';
import { axiosGet } from '../../../service';
import { ArticleTheme } from '../../tabs/CardTitle';
import Pagination from '../../pagination';
import useDebounce from '../../../hooks/useDebounce';
import XCirlcle from '../../../assets/icons/XCirlcle';
import CircularLoading from '../../../assets/icons/loading/circularLoading';
import Tabs from '../../tabs';

const ArticleSectionComponent = ({
  activeScreen,
  articleType,
  page,
  setPage,
  type,
  setType,
  id,
  articlePosition,
  floatingPagination,
  setSelected,
  setSelectedGraph,
  setArticleTypeClose,
  setResetSelection,
  showTabs = true,
  showFullTitle = false,
  pageWidth,
}) => {
  const queryClient = useQueryClient();
  const [activeTheme, setActiveTheme] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [sortOrder, setSortOrder] = useState();
  const debouncedSearch = useDebounce(searchQuery, 1000);
  const limit = 50;

  const {
    isLoading,
    // error: articleerror,
    data,
    // isFetching,
  } = useArticleData(
    page,
    type,
    activeTheme,
    debouncedSearch,
    sortOrder,
    limit,
    id
  );
  const [titleTabs, setTitleTabs] = useState(data?.data?.tabs || Titletabs);
  const [total, setTotal] = useState();
  const [showTab, setShowTab] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const { data: themeTabs, isLoading: themeTabLoading } = useQuery({
    queryKey: ['themeTab', id],
    queryFn: () => axiosGet('/article-theme', { id }),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const themetabs = themeTabs?.data?.data?.map((item) => {
    return { ...item, title: <ArticleTheme title={item.title} /> };
  });

  const handleTheme = (index, item) => {
    setActiveTheme(item?.title?.props?.title);
    // queryClient.invalidateQueries(['articles', 0, type]);
  };

  const handlePage = (pageNum) => {
    setPage(pageNum);
    queryClient.invalidateQueries(['articles', pageNum, type]);
  };

  const tabs = titleTabs?.map((ele, i) => ({
    ...ele,
    title: <TitleBox title={ele.label} des={ele.count} />,
    id: i,
  }));

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const count = data?.data?.tabs?.filter((obj) => obj.value === type)[0].count;
  // console.log(count, 'total count for pagination');

  useEffect(() => {
    if (Array.isArray(data?.data?.tabs)) setTitleTabs(data?.data?.tabs);
    if (count) {
      setTotal(count);
    }
  }, [data?.data?.tabs, count, setTotal]);

  const handleTabs = (index) => {
    setType(tabs[index].value);
    setActiveTab(index);
    setPage(0);
    queryClient.invalidateQueries(['articles', 0, tabs[index].value]);
    setShowTab(false);
  };
  const handleClose = () => {
    setSelected(null);
    setArticleTypeClose();
    setSelectedGraph((prev) => prev.map((_) => true));
    setResetSelection(false);
  };
  return (
    <>
      <ArticleSection
        activeScreen={activeScreen}
        articlePosition={articlePosition}
        className={activeScreen === 'article' ? 'active' : ''}
      >
        <Sectionwpr>
          <SectionTitle>
            {showFullTitle && 'All Articles'}
            {(articleType.widget || articleType.graphSelection) && (
              <>
                {showFullTitle && articleType.widget ? (
                  <LinkSpan style={{ marginLeft: '0.25rem' }} color="#000000">
                    {articleType.widget ? '\\ ' + articleType.widget : ''}
                  </LinkSpan>
                ) : (
                  <></>
                )}
                {showFullTitle && articleType.graphSelection ? (
                  <LinkSpan color={theme.light.primary}>
                    {showFullTitle && articleType.graphSelection
                      ? '\\ ' + articleType.graphSelection
                      : articleType.graphSelection}
                  </LinkSpan>
                ) : (
                  <HeadingWrp>
                    {showFullTitle && articleType.graphSelection
                      ? '\\ ' + articleType.graphSelection
                      : articleType.graphSelection}
                  </HeadingWrp>
                )}
                {activeScreen !== 'dashboard' && (
                  <IconWrapper
                    onClick={() => {
                      handleClose();
                      setSelected(null);
                    }}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    <XCirlcle />
                  </IconWrapper>
                )}
              </>
            )}
          </SectionTitle>
          <TabButton onClick={() => setShowTab(!showTab)}>
            <Iconwpr>
              <DownIcon />
            </Iconwpr>
            {titleTabs[activeTab].label}
            <span>({titleTabs[activeTab].count})</span>
          </TabButton>

          <TabPopwpr showTab={showTab}>
            <Tabs
              items={!tabs ? [{}] : tabs}
              widthItem={activeScreen === 'article' ? '7rem' : '20%'}
              variant="underline"
              activeColor="#675EF2"
              inactiveColor="#000000"
              onChange={handleTabs}
              isContent={false}
              bottomBorderWidth="3px"
              paddingWrapper="0.75rem 1rem"
            />
          </TabPopwpr>
        </Sectionwpr>
        <ArticleDetails
          start={page * 50 + 1}
          end={(page + 1) * 50 < count ? (page + 1) * 50 : count}
          total={count}
        />
        <ThemeTabs>
          <Themetabtxt>Tags/Themes</Themetabtxt>
          <Tabs
            items={!themeTabs?.data?.data ? [{}] : themetabs}
            variant="card"
            activeColor={theme[selectedTheme].background}
            inactiveColor={theme[selectedTheme].text}
            onChange={handleTheme}
            isContent={false}
            gapitems="0.4rem"
            bottomBorderWidth="0"
            wraperBorderWidth="0"
            activeCardBGColor={theme[selectedTheme].primary}
            inactiveCardBGColor={theme[selectedTheme].background}
            cardBorderRadius=".75rem"
            paddingWrapper="0.25rem 0 0"
            defaultActive={false}
            resetTab={true}
          />
        </ThemeTabs>

        {Array.isArray(data?.data?.data) && !isLoading ? (
          <Articles
            articles={data?.data?.data}
            articleView={activeScreen === 'article'}
            type={type}
            page={page}
            showTab={showTabs}
          />
        ) : (
          <LoadingWrp>
            <CircularLoading
              bgColor={theme[selectedTheme].primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </LoadingWrp>
        )}
      </ArticleSection>
      {floatingPagination && total && (
        <Paginatewpr
          pageWidth={pageWidth}
          articlePosition={articlePosition}
          fullScreen={activeScreen === 'article'}
        >
          <IconBox
            page={page}
            type={type}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <Pagination
            page={page}
            prevClick={handlePage}
            nextClick={handlePage}
            handlePage={handlePage}
            total={total}
            align="end"
            limit={50}
          />
        </Paginatewpr>
      )}
    </>
  );
};

export default ArticleSectionComponent;

ArticleSectionComponent.propTypes = {
  activeScreen: PropTypes.string,
  articleType: PropTypes.object,
  setArticleTypeClose: PropTypes.func,
  page: PropTypes.number,
  setPage: PropTypes.func,
  type: PropTypes.string,
  setType: PropTypes.func,
  id: PropTypes.number,
  articlePosition: PropTypes.string,
  floatingPagination: PropTypes.bool,
  setSelected: PropTypes.func,
  setArticlePosition: PropTypes.func,
  setSelectedGraph: PropTypes.func,
  setResetSelection: PropTypes.func,
  showTabs: PropTypes.bool,
  showFullTitle: PropTypes.bool,
  pageWidth: PropTypes.string,
};
