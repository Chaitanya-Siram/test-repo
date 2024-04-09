import { get, axiosPost, axiosUpdate, axiosDel } from '../service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API, getAuthHeaders } from '../constants';

const headers = getAuthHeaders();
// Get the count of the saved search result
const getSavedDashboardCount = () => {
  return get(`${API}/dashboard-charts/total_count`, headers);
};

export const useSavedDashboardQueryCount = () => {
  return useQuery({
    queryKey: ['total-saved-dashboards'],
    queryFn: () => getSavedDashboardCount(),
    enabled: true,
    refetchOnWindowFocus: false,
  });
};

// create save dashboard
export const createSaveDashboarsData = (payload) => {
  return axiosPost(`${API}/dashboard-charts`, payload, headers);
};

export const useCreateSaveDashboardData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSaveDashboarsData,
    onSuccess: () => {
      queryClient.invalidateQueries(['total-saved-dashboards']);
      queryClient.invalidateQueries(['save-dashboard-data']);
    },
  });
};
// edit saved dashboard
export const createEditDashboardData = (payload) => {
  return axiosUpdate(`${API}/dashboard-charts`, payload, headers);
};

export const useEditSaveDashboardData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEditDashboardData,
    onSuccess: () => {
      queryClient.invalidateQueries(['save-dashboard-data']);
    },
  });
};

// get all dashboards
const getSavedDashboardQueryData = (filter, dashboardId) => {
  return get(
    `${API}/dashboard-charts?dashboard_id=${dashboardId || ''}&filter_by=${
      filter || ''
    }&limit=`,
    headers
  );
};

export const useGetSavedDashboardQueryData = (filter, dashboardId) => {
  return useQuery({
    queryKey: ['save-dashboard-data', filter, dashboardId],
    queryFn: () => getSavedDashboardQueryData(filter, dashboardId),
    enabled: true,
    refetchOnWindowFocus: false,
  });
};

// delete saved dashboard
export const createDeleteDashboardData = (payload) => {
  return axiosDel(`${API}/dashboard-charts`, headers, payload);
};

export const useDeleteSaveDashboardData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDeleteDashboardData,
    onSuccess: () => {
      queryClient.invalidateQueries(['save-dashboard-data']);
      queryClient.invalidateQueries(['total-saved-dashboards']);
    },
  });
};

// add dashboard bookmark
export const addDashboardBookmark = (payload) => {
  return axiosPost(`${API}/dashboard-charts/bookmark`, payload, headers);
};

export const useAddDashboardBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addDashboardBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries(['save-dashboard-data']);
    },
  });
};

// delete dashboard bookmark
export const delDashboardBookmark = (payload) => {
  return axiosDel(`${API}/dashboard-charts/bookmark`, headers, payload);
};

export const useDelDashboardBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: delDashboardBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries(['save-dashboard-data']);
    },
  });
};
