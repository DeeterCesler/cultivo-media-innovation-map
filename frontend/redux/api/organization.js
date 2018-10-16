import apiRequest from '../helpers/api';

export const readOrganizations = () => apiRequest('organizations');

export const readOrganization = id => apiRequest(`organizations/${id}`);

export const readCategories = () => apiRequest('organizations/categories');
