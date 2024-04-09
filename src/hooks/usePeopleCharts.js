import { useQuery } from '@tanstack/react-query';
import { get } from '../service';
import { API } from '../constants';
import { objectToQueryString } from './useSearch';
import {
  volumeAnalysis,
  topJournalistBySentiment,
  topSourceBySentiment,
  peopleCoverage,
  peoplePopularTopics,
  mediaType,
} from './data/peopleData';
import {
  addCountPrefix,
  calculatePercentageIncrease,
  toCamelCase,
} from '../constants/utils';
import { format, parseISO } from 'date-fns';
import { getFormattedDate } from './useCharts';

// people dashboard volume analysis
const getDashboardVolumeAnalysisData = async (payload, people) => {
  const queryString = `${objectToQueryString({
    ...payload,
    person_name: encloseWordsInDoubleQuotes(people),
  })}`;
  const { data: response } = await get(
    `${API}/dashboard-people/volume-analysis?${queryString}`,
    {}
  );

  const volumAnalysisMapData = JSON.parse(
    JSON.stringify(volumeAnalysis)
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

export const useDashboardPeopleAnalysisData = (filters, people, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard_people-volume-analysis', filters, people],
    queryFn: () => getDashboardVolumeAnalysisData(filters, people),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};
// people sentiments
export const getPeopleSentimentChartData = async (payload, people) => {
  const queryString = `${objectToQueryString({
    ...payload,
    person_name: encloseWordsInDoubleQuotes(people),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-people/source-sentiment-analysis?${queryString}`,
    {}
  );

  if (!response) {
    response = [];
  }

  const sentimentChartMapData = JSON.parse(
    JSON.stringify(topSourceBySentiment)
  );

  sentimentChartMapData.data.data = response.data.map((item) => ({
    label: item.label,
    neg: item.negative.toString(),
    pos: item.positive.toString(),
    neu: item.neutral.toString(),
  }));
  sentimentChartMapData.data.summary.value = String(
    addCountPrefix(response?.total_count)
  );
  sentimentChartMapData.shouldShowGraph = response?.total_count > 0;
  return sentimentChartMapData;
};

export const usePeopleDashboardSentimentChartData = (
  filters,
  people,
  isEnabled
) => {
  return useQuery({
    queryKey: ['dashboard-people_sentiment-analysis', filters, people],
    queryFn: () => getPeopleSentimentChartData(filters, people),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

export const encloseWordsInDoubleQuotes = (data) => {
  return data.map((item) => {
    const regex = /^"(.*)"$/;
    if (regex.test(item)) {
      return item;
    }
    return `"${item}"`;
  });
};
// get journalist data
export const getPeopleJournalistSentimetChart = async (payload, people) => {
  people.map((item) => `"${item}"`);
  const queryString = `${objectToQueryString({
    ...payload,
    person_name: encloseWordsInDoubleQuotes(people),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-people/journalist-sentiment-analysis?${queryString}`,
    {}
  );

  if (!response) {
    response = [];
  }

  const mapData = JSON.parse(JSON.stringify(topJournalistBySentiment));

  mapData.data.data = response.data.map((item) => {
    const label = toCamelCase(item?.label);
    return {
      author_id: item.author_id,
      label,
      positive: item.positive,
      negative: item.negative,
      neutral: item.neutral,
    };
  });
  mapData.data.summary.value = String(addCountPrefix(response?.total_count));
  mapData.shouldShowGraph = response?.total_count > 0;
  return mapData;
};

export const usePeopleDashboardJournalistSentimetChart = (
  filters,
  people,
  isEnabled
) => {
  return useQuery({
    queryKey: ['dashboard-people_journalist_sentiment', filters, people],
    queryFn: () => getPeopleJournalistSentimetChart(filters, people),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

// get coverage
export const getPeopleCoverageChart = async (payload, people) => {
  const queryString = `${objectToQueryString({
    ...payload,
    person_name: encloseWordsInDoubleQuotes(people),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-people/coverage-over-time?${queryString}`,
    {}
  );

  if (!response) {
    response = [];
  }

  const mapData = JSON.parse(JSON.stringify(peopleCoverage));

  const totalArticlesMapData = mapData.data.summary;

  totalArticlesMapData.value = String(addCountPrefix(response?.total_count));
  mapData.data.summary = totalArticlesMapData;
  mapData.data.data = response?.data?.map((x) => {
    const formattedDate = getFormattedDate(x?.label ?? x?.date);
    return {
      ...x,
      label: formattedDate,
      gucci: String(x?.value),
      date: x?.label ?? x?.date,
    };
  });
  mapData.data.summary.value = String(addCountPrefix(response?.total_count));
  mapData.shouldShowGraph = response?.total_count > 0;
  return mapData;
};

export const usePeopleCoverageChart = (filters, people, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-people_coverage', filters, people],
    queryFn: () => getPeopleCoverageChart(filters, people),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

// get popular topics
export const getPeoplePopularTopicsChart = async (payload, people) => {
  const queryString = `${objectToQueryString({
    ...payload,
    person_name: encloseWordsInDoubleQuotes(people),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-people/top-themes?${queryString}`,
    {}
  );

  if (!response) {
    response = [];
  }

  const mapData = JSON.parse(JSON.stringify(peoplePopularTopics));

  mapData.data.data = response?.data?.map((item) => ({
    label: item.label,
    value: item.article_count,
    color: getRandomColor(),
  }));

  mapData.data.summary.value = String(addCountPrefix(response?.total_count));
  mapData.shouldShowGraph = response?.total_count > 0;
  return mapData;
};

export const usePeoplePopularTopicsChart = (filters, people, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-people_popular_topics', filters, people],
    queryFn: () => getPeoplePopularTopicsChart(filters, people),
    enabled: !!isEnabled,
    refetchOnWindowFocus: false,
  });
};

// Function to generate random colors
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// get media type
export const getPeopleMediaTypeChart = async (payload, people) => {
  const queryString = `${objectToQueryString({
    ...payload,
    person_name: encloseWordsInDoubleQuotes(people),
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-people/media-type?${queryString}`,
    {}
  );

  if (!response) {
    response = [];
  }

  const mapData = JSON.parse(JSON.stringify(mediaType));

  mapData.data.data = response.data.map((item) => {
    const formattedDate = getFormattedDate(item?.label || item?.date);

    return {
      date: item?.label || item?.date,
      label: formattedDate,
      broadcast:
        item.media_type_count.find((type) => type.label === 'Broadcast')
          ?.value || 0,
      print:
        item.media_type_count.find((type) => type.label === 'Print')?.value ||
        0,
      online:
        item.media_type_count.find((type) => type.label === 'Online')?.value ||
        0,
    };
  });
  mapData.data.summary.value = String(addCountPrefix(response?.total_count));
  mapData.shouldShowGraph = response?.total_count > 0;
  return mapData;
};

export const usePeopleMediaTypeChart = (filters, people, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-people_media_type', filters, people],
    queryFn: () => getPeopleMediaTypeChart(filters, people),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};
