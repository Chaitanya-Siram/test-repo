import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import {
  axiosGet,
  get,
  axiosPost,
  axiosDel,
  axiosUpdate,
  getWithBody,
} from '../service';
import { API, getAuthHeaders } from '../constants';

const getArticleData = (
  limit,
  page,
  type,
  theme,
  search,
  sort,
  filter,
  id,
  widget,
  graphSelection
) => {
  return axiosGet('/articles', {
    limit: limit || 50,
    page: page * 50,
    tab: type,
    theme,
    search,
    sort,
    filter,
    id,
    widget,
    graphSelection,
  });
};

const getNewsLetterData = (newsLetterId) => {
  return axiosGet('/news-letter', {
    newsLetterId,
  });
};

const getSavedSearchData = (savedSearchId) => {
  return axiosGet('/savedSearchData', {
    savedSearchId,
  });
};

const getSearchData = (searchId) => {
  return axiosGet('/searchData', {
    searchId,
  });
};

export function objectToQueryString(obj) {
  const queryString = Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');

  return queryString;
}

export const handleSearchPost = (payload) => {
  const authHeaders = getAuthHeaders();
  return axiosPost(
    `${API}/search/get-search-data-v2?${objectToQueryString(payload)}`,
    {},
    {
      ...authHeaders,
    }
  );
};

export const handleSearchPostV1 = (payload) => {
  return get(`${API}/search/get-search-data?${objectToQueryString(payload)}`);
};

export const getSearchDataByTags = (payload) => {
  return get(
    `${API}/search-articles/tags/articles?${objectToQueryString(payload)}`
  );
};

// const handleSearchUpdate = (payload) => {
//   return axiosPutRequest(
//     '/api/search',
//     {
//       searchId,
//     },
//     payload
//   );
// };

const getDashboardData = (searchId, dashboardType, dashboardId) => {
  return axiosGet('/dashboard-data', {
    searchId,
    dashboardType,
    dashboardId,
  });
};

const getSearchFilterData = () => {
  return get(`${API}/search-filters`, {});
};
const getCustomSourcesFilter = () => {
  return axiosGet('/custom-sources', {});
};

export const useSearchData = (searchId) => {
  return useQuery({
    queryKey: ['search-data', searchId],
    queryFn: () => getSearchData(searchId),
    refetchOnWindowFocus: false,
  });
};

export const usePostSearchData = () => {
  return useMutation({ mutationFn: handleSearchPost });
};

export const usePostSearchDataV1 = () => {
  return useMutation({ mutationFn: handleSearchPostV1 });
};

export const usePostSearchDataTags = () => {
  return useMutation({ mutationFn: getSearchDataByTags });
};
// export const useUpdateSearchData = (searchId, onSuccess, onMutate) => {
//   return useMutation(handleSearchUpdate, {
//     onSuccess: () => {
//       onSuccess();
//     },
//     onMutate: () => {
//       onMutate();
//     },
//   });
// };

export const useDashboardData = (
  searchId,
  dashboardType,
  dependent = false,
  dashboardId
) => {
  return useQuery({
    queryKey: ['dashboard-data', searchId, dashboardType, dashboardId],
    queryFn: () => getDashboardData(searchId, dashboardType, dashboardId),
    refetchOnWindowFocus: false,
    ...(dependent && { enabled: !!searchId }),
  });
};

export const useArticleData = (
  limit,
  page,
  type,
  theme,
  searchKey,
  sort,
  filter,
  id,
  enabled = true,
  widget,
  graphSelection
) => {
  return useQuery({
    queryKey: [
      'articles',
      limit,
      page,
      type,
      theme,
      searchKey,
      sort,
      filter,
      id,
      widget,
      graphSelection,
    ],
    queryFn: () =>
      getArticleData(
        limit,
        page,
        type,
        theme,
        searchKey,
        sort,
        filter,
        id,
        widget,
        graphSelection
      ),
    refetchOnWindowFocus: false,
    enabled,
  });
};

export const useSearchFilterData = (userId) => {
  return useQuery({
    queryKey: ['search-filter'],
    queryFn: () => getSearchFilterData(),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
};

const getSourceFilterData = (domain) => {
  let query = '';
  if (domain) {
    query = `?domain=${domain}`;
  }
  return get(`${API}/search-filters/sources${query}`, {});
};

export const useSourceFilterData = (payload, isEnabled = true) => {
  return useQuery({
    queryKey: ['search-filter_sources', payload],
    queryFn: () => getSourceFilterData(payload),
    refetchOnWindowFocus: false,
    enabled: isEnabled,
  });
};

export const useCustomSourcesFilterData = () => {
  return useQuery({
    queryKey: ['custom-sources'],
    queryFn: () => getCustomSourcesFilter(),
    refetchOnWindowFocus: false,
  });
};

export const useNewsLetterData = (newsLetterId) => {
  return useQuery({
    queryKey: ['newsletter-data', newsLetterId],
    queryFn: () => getNewsLetterData(newsLetterId),
    refetchOnWindowFocus: false,
  });
};

export const useSavedSearchData = (savedSearchId) => {
  return useQuery({
    queryKey: ['saved-search-data', savedSearchId],
    queryFn: () => getSavedSearchData(savedSearchId),
    refetchOnWindowFocus: false,
    enabled: !!savedSearchId,
  });
};

const getCustomResourceData = async (userId) => {
  const { isSuccessful, data } = await get(
    `${API}/search-filters/custom-sources-list/${userId}`,
    {}
  );
  const res = {
    details: [],
    total_count: 0,
  };
  if (isSuccessful) {
    const sources = data?.details;
    const mappedData = sources?.map((source) => {
      return {
        ...source,
        include: source.custom_source_filters
          ?.filter((x) => x.filter_type === 1)
          ?.map((include) => {
            return {
              ...include,
              label: include.source_name,
              value: include.source_value,
            };
          }),
        exclude: source.custom_source_filters
          ?.filter((x) => x.filter_type === 2)
          .map((include) => {
            return {
              ...include,
              label: include.source_name,
              value: include.source_value,
            };
          }),
      };
    });
    res.details = mappedData;
  }
  return { data: res };
};

export const useCustomSorcesData = (userUserId) => {
  const [userId, setUserId] = useState(userUserId);
  useEffect(() => {
    if (userUserId) {
      setUserId(userUserId);
    }
  }, [userUserId]);
  return useQuery({
    queryKey: ['custom-sources-list', userId],
    queryFn: () => getCustomResourceData(userId),
    enabled: userId !== null,
    refetchOnWindowFocus: false,
  });
};

export const createCustomSource = (payload) => {
  return axiosPost(`${API}/search-filters/custom-source`, payload, {});
};

export const useCreateCustomResource = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCustomSource,
    onSuccess: () => {
      queryClient.invalidateQueries(['custom-sources-list', userId]);
    },
  });
};

export const updateCustomSourceFilters = (payload) => {
  return axiosPost(
    `${API}/search-filters/custom-source-filter-values`,
    payload,
    {}
  );
};

export const useAddSources = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCustomSourceFilters,
    onSuccess: () => {
      queryClient.invalidateQueries(['custom-sources-list', userId]);
    },
  });
};

export const deleteCustomSource = (sourceId) => {
  return axiosDel(`${API}/search-filters/custom-source/${sourceId}`, {});
};

export const useDeleteSource = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomSource,
    onSuccess: () => {
      queryClient.invalidateQueries(['custom-sources-list', userId]);
    },
  });
};

export const updateCustomSource = (payload) => {
  return axiosUpdate(`${API}/search-filters/custom-source`, payload, {});
};

export const useUpdateCustomSource = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCustomSource,
    onSuccess: () => {
      queryClient.invalidateQueries(['custom-sources-list', userId]);
    },
  });
};

const getSavedChartNames = (searchId) => {
  const authHeaders = getAuthHeaders();
  return get(`${API}/search/saved-search-visual?saved_search_id=${searchId}`, {
    ...authHeaders,
  });
};

export const useGetSavedChartNames = (searchId) => {
  return useQuery({
    queryKey: ['search_saved-search-visual', searchId],
    queryFn: () => getSavedChartNames(searchId),
    refetchOnWindowFocus: false,
    enabled: searchId !== 'custom-search' && !!searchId,
  });
};

export const createOrUpdatechartName = (payload) => {
  return axiosPost(`${API}/search/saved-search-visual`, payload, {
    ...getAuthHeaders(),
  });
};

export const useUpdateChartNames = (searchId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrUpdatechartName,
    onSuccess: () => {
      queryClient.invalidateQueries(['search_saved-search-visual', searchId]);
    },
  });
};

export const createCommentBySearchId = (payload) => {
  return axiosPost(`${API}/search-articles/comment`, payload, {
    ...getAuthHeaders(),
  });
};

export const useCreateCommentBySearchId = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCommentBySearchId,
    onSuccess: () => {
      queryClient.invalidateQueries(['search_article_comments']);
    },
  });
};

export const getCreateCommentBySearchId = (payload) => {
  const authHeaders = getAuthHeaders();
  if (payload !== 'custom-search') {
    return get(`${API}/search-articles/comment?search_id=${payload}`, {
      ...authHeaders,
    });
  }
};

export const useGetCreateCommentBySearchId = (searchId) => {
  return useQuery({
    queryKey: ['search_article_comments', searchId],
    queryFn: () => getCreateCommentBySearchId(searchId),
    refetchOnWindowFocus: false,
    // enabled: searchId !== 'custom-search',
  });
};

export const deleteArticleComment = (payload) => {
  const authHeaders = getAuthHeaders();
  return axiosDel(
    `${API}/search-articles/comment`,
    { ...authHeaders },
    payload
  );
};

export const useDeleteArticleComment = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteArticleComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['search_article_comments', userId]);
    },
  });
};

export const createTagsBySearchId = (payload) => {
  return axiosPost(
    `${API}/search-articles/tags?tags=${payload?.tags}&recent_search_id=${payload?.recent_search_id}&article_id=${payload?.article_id}`,
    {},
    {
      ...getAuthHeaders(),
    }
  );
};

export const useCreateTagsBySearchId = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTagsBySearchId,
    onSuccess: () => {
      queryClient.invalidateQueries(['search_article_tags']);
      queryClient.invalidateQueries(['articleThemeData']);
    },
  });
};

export const getCreateTagBySearchId = (payload) => {
  const authHeaders = getAuthHeaders();
  // savedSearchId !== 'custom-search' ? savedSearchId : '';
  if (payload !== 'custom-search') {
    return get(
      `${API}/search-articles/tags?search_id=${payload}&article_id=9554ccb5e7b248c4b8b2a13f9ca9c659`,
      {
        ...authHeaders,
      }
    );
  }
};

export const useGetCreateTagBySearchId = (searchId) => {
  return useQuery({
    queryKey: ['search_article_tags', searchId],
    queryFn: () => getCreateTagBySearchId(searchId),
    refetchOnWindowFocus: false,
    // enabled: searchId !== 'custom-search',
  });
};

export const deleteArticleTagBySearchId = (payload) => {
  const authHeaders = getAuthHeaders();
  return axiosDel(
    `${API}/search-articles/tags?recent_search_id=${payload?.recent_search_id}&article_id=${payload?.article_id}`,
    { ...authHeaders },
    {}
  );
};

export const useDeleteArticleTagBySearchId = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteArticleTagBySearchId,
    onSuccess: () => {
      queryClient.invalidateQueries(['search_article_tags']);
      queryClient.invalidateQueries(['articleThemeData']);
    },
  });
};

export const editArticleTags = (payload) => {
  const tags = payload?.tags.toString();
  const authHeaders = getAuthHeaders();
  return axiosUpdate(
    `${API}/search-articles/tags?tags=${tags}&recent_search_id=${payload?.recent_search_id}&article_id=${payload?.article_id}`,
    {},
    { ...authHeaders }
  );
};

export const useUpdateArticleTags = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editArticleTags,
    onSuccess: () => {
      queryClient.invalidateQueries(['search_article_tags']);
      queryClient.invalidateQueries(['custom-sources-list']);
      queryClient.invalidateQueries(['articleThemeData']);
    },
  });
};

export const hiddenArticlesByArticleId = (payload) => {
  return axiosPost(`${API}/search-articles/hidden-article`, payload, {
    ...getAuthHeaders(),
  });
};

export const useHiddenArticlesByArticleId = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: hiddenArticlesByArticleId,
    onSuccess: () => {
      queryClient.invalidateQueries(['search_article_hidden']);
    },
  });
};

export const unhideArticleById = (payload) => {
  return axiosDel(
    `${API}/search-articles/hidden-article?${objectToQueryString(payload)}`
  );
};

export const useUnHideArticlesById = () => {
  return useMutation({
    mutationFn: unhideArticleById,
  });
};

export const getAllHiddenArticlesBySearchId = (payload) => {
  const authHeaders = getAuthHeaders();
  // savedSearchId !== 'custom-search' ? savedSearchId : '';
  if (payload !== 'custom-search') {
    return get(
      `${API}/search-articles/hidden-article?recent_search_id=${payload}`,
      {
        ...authHeaders,
      }
    );
  }
};

export const useGetAllHiddenArticlesBySearchId = (searchId, isEnabled) => {
  return useQuery({
    queryKey: ['', searchId],
    queryFn: () => getAllHiddenArticlesBySearchId(searchId),
    refetchOnWindowFocus: false,
    enabled: isEnabled,
  });
};

export const getArticlesThemeData = (payload) => {
  const authHeaders = getAuthHeaders();
  return get(
    `${API}/search-articles/tags/distinct-tags?recent_search_id=${payload}`,
    {
      ...authHeaders,
    }
  );
};

export const getSearchQueryStatus = (payload) => {
  const authHeaders = getAuthHeaders();
  return get(`${API}/search/check-query?${objectToQueryString(payload)}`, {
    ...authHeaders,
  });
};

export const useGetArticlesThemeData = (searchId, isEnabled) => {
  return useQuery({
    queryKey: ['articleThemeData', searchId],
    queryFn: () => getArticlesThemeData(searchId),
    refetchOnWindowFocus: false,
    enabled: isEnabled,
  });
};

export const handleDownloadAllCSV = (payload) => {
  const authHeaders = getAuthHeaders();
  return get(`${API}/export-search-data/csv/?${objectToQueryString(payload)}`, {
    ...authHeaders,
  });
};

export const useDownloadAllCSVData = () => {
  return useMutation({ mutationFn: handleDownloadAllCSV });
};

export const handleDownloadSelectedCSV = (payload) => {
  const authHeaders = getAuthHeaders();
  return get(`${API}/export-search-data/csv/?${objectToQueryString(payload)}`, {
    ...authHeaders,
  });
};

export const useDownloadSelectedCSVData = () => {
  return useMutation({ mutationFn: handleDownloadSelectedCSV });
};

export const handleDownloadPDF = (payload) => {
  const authHeaders = getAuthHeaders();
  return get(`${API}/export-search-data/pdf/?${objectToQueryString(payload)}`, {
    ...authHeaders,
  });
};

export const useDownloadPDF = () => {
  return useMutation({ mutationFn: handleDownloadPDF });
};
