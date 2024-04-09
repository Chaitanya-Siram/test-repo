import { useQuery } from '@tanstack/react-query';
import { API } from '../constants';
import { get } from '../service';
import { objectToQueryString } from './useSearch';
import {
  addCountPrefix,
  calculatePercentage,
  calculatePercentageIncrease,
  identifyDateFormat,
} from '../constants/utils';
import {
  geographicalMapData as TempGeoGraphicalMapData,
  mediaTypeChartMapData as TempMediaTypeChartMapData,
  outletBreakdownMapData as TempOutletBreakdownMapData,
  resultOverTimeMapData as TempResultOverTimeMapData,
  sentimentChartMapData as tempSentimentChartMapData,
  topAuthorChartMapData as tempTopAuthorChartMapData,
  topSourceChartMapData as TempTopSourceChartMapData,
  topThemeChartMapData as TempTopThemeChartMapData,
  totalOverviewDetailsMap as tempOverviewDetailsMap,
  wordCloudChartMapData as TempWordCloudChartMapData,
  mediaTabData,
  geographicalWorldMapData,
} from './data/chartData';
import { format, parseISO } from 'date-fns';
import { StatesWithMapData } from './data/states';
import { colors } from './data/colors';

export const getSentimentChartData = async (payload) => {
  let { data: response } = await get(
    `${API}/search-visuals/sentiments-average?${objectToQueryString(payload)}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const sentimentChartMapData = JSON.parse(
    JSON.stringify(tempSentimentChartMapData)
  );
  // Set Percentage here
  const percentage = calculatePercentage(response);
  const sentimeMentMapData = sentimentChartMapData?.data.data;
  const updatedSentimentMapData = sentimeMentMapData?.map((x) => {
    return {
      ...x,
      value: percentage[x.label],
    };
  });

  const totalArticlesMapData = sentimentChartMapData.data.summary;
  totalArticlesMapData.value = String(addCountPrefix(response?.total_count));
  sentimentChartMapData.data.summary = totalArticlesMapData;
  sentimentChartMapData.data.data = updatedSentimentMapData || [];
  sentimentChartMapData.shouldShowGraph = response?.total_count > 0;
  return sentimentChartMapData;
};

export const useSentimentChartData = (filters, payload, editMode) => {
  return useQuery({
    queryKey: ['sentiment-charts', filters, payload],
    queryFn: () => getSentimentChartData(payload),
    refetchOnWindowFocus: false,
    enabled: !editMode,
  });
};

export const getMediaCountAPI = async (payload) => {
  const refinedPayload = {
    ...payload,
  };
  const { data: response } = await get(
    `${API}/search-visuals/media-type-average?${objectToQueryString(
      refinedPayload
    )}`,
    {}
  );
  const mediaTypesFromRes = response?.media_types || [];
  const updatedMediaCountData = mediaTabData?.map((x) => {
    const mdDataForMap = mediaTypesFromRes.find((mdData) =>
      mdData?.type?.toLowerCase().includes(x.label?.toLowerCase())
    );
    if (mdDataForMap) {
      return {
        ...x,
        count: mdDataForMap?.count,
      };
    } else if (x.value === 'totalArticles') {
      return {
        ...x,
        count: mediaTypesFromRes.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.count;
        }, 0),
      };
    }
    return {
      ...x,
      count: 0,
    };
  });
  return updatedMediaCountData;
};

export const getMediaTypeChartData = async (payload) => {
  let { data: response } = await get(
    `${API}/search-visuals/media-type-average?${objectToQueryString(payload)}`,
    {}
  );

  if (!response) {
    response = {};
  }
  const mediaTypeChartMapData = JSON.parse(
    JSON.stringify(TempMediaTypeChartMapData)
  );

  const totalArticlesMapData = mediaTypeChartMapData.data.summary;
  totalArticlesMapData.value = String(addCountPrefix(response?.total_count));
  mediaTypeChartMapData.data.summary = totalArticlesMapData;

  const mediaData = mediaTypeChartMapData?.data?.data;

  const mediaTypesFromRes = response?.media_types;
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
  mediaTypeChartMapData.shouldShowGraph = response?.total_count > 0;
  return mediaTypeChartMapData;
};

export const useMediaTypeChartData = (filters, payload, editMode) => {
  return useQuery({
    queryKey: ['medai-type-charts', filters, payload],
    queryFn: () => getMediaTypeChartData(payload),
    refetchOnWindowFocus: false,
    enabled: !editMode,
  });
};

export const getWordCloudChartData = async (payload) => {
  let { data: response } = await get(
    `${API}/search-visuals/wordcloud-count?${objectToQueryString(payload)}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const wordCloudChartMapData = JSON.parse(
    JSON.stringify(TempWordCloudChartMapData)
  );

  const totalArticlesMapData = wordCloudChartMapData.data.summary;
  totalArticlesMapData.value = String(addCountPrefix(response?.total_count));
  wordCloudChartMapData.data.summary = totalArticlesMapData;

  const worldCloudFromRes = response?.data;

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
  wordCloudChartMapData.shouldShowGraph = response?.data?.length > 0;
  return wordCloudChartMapData;
};

export const useWordCloudChartData = (filters, payload, editMode) => {
  return useQuery({
    queryKey: ['word-cloud-charts', filters, payload],
    queryFn: () => getWordCloudChartData(payload),
    refetchOnWindowFocus: false,
    enabled: !editMode,
  });
};

export const getTopSourceChartData = async (payload) => {
  let { data: response } = await get(
    `${API}/search-visuals/top-source-count?${objectToQueryString(payload)}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const topSourceChartMapData = JSON.parse(
    JSON.stringify(TempTopSourceChartMapData)
  );

  const totalArticlesMapData = topSourceChartMapData.data.summary;
  totalArticlesMapData.value = String(addCountPrefix(response?.total_count));
  topSourceChartMapData.data.summary = totalArticlesMapData;

  const topSourceRes = response?.sources;

  const updatedTopSourcedata = topSourceRes?.map((x, i) => {
    return {
      value: x?.count,
      label: x?.source,
      color: '#675EF2',
    };
  });

  topSourceChartMapData.data.data = updatedTopSourcedata || [];
  topSourceChartMapData.shouldShowGraph = topSourceRes?.length > 0;
  return topSourceChartMapData;
};

export const useTopSourceChartData = (filters, payload, editMode) => {
  return useQuery({
    queryKey: ['top-source-charts', filters, payload],
    queryFn: () => getTopSourceChartData(payload),
    refetchOnWindowFocus: false,
    enabled: !editMode,
  });
};

export const getTopThemeChartData = async (payload) => {
  let { data: response } = await get(
    `${API}/search-visuals/top-themes-count?${objectToQueryString(payload)}`,
    {}
  );

  if (!response) {
    response = {};
  }
  const topThemeChartMapData = JSON.parse(
    JSON.stringify(TempTopThemeChartMapData)
  );

  const totalArticlesMapData = topThemeChartMapData.data.summary;
  totalArticlesMapData.value = String(addCountPrefix(response?.total_count));
  topThemeChartMapData.data.summary = totalArticlesMapData;

  const topThemeRes = response?.data;

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
  topThemeChartMapData.shouldShowGraph = topThemeRes?.length > 0;
  return topThemeChartMapData;
};

export const useTopThemeChartData = (filters, payload, editMode) => {
  return useQuery({
    queryKey: ['top-theme-charts', filters, payload],
    queryFn: () => getTopThemeChartData(payload),
    refetchOnWindowFocus: false,
    enabled: !editMode,
  });
};

const getTopAuthorChartData = async (payload) => {
  let { data: response } = await get(
    `${API}/search-visuals/top-author-count?${objectToQueryString(payload)}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const topAuthorChartMapData = JSON.parse(
    JSON.stringify(tempTopAuthorChartMapData)
  );

  const totalArticlesMapData = topAuthorChartMapData.data.summary;
  totalArticlesMapData.value = String(addCountPrefix(response?.total_count));
  topAuthorChartMapData.data.summary = totalArticlesMapData;

  const topAuthorRes = response?.authors;

  const updatedTopSourcedata = topAuthorRes?.map((x, i) => {
    return {
      author_id: x?.author_id,
      value: x?.count,
      label: x?.author,
      thresholdValue: x?.count,
      color: '#22B9FF',
    };
  });

  topAuthorChartMapData.data.data = updatedTopSourcedata || [];
  topAuthorChartMapData.shouldShowGraph = topAuthorRes?.length > 0;
  return topAuthorChartMapData;
};

export const useTopAuthorChartData = (filters, payload, editMode) => {
  return useQuery({
    queryKey: ['top-author-charts', filters, payload],
    queryFn: () => getTopAuthorChartData(payload),
    refetchOnWindowFocus: false,
    enabled: !editMode,
  });
};

const getOverviewDetails = async (payload) => {
  const { data: response } = await get(
    `${API}/search-visuals/overview-details?${objectToQueryString(payload)}`,
    {}
  );

  const totalOverviewDetailsMap = JSON.parse(
    JSON.stringify(tempOverviewDetailsMap)
  );

  if (!response) {
    return totalOverviewDetailsMap;
  }

  const mappedData = response?.map((x) => {
    return {
      title: x?.label,
      data:
        x?.label === 'Total Reach'
          ? parseInt(x?.current_count)
          : x?.current_count,
      change: x?.previous_count !== 0 ? parseInt(x?.changes_percent) : 100,
      isIncreased: x?.changes_percent >= 0,
    };
  });

  return mappedData || totalOverviewDetailsMap;
};

export const useOverviewDetails = (filters, payload, editMode) => {
  return useQuery({
    queryKey: ['top-overview-details', filters, payload],
    queryFn: () => getOverviewDetails(payload),
    refetchOnWindowFocus: false,
    enabled: !editMode,
  });
};

export const getFormattedDate = (date) => {
  const dateFormat = identifyDateFormat(date);
  if (dateFormat === 'Hour') {
    const parseDate = parseISO(date?.slice(0, 11));
    const hoursDate = date;
    const hoursTime = hoursDate?.slice(11);
    const updatedDate = format(parseDate, 'dd MMM yy') + ' ' + hoursTime;
    return updatedDate;
  } else if (dateFormat === 'Month' || dateFormat === 'Day') {
    const parseDate = parseISO(date);
    const updatedDate = format(
      parseDate,
      dateFormat === 'Month' ? 'MMM yyyy' : 'dd MMM yy'
    );
    return updatedDate;
  }
  return '';
};

const getResultOverTimeData = async (payload) => {
  let { data: response } = await get(
    `${API}/search-visuals/datewise-count?${objectToQueryString(payload)}`,
    {}
  );

  if (!response) {
    response = {};
  }
  const resultOverTimeMapData = JSON.parse(
    JSON.stringify(TempResultOverTimeMapData)
  );
  // setting total count for area
  const totalArticlesAreaMapData = resultOverTimeMapData.area.data.summary;
  totalArticlesAreaMapData.value = String(
    addCountPrefix(response?.total_count)
  );
  resultOverTimeMapData.area.data.summary = totalArticlesAreaMapData;

  // setting total count for column
  const totalArticlesColumnMapData = resultOverTimeMapData.column.data.summary;
  totalArticlesColumnMapData.value = String(
    addCountPrefix(response?.total_count)
  );
  resultOverTimeMapData.column.data.summary = totalArticlesColumnMapData;

  const resultArea = response?.data;

  // Setting Area Data
  const updatedAreaResults = resultArea?.map((x) => {
    const formattedDate = getFormattedDate(x?.date ?? x.label);
    return {
      value: x?.doc_count,
      label: formattedDate,
      date: x?.date ?? x.label,
    };
  });
  resultOverTimeMapData.area.data.data =
    updatedAreaResults?.length > 0 ? updatedAreaResults : [];

  const updatedColumnResults = resultArea?.map((x) => {
    const formattedDate = getFormattedDate(x?.date ?? x.label);
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
      date: x?.date ?? x.label,
      label: formattedDate,
      online: onlineType ? String(onlineType?.doc_count) : '0',
      print: printType ? String(printType?.doc_count) : '0',
      broadcast: brodCastType ? String(brodCastType?.doc_count) : '0',
    };
  });

  resultOverTimeMapData.column.data.data =
    updatedColumnResults?.length > 0 ? updatedColumnResults : [];
  resultOverTimeMapData.area.shouldShowGraph = updatedAreaResults?.length > 0;
  resultOverTimeMapData.column.shouldShowGraph =
    updatedColumnResults?.length > 0;
  return resultOverTimeMapData;
};

export const useResultOverTimeData = (filters, payload, editMode) => {
  return useQuery({
    queryKey: ['top-date-wise-charts', filters, payload],
    queryFn: () => getResultOverTimeData(payload),
    refetchOnWindowFocus: false,
    enabled: !editMode,
  });
};

const getOutletBreakData = async (payload) => {
  let { data: response } = await get(
    `${API}/search-visuals/outlet-breakdown-media-type?${objectToQueryString(
      payload
    )}`,
    {}
  );

  if (!response) {
    response = {};
  }
  const outletBreakdownMapData = JSON.parse(
    JSON.stringify(TempOutletBreakdownMapData)
  );
  const summaryData = outletBreakdownMapData?.data?.summary?.data;

  const mediaTypesSummary = response?.data;
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
  outletBreakdownMapData.shouldShowGraph = mediaTypesSummary?.length > 0;
  return outletBreakdownMapData;
};

export const useMediaOutletBreakdown = (filters, payload, editMode) => {
  return useQuery({
    queryKey: ['outlet-breakdown-media-type', filters, payload],
    queryFn: () => getOutletBreakData(payload),
    refetchOnWindowFocus: false,
    enabled: !editMode,
  });
};

export const getGeographicalBreakDown = async (payload) => {
  let { data: response } = await get(
    `${API}/search-visuals/geographical-breakdown?${objectToQueryString(
      payload
    )}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const geographicalMapData = JSON.parse(
    // JSON.stringify(TempGeoGraphicalMapData)
    JSON.stringify(geographicalWorldMapData)
  );

  const totalArticlesMapData = geographicalMapData.data.summary;
  totalArticlesMapData.value = String(addCountPrefix(response?.total_count));
  geographicalMapData.data.summary = totalArticlesMapData;

  const geographicalRes = response?.data;

  const updatedGeographicalRes = geographicalRes?.map((state) => {
    return {
      label: state.country,
      value: state.current_count,
    };
  });

  geographicalMapData.data.data = updatedGeographicalRes;
  geographicalMapData.shouldShowGraph = geographicalRes?.length > 0;
  return geographicalMapData;
};

export const useGeographicalBreakdownData = (filters, payload, editMode) => {
  return useQuery({
    queryKey: ['search-visuals-geographical-breakdown', filters, payload],
    queryFn: () => getGeographicalBreakDown(payload),
    refetchOnWindowFocus: false,
    enabled: !editMode,
  });
};
