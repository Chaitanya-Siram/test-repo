import React, { useEffect, useRef, useState } from 'react';
import PropTypes, { object } from 'prop-types';

import {
  AddItemWrp,
  AddOptionsWrp,
  AddTextContent,
  //   BottomSectionWrp,
  IconWrp,
  OptionText,
  OptionTextSpan,
  OptionWrp,
  SectionTextWrp,
  SectionWrp,
} from './index.sc';
import Add from '../../../../assets/icons/Add';
// import DashboardPopup from '../../../../components/dasboard-popup';
// import AddGraphpop from '../../../../components/add-graph-popup';
import ArticleInputBox from './article-item/articleinputbox';
import { axiosGet } from '../../../../service';
import { useQuery } from '@tanstack/react-query';

import {
  filterKeyOptions,
  filterLabels,
} from './article-item/articleinputbox/filterData';
import {
  usePostSearchData,
  usePostSearchDataV1,
  // useArticleData,
  useSearchFilterData,
} from '../../../../hooks/useSearch';
import { getTokenData } from '../../../../constants/validateToken';
import { getPayloadForSearch } from '../../../../constants/filterPayload';
import {
  getGeographicalBreakDown,
  getMediaTypeChartData,
  getTopSourceChartData,
  getTopThemeChartData,
  getWordCloudChartData,
} from '../../../../hooks/useCharts';
import {
  mediaTypeChartMapData,
  outletBreakdownMapData,
  resultOverTimeMapData,
  sentimentChartMapData,
  topAuthorChartMapData,
  topSourceChartMapData,
  topThemeChartMapData,
  wordCloudChartMapData,
  geographicalWorldMapData,
} from '../../../../hooks/data/chartData';
import Spinner from '../../../../components/spinner';
// import { mediaType } from '../../../../graphs/utils/mockData';
import Papa from 'papaparse';
import {
  useFetchCSVArticlesNewsletter,
  useFetchChartFileNewsLetter,
  useFetchSavedArticleNewsletter,
  useGetChartDataForNewsletter,
  useSaveExternalLink,
} from '../../../../hooks/useSaveNewsLetter';
import {
  addCountPrefix,
  calculatePercentage,
} from '../../../../constants/utils';
import { colors } from '../../../../hooks/data/colors';
import { format, parse, parseISO } from 'date-fns';
import { useGetSavedSearchQueryData } from '../../../../hooks/useSaveSearch';
import toast from 'react-hot-toast';
import { getParsedDate } from '../../../../constants';
import EditArticle from './edit-article';
// import { sentimentChartMapData } from '../../../../hooks/data/chartData';

const addOptions = [
  { addOption: 'text', label: 'Text', menu: false },
  { addOption: 'articles', label: 'Articles', menu: false },
  { addOption: 'graphs', label: 'Graphs', menu: false },
];

const addArticleOptions = [
  { addArticleOption: 'saved_search', label: 'from Saved Search', menu: false },
  { addArticleOption: 'csv', label: 'from CSV', menu: false },
  { addArticleOption: 'link', label: 'from Links', menu: false },
];

const addChartsOptions = [
  {
    addArticleOption: 'saved_graph',
    label: 'From Saved Search',
    menu: false,
  },
  { addArticleOption: 'upload_image', label: 'Upload Image', menu: false },
];

const AddItem = ({
  addRow,
  rowIndex,
  columnIndex,
  setTypeAdded,
  typeAdded,
  searchSelect,
  selectedSearchData,
  isEdit,
  selectedConfig,
  handleEditMode,
}) => {
  const [selectedCompOption, setSelectedCompOption] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedSearchDetails, setSelectedSearchDetails] = useState({});
  const [selectedGraph, setSelectedGraph] = useState({ component: [] });
  const [submitStatus, setSubmitStatus] = useState(false);
  const [articleCount, setArticleCount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [graphSubmit, setGraphSubmit] = useState(false);
  // const [graphValue, setGraphValue] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [csvFile, setCSVFile] = useState();
  const [chartFile, setChartFile] = useState();
  const [csvArray, setCSVArray] = useState([]);
  // const [sampleCSVFile, setSampleCSVFile] = useState();
  const [graphImageTitle, setGraphImageTitle] = useState('');
  const [graphImage, setGraphImage] = useState();

  const [btnTxt, setBtnTxt] = useState('Add');

  // For External Link articles
  const inputFields = {
    newsletterId: '',
    title: '',
    content: '',
    publication: '',
    publication_url: '',
    imagePublicUrl: '',
    date: '',
    place: '',
    author: '',
    type: '',
    link: '',
    similarData: [],
  };
  const [addNewLink, setAddNewLink] = useState([inputFields]);
  const [linkText, setLinkText] = useState('');
  const [totalAddedLinks, setTotalAddedLinks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedSearchID, setSelectedSearchID] = useState();

  const defaultValue = () => {
    const defaultSelectedOptions = {};
    filterLabels.forEach((label) => {
      const options = filterKeyOptions[label.value];
      if (options && options.length > 0) {
        defaultSelectedOptions[label.value] = options[0]?.value;
      }
    });
    return defaultSelectedOptions;
  };

  const [filterData, setFilterData] = useState(defaultValue);

  const searchFilterData = selectedSearchDetails?.search_params
    ? JSON.parse(selectedSearchDetails?.search_params)
    : {};

  const authInfo = getTokenData();
  const iconPop = useRef(null);

  const {
    // isLoading,
    // error,
    data,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useSearchFilterData(authInfo?.user_id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchFilterOptions = data?.data || [];

  const filterDetails = getPayloadForSearch(
    searchFilterData,
    searchFilterOptions
  );

  const {
    mutateAsync: postSearchAsync,
    // data: articlesData,
    // isSuccess,
    // isError,
    // error,
  } = usePostSearchDataV1();

  // Add Articles from saved search
  const { mutateAsync: articleSavedSearch, data: articleNewsletter } =
    useFetchSavedArticleNewsletter();

  const { data: savedSearchData, isLoading: isFetchingSavedSearches } =
    useGetSavedSearchQueryData(authInfo?.user_id, { orderBy: 'name' });

  // Add Article via CSV
  const { mutateAsync: articlesCSVFile, data: csvArticles } =
    useFetchCSVArticlesNewsletter();

  // Add Chart via image
  const { mutateAsync: chartImgfunc, data: chartImgData } =
    useFetchChartFileNewsLetter();

  // Add Articles via external link
  const { mutateAsync: externalLinkFunc } = useSaveExternalLink();

  // Add charts via saved search
  const { mutateAsync: getChartDataFunc } = useGetChartDataForNewsletter();

  const graphData = async () => {
    try {
      setIsLoading(true);
      let i = 0;
      const responses = [];
      while (i < selectedGraph.component.length) {
        const value = selectedGraph.component[i];
        setIsLoading(true);
        let resp;

        if (value === 'Sentiment') {
          const payload = {
            searchid: selectedSearchID?.id,
            chart_type: '1',
          };

          // resp = await getMediaTypeChartData(filterDetails);
          const sentimentData = await getChartDataFunc(payload);
          // Set Percentage here
          const percentage = calculatePercentage(sentimentData?.data?.data);
          const sentimeMentMapData = sentimentChartMapData?.data.data;
          const updatedSentimentMapData = sentimeMentMapData?.map((x) => {
            return {
              ...x,
              value: percentage[x.label],
            };
          });

          const totalArticlesMapData = sentimentChartMapData.data.summary;
          totalArticlesMapData.value = String(
            addCountPrefix(sentimentData?.data?.data?.total_count)
          );
          sentimentChartMapData.data.summary = totalArticlesMapData;
          sentimentChartMapData.data.data = updatedSentimentMapData || [];
          sentimentChartMapData.shouldShowGraph = true;
          resp = sentimentChartMapData;
        } else if (value === 'Media Type') {
          const payload = {
            searchid: selectedSearchID?.id,
            chart_type: '2',
          };
          // resp = await getWordCloudChartData(filterDetails);
          const mediaTypeData = await getChartDataFunc(payload);
          const totalArticlesMapData = mediaTypeChartMapData.data.summary;
          totalArticlesMapData.value = String(
            addCountPrefix(mediaTypeData?.data?.data?.total_count)
          );
          mediaTypeChartMapData.data.summary = totalArticlesMapData;

          const mediaData = mediaTypeChartMapData?.data?.data;

          const mediaTypesFromRes = mediaTypeData?.data?.data?.media_types;
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

          resp = mediaTypeChartMapData;
        } else if (value === 'Top Authors') {
          const payload = {
            searchid: selectedSearchID?.id,
            chart_type: '3',
          };
          const topAuthorsData = await getChartDataFunc(payload);

          const totalArticlesMapData = topAuthorChartMapData.data.summary;
          totalArticlesMapData.value = String(
            addCountPrefix(topAuthorsData?.data?.data?.total_count)
          );
          topAuthorChartMapData.data.summary = totalArticlesMapData;

          const topAuthorRes = topAuthorsData?.data?.data?.authors;

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

          resp = topAuthorChartMapData;
        } else if (value === 'Top Themes') {
          const payload = {
            searchid: selectedSearchID?.id,
            chart_type: '7',
          };
          const topThemeData = await getChartDataFunc(payload);

          const totalArticlesMapData = topThemeChartMapData.data.summary;
          totalArticlesMapData.value = String(
            addCountPrefix(topThemeData?.data?.data?.total_count)
          );
          topThemeChartMapData.data.summary = totalArticlesMapData;

          const topThemeRes = topThemeData?.data?.data?.data;

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

          resp = topThemeChartMapData;
        } else if (value === 'Result Over Time') {
          const payload = {
            searchid: selectedSearchID?.id,
            chart_type: '5',
          };
          const resultOverData = await getChartDataFunc(payload);

          const totalArticlesAreaMapData =
            resultOverTimeMapData.area.data.summary;
          totalArticlesAreaMapData.value = String(
            addCountPrefix(resultOverData?.data?.data?.total_count)
          );
          resultOverTimeMapData.area.data.summary = totalArticlesAreaMapData;
          resultOverTimeMapData.area.shouldShowGraph = true;
          resultOverTimeMapData.column.shouldShowGraph = true;
          // setting total count for column
          const totalArticlesColumnMapData =
            resultOverTimeMapData.column.data.summary;
          totalArticlesColumnMapData.value = String(
            addCountPrefix(resultOverData?.data?.data?.total_count)
          );
          resultOverTimeMapData.column.data.summary =
            totalArticlesColumnMapData;

          const resultArea = resultOverData?.data?.data?.data;

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

          resp = resultOverTimeMapData?.area;
        } else if (value === 'Geographical Breakdown') {
          const payload = {
            searchid: selectedSearchID?.id,
            chart_type: '4',
          };

          const geoGraphicalData = await getChartDataFunc(payload);

          const totalArticlesMapData = geographicalWorldMapData.data.summary;
          totalArticlesMapData.value = String(
            addCountPrefix(geoGraphicalData?.data?.data?.total_count)
          );
          geographicalWorldMapData.data.summary = totalArticlesMapData;

          const geographicalRes = geoGraphicalData?.data?.data?.data;
          const updatedGeographicalRes = geographicalRes?.map((state) => {
            return {
              label: state.country,
              value: state.current_count,
            };
          });

          geographicalWorldMapData.data.data = updatedGeographicalRes;
          geographicalWorldMapData.shouldShowGraph = true;
          resp = geographicalWorldMapData;
        } else if (value === 'Word Cloud') {
          const payload = {
            searchid: selectedSearchID?.id,
            chart_type: '6',
          };
          const wordCloudData = await getChartDataFunc(payload);
          const totalArticlesMapData = wordCloudChartMapData.data.summary;
          totalArticlesMapData.value = String(
            addCountPrefix(wordCloudData?.data?.data?.total_count)
          );
          wordCloudChartMapData.data.summary = totalArticlesMapData;

          const worldCloudFromRes = wordCloudData?.data?.data?.data;

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
          resp = wordCloudChartMapData;
        } else {
          const payload = {
            searchid: selectedSearchID?.id,
            chart_type: '8',
          };
          const breakdownData = await getChartDataFunc(payload);

          const summaryData = outletBreakdownMapData?.data?.summary?.data;

          const mediaTypesSummary = breakdownData?.data?.data?.data;
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
          outletBreakdownMapData.data.summary.data = updatedMediatTypesSummary;

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
          resp = outletBreakdownMapData;
        }

        responses.push(resp);

        i++;
      }
      return responses;
    } catch (error) {
      // Handle errors if needed
      console.error('Error in onGraphSubmit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // [{},{}] converting into array of objs.

  const processCSV = (str) => {
    Papa?.parse(str, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setArticleCount(result?.data?.length);
      },
      error: (error) => {
        console.error('CSV Parsing Error:', error.message);
      },
    });
  };

  const fetchArticles = async (option, selectedWhenEdit) => {
    try {
      if (
        selectedCompOption === 'saved_search' ||
        selectedWhenEdit === 'saved_search'
      ) {
        const searchValue = option?.search_params
          ? JSON.parse(option?.search_params)
          : {};
        const filterValue = getPayloadForSearch(
          searchValue,
          searchFilterOptions
        );
        const resp = await postSearchAsync({
          ...filterValue,
        });
        setArticleCount(resp?.data?.paged?.total);
      } else if (selectedCompOption === 'csv') {
        const file = option?.target?.files[0];
        setCSVFile(file);
        const reader = new FileReader();
        reader.onload = function (e) {
          const text = e.target.result;
          processCSV(text);
        };
        reader.readAsText(file);
        if (file) {
          setSelectedFileName(file.name);
        }
      } else if (selectedCompOption === 'upload_image') {
        const file = option.target.files[0];
        if (file) {
          setChartFile(file);
          setSelectedFileName(file.name);
          // setGraphImage(URL.createObjectURL(file));
        }
      }
    } catch (error) {
      // Handle errors if needed
      console.error('Error in onArticleCompSubmit:', error);
    }
  };

  const handleClose = () => {
    setShowOptions(false);
    setShow(false);
    setArticleCount('');
    setSubmitStatus(false);
    setSelectedGraph({ component: [] });
    setSelectedSearchDetails({});
    setIsLoading(false);
    setSelectedFileName('');
    setCSVArray([]);
    setGraphImageTitle('');
    setCSVFile();
    setChartFile();
    setTotalAddedLinks([]);
    setAddNewLink([inputFields]);
    setSelectedTag('');
    handleEditMode && handleEditMode();
    setErrorMessage('');
  };
  const onTextCompSubmit = (option) => {
    if (option === 'text') {
      addRow(
        {
          // columnComponent: {
          componentData: {
            title: '',
            description: '',
          },
          componentType: 'text',
          // },
        },
        rowIndex,
        columnIndex
      );
      // addRow(
      //   {
      //     columnComponent: {
      //       componentType: 'text',
      //       componentData: textItemDetails,
      //     },
      //   },
      //   rowIndex,
      //   columnIndex
      // );
    }
    setSelectedCompOption('');
    handleClose();
  };

  function optionFunc(option) {
    setSelectedCompOption(option.addOption);
    setTypeAdded(option.addOption);
    if (option.addArticleOption) {
      setSelectedCompOption(option.addArticleOption);
      setTypeAdded(option.addArticleOption);
      setShow(true);
    }
    if (option.addOption === 'saved_graph') {
      setShow(true);
    }
    if (option.addOption === 'text') {
      onTextCompSubmit(option.addOption);
    }
  }

  useEffect(() => {
    if (isEdit) {
      setShow(true);
      if (selectedConfig?.columnComponent?.componentData?.type === 'article3') {
        setFilterData({
          limit:
            selectedConfig.columnComponent.componentData.count ||
            defaultValue?.limit,
          sort:
            selectedConfig.columnComponent.componentData.sortby ??
            defaultValue?.sort,
        });
        const option = savedSearchData?.data?.data?.find(
          (x) =>
            parseInt(x?.id) ===
            parseInt(selectedConfig?.columnComponent?.componentData?.searchid)
        );
        setSelectedSearchDetails(
          option || {
            id: selectedConfig?.columnComponent?.componentData?.search_id,
          }
        );
        setSelectedCompOption('saved_search');
        setTypeAdded(null);
        setSelectedTag(
          selectedConfig.columnComponent?.componentData?.filterTag || ''
        );
        if (option) {
          fetchArticles(option, 'saved_search');
        }
      } else if (selectedConfig?.columnComponent?.type === 'article1') {
        setSelectedCompOption('csv');
        setTypeAdded(null);
        setSelectedFileName('dataFromCSV.csv');
        setFilterData({
          limit: selectedConfig?.columnComponent?.count,
        });
        setCSVArray(selectedConfig?.columnComponent?.data_all || []);
      } else if (selectedConfig?.columnComponent?.type === 'article2') {
        setTypeAdded(null);
        setSelectedCompOption('link');
        const linksData = selectedConfig?.columnComponent?.componentData?.map(
          (x) => {
            return {
              ...x,
              type: x?.newsType || x?.type,
            };
          }
        );
        setAddNewLink(linksData);
        // setTotalAddedLinks(linksData);
      } else if (
        selectedConfig.columnComponent.componentData.type === 'chart1'
      ) {
        setSelectedCompOption('upload_image');
        setTypeAdded(null);
        setGraphImageTitle(
          selectedConfig?.columnComponent?.componentData?.title
        );
        setSelectedFileName('NewsLetter_uploaded_img.png');
      } else if (
        selectedConfig?.columnComponent?.componentData?.type === 'chart2'
      ) {
        const option = savedSearchData?.data?.data?.find(
          (x) =>
            parseInt(x?.id) ===
            parseInt(selectedConfig?.columnComponent?.componentData?.searchid)
        );
        setSelectedSearchDetails(
          option || {
            id: selectedConfig?.columnComponent?.componentData?.searchid,
          }
        );
        setSelectedSearchID(
          option || {
            id: selectedConfig?.columnComponent?.componentData?.searchid,
          }
        );
        setSelectedGraph({
          component: [selectedConfig?.columnComponent?.componentData?.title],
        });
        setSelectedCompOption('saved_graph');
        setTypeAdded(null);
      }
    }
  }, [isEdit, selectedConfig]);

  const onGraphSubmit = async () => {
    // send the component data object, row and column
    // setGraphSubmit(true);
    try {
      setIsLoading(true);
      setBtnTxt('Please wait...');
      const responses = await graphData();
      if (selectedCompOption === 'saved_graph' && selectedSearchDetails?.id) {
        const dtToPushList = [];
        for (const value of responses) {
          const chartType =
            value?.title === 'Sentiment'
              ? 1
              : value.title === 'Media Type'
              ? 2
              : value.title === 'Top Author'
              ? 3
              : value.title === 'Geographical Breakdown'
              ? 4
              : value.title === 'Result Over Time'
              ? 5
              : value.title === 'Word Cloud'
              ? 6
              : value.title === 'Top Themes'
              ? 7
              : value.title === 'Outlet Breakdown'
              ? 8
              : '';
          const dataToPush = {
            componentData: {
              ...value,
              searchid: selectedSearchDetails?.id,
              order: rowIndex + responses.length - 1,
              type: 'chart2',
              chart_type: chartType,
            },
            componentType: 'graph',
          };
          dtToPushList.push(dataToPush);
          if (!isEdit) {
            addRow(dataToPush, rowIndex + responses.length - 1, columnIndex);
          }
        }
        if (isEdit) {
          addRow(dtToPushList, 0, 0, selectedCompOption);
        }
      }
      if (selectedCompOption === 'upload_image' && selectedFileName) {
        let articles;
        if (chartFile) {
          const formData = new FormData();
          formData.append('image_file', chartFile);
          formData.append('title', graphImageTitle);
          formData.append('image_type', 'chart');
          const resp = await chartImgfunc(formData);
          articles = resp ? resp?.data : csvArticles?.data;
          if (!resp?.isSuccessful) {
            toast.error(resp?.data?.error);
          }
        } else {
          articles = selectedConfig?.columnComponent?.componentData?.articles;
        }
        if (articles?.image_url) {
          setGraphImage(articles?.image_url);
          setGraphImageTitle(articles?.title);
          addRow(
            {
              componentData: {
                articles,
                type: 'chart1',
                title: graphImageTitle,
                image_url: articles?.image_url,
                article_image_id: articles?.article_image_id,
              },
              componentType: 'graph',
            },
            rowIndex,
            columnIndex
          );
        }
      }
      setSelectedGraph({ component: [] });
      if (
        (submitStatus &&
          selectedGraph.component.length !== 0 &&
          filterDetails) ||
        (submitStatus && selectedFileName)
      ) {
        handleClose();
      }
    } catch (error) {
      // Handle errors if needed
      console.error('Error in onGraphSubmit:', error);
    } finally {
      setIsLoading(false);
      setBtnTxt('Add');
    }
  };

  const defaultValues = {
    author: '',
    content: '',
    date: '',
    imagePublicUrl: '',
    link: '',
    newsType: '',
    place: '',
    publication: '',
    title: '',
  };

  const onArticleCompSubmit = async () => {
    // getPayloadForSearch(searchFilterData, searchFilterOptions);
    try {
      setIsLoading(true);
      setBtnTxt('Please wait...');
      if (selectedCompOption === 'saved_search' && selectedSearchDetails?.id) {
        const resp = await articleSavedSearch({
          searchid: selectedSearchDetails?.id,
          count: filterData?.limit,
          sort_by: filterData?.sort,
          filter_by: selectedTag, // tag/themes
        });
        const articles = resp
          ? resp?.data?.data
          : articleNewsletter?.data?.data;
        if (selectedCompOption === 'saved_search') {
          // articles.forEach((article) => {

          addRow(
            {
              componentData: {
                articles,
                searchid: selectedSearchDetails?.id,
                count: filterData?.limit,
                sortby: filterData?.sort,
                filterTag: selectedTag,
                pageNumber: 1,
                order: rowIndex,
                type: 'article3',
              },
              componentType: 'article',
            },
            rowIndex,
            columnIndex
          );
        }

        setSelectedCompOption('');
        setFilterData(defaultValue);

        if (
          submitStatus &&
          filterDetails &&
          selectedSearchDetails?.search_type !== null
        ) {
          handleClose();
        }
      } else if (selectedCompOption === 'csv' && selectedFileName) {
        let articles;
        let resp;
        let csvData = [];
        if (csvFile) {
          const formData = new FormData();
          formData.append('csv_file', csvFile);
          // eslint-disable-next-line no-unused-expressions
          articleCount < 10 ? '' : formData.append('count', filterData?.limit);
          resp = await articlesCSVFile(formData);
          if (resp?.data?.error) {
            toast.error(resp?.data?.error);
          }
          csvData = resp?.data?.csv_content;
          // if(resp?.)
        } else {
          resp = {
            data: {
              article_csv_id: selectedConfig.columnComponent.article_csv_id,
            },
          };
          csvData = selectedConfig?.columnComponent?.data_all;
        }
        if (selectedCompOption === 'csv' && resp?.data?.article_csv_id) {
          // articles.forEach((article) => {
          addRow(
            {
              componentData: csvData.slice(0, parseInt(filterData?.limit)),
              componentType: 'article',
              type: 'article1',
              article_csv_id: resp?.data?.article_csv_id,
              count: filterData?.limit,
              data_all: csvData,
            },
            rowIndex,
            columnIndex
          );
        } else if (selectedCompOption === 'csv') {
          return;
        }

        setSelectedCompOption('');
        setFilterData(defaultValue);

        if (submitStatus && selectedFileName !== null) {
          handleClose();
        }
      } else if (selectedCompOption === 'link') {
        setErrorMessage('');
        // const fieldIsCompletelyEmpty = Object.values(addNewLink[index]).every(
        //   (value) => value !== null || ''
        // );
        if (totalAddedLinks?.length !== addNewLink?.length) {
          const index = addNewLink?.length;
          const data = addNewLink[index - 1];
          const fieldDataForValidation = Object.keys(defaultValues)?.every(
            (key) => (key) =>
              data[key] ||
              (key === 'newsType' && (data?.type || data?.newsType))
          );
          const validationForAllObjects = addNewLink?.every((item) =>
            Object.keys(defaultValues)?.every(
              (key) =>
                item[key] ||
                (key === 'newsType' && (item?.type || item?.newsType))
            )
          );

          if (
            fieldDataForValidation &&
            Object.entries(addNewLink[index - 1]).length > 0 &&
            validationForAllObjects
          ) {
            const newObj = {};
            for (const key in addNewLink[index - 1]) {
              newObj[key] = addNewLink[index - 1][key];
            }

            newObj.newsType = newObj.type;
            if (
              !Object.values(newObj).every(
                (value) => value !== (null || '' || undefined)
              ) &&
              totalAddedLinks?.length > 0
            ) {
              if (selectedCompOption === 'link') {
                addRow(
                  {
                    componentData: totalAddedLinks,
                    componentType: 'article',
                  },
                  rowIndex,
                  columnIndex
                );
              }
              setSelectedCompOption('');
              if (submitStatus && totalAddedLinks?.length >= 0) {
                handleClose();
              }
            } else {
              try {
                const resp = await externalLinkFunc({
                  ...newObj,
                  newsletter_id: newObj?.newsletterId || newObj?.newsletterid,
                  article_id: newObj?.newsletterId || newObj?.newsletterid,
                  syndication_data: newObj?.shouldShowOption
                    ? newObj?.similarData?.map((y, yIndex) => ({
                        ...y,
                        sr_no: yIndex + 1,
                      }))
                    : [],
                });

                if (resp?.isSuccessful) {
                  errorMessage && setErrorMessage('');
                  setTotalAddedLinks((prev) => [
                    ...prev,
                    {
                      ...resp?.data?.data,
                      syndication_data: newObj?.shouldShowOption
                        ? newObj?.similarData?.map((y, yIndex) => ({
                            ...y,
                            sr_no: yIndex + 1,
                          }))
                        : [],
                      shouldShowOption: newObj?.shouldShowOption,
                    },
                  ]);
                  const data = [
                    ...addNewLink?.slice(0, -1),
                    {
                      ...resp?.data?.data,
                      syndication_data: newObj?.shouldShowOption
                        ? newObj?.similarData
                        : [],
                      shouldShowOption: newObj?.shouldShowOption,
                    },
                  ];
                  setAddNewLink(data);
                  const newsIds = data?.map(
                    (item) =>
                      item?.newsletterid ||
                      item?.newsletter_id ||
                      item?.newsletterId ||
                      item?.article_id
                  );
                  addRow(
                    {
                      componentData: [...data],
                      componentType: 'article',
                      type: 'article2',
                      newsletterId: [...newsIds],
                    },
                    rowIndex,
                    columnIndex
                  );
                  setSelectedCompOption('');
                  if (submitStatus && totalAddedLinks?.length >= 0) {
                    handleClose();
                  }
                } else {
                  setErrorMessage(
                    'Kindly fill in all the missing fields by fetching the link and then click on Add button'
                  );
                }
              } catch (error) {
                console.error('Error calling externalLinkFunc:', error);
              }
            }
          } else if (!addNewLink[index - 1]?.newsletterId) {
            setErrorMessage(
              'Kindly fetch the article and then click on Add button'
            );
          } else {
            setErrorMessage(
              'Kindly fill in all the missing fields in all added links and then click on Add button'
            );
          }
        } else {
          if (selectedCompOption === 'link') {
            addRow(
              {
                componentData: totalAddedLinks,
                componentType: 'article',
              },
              rowIndex,
              columnIndex
            );
          }
          setSelectedCompOption('');
          if (submitStatus && totalAddedLinks?.length >= 0) {
            handleClose();
          }
        }
      }
    } catch (error) {
      // Handle errors if needed
      console.error('Error in onArticleCompSubmit:', error);
    } finally {
      setIsLoading(false);
      setBtnTxt('Add');
    }
  };

  const [show, setShow] = useState(false);

  const getgraphOptions = () => {
    return axiosGet('/add-graph-option', {});
  };

  const {
    // isLoading,
    // error: articleerror,
    data: addGraphData,
    // isFetching,
  } = useQuery({
    queryKey: ['add-graph-data'],
    queryFn: () => getgraphOptions(),
    refetchOnWindowFocus: false,
  });

  // const Item = addGraphData?.data?.data;
  const Item = [
    {
      id: 1,
      label: 'Sentiment',
      checked: false,
      component: 'sentiment',
    },
    {
      id: 2,
      label: 'Media Type',
      checked: false,
      component: 'media_type',
    },
    {
      id: 3,
      label: 'Top Authors',
      checked: false,
      component: 'top_authors',
    },
    {
      id: 4,
      label: 'Geographical Breakdown',
      checked: false,
      component: 'geographical_breakdown',
    },
    {
      id: 5,
      label: 'Result Over Time',
      checked: false,
      component: 'datewise_mapping',
    },
    {
      id: 6,
      label: 'Word Cloud',
      checked: false,
      component: 'word_cloud',
    },
    {
      id: 7,
      label: 'Top Themes',
      checked: false,
      component: 'top_theme',
    },
    {
      id: 8,
      label: 'Outlet Breakdown',
      checked: false,
      component: 'outlet_breakdown',
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (iconPop.current && !iconPop.current.contains(event.target)) {
        setShowOptions(false);
        setArticleCount('');
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setShowOptions]);

  return (
    <>
      {isLoading && <Spinner />}
      {/* {
        <DashboardPopup
          padding="0"
          open={show && selectedCompOption === 'graphs'}
          toggler={setShow}
          popContent={
            <AddGraphpop
              canvas={Array.isArray(Item) ? Item : []}
              toggler={setShow}
              title={searchSelect}
              // onSubmit={onGraphSubmit}
            />
          }
          width="60vw"
        />
      } */}
      {/* {show &&
        <EditArticle
          handleClose={handleClose}
          btnTxt={'Done'}
        />
      } */}
      {show && (
        <ArticleInputBox
          onSubmit={onArticleCompSubmit}
          handleClose={handleClose}
          filterData={filterData}
          setFilterData={setFilterData}
          // refetch={refetch}
          selectedCompOption={selectedCompOption}
          selectedSearchDetails={selectedSearchDetails}
          setSelectedSearchDetails={setSelectedSearchDetails}
          canvas={Array.isArray(Item) ? Item : []}
          handleGraphSubmit={onGraphSubmit}
          setSelectedGraph={setSelectedGraph}
          selectedGraph={selectedGraph}
          setSubmitStatus={setSubmitStatus}
          submitStatus={submitStatus}
          fetchArticles={fetchArticles}
          articleCount={articleCount}
          selectedFileName={selectedFileName}
          setGraphImageTitle={setGraphImageTitle}
          graphImageTitle={graphImageTitle}
          setTotalAddedLinks={setTotalAddedLinks}
          totalAddedLinks={totalAddedLinks}
          setLinkText={setLinkText}
          linkText={linkText}
          rowIndex={rowIndex}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          setAddNewLink={setAddNewLink}
          addNewLink={addNewLink}
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
          selectedSearchID={selectedSearchID}
          setSelectedSearchID={setSelectedSearchID}
          isEdit={isEdit}
          savedSearchData={savedSearchData}
          isLoading={isFetchingSavedSearches}
          setBtnTxt={setBtnTxt}
          btnTxt={btnTxt}
        />
      )}
      <AddItemWrp>
        <SectionWrp>
          <SectionTextWrp>
            <IconWrp
              id="coach-add-news-letter-wrp"
              onClick={() => {
                setShowOptions(true);
              }}
              ref={iconPop}
            >
              <Add />
              {showOptions && (
                <AddOptionsWrp>
                  {addOptions.map((option, i) => {
                    return (
                      <OptionWrp key={i} type={typeAdded}>
                        <OptionText onClick={() => optionFunc(option)}>
                          <OptionTextSpan>
                            {(typeAdded === 'saved_graph' ||
                              typeAdded === 'graphs' ||
                              typeAdded === 'upload_image') &&
                            option?.addOption === 'articles'
                              ? ''
                              : ` Add ${option.label}`}
                          </OptionTextSpan>
                        </OptionText>
                      </OptionWrp>
                    );
                  })}
                </AddOptionsWrp>
              )}
              {showOptions && selectedCompOption === 'articles' && (
                <AddOptionsWrp
                  // className="add-options"
                  selectTitle={selectedCompOption}
                >
                  {addArticleOptions.map((option, i) => {
                    // eslint-disable-next-line react/jsx-key
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <OptionWrp key={i}>
                        <OptionText onClick={() => optionFunc(option)}>
                          Add <OptionTextSpan>{option.label}</OptionTextSpan>
                        </OptionText>
                      </OptionWrp>
                    );
                  })}
                </AddOptionsWrp>
              )}
              {showOptions && selectedCompOption === 'graphs' && (
                <AddOptionsWrp
                  // className="add-options"
                  selectTitle={selectedCompOption}
                >
                  {addChartsOptions.map((option, i) => {
                    // eslint-disable-next-line react/jsx-key
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <OptionWrp key={i}>
                        <OptionText onClick={() => optionFunc(option)}>
                          Add <OptionTextSpan>{option.label}</OptionTextSpan>
                        </OptionText>
                      </OptionWrp>
                    );
                  })}
                </AddOptionsWrp>
              )}
            </IconWrp>
            {/* <span style={{ fontWeight: 'bold', marginLeft: '1rem' }}>
            Add Content
          </span> */}
            <AddTextContent>Add Content</AddTextContent>
          </SectionTextWrp>
        </SectionWrp>
      </AddItemWrp>
    </>
  );
};

AddItem.propTypes = {
  addRow: PropTypes.func.isRequired,
  rowIndex: PropTypes.number,
  columnIndex: PropTypes.number,
  searchSelect: PropTypes.any,
  selectedSearchData: PropTypes.object,
  setTypeAdded: PropTypes.func,
  typeAdded: PropTypes.string,
  isEdit: PropTypes.bool,
  selectedConfig: PropTypes.object,
  handleEditMode: PropTypes.func,
};

export default AddItem;
