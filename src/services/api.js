import axios from 'axios';

export const requestData = async (query, page, signal) => {
  const url = '/search/photos';
  const axiosConfig = {
    baseURL: 'https://api.unsplash.com',
    params: {
      client_id: '3LCjIhSkrZ6XP5GThAAWgsPDpcCAttazQw9H5I2wUXU',
      query: `${query}`,
      page: `${page}`,
      per_page: `12`,
      orientation: 'landscape',
      content_filter: 'high',
    },
    headers: {
      'Accept-Version': 'v1',
    },
    signal: signal,
  };
  const apiInstance = new axios.create(axiosConfig);
  const response = await apiInstance.get(url);
  return response.data;
};
