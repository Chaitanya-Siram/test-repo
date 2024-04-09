import { useQuery } from '@tanstack/react-query';
import { get } from '../service';
import { API } from '../constants';
import { objectToQueryString } from './useSearch';
import {
  authorImpactMapData,
  compaignMapData,
  congruenceMapData,
  prImpactMapData,
  sentimentByThemes,
} from './data/advancedDashboardData';
import { addCountPrefix } from '../constants/utils';
import { format, parseISO } from 'date-fns';

const getCampaignAnalysisData = async (payload, campaingData) => {
  const queryString = `${objectToQueryString({
    ...payload,
    campaign_name: JSON.stringify(
      campaingData?.map((x) => {
        return {
          name: x.name,
          keyword: x.keywords,
        };
      })
    ),
  })}`;
  const { data: response } = await get(
    `${API}/dashboard-advanced/campaign-monitor?${queryString}`,
    {}
  );

  const data = JSON.parse(JSON.stringify(compaignMapData));

  const newArray = [];

  const totalCount = response.data.reduce(
    (a, c) => a + ((c.positive || 0) + (c.negative || 0)),
    0
  );
  response.data.forEach((dataPoint, index) => {
    const xValue = dataPoint.net_sentiment;

    const yValue = dataPoint.campaign_reach;
    const radius = Number(
      ((dataPoint.positive + dataPoint?.negative) / totalCount).toFixed(2)
    );
    const articleCount = dataPoint.campaign_count;

    const newObject = {
      label: dataPoint.label,
      xValue: parseFloat(xValue.toFixed(2)),
      yValue,
      radius: (radius / 2).toFixed(2).toString(),
      color: '#FFB45C',
      articleCount,
    };

    newArray.push(newObject);
  });

  const totalArticlesMapData = data.summary;
  totalArticlesMapData.value = String(addCountPrefix(response?.total_count));
  data.summary = totalArticlesMapData;
  data.data = newArray || [];
  return data;
};

export const useCampaignAnalysisData = (filters, campaingData, isEnabled) => {
  return useQuery({
    queryKey: [
      'dashboard-advanced_campaign-monitor',
      filters,
      JSON.stringify(campaingData),
    ],
    queryFn: () => getCampaignAnalysisData(filters, campaingData),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

const getAuthorImpactData = async (filters) => {
  const queryString = `${objectToQueryString({
    ...filters,
  })}`;
  const { data: response } = await get(
    `${API}/dashboard-advanced/author-impact?${queryString}`,
    {}
  );
  const data = JSON.parse(JSON.stringify(authorImpactMapData));

  const totalArticlesMapData = data.summary;
  totalArticlesMapData.value = String(addCountPrefix(response?.total_count));
  data.summary = totalArticlesMapData;

  const result = {
    no_articles: [],
    prominence: [],
    sentiment: [],
    total_ave: [],
    total_reach: [],
  };
  response?.data.forEach((item) => {
    result.no_articles.push({
      label: item.key,
      value: item.doc_count || 0,
      color: '#DE1D83',
      tooltipInfo: {},
    });
    result.prominence.push({
      label: item.key,
      value: item.authors_prominence || 0,
      color: '#FF9315',
      tooltipInfo: {},
    });
    result.sentiment.push({
      label: item.key,
      value: item.net_sentiment < 0 ? 0 : item.net_sentiment || 0,
      color: '#22AAFF',
      tooltipInfo: {},
    });
    result.total_ave.push({
      label: item.key,
      value: item.authors_ave || 0,
      color: '#00D7A3',
      tooltipInfo: {},
    });
    result.total_reach.push({
      label: item.key,
      value: item.authors_reach || 0,
      color: '#8393C7',
      tooltipInfo: {},
    });
  });

  data.data.no_articles.data = result.no_articles;
  data.data.total_reach.data = result.total_reach;
  data.data.total_ave.data = result.total_ave;
  data.data.prominance.data = result.prominence;
  data.data.sentiment.data = result.sentiment;

  return data;
};

export const useAuthorCompact = (filters, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-advanced_author-compact', filters],
    queryFn: () => getAuthorImpactData(filters),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

const getSentimentThemes = async (filters) => {
  const queryString = `${objectToQueryString({
    ...filters,
  })}`;
  const { data: response } = await get(
    `${API}/dashboard-advanced/sentiments-by-themes?${queryString}`,
    {}
  );
  const data = JSON.parse(JSON.stringify(sentimentByThemes));

  const totalArticlesMapData = data.summary;
  totalArticlesMapData.value = String(
    addCountPrefix(response?.total_count || 0)
  );
  data.summary = totalArticlesMapData;

  data.data.data = response?.data || [];
  return data;
};
export const useSentimentByThemes = (filters, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-advanced_sentiments-by-themes', filters],
    queryFn: () => getSentimentThemes(filters),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

const getCongruenceData = async (filters, communicationData) => {
  const queryString = `${objectToQueryString({
    ...filters,
    brand_communication_keywords: JSON.stringify(
      communicationData
        ?.map((x) => {
          return {
            name: x.name,
            keyword: x.keywords,
          };
        })
        .filter((x) => x.keyword)
    ),
  })}`;
  const { data: response } = await get(
    `${API}/dashboard-advanced/message-congruence?${queryString}`,
    {}
  );
  const data = JSON.parse(JSON.stringify(congruenceMapData));

  const totalArticlesMapData = data.summary;
  totalArticlesMapData.value = String(addCountPrefix(response?.total_count));
  data.summary = totalArticlesMapData;

  let dataFromRes = response?.data;
  dataFromRes = dataFromRes.map((obj) => ({
    ...obj,
    subLabel: '',
    Broadcast:
      obj?.distinct_media_count?.find((x) => x.key === 'Broadcast')
        ?.media_count_percent || 0,
    Print:
      obj?.distinct_media_count?.find((x) => x.key === 'Print')
        ?.media_count_percent || 0,
    Online:
      obj?.distinct_media_count?.find((x) => x.key === 'Online')
        ?.media_count_percent || 0,
    BrodCastDocCount:
      obj?.distinct_media_count?.find((x) => x.key === 'BrodCast')?.doc_count ||
      0,
    PrintDocCount:
      obj?.distinct_media_count?.find((x) => x.key === 'Print')?.doc_count || 0,
    OnlineDocCount:
      obj?.distinct_media_count?.find((x) => x.key === 'Online')?.doc_count ||
      0,
  }));
  data.data.data = dataFromRes || [];
  return data;
};

export const useCongruence = (filters, advancedOptions, isEnabled) => {
  return useQuery({
    queryKey: [
      'dashboard-advanced_message-congruence',
      filters,
      advancedOptions,
    ],
    queryFn: () => getCongruenceData(filters, advancedOptions),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};

const getPRData = async (filters, keywords) => {
  const queryString = `${objectToQueryString({
    ...filters,
    brand_communication_keywords: keywords,
  })}`;
  const { data: response } = await get(
    `${API}/dashboard-advanced/pr-impact?${queryString}`,
    {}
  );

  const data = JSON.parse(JSON.stringify(prImpactMapData));
  data.gauge.summary.value =
    parseInt(response?.gauge) < 0 ? 0 : parseInt(response?.gauge);
  data.gauge.summary.rawValue = Number(response.gauge).toFixed(2);
  data.column.data.data = response?.data?.map((x) => {
    const dateString = x?.label;
    const date = parseISO(dateString);
    const formattedDate = format(date, 'dd MMM yy');
    const getColor = (count) => {
      if (count <= 10) {
        return '#ED3F47';
      } else if (count > 10 && count <= 40) {
        return '#FF8C00';
      }
      return '#00CE75';
    };
    return {
      label: formattedDate,
      value: x.pr_impact,
      color: getColor(x.pr_impact),
      count: x.doc_count,
    };
  });
  return data;
};
export const usePRImpact = (filters, keywords, isEnabled) => {
  return useQuery({
    queryKey: ['dashboard-advanced_pr-impact', filters, keywords],
    queryFn: () => getPRData(filters, keywords),
    refetchOnWindowFocus: false,
    enabled: !!isEnabled,
  });
};
