import { readOrganizations, readOrganization, readCategories } from '../api/organization';

export const FETCH_ORGANIZATIONS_REQUEST = 'organization/FETCH_ORGANIZATIONS_REQUEST';
export const FETCH_ORGANIZATIONS_SUCCESS = 'organization/FETCH_ORGANIZATIONS_SUCCESS';
export const FETCH_ORGANIZATIONS_FAILURE = 'organization/FETCH_ORGANIZATIONS_FAILURE';

export const FETCH_ORGANIZATION_REQUEST = 'organization/FETCH_ORGANIZATION_REQUEST';
export const FETCH_ORGANIZATION_SUCCESS = 'organization/FETCH_ORGANIZATION_SUCCESS';
export const FETCH_ORGANIZATION_FAILURE = 'organization/FETCH_ORGANIZATION_FAILURE';

export const FETCH_CATEGORIES_REQUEST = 'organization/FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'organization/FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'organization/FETCH_CATEGORIES_FAILURE';

export const DESELECT_ORGANIZATION = 'organization/DESELECT_ORGANIZATION';

// ACTIONS FOR FETCHING ALL ORGANIZATIONS

const fetchOrganizationsRequest = () => ({
  type: FETCH_ORGANIZATIONS_REQUEST,
});

const fetchOrganizationsSuccess = organizations => ({
  type: FETCH_ORGANIZATIONS_SUCCESS,
  organizations,
});

const fetchOrganizationsFailure = error => ({
  type: FETCH_ORGANIZATIONS_FAILURE,
  error,
});

export const fetchOrganizations = () => (dispatch) => {
  dispatch(fetchOrganizationsRequest());

  return readOrganizations()
    .then(organizations => dispatch(fetchOrganizationsSuccess(organizations)))
    .catch(err => dispatch(fetchOrganizationsFailure(err)));
};

// ACTIONS FOR FETCHING A SINGLE ORGANIZATION

const fetchOrganizationRequest = () => ({
  type: FETCH_ORGANIZATION_REQUEST,
});

const fetchOrganizationSuccess = organization => ({
  type: FETCH_ORGANIZATION_SUCCESS,
  organization,
});

const fetchOrganizationFailure = error => ({
  type: FETCH_ORGANIZATION_FAILURE,
  error,
});

export const fetchOrganization = id => (dispatch) => {
  // If this function is called without an ID, we want to return immediately
  if (!id) return Promise.resolve;
  dispatch(fetchOrganizationRequest());

  return readOrganization(id)
    .then(organization => dispatch(fetchOrganizationSuccess(organization)))
    .catch(err => dispatch(fetchOrganizationFailure(err)));
};

// ACTIONS FOR FETCHING CATEGORIES

const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  categories,
});

const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  error,
});

export const fetchCategories = () => (dispatch) => {
  dispatch(fetchCategoriesRequest());

  return readCategories()
    .then(categories => dispatch(fetchCategoriesSuccess(categories)))
    .catch(err => dispatch(fetchCategoriesFailure(err)));
};

// OTHER ACTIONS

export const deselectOrganization = () => ({
  type: DESELECT_ORGANIZATION,
});
