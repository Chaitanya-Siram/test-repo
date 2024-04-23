import { useQuery } from '@tanstack/react-query';
import { get } from '../service';
import { API } from '../constants';
import { objectToQueryString } from './useSearch';
import {
  SOVMapData,
  articleSentimentMapData,
  coverageOverTimeChartDashboardMapData,
  coverageOverTimeCompetitionMapData,
  journalistMapBreakdown,
  mediaBreakDownMapData,
  mediaTypeBrandMapData,
  reachOverTimeChartDashboardMapData,
  reachOverTimeCompMapData,
  sentimeChartDashobardMapData,
  sentimeOverTimeChartDashboardMapData,
  sourcesMapData,
  volumeAnalysisDashboardMapData,
} from './data/dashboardData';
import {
  addCountPrefix,
  calculatePercentage,
  calculatePercentageIncrease,
  removeQuotesFromObjectKeys,
  toCamelCase,
} from '../constants/utils';
import { format, parse, parseISO } from 'date-fns';
import { convertValuesToInt } from '../constants/dashboards/dashboardUtils';
import { getFormattedDate } from './useCharts';
import { encloseWordsInDoubleQuotes } from './usePeopleCharts';

const getDashboardVolumeAnalysisData = async (payload, brand) => {
  const queryString = `${objectToQueryString({
    ...payload,
    brand_keywords: encloseWordsInDoubleQuotes(brand),
  })}`;
  const { data: response } = await get(
    `${API}/dashboard-brand/volume-analysis?${queryString}`,
    {}
  );

  const volumAnalysisMapData = JSON.parse(
    JSON.stringify(volumeAnalysisDashboardMapData)
  );

  const colorData = volumAnalysisMapData?.data?.data;

  const data = response?.map((x, i) => {
    const { isIncreased, percentageIncrease: change } =
      calculatePercentageIncrease(x?.current_count, x?.previous_count);
    const colorIndex = i % colorData?.length;
    return {
      label: x?.label,
      value: x?.current_count,
      change,
      isIncreased,
      color: colorData[colorIndex]?.color,
    };
  });

  volumAnalysisMapData.data.data = data;
  volumAnalysisMapData.shouldShowGraph = true;
  return volumAnalysisMapData;
};

export const useDashboardAnalisysData = (filters, brand, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard_volume-analysis', filters, brand],
    queryFn: () => getDashboardVolumeAnalysisData(filters, brand),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

export const getSentimentChartData = async (payload, brand) => {
  const queryString = `${objectToQueryString({
    ...payload,
    brand_keywords: encloseWordsInDoubleQuotes(brand),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-brand/sentiment-analysis?${queryString}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const sentimentChartMapData = JSON.parse(
    JSON.stringify(sentimeChartDashobardMapData)
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

export const useDashboardSentimentChartData = (filters, brand, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-brand_sentiment-analysis', filters, brand],
    queryFn: () => getSentimentChartData(filters, brand),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

function updateArrayToObject(arr, keyProperty, docCountProperty, labels) {
  const resultObject = {};

  labels.forEach((label) => {
    const value = label?.value;
    const docCount =
      arr.find((item) => item[keyProperty] === value)?.[docCountProperty] || 0;
    resultObject[value] = docCount;
  });

  return resultObject;
}

export const getSentimentOvertimeChartData = async (payload, brand) => {
  const queryString = `${objectToQueryString({
    ...payload,
    brand_keywords: encloseWordsInDoubleQuotes(brand),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-brand/sentiments-over-time?${queryString}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const mapData = JSON.parse(
    JSON.stringify(sentimeOverTimeChartDashboardMapData)
  );

  const dataFromRes = response?.data;
  const labels = mapData.data.labels;
  const udpatedDataFromRes = dataFromRes?.map((x) => {
    const formattedDate = getFormattedDate(x?.date ?? x.label);
    const data = updateArrayToObject(
      x?.sentiment_count,
      'key',
      'doc_count',
      labels
    );
    return {
      label: formattedDate,
      ...data,
      date: x?.date ?? x.label,
    };
  });

  const totalArticlesMapData = mapData.data.summary;
  totalArticlesMapData.value = String(addCountPrefix(response?.total_count));
  mapData.data.summary = totalArticlesMapData;
  mapData.data.data = udpatedDataFromRes || [];
  mapData.shouldShowGraph = response?.total_count;
  return mapData;
};

export const useDashboardSentimentOverTimeChartData = (
  filters,
  brand,
  isEnabled
) => {
  return useQuery({
    queryKey: ['dashboard-brand_sentiment-over-time', filters, brand],
    queryFn: () => getSentimentOvertimeChartData(filters, brand),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

export const getCoverageOvertimeData = async (payload, brand) => {
  const queryString = `${objectToQueryString({
    ...payload,
    brand_keywords: encloseWordsInDoubleQuotes(brand),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-brand/coverage-over-time?${queryString}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const mapData = JSON.parse(
    JSON.stringify(coverageOverTimeChartDashboardMapData)
  );

  const totalArticlesMapData = mapData.data.summary;
  const totalCount = response?.total_count
    ? response?.total_count
    : response && response.data
    ? response.data.reduce(
        (accumulator, currentValue) => accumulator + (currentValue?.value || 0),
        0
      )
    : 0;
  totalArticlesMapData.value = String(addCountPrefix(totalCount));
  mapData.data.summary = totalArticlesMapData;
  mapData.data.data =
    response?.data?.map((x) => {
      const formattedDate = getFormattedDate(x?.date ?? x.label);
      return {
        ...x,
        label: formattedDate,
        value: String(x?.value),
        date: x?.date ?? x.label,
      };
    }) || [];
  mapData.shouldShowGraph = response?.total_count;
  return mapData;
};

export const useCoverageOvertimeBrand = (filters, brand, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-brand_coverage-over-time', filters, brand],
    queryFn: () => getCoverageOvertimeData(filters, brand),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

export const getReachOverTimeBrand = async (payload, brand) => {
  const queryString = `${objectToQueryString({
    ...payload,
    brand_keywords: encloseWordsInDoubleQuotes(brand),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-brand/reach-over-time?${queryString}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const mapData = JSON.parse(
    JSON.stringify(reachOverTimeChartDashboardMapData)
  );

  const totalArticlesMapData = mapData.data.summary;
  const totalCount = response?.total_count
    ? response?.total_count
    : response && response.data
    ? response.data.reduce(
        (accumulator, currentValue) => accumulator + (currentValue?.value || 0),
        0
      )
    : 0;
  totalArticlesMapData.value = String(addCountPrefix(totalCount));
  mapData.data.summary = totalArticlesMapData;
  mapData.data.data =
    response?.data?.map((x) => {
      const formattedDate = getFormattedDate(x?.date ?? x.label);
      return {
        ...x,
        label: formattedDate,
        value: x?.doc_count,
        date: x?.date ?? x.label,
      };
    }) || [];
  mapData.shouldShowGraph = response?.total_count;
  return mapData;
};

export const useReachOverTimeBrand = (filters, brand, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-brand_reach-over-time', filters, brand],
    queryFn: () => getReachOverTimeBrand(filters, brand),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

export const getSOVData = async (payload, brand, comp) => {
  const queryString = `${objectToQueryString({
    ...payload,
    brand_keywords: encloseWordsInDoubleQuotes(brand),
    competition_keywords: encloseWordsInDoubleQuotes(comp),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-brand/competition-sov?${queryString}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const mapData = JSON.parse(JSON.stringify(SOVMapData));

  const totalArticlesMapData = mapData.data.summary;
  const totalCount = response?.total_count
    ? response?.total_count
    : response && response.data
    ? response.data.reduce(
        (accumulator, currentValue) =>
          accumulator + (currentValue?.doc_count || 0),
        0
      )
    : 0;
  totalArticlesMapData.value = String(addCountPrefix(totalCount));
  mapData.data.summary = totalArticlesMapData;
  mapData.data.data =
    response?.data?.map((x) => {
      return {
        ...x,
        value: x?.doc_count,
        label: x.label.replace(/^"(.*)"$/, '$1'),
      };
    }) || [];

  mapData.data.legends = [
    ...comp.map((k) => k.toLowerCase()),
    ...brand.map((k) => k.toLowerCase()),
  ]?.map((x) => {
    return {
      label: x,
      value: String(x).toLowerCase(),
    };
  });

  // Create a map to store the index of each legend
  const legendIndexMap = {};
  mapData?.data?.legends?.forEach((legend, index) => {
    legendIndexMap[legend?.label] = index;
  });
  // Sort the list data using the custom comparison
  mapData?.data?.data?.sort(
    (a, b) => legendIndexMap[a?.label] - legendIndexMap[b?.label]
  );

  mapData.shouldShowGraph = response?.total_count;
  return mapData;
};

export const useSOVData = (filters, brand, competition, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-brand_competition-sov', filters, brand, competition],
    queryFn: () => getSOVData(filters, brand, competition),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

export const getCoverageOvertimeCompetitionData = async (
  payload,
  brand,
  comp
) => {
  const keywords = [...comp];
  const queryString = `${objectToQueryString({
    ...payload,
    brand_keywords: encloseWordsInDoubleQuotes(brand),
    competition_keywords: encloseWordsInDoubleQuotes(keywords),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-brand/competition-coverage-over-time?${queryString}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const mapData = JSON.parse(
    JSON.stringify(coverageOverTimeCompetitionMapData)
  );

  const totalArticlesMapData = mapData.data.summary;
  const totalCount = response?.total_count ? response?.total_count : 0;
  totalArticlesMapData.value = String(addCountPrefix(totalCount));
  mapData.data.summary = totalArticlesMapData;
  mapData.data.data =
    convertValuesToInt(response?.data, ['label', 'date'])?.map((x) => {
      const formattedDate = getFormattedDate(String(x?.date ?? x.label));
      const refinedXData = removeQuotesFromObjectKeys(x);
      return {
        ...refinedXData,
        ...x,
        label: formattedDate,
        date: x?.date ?? x.label,
      };
    }) || [];
  mapData.data.labels = [
    ...comp.map((k) => k.toLowerCase()),
    ...brand.map((k) => k.toLowerCase()),
  ]?.map((x) => {
    return {
      label: x,
      value: String(x).toLowerCase(),
    };
  });
  mapData.shouldShowGraph = response?.total_count;
  return mapData;
};

export const useCoverageOvertimeCompetition = (
  filters,
  brand,
  competition,
  isEnabled
) => {
  return useQuery({
    queryKey: [
      'dashboard-brand_competition-coverage-over-time',
      filters,
      brand,
      competition,
    ],
    queryFn: () =>
      getCoverageOvertimeCompetitionData(filters, brand, competition),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

export const getMediaType = async (payload, brand) => {
  const queryString = `${objectToQueryString({
    ...payload,
    brand_keywords: encloseWordsInDoubleQuotes(brand),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-brand/media-type?${queryString}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const mapData = JSON.parse(JSON.stringify(mediaTypeBrandMapData));

  const totalArticlesMapData = mapData.data.summary;
  const totalCount = response?.total_count ? response?.total_count : 0;
  totalArticlesMapData.value = String(addCountPrefix(totalCount));
  mapData.data.summary = totalArticlesMapData;
  const dataFromRes = response?.data;
  const udpatedDataFromRes = dataFromRes
    ?.map((item) => {
      const formattedDate = getFormattedDate(item?.label ?? item?.date);

      return {
        date: item?.label ?? item?.date,
        label: formattedDate,
        broadcast:
          item.media_type_count.find((type) => type.label === 'Broadcast')
            ?.value || 0,
        print:
          item.media_type_count.find((type) => type.label === 'Print')?.value ||
          0,
        online:
          item.media_type_count.find((type) => type.label === 'Online')
            ?.value || 0,
      };
    })
    .slice(0, 60);
  mapData.data.data = udpatedDataFromRes || [];
  mapData.shouldShowGraph = response?.total_count;
  return mapData;
};

export const useMediaTypeBrand = (filters, brand, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-brand_media-type', filters, brand],
    queryFn: () => getMediaType(filters, brand),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

function fillMissingProperties(dataArray, labelsArray) {
  return dataArray.map((dataObj) => {
    const newObj = { ...dataObj };

    newObj.label = newObj.label.replace(/^"(.*)"$/, '$1');

    labelsArray.forEach((labelObj) => {
      const { value } = labelObj;

      if (!newObj[value]) {
        newObj[value] = '0';
      }
    });

    return newObj;
  });
}

export const getArticleSentiment = async (payload, brand, comp) => {
  const keywords = [...comp];
  const queryString = `${objectToQueryString({
    ...payload,
    brand_keywords: encloseWordsInDoubleQuotes(brand),
    competition_keywords: encloseWordsInDoubleQuotes(keywords),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-brand/competition-sentiment?${queryString}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const mapData = JSON.parse(JSON.stringify(articleSentimentMapData));

  const totalArticlesMapData = mapData.data.summary;
  const totalCount = response?.total_count ? response?.total_count : 0;
  totalArticlesMapData.value = String(addCountPrefix(totalCount));
  mapData.data.summary = totalArticlesMapData;
  const labels = mapData?.data?.labels;
  mapData.data.data = fillMissingProperties(response?.data, labels);
  mapData.shouldShowGraph = response?.total_count;
  return mapData;
};

export const useArticleSentimentComp = (
  filters,
  brand,
  competition,
  isEnabled
) => {
  return useQuery({
    queryKey: [
      'dashboard-brand_competition-sentiment',
      filters,
      brand,
      competition,
    ],
    queryFn: () => getArticleSentiment(filters, brand, competition),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

export const getReachOverTimeCompData = async (payload, brand, comp) => {
  const keywords = [...comp];
  const queryString = `${objectToQueryString({
    ...payload,
    brand_keywords: encloseWordsInDoubleQuotes(brand),
    competition_keywords: encloseWordsInDoubleQuotes(keywords),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-brand/competition-reach-over-time?${queryString}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const mapData = JSON.parse(JSON.stringify(reachOverTimeCompMapData));

  // setting total count
  const totalArticlesMapData = mapData.data.summary;
  const totalCount = response?.total_count ? response?.total_count : 0;
  totalArticlesMapData.value = String(addCountPrefix(totalCount));
  mapData.data.summary = totalArticlesMapData;

  // setting data
  mapData.data.data =
    response?.data?.map((x) => {
      const formattedDate = getFormattedDate(x?.date ?? x.label);
      const refinedXData = removeQuotesFromObjectKeys(x);
      return {
        ...refinedXData,
        ...x,
        label: formattedDate,
        date: x?.date ?? x.label,
      };
    }) || [];
  // setting labels for graph
  mapData.data.labels = [
    ...comp.map((k) => k.toLowerCase()),
    ...brand.map((k) => k.toLowerCase()),
  ]?.map((x) => {
    return {
      label: x,
      value: String(x).toLowerCase(),
    };
  });
  mapData.shouldShowGraph = response?.total_count;
  return mapData;
};

export const useReachOverTimeComp = (
  filters,
  brand,
  competition,
  isEnabled
) => {
  return useQuery({
    queryKey: [
      'dashboard-brand_competition-reach-over-time',
      filters,
      brand,
      competition,
    ],
    queryFn: () => getReachOverTimeCompData(filters, brand, competition),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

export const getJournalistCoverageData = async (payload, brand, comp) => {
  const keywords = [...comp];
  const queryString = `${objectToQueryString({
    ...payload,
    brand_keywords: encloseWordsInDoubleQuotes(brand),
    competition_keywords: encloseWordsInDoubleQuotes(keywords),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-brand/competition-coverage-by-journalist?${queryString}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const mapData = JSON.parse(JSON.stringify(journalistMapBreakdown));

  // setting total count
  const totalArticlesMapData = mapData.data.summary;
  const totalCount = response?.total_count ? response?.total_count : 0;
  totalArticlesMapData.value = String(addCountPrefix(totalCount));
  mapData.data.summary = totalArticlesMapData;

  // setting data
  mapData.data.data = response?.data
    ? response?.data?.slice(0, 10)?.map((x) => {
        const label = x.label;
        const refinedXData = removeQuotesFromObjectKeys(x);
        return {
          ...refinedXData,
          ...x,
          label,
        };
      })
    : [];
  // setting labels for graph
  mapData.data.labels = [
    ...comp.map((k) => k.toLowerCase()),
    ...brand.map((k) => k.toLowerCase()),
  ]?.map((x) => {
    return {
      label: x,
      value: String(x).toLowerCase(),
    };
  });
  mapData.shouldShowGraph = response?.total_count;
  return mapData;
};

export const useJournalistCoverageComp = (
  filters,
  brand,
  competition,
  isEnabled
) => {
  return useQuery({
    queryKey: [
      'dashboard-brand_competition-coverage-by-journalist',
      filters,
      brand,
      competition,
    ],
    queryFn: () => getJournalistCoverageData(filters, brand, competition),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

export const getMediaBreakDownMedia = async (payload, brand, comp) => {
  const keywords = [...comp];
  const queryString = `${objectToQueryString({
    ...payload,
    brand_keywords: encloseWordsInDoubleQuotes(brand),
    competition_keywords: encloseWordsInDoubleQuotes(keywords),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-brand/competition-breakdown-by-mediatype?${queryString}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const mapData = JSON.parse(JSON.stringify(mediaBreakDownMapData));

  // setting total count
  const totalArticlesMapData = mapData.data.summary;
  const totalCount = response?.total_count ? response?.total_count : 0;
  totalArticlesMapData.value = String(addCountPrefix(totalCount));
  mapData.data.summary = totalArticlesMapData;
  const categories = ['Online', 'Print', 'Broadcast'];
  // setting data
  mapData.data.data = mapSampleDataToData(response?.data, categories);
  // setting labels for graph
  mapData.data.labels = [
    ...comp.map((k) => k.toLowerCase()),
    ...brand.map((k) => k.toLowerCase()),
  ]?.map((x) => {
    return {
      label: x,
      value: String(x).toLowerCase(),
    };
  });
  mapData.shouldShowGraph = response?.total_count;
  return mapData;
};

function mapSampleDataToData(sampleData, categories) {
  const findValue = (array, category) => {
    return array.find((x) => String(x?.label).includes(category))?.value || 0;
  };

  const resultData = categories.map((category) => {
    const result = { label: category };

    sampleData.forEach((data) => {
      result[data.label.replace(/^"(.*)"$/, '$1')] = findValue(
        data?.value,
        category
      );
    });

    return result;
  });

  return resultData;
}

export const useMediaBreakDownMediaType = (
  filters,
  brand,
  competition,
  isEnabled
) => {
  return useQuery({
    queryKey: [
      'dashboard-brand_competition-breakdown-by-mediatype',
      filters,
      brand,
      competition,
    ],
    queryFn: () => getMediaBreakDownMedia(filters, brand, competition),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

export const getSourcesComp = async (payload, brand, comp) => {
  const keywords = [...comp];
  const queryString = `${objectToQueryString({
    ...payload,
    brand_keywords: encloseWordsInDoubleQuotes(brand),
    competition_keywords: encloseWordsInDoubleQuotes(keywords),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-brand/competition-coverage-by-source?${queryString}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const mapData = JSON.parse(JSON.stringify(sourcesMapData));
  // mapData.shouldShowGraph = true;
  // return mapData;

  // setting total count
  const totalArticlesMapData = mapData.data.summary;
  const totalCount = response?.total_count ? response?.total_count : 0;
  totalArticlesMapData.value = String(addCountPrefix(totalCount));
  mapData.data.summary = totalArticlesMapData;

  // setting data
  const updatedData = response?.data?.map((x) => {
    const result = {};
    result.label = x.source_label;
    const value = [];
    Object.keys(x).forEach((y) => {
      if (y !== 'source_label' && y !== 'source_count') {
        const keywordsData = {};
        keywordsData.label = y;
        keywordsData.value = x[y]?.buckets?.map((doc) => {
          return {
            label: doc?.key,
            value: doc?.doc_count,
          };
        });
        value.push({ ...keywordsData });
      }
    });
    result.value = value?.sort((a, b) => a?.label?.localeCompare(b?.label));
    return result;
  });

  const filteredData = updatedData.filter((x) => {
    const isEmpty = x.value.some((keyword) => keyword?.value.length > 0);
    return isEmpty;
  });
  mapData.data.data = filteredData ? filteredData?.slice(0, 10) : [];
  // setting labels for graph
  mapData.data.legends = [...brand, ...comp]?.sort()?.map((x) => {
    return {
      label: x,
      value: String(x),
    };
  });
  mapData.shouldShowGraph = response?.total_count;
  return mapData;
};

export const useSourcesCompData = (filters, brand, competition, isEnabled) => {
  return useQuery({
    queryKey: [
      'dashboard-brand_competition-coverage-by-source',
      filters,
      brand,
      competition,
    ],
    queryFn: () => getSourcesComp(filters, brand, competition),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};
