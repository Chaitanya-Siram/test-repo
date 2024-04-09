import axios from 'axios';
import qs from 'query-string';
import { API, baseURL, getAuthHeaders } from '../constants';

export const client = axios.create({
  baseURL,
});

export const success = (data) => {
  return {
    status: 'success',
    isSuccessful: true,
    data,
  };
};

export const error = (error, data) => {
  return {
    status: 'error',
    isSuccessful: false,
    message: error,
    data: data ?? null,
  };
};

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token${1}`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    // Optionally catch errors and add additional logging here
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};

export const axiosDel = async (url, headers, body) => {
  try {
    const res2 = await axios.delete(url, {
      headers: {
        ...headers,
        ...getAuthHeaders(),
      },
      data: body ?? {},
    });
    if (res2.status === 200 || res2.status === 201) {
      return success(res2?.data);
    } else if (
      res2?.status === 203 ||
      res2?.status === 429 ||
      res2?.status === 500 ||
      res2?.status === 400 ||
      res2?.status === 404
    ) {
      return error(res2?.data?.error);
    }
  } catch (e) {
    if (e.response.data) {
      return error(e.response.data.error, e.response.data);
    }
    console.log(e);
    return error(e);
  }
};

export const axiosUpdate = async (url, data, headers) => {
  try {
    const res2 = await axios.put(url, data, {
      headers: {
        ...headers,
        ...getAuthHeaders(),
      },
    });
    if (res2.status === 200 || res2.status === 201) {
      return success(res2?.data);
    } else if (
      res2?.status === 203 ||
      res2?.status === 429 ||
      res2?.status === 500 ||
      res2?.status === 400 ||
      res2?.status === 404
    ) {
      return error(res2?.data?.error);
    }
  } catch (e) {
    if (e.response.data) {
      return error(e.response.data.error, e.response.data);
    }
    console.log(e);
    return error(e);
  }
};

export const axiosPost = async (url, data, headers) => {
  try {
    const res2 = await axios.post(url, data, {
      headers: {
        ...headers,
        ...getAuthHeaders(),
      },
    });
    if (res2?.status === 200 || res2?.status === 201) {
      return success(res2?.data);
    } else if (
      res2?.status === 203 ||
      res2?.status === 429 ||
      res2?.status === 500 ||
      res2?.status === 400 ||
      res2?.status === 404
    ) {
      return error(res2?.data?.warning || res2?.data?.error);
    }
  } catch (e) {
    if (e?.response?.data) {
      return error(
        e?.response?.data?.warning || e?.response?.data?.error,
        e?.response?.data
      );
    }
    console.log(e);
    return error(e);
  }
};

export const get = async (url, headers, data) => {
  try {
    const response = await axios.get(url, {
      headers: {
        ...headers,
        ...getAuthHeaders(),
      },
    });
    if (response.data) {
      return success(response.data);
    } else if (
      response?.status === 203 ||
      response?.status === 429 ||
      response?.status === 500 ||
      response?.status === 400 ||
      response?.status === 404
    ) {
      return error(response?.data?.error);
    }
  } catch (e) {
    if (e.response.data) {
      return error(e.response.data.error);
    }
    console.log(e);
    return error(e);
  }
};

export const download = async (url, data, headers) => {
  try {
    let response = null;
    if (data === null) {
      response = await axios.get(url, {
        headers,
        responseType: 'blob',
      });
    } else {
      response = await axios.post(url, data, {
        headers,
        responseType: 'blob',
      });
    }

    return success({
      file: response.data,
      filename: '',
    });
  } catch (e) {
    return error(e);
  }
};

export const getWithBody = async (url, headers, body) => {
  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url,
      headers: {
        ...headers,
        ...getAuthHeaders(),
      },
      data: JSON.stringify(body),
    };

    const response = await axios.request(config);
    if (response.data) {
      return success(response.data);
    } else if (
      response?.status === 203 ||
      response?.status === 429 ||
      response?.status === 500 ||
      response?.status === 400 ||
      response?.status === 404
    ) {
      return error(response?.data?.error);
    }
  } catch (e) {
    if (e.response.data) {
      return error(e.response.data.error);
    }
    console.log(e);
    return error(e);
  }
};

export const axiosGetAPI = async (url, queryObj) => {
  try {
    const query = qs.stringify(queryObj);
    const res2 = await axios.get(`${API}${url}${query ? `?${query}` : ''}`);
    if (res2.status === 200 || res2.status === 201) {
      return success(res2?.data);
    } else if (
      res2?.status === 203 ||
      res2?.status === 429 ||
      res2?.status === 500 ||
      res2?.status === 400 ||
      res2?.status === 404
    ) {
      return error(res2?.data?.error);
    }
  } catch (e) {
    if (e.response.data) {
      return error(e.response.data.error, e.response.data);
    }
    console.log(e);
    return error(e);
  }
};

// GET with Axios
export const axiosGet = async (url, queryObj) => {
  const query = qs.stringify(queryObj);
  return await client.get(`${url}?${query}`);
};

// Post with Axios
export const axiosPostRequest = async (url, queryObj, bodyObj) => {
  const query = qs.stringify(queryObj);
  return await client.post(`${url}${query ? `?${query}` : ''}`, bodyObj);
};
export const axiosPostRequestAPI = async (url, queryObj, bodyObj) => {
  const authHeaders = getAuthHeaders();
  const query = qs.stringify(queryObj);
  return await axios.post(`${API}${url}?${query}`, bodyObj, {
    headers: authHeaders,
  });
};

// PUT with Axios
export const axiosPutRequest = async (url, queryObj, bodyObj) => {
  const query = qs.stringify(queryObj);
  return await client.put(`${url}?${query}`, bodyObj);
};
export const axiosPutRequestAPI = async (url, queryObj, bodyObj) => {
  const query = qs.stringify(queryObj);
  return await axios.put(`${API}${url}?${query}`, bodyObj);
};

// Delete with Axios
export const axiosDelete = async (url, id) => {
  return await client.delete(`${url}/${id}`);
};

export const axiosDeleteAPI = async (url, queryObj, bodyObj) => {
  const authHeaders = getAuthHeaders();
  const query = qs.stringify(queryObj);
  return await axios.delete(`${API}${url}?${query}`, {
    headers: authHeaders,
    data: bodyObj,
  });
};

export const resourceExists = async (url) => {
  try {
    const response = await axios.head(url);
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    return false;
  }
};
