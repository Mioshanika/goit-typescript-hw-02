import axios, { AxiosInstance, AxiosResponse } from 'axios';

const apiInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.unsplash.com',
  params: {
    client_id: `${import.meta.env.VITE_API_KEY}`,
    per_page: 12,
    orientation: 'landscape',
    content_filter: 'high',
  },
  headers: {
    'Accept-Version': 'v1',
  },
});

export const requestData = async <T>(
  query: string,
  page: number,
  signal: AbortSignal
): Promise<T> => {
  const response: AxiosResponse<T> = await apiInstance.get('/search/photos', {
    params: {
      query,
      page,
    },
    signal,
  });
  return response.data;
};
