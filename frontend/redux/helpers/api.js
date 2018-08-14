import axios from 'axios';

export default async function apiRequest(url, method = 'GET', body = null) {
  const params = {
    method,
    url: `/api/${url}`,
  };

  if (body) params.data = body;

  try {
    const { data } = await axios(params);
    return data;
  } catch (error) {
    throw error;
  }
}
