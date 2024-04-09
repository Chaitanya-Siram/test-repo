import { useQuery } from '@tanstack/react-query';
import { get } from '../service';
import { API } from '../constants';
import { objectToQueryString } from './useSearch';
import {
  volumeAnalysis,
  sentimentAnalysis,
  coverageByJournalist,
  coverageBySource,
  companiesMentioned,
  coverageOverTime,
  coverageByPublication,
} from './data/IndustryData';
import {
  addCountPrefix,
  calculatePercentage,
  calculatePercentageIncrease,
  toCamelCase,
} from '../constants/utils';
import { format, parseISO } from 'date-fns';
import { getFormattedDate } from './useCharts';

// industry vol analysis
const getDashboardVolumeAnalysisData = async (payload) => {
  const queryString = `${objectToQueryString({
    ...payload,
  })}`;
  const { data: response } = await get(
    `${API}/dashboard-industry/volume-analysis?${queryString}`,
    {}
  );

  const volumAnalysisMapData = JSON.parse(JSON.stringify(volumeAnalysis));

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

export const useDashboardIndustryAnalysisData = (filters, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard_industry-volume-analysis', filters],
    queryFn: () => getDashboardVolumeAnalysisData(filters),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

// industry sentiment analysis
export const getIndustrySentimentChartData = async (payload) => {
  const queryString = `${objectToQueryString({
    ...payload,
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-industry/sentiment-analysis?${queryString}`,
    {}
  );

  if (!response) {
    response = [];
  }

  const sentimentChartMapData = JSON.parse(JSON.stringify(sentimentAnalysis));
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
  sentimentChartMapData.shouldShowGraph = response?.total_count;
  return sentimentChartMapData;
};

export const useIndustryDashboardSentimentChartData = (filters, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-industry_sentiment-analysis', filters],
    queryFn: () => getIndustrySentimentChartData(filters),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

// get coverage over time
export const getCoverageOvertimeData = async (payload) => {
  const queryString = `${objectToQueryString({
    ...payload,
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-industry/coverage-over-time?${queryString}`,
    {}
  );

  if (!response) {
    response = {};
  }

  const mapData = JSON.parse(JSON.stringify(coverageOverTime));

  const coverageMapData = mapData.data.summary;
  const totalCount = response?.total_count
    ? response?.total_count
    : response && response.data
    ? response.data.reduce(
        (accumulator, currentValue) => accumulator + (currentValue?.value || 0),
        0
      )
    : 0;
  coverageMapData.value = String(addCountPrefix(totalCount));
  mapData.data.summary = coverageMapData;
  mapData.data.data =
    response?.data?.map((x) => {
      const formattedDate = getFormattedDate(x?.date ?? x.label);
      return {
        ...x,
        label: formattedDate,
        value: String(x?.value),
        date: x?.label ?? x?.date,
      };
    }) || [];
  mapData.shouldShowGraph = response?.total_count > 0;
  return mapData;
};

export const useIndustryCoverageOvertime = (filters, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-industry_coverage-over-time', filters],
    queryFn: () => getCoverageOvertimeData(filters),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

// coverage by source
export const getIndustryCoverageBySource = async (payload) => {
  const queryString = `${objectToQueryString({
    ...payload,
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-industry/coverage-by-source?${queryString}`,
    {}
  );

  if (!response) {
    response = [];
  }

  const coverageBySourceData = JSON.parse(JSON.stringify(coverageBySource));

  coverageBySourceData.data.data = response.data.map((item) => {
    const formattedDate = getFormattedDate(item?.date ?? item.label);
    const onlineValue = item.media_type_count.find(
      (media) => media.label === 'Online'
    )?.value;
    const printValue = item.media_type_count.find(
      (media) => media.label === 'Print'
    )?.value;
    const broadcastValue = item.media_type_count.find(
      (media) => media.label === 'Broadcast'
    )?.value;
    return {
      date: item?.label ?? item?.date,
      label: formattedDate,
      broadcast: broadcastValue ? broadcastValue.toString() : '0',
      print: printValue ? printValue.toString() : '0',
      online: onlineValue ? onlineValue.toString() : '0',
    };
  });

  // Modify summary value based on the total count received from API
  coverageBySourceData.data.summary.value = String(
    addCountPrefix(response.total_count)
  );
  coverageBySourceData.shouldShowGraph = response?.total_count > 0;
  return coverageBySourceData;
};

export const useIndustryCoverageBySource = (filters, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-industry_coverage-by-source', filters],
    queryFn: () => getIndustryCoverageBySource(filters),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

// publications
export const getIndustryPublications = async (payload) => {
  const queryString = `${objectToQueryString({
    ...payload,
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-industry/top-publications?${queryString}`,
    {}
  );

  if (!response) {
    response = [];
  }

  const publications = JSON.parse(JSON.stringify(coverageByPublication));
  const slicedData = response.data.slice(0, 5); // Take only the first five items

  publications.data.data = slicedData.map((item) => ({
    label: item.label,
    value: item.value,
  }));

  publications.data.summary.value = String(
    addCountPrefix(response.total_count)
  );
  publications.shouldShowGraph = response.total_count > 0;
  return publications;
};

export const useIndustryPublications = (filters, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-industry_publications', filters],
    queryFn: () => getIndustryPublications(filters),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

// companies mentioned
export const getIndustryCompanies = async (payload) => {
  const queryString = `${objectToQueryString({
    ...payload,
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-industry/companies-mentioned-analysis?${queryString}`,
    {}
  );

  if (!response) {
    response = [];
  }

  const companies = JSON.parse(JSON.stringify(companiesMentioned));

  companies.data.data = response.data.map((item) => ({
    label: item.label,
    value: item.article_count,
  }));
  companies.data.summary.value = String(addCountPrefix(response?.total_count));
  companies.shouldShowGraph = response?.total_count > 0;
  return companies;
};

export const useIndustryCompanies = (filters, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-industry_companies', filters],
    queryFn: () => getIndustryCompanies(filters),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

// coverage by journalists
export const getIndustryCoverageByJournalists = async (payload) => {
  const queryString = `${objectToQueryString({
    ...payload,
  })}`;
  let { data: response } = await get(
    `${API}/dashboard-industry/coverage-by-journalist?${queryString}`,
    {}
  );

  if (!response) {
    response = [];
  }

  const journalistCoverage = JSON.parse(JSON.stringify(coverageByJournalist));

  journalistCoverage.data.data = response.data.map((item) => {
    const label = toCamelCase(item.label);
    return {
      author_id: item.author_id,
      label,
      value: item.value,
    };
  });
  journalistCoverage.data.summary.value = String(
    addCountPrefix(response?.total_count)
  );
  journalistCoverage.shouldShowGraph = response.total_count > 0;
  return journalistCoverage;
};

export const useIndustryCoverageByJournalists = (filters, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-industry_journalist', filters],
    queryFn: () => getIndustryCoverageByJournalists(filters),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};
