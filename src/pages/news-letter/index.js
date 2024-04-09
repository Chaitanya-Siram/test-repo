import React, { useEffect, useState } from 'react';
import NewsLetterTopBar from './newsletter-top-section/top-bar';
import NewsLetterBottomBar from './newsletter-top-section/bottom-bar';
import NewsLetterMiddleSection from './newsletter-middle-section';
import NewsLetterAddSection from './newsletter-add-section';
import { dashboardDetails } from '../../components/search-result/dashboard-mock';
import { BodyWrp, MainWrp, TopMainWrp } from './index.sc';
import AppHeader from '../../components/app-header';
import AppBG from '../../components/app-bg';
import AppFooter from '../../components/app-footer';
import { useLocation, useParams } from 'react-router-dom';
import { useGetSavedSearchQueryData } from '../../hooks/useSaveSearch';
import { getTokenData } from '../../constants/validateToken';
import {
  handlePublishNewsletter,
  useNewsLetterDataById,
} from '../../hooks/useSaveNewsLetter';
import {
  geographicalWorldMapData,
  mediaTypeChartMapData,
  outletBreakdownMapData,
  resultOverTimeMapData,
  sentimentChartMapData,
  topAuthorChartMapData,
  topThemeChartMapData,
  wordCloudChartMapData,
} from '../../hooks/data/chartData';
import { format, parseISO } from 'date-fns';
import {
  addCountPrefix,
  calculatePercentage,
  generateUniqueId,
} from '../../constants/utils';
import { colors } from '../../hooks/data/colors';
import Spinner from '../../components/spinner';

export const footerText =
  '[This report may contain links to external or third party websites. These links are provided solely for your convenience. Links taken to other sites are done so at your own risk and its affiliates, “AlphametricX”, accept no liability for any linked sites or their content. AlphametricX does not own the content offered on such links and does not claim any ownership or intellectual property rights whatsoever. AlphametricX makes no warranties or representations, express or implied about such linked websites, the third parties they are owned and operated by, the information contained on them and their authenticity, or the suitability or quality of any of their products or services. AlphametricX does not authorize the infringement of any intellectual property rights contained in material offered through these linked sites. Please refer to the use agreement and/or copyright statements of any external site you visit, or the terms and conditions of any externally provided web site for instructions, restrictions, and guidelines. If you have a question, please contact the webmaster of the external site.] \n \n Not interested in getting these emails? Click here to unsubscribe (alerts@alphametricx.com).';

const defaultNewsLetter = {
  main_title: 'asdas', // unknown parameter
  newsletter_title: '',
  newsletter_content: '',
  searchId: '',
  recipients: [],
  sendOn_dateType: '',
  // send_on: '2024-01-07',
  send_type: 'Daily',
  send_type_option: [],
  send_time: '',
  publish_type: '',
  // bannerTitle: '',
  // bannerDec: '',
  publishedOn: '',
  newsletter_body: [],
  title: '',
  content: '',
  title_color: '#000000',
  content_color: '#000000',
  date_color: '#000000',
  background_color: '#ffffff',
  background_image: '',
  logo_image: '',
  footer: footerText,
  section_label: 'Also appeared in',
};

const NewsLetter = () => {
  const { newsLetterId, searchId } = useParams();
  // const { data: newsLetterData } = useNewsLetterData(newsLetterId);
  const { data: newsletterResp } = useNewsLetterDataById(newsLetterId);
  const { state, pathname } = useLocation();

  // const newsLetterData = newsLetterId ? state : null;
  // const newsLetterData = newsLetterId ? newsletterResp?.data[0] : null;
  const newsLetterData = newsLetterId
    ? newsletterResp?.data?.length > 0
      ? newsletterResp?.data[0]
      : state
    : null;
  const [searchSelect, setSearchSelect] = useState('');
  const [stateNewsLetter, setStateNewsLetter] = useState({});
  const [editMode, toggleEditMode] = useState(false);
  const [activeElement, setActiveElement] = useState(null);
  const [selectedSearchData, setSelectedSearchData] = useState({});
  const [previousState, setPreviousState] = useState();
  const [isHandleCloseCalled, setIsHandleCloseCalled] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [newsLetter, setNewsLetter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const authInfo = getTokenData();

  const { data: savedSearchData } = useGetSavedSearchQueryData(
    authInfo?.user_id,
    { orderBy: 'name' }
  );

  const sortedData = (isModified, data) => {
    if (isModified) {
      return Array.isArray(data) ? data.sort((a, b) => a.sr_no - b.sr_no) : [];
    }
    return data;
  };

  const handlePublishResponse = async () => {
    try {
      setIsLoading(true);
      const resp = await handlePublishNewsletter({
        newsLetterId: parseInt(newsLetterId),
        export: 0,
        sentmail: 0,
      });
      const updatedResponse = resp?.data?.data?.map((item, i) => {
        if (item?.type === 'text') {
          item.rowId = i;
          item.uniqueId = generateUniqueId();
          item.columnId = 'a';
          item.rowSplit = false;
          item.columnComponent = {};
          item.columnComponent.componentType = item?.type;
          item.columnComponent.componentData = {};
          item.columnComponent.componentData.order = i;
          item.columnComponent.componentData.title = item?.title;
          item.columnComponent.componentData.description = item?.description;
          item.columnComponent.componentData.type = item?.type;
        } else if (item?.type === 'article3') {
          item.rowId = i;
          item.uniqueId = generateUniqueId();
          item.columnId = 'a';
          item.rowSplit = false;
          item.columnComponent = {};
          item.columnComponent.componentType = 'article';
          item.columnComponent.componentData = {};
          // item.columnComponent.componentData.order = 0;
          // item.columnComponent.componentData.title = item?.title;
          item.columnComponent.componentData.articles = sortedData(
            item?.modified,
            item?.data
          );
          item.columnComponent.componentData.type = item?.type;
          item.columnComponent.componentData.searchid = item?.searchid;
          item.columnComponent.componentData.sortby = item?.sortby;
          item.columnComponent.componentData.count = item?.count;
          item.columnComponent.componentData.filtertag = item?.filtertag;
          item.columnComponent.componentData.pageNumber = 1;
          item.columnComponent.componentData.order = i;
          item.columnComponent.isModified = item?.modified;
          item.columnComponent.updatedArticleData = sortedData(
            item?.modified,
            item?.data
          );
          item.columnComponent.articleMediaShow = item?.article_media;
        } else if (item?.type === 'article1') {
          item.rowId = i;
          item.uniqueId = generateUniqueId();
          item.columnId = 'a';
          item.rowSplit = false;
          item.columnComponent = {};
          item.columnComponent.componentType = 'article';
          item.columnComponent.componentData = {};
          // item.columnComponent.componentData.order = 0;
          // item.columnComponent.componentData.title = item?.title;
          item.columnComponent.componentData = sortedData(
            item?.modified,
            item?.data
          );
          item.columnComponent.type = item?.type;
          item.columnComponent.article_csv_id = item?.article_csv_id;
          item.columnComponent.count = item?.count;
          item.columnComponent.data_all = item?.data_all;
          item.columnComponent.isModified = item?.modified;
          item.columnComponent.articleMediaShow = item?.article_media;
          item.columnComponent.updatedArticleData = sortedData(
            item?.modified,
            item?.data
          );
        } else if (item?.type === 'article2') {
          item.rowId = i;
          item.uniqueId = generateUniqueId();
          item.columnId = 'a';
          item.rowSplit = false;
          item.columnComponent = {};
          item.columnComponent.componentType = 'article';
          item.columnComponent.componentData = {};
          // item.columnComponent.componentData.order = 0;
          item.columnComponent.componentData = sortedData(
            item?.modified,
            item?.data
          );
          item.columnComponent.type = item?.type;
          item.columnComponent.newsletterId = item.newsletterId;
          item.columnComponent.isModified = item?.modified;
          item.columnComponent.updatedArticleData = sortedData(
            item?.modified,
            item?.data
          );
          item.columnComponent.articleMediaShow = item?.article_media;
        } else if (item?.type === 'chart1') {
          item.rowId = i;
          item.uniqueId = generateUniqueId();
          item.columnId = 'a';
          item.rowSplit = false;
          item.columnComponent = {};
          item.columnComponent.componentType = 'graph';
          item.columnComponent.componentData = {};
          item.columnComponent.componentData.articles = {};
          item.columnComponent.componentData.articles.image_url =
            item?.image_url;
          item.columnComponent.componentData.title = item?.title;
          item.columnComponent.componentData.articles.article_image_id =
            item?.article_image_id;
          item.columnComponent.componentData.type = item?.type;
        } else {
          // eslint-disable-next-line no-debugger
          if (parseInt(item?.chart_type) === 1) {
            const percentage = calculatePercentage(item?.data);
            const sentimeMentMapData = sentimentChartMapData?.data?.data;
            const updatedSentimentMapData = sentimeMentMapData?.map((x) => {
              return {
                ...x,
                value: percentage[x.label],
              };
            });

            const totalArticlesMapData = sentimentChartMapData?.data?.summary;
            totalArticlesMapData.value = String(
              addCountPrefix(item?.data?.total_count)
            );
            sentimentChartMapData.data.summary = totalArticlesMapData;
            sentimentChartMapData.data.data = updatedSentimentMapData || [];
            sentimentChartMapData.shouldShowGraph = true;

            item.rowId = i;
            item.uniqueId = generateUniqueId();
            item.columnId = 'a';
            item.rowSplit = false;
            item.columnComponent = {};
            item.columnComponent.componentType = 'graph';
            item.columnComponent.componentData = {};
            item.columnComponent.componentData = sentimentChartMapData;
            item.columnComponent.componentData.type = item?.type;
            item.columnComponent.componentData.chart_type = item?.chart_type;
            item.columnComponent.componentData.searchid = item?.searchid;
          } else if (parseInt(item?.chart_type) === 2) {
            const totalArticlesMapData = mediaTypeChartMapData.data.summary;
            totalArticlesMapData.value = String(
              addCountPrefix(item?.data?.total_count)
            );
            mediaTypeChartMapData.data.summary = totalArticlesMapData;

            const mediaData = mediaTypeChartMapData?.data?.data;

            const mediaTypesFromRes = item?.data?.media_types;
            const updatedMediaCountData = mediaData?.map((x) => {
              const mdDataForMap = mediaTypesFromRes.find((mdData) =>
                mdData?.type?.toLowerCase().includes(x.label?.toLowerCase())
              );
              if (mdDataForMap) {
                return {
                  ...x,
                  value: mdDataForMap?.count,
                };
              }
              return {
                ...x,
                value: 0,
              };
            });
            mediaTypeChartMapData.data.data = updatedMediaCountData || [];
            mediaTypeChartMapData.shouldShowGraph = true;

            item.rowId = i;
            item.uniqueId = generateUniqueId();
            item.columnId = 'a';
            item.rowSplit = false;
            item.columnComponent = {};
            item.columnComponent.componentType = 'graph';
            item.columnComponent.componentData = {};
            item.columnComponent.componentData = mediaTypeChartMapData;
            item.columnComponent.componentData.type = item?.type;
            item.columnComponent.componentData.chart_type = item?.chart_type;
            item.columnComponent.componentData.searchid = item?.searchid;
          } else if (parseInt(item?.chart_type) === 3) {
            const totalArticlesMapData = topAuthorChartMapData.data.summary;
            totalArticlesMapData.value = String(
              addCountPrefix(item?.data?.total_count)
            );
            topAuthorChartMapData.data.summary = totalArticlesMapData;

            const topAuthorRes = item?.data?.authors;

            const updatedTopSourcedata = topAuthorRes?.map((x, i) => {
              return {
                value: x?.count,
                label: x?.author,
                thresholdValue: x?.count,
                color: '#22B9FF',
              };
            });

            topAuthorChartMapData.data.data = updatedTopSourcedata || [];
            topAuthorChartMapData.shouldShowGraph = true;
            item.rowId = i;
            item.uniqueId = generateUniqueId();
            item.columnId = 'a';
            item.rowSplit = false;
            item.columnComponent = {};
            item.columnComponent.componentType = 'graph';
            item.columnComponent.componentData = {};
            item.columnComponent.componentData = topAuthorChartMapData;
            item.columnComponent.componentData.type = item?.type;
            item.columnComponent.componentData.chart_type = item?.chart_type;
            item.columnComponent.componentData.searchid = item?.searchid;
          } else if (parseInt(item?.chart_type) === 4) {
            const totalArticlesMapData = geographicalWorldMapData.data.summary;
            totalArticlesMapData.value = String(
              addCountPrefix(item?.data?.total_count)
            );
            geographicalWorldMapData.data.summary = totalArticlesMapData;

            const geographicalRes = item?.data?.data;
            const updatedGeographicalRes = geographicalRes?.map((state) => {
              return {
                label: state.country,
                value: state.current_count,
              };
            });

            geographicalWorldMapData.data.data = updatedGeographicalRes;
            geographicalWorldMapData.shouldShowGraph = true;

            item.rowId = i;
            item.uniqueId = generateUniqueId();
            item.columnId = 'a';
            item.rowSplit = false;
            item.columnComponent = {};
            item.columnComponent.componentType = 'graph';
            item.columnComponent.componentData = {};
            item.columnComponent.componentData = geographicalWorldMapData;
            item.columnComponent.componentData.type = item?.type;
            item.columnComponent.componentData.chart_type = item?.chart_type;
            item.columnComponent.componentData.searchid = item?.searchid;
          } else if (parseInt(item?.chart_type) === 5) {
            const totalArticlesAreaMapData =
              resultOverTimeMapData.area.data.summary;
            totalArticlesAreaMapData.value = String(
              addCountPrefix(item?.data?.total_count)
            );
            resultOverTimeMapData.area.data.summary = totalArticlesAreaMapData;
            resultOverTimeMapData.area.shouldShowGraph = true;
            resultOverTimeMapData.column.shouldShowGraph = true;

            // setting total count for column
            const totalArticlesColumnMapData =
              resultOverTimeMapData.column.data.summary;
            totalArticlesColumnMapData.value = String(
              addCountPrefix(item?.data?.total_count)
            );
            resultOverTimeMapData.column.data.summary =
              totalArticlesColumnMapData;

            const resultArea = item?.data?.data;

            // Setting Area Data
            const updatedAreaResults = resultArea?.map((x) => {
              const date = parseISO(x?.date);
              const formattedDate = format(date, 'd MMMM');
              return {
                value: x?.doc_count,
                label: formattedDate,
                date: x?.date,
              };
            });
            resultOverTimeMapData.area.data.data =
              updatedAreaResults.length > 0
                ? updatedAreaResults
                : [{ label: '', value: 0 }];

            const updatedColumnResults = resultArea?.map((x) => {
              const date = parseISO(x?.date);
              const formattedDate = format(date, 'd MMMM');
              const brodCastType = x?.media_type?.find((media) => {
                return media?.key?.toLowerCase()?.includes('broadcast');
              });
              const printType = x?.media_type?.find((media) => {
                return media?.key?.toLowerCase()?.includes('print');
              });
              const onlineType = x?.media_type?.find((media) => {
                return media?.key?.toLowerCase()?.includes('online');
              });

              return {
                date: x?.date,
                label: formattedDate,
                online: onlineType ? String(onlineType?.doc_count) : '0',
                print: printType ? String(printType?.doc_count) : '0',
                broadcast: brodCastType ? String(brodCastType?.doc_count) : '0',
              };
            });

            resultOverTimeMapData.column.data.data =
              updatedColumnResults?.length > 0
                ? updatedColumnResults
                : [
                    {
                      label: '',
                      broadcast: '0',
                      print: '0',
                      online: '0',
                    },
                  ];

            item.rowId = i;
            item.uniqueId = generateUniqueId();
            item.columnId = 'a';
            item.rowSplit = false;
            item.columnComponent = {};
            item.columnComponent.componentType = 'graph';
            item.columnComponent.componentData = {};
            item.columnComponent.componentData = resultOverTimeMapData?.area;
            item.columnComponent.componentData.type = item?.type;
            item.columnComponent.componentData.chart_type = item?.chart_type;
            item.columnComponent.componentData.searchid = item?.searchid;
          } else if (parseInt(item?.chart_type) === 6) {
            const totalArticlesMapData = wordCloudChartMapData.data.summary;
            totalArticlesMapData.value = String(
              addCountPrefix(item?.data?.total_count)
            );
            wordCloudChartMapData.data.summary = totalArticlesMapData;

            const worldCloudFromRes = item?.data?.data;

            const updatedWordCloudData = worldCloudFromRes?.map((x, i) => {
              const colorIndex = i % colors?.length;
              return {
                ...colors[colorIndex],
                value: x?.article_count,
                thresholdValue: x?.count,
                label: x?.label,
              };
            });

            wordCloudChartMapData.data.data = updatedWordCloudData || [];
            wordCloudChartMapData.shouldShowGraph = true;

            item.rowId = i;
            item.uniqueId = generateUniqueId();
            item.columnId = 'a';
            item.rowSplit = false;
            item.columnComponent = {};
            item.columnComponent.componentType = 'graph';
            item.columnComponent.componentData = {};
            item.columnComponent.componentData = wordCloudChartMapData;
            item.columnComponent.componentData.type = item?.type;
            item.columnComponent.componentData.chart_type = item?.chart_type;
            item.columnComponent.componentData.searchid = item?.searchid;
          } else if (parseInt(item?.chart_type) === 7) {
            const totalArticlesMapData = topThemeChartMapData.data.summary;
            totalArticlesMapData.value = String(
              addCountPrefix(item?.data?.total_count)
            );
            topThemeChartMapData.data.summary = totalArticlesMapData;

            const topThemeRes = item?.data?.data;

            const updatedTopSourcedata = topThemeRes?.map((x, i) => {
              const colorIndex = i % colors?.length;
              return {
                ...colors[colorIndex],
                value: x?.article_count,
                label: x?.label,
                thresholdValue: x?.count,
              };
            });

            topThemeChartMapData.data.data = updatedTopSourcedata || [];
            topThemeChartMapData.shouldShowGraph = true;

            item.rowId = i;
            item.uniqueId = generateUniqueId();
            item.columnId = 'a';
            item.rowSplit = false;
            item.columnComponent = {};
            item.columnComponent.componentType = 'graph';
            item.columnComponent.componentData = {};
            item.columnComponent.componentData = topThemeChartMapData;
            item.columnComponent.componentData.type = item?.type;
            item.columnComponent.componentData.chart_type = item?.chart_type;
            item.columnComponent.componentData.searchid = item?.searchid;
          } else if (parseInt(item?.chart_type) === 8) {
            const summaryData = outletBreakdownMapData?.data?.summary?.data;
            const mediaTypesSummary = item?.data?.data;
            const updatedMediatTypesSummary = summaryData?.map((x) => {
              const mediaInfo = mediaTypesSummary?.find((y) =>
                y?.media_type?.toLowerCase()?.includes(x?.label?.toLowerCase())
              );
              if (mediaInfo) {
                return {
                  ...x,
                  value: mediaInfo?.doc_count,
                };
              }
              return {
                ...x,
                value: 0,
              };
            });

            // outlet summary
            outletBreakdownMapData.data.summary.data =
              updatedMediatTypesSummary;

            // outlet sub media types
            const allMediaObj = outletBreakdownMapData?.data?.data[0]?.value;
            const updatedAllMediaObject = allMediaObj?.map((x) => {
              const mediaInfo = mediaTypesSummary?.find((y) =>
                y?.media_type?.toLowerCase()?.includes(x?.label?.toLowerCase())
              );
              if (mediaInfo) {
                return {
                  ...x,
                  value: mediaInfo?.submedia_types?.map((k) => {
                    return {
                      label: k?.key,
                      value: k?.doc_count,
                    };
                  }),
                };
              }
              return {
                ...x,
                value: [],
              };
            });
            outletBreakdownMapData.data.data[0].value = updatedAllMediaObject;
            outletBreakdownMapData.shouldShowGraph = true;

            item.rowId = i;
            item.uniqueId = generateUniqueId();
            item.columnId = 'a';
            item.rowSplit = false;
            item.columnComponent = {};
            item.columnComponent.componentType = 'graph';
            item.columnComponent.componentData = {};
            item.columnComponent.componentData = outletBreakdownMapData;
            item.columnComponent.componentData.type = item?.type;
            item.columnComponent.componentData.chart_type = item?.chart_type;
            item.columnComponent.componentData.searchid = item?.searchid;
          }
        }
        if (item?.type !== 'text') {
          item.columnComponent.sectionData = {};
          item.columnComponent.sectionData.sectionTitle = item.section_name;
          item.columnComponent.sectionData.titleColor = item.section_name_color;
          item.columnComponent.sectionData.titleBackgroundColor =
            item.section_name_bgcolor;
          item.columnComponent.sectionData.sectionDescription =
            item.section_description;
          item.columnComponent.sectionData.descriptionColor =
            item.section_description_color;
          item.columnComponent.sectionData.descriptionBackgroundColor =
            item.section_description_bgcolor;
        }
        return item;
      });
      // if (pathname === '/create-news-letter') {
      //   setStateNewsLetter((prev) => ({
      //     ...prev,
      //     newsletter_body: newsLetter,
      //     status: true,
      //   }));
      // } else {
      setNewsLetter(updatedResponse);
      setStateNewsLetter((prev) => {
        setPreviousState({
          ...newsLetterData,
          newsletter_body: updatedResponse,
          status: true,
          // publishedOn: prev.publishedOn,
        });
        return {
          ...newsLetterData,
          newsletter_body: updatedResponse,
          status: true,
        };
      });
      // }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pathname === '/create-news-letter') {
      // handlePublishResponse();
      setStateNewsLetter((prev) => ({
        ...prev,
        newsletter_body: newsLetter,
        status: true,
      }));
    }
    if (newsLetterId) {
      if (newsLetterData) {
        // setStateNewsLetter(newsLetterData);
        handlePublishResponse();
      }
      if (newsLetterData?.data?.data?.savedSearchId) {
        setSearchSelect(newsLetterData?.data?.data?.savedSearchId);
      }
    } else {
      setStateNewsLetter(defaultNewsLetter);
      setSearchSelect(searchId);
    }
  }, [newsLetterData, newsLetterId, searchId, pathname]);

  const handleElementClick = (element) => {
    setActiveElement(element);
    toggleEditMode(true);
  };

  const handleBlur = () => {
    setActiveElement(null);
    toggleEditMode(false);
  };

  return (
    <>
      {isLoading && <Spinner />}
      <AppBG />
      <AppHeader />
      <MainWrp>
        <TopMainWrp>
          <NewsLetterTopBar
            newsLetterData={stateNewsLetter}
            editMode={editMode}
            activeElement={activeElement}
            handleElementClick={handleElementClick}
            handleBlur={handleBlur}
            setStateNewsLetterData={setStateNewsLetter}
            previousState={previousState}
            setPreviousState={setPreviousState}
            setIsHandleCloseCalled={setIsHandleCloseCalled}
            isHandleCloseCalled={isHandleCloseCalled}
            setIsUpdated={setIsUpdated}
            isUpdated={isUpdated}
          />
          <NewsLetterBottomBar
            searchSelect={searchSelect}
            setSearchSelect={setSearchSelect}
            newsLetterData={stateNewsLetter}
            savedSearchData={savedSearchData}
            setSelectedSearchData={setSelectedSearchData}
            selectedSearchData={selectedSearchData}
            setStateNewsLetterData={setStateNewsLetter}
          />
        </TopMainWrp>
        <BodyWrp>
          <NewsLetterMiddleSection
            newsLetterData={stateNewsLetter}
            editMode={editMode}
            activeElement={activeElement}
            handleElementClick={handleElementClick}
            handleBlur={handleBlur}
            setStateNewsLetterData={setStateNewsLetter}
          />
          <NewsLetterAddSection
            searchSelect={searchSelect}
            data={dashboardDetails}
            newsLetterData={stateNewsLetter}
            editMode={editMode}
            activeElement={activeElement}
            handleElementClick={handleElementClick}
            handleBlur={handleBlur}
            setStateNewsLetterData={setStateNewsLetter}
            selectedSearchData={selectedSearchData}
            setPreviousState={setPreviousState}
            setNewsLetter={setNewsLetter}
            newsLetter={newsLetter}
          />
        </BodyWrp>
      </MainWrp>
      <AppFooter />
    </>
  );
};

export default NewsLetter;
