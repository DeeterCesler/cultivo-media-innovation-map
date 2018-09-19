import apiRequest from '../helpers/api';

export const authenticate = body => apiRequest('auth', 'POST', body);
