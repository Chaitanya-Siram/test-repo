import { axiosDel, axiosPost, axiosUpdate, download, get } from '../service';
import { API, getAuthHeaders } from '../constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { objectToQueryString } from './useSearch';
import { format, parse, parseISO } from 'date-fns';

const createSaveNewsLetterData = (payload) => {
  return axiosPost(
    // `${API}/newsletter/create-newsletter?userid=${payload?.userId}`,
    `${API}/newsletter`,
    payload?.newsLetterData,
    {
      ...getAuthHeaders(),
    }
  );
};

export const useCreateSaveNewsLetterData = () => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSaveNewsLetterData,
  });
};

// Retrieve

const getNewsLetterDataById = (newsLetterId) => {
  return get(`${API}/newsletter?newsLetterId=${newsLetterId}`, {
    ...getAuthHeaders(),
  });
};

export const useNewsLetterDataById = (newsLetterId) => {
  return useQuery({
    queryKey: ['newsletter', newsLetterId],
    queryFn: () => getNewsLetterDataById(newsLetterId),
    refetchOnWindowFocus: false,
    enabled: !!newsLetterId,
  });
};

const getArticleLinkDataNewsLetter = (link) => {
  return axiosPost(
    `${API}/newsletter/external-import`,
    { articlelink: link },
    { ...getAuthHeaders() }
  );
};

export const useGetArticleLinkDataNewsletter = () => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getArticleLinkDataNewsLetter,
  });
};

export const deleteNewsLetterById = (newsId) => {
  return axiosDel(
    `${API}/newsletter`,
    { ...getAuthHeaders() },
    {
      newsLetterIds: newsId,
    }
  );
};

export const fetchSavedArticleNewsletter = (payload) => {
  return axiosPost(`${API}/newsletter/article-save-search`, payload, {
    ...getAuthHeaders(),
  });
};

export const useFetchSavedArticleNewsletter = () => {
  return useMutation({
    mutationFn: fetchSavedArticleNewsletter,
  });
};

export const fetchCSVArticleNewsLetter = (payload) => {
  return axiosPost(`${API}/newsletter/csv`, payload, { ...getAuthHeaders() });
};

export const useFetchCSVArticlesNewsletter = () => {
  return useMutation({
    mutationFn: fetchCSVArticleNewsLetter,
  });
};

export const fetchChartFileNewsletter = (payload) => {
  return axiosPost(`${API}/newsletter/upload-image`, payload, {
    ...getAuthHeaders(),
  });
};

export const useFetchChartFileNewsLetter = () => {
  return useMutation({
    mutationFn: fetchChartFileNewsletter,
  });
};

export const saveExternalLink = (payload) => {
  const parseDate = parseISO(payload?.date, 'yyyy-MM-dd');
  const formattedDate = format(parseDate, 'MM/dd/yyyy');
  return axiosPost(
    `${API}/newsletter/external-save`,
    { ...payload, date: formattedDate },
    {
      ...getAuthHeaders(),
    }
  );
};

export const useSaveExternalLink = () => {
  return useMutation({
    mutationFn: saveExternalLink,
  });
};
export const handlePublishNewsletter = (payload) => {
  return axiosPost(`${API}/newsletter/publish`, payload, {
    ...getAuthHeaders(),
  });
};

export const handlePublishDoc = (payload) => {
  return download(`${API}/newsletter/publish`, payload, {
    ...getAuthHeaders(),
  });
};

// add dashboard bookmark
export const addNewsletterBookmark = (payload) => {
  return axiosPost(`${API}/newsletter/bookmark`, payload, {
    ...getAuthHeaders(),
  });
};

export const useAddNewsletterBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addNewsletterBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries(['saved-newsletters']);
    },
  });
};

// delete dashboard bookmark
export const delNewsletterBookmark = (payload) => {
  return axiosDel(
    `${API}/newsletter/bookmark`,
    { ...getAuthHeaders() },
    payload
  );
};

export const useDelNewsletterBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: delNewsletterBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries(['saved-newsletters']);
    },
  });
};

export const getTagsData = (payload) => {
  return get(
    `${API}/search-articles/tags/distinct-tags?recent_search_id=${payload}`
  );
};

export const useGetTagsData = (id) => {
  return useQuery({
    queryKey: ['search-tags', id],
    queryFn: () => getTagsData(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const getChartDataForNewsletter = (payload) => {
  return axiosPost(`${API}/newsletter/chart-save-search`, payload, {
    ...getAuthHeaders(),
  });
};

export const useGetChartDataForNewsletter = () => {
  return useMutation({
    mutationFn: getChartDataForNewsletter,
  });
};

export const updateNewsletter = (payload) => {
  return axiosUpdate(`${API}/newsletter`, payload, { ...getAuthHeaders() });
};

export const useUpdateNewsletter = () => {
  return useMutation({
    mutationFn: updateNewsletter,
  });
};

export const getSavedNewsletterCount = () => {
  return get(`${API}/newsletter/total`, { ...getAuthHeaders() });
};

export const useGetSavedNewsletterCount = () => {
  return useQuery({
    queryKey: ['total-saved-newsletter'],
    queryFn: () => getSavedNewsletterCount(),
    // enabled: true,
    refetchOnWindowFocus: false,
  });
};
