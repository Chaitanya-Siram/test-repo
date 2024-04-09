import { useEffect, useState } from 'react';
import { get, axiosPost, axiosDel, axiosUpdate } from '../service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API, getAuthHeaders } from '../constants';
import { objectToQueryString } from './useSearch';

// Get the count of the saved search result
const getSavedSearchCount = (userId) => {
  return get(`${API}/search/total-saved-searches/?user_id=${userId}`);
};

export const useSavedSearchQueryCount = (userUserId) => {
  const [userId, setUserId] = useState(userUserId);
  useEffect(() => {
    if (userUserId) {
      setUserId(userUserId);
    }
  }, [userUserId]);
  return useQuery({
    queryKey: ['total-saved-searches', userId],
    queryFn: () => getSavedSearchCount(userId),
    enabled: userId !== null,
    refetchOnWindowFocus: false,
  });
};

const getSavedSearchQueryData = (userId, payload) => {
  const authHeaders = getAuthHeaders();
  return get(
    `${API}/search/save-search-data?user_id=${userId}&${objectToQueryString(
      payload
    )}`,
    { ...authHeaders }
  );
};

export const useGetSavedSearchQueryData = (userUserId, payload) => {
  const [userId, setUserId] = useState(userUserId);
  useEffect(() => {
    if (userUserId) {
      setUserId(userUserId);
    }
  }, [userUserId]);
  return useQuery({
    queryKey: ['save-search-data', userId, payload],
    queryFn: () => getSavedSearchQueryData(userId, payload),
    enabled: userId !== null,
    refetchOnWindowFocus: false,
  });
};

export const createSaveSearchData = (payload) => {
  const authHeaders = getAuthHeaders();
  return axiosPost(`${API}/search/save-search-data`, payload, {
    ...authHeaders,
  });
};

export const useCreateSaveSearchData = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSaveSearchData,
    onSuccess: () => {
      queryClient.invalidateQueries(['total-saved-searches', userId]);
      queryClient.invalidateQueries(['save-search-data', userId]);
    },
  });
};

export const deleteSearchQueryData = (payload) => {
  return axiosDel(`${API}/search/save-search-data`, {}, payload);
};
export const useDeleteSearchQueryData = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSearchQueryData,
    onSuccess: () => {
      queryClient.invalidateQueries(['total-saved-searches', userId]);
      queryClient.invalidateQueries(['save-search-data', userId]);
    },
  });
};

export const updateSearchQueryData = (payload) => {
  return axiosUpdate(`${API}/search/save-search-data`, payload, {});
};
export const useUpdateSaveSearchQueryData = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSearchQueryData,
    onSuccess: () => {
      queryClient.invalidateQueries(['save-search-data', userId]);
      queryClient.invalidateQueries(['total-saved-searches', userId]);
    },
  });
};
