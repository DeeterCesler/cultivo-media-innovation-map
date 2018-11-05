import {
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATION_REQUEST,
  FETCH_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  DESELECT_ORGANIZATION,
  SELECT_CATEGORY,
  DESELECT_CATEGORY,
} from '../actions/organization';

const defaultState = {
  loading: false,
  loaded: false,
  organizations: [],
  categories: [],
  selectedOrganization: null,
  selectedCategory: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_ORGANIZATIONS_REQUEST:
    case FETCH_ORGANIZATION_REQUEST:
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        organizations: action.organizations,
      };
    case FETCH_ORGANIZATION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        selectedOrganization: action.organization,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        categories: action.categories,
      };
    case FETCH_ORGANIZATIONS_FAILURE:
    case FETCH_ORGANIZATION_FAILURE:
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case DESELECT_ORGANIZATION:
      return {
        ...state,
        selectedOrganization: null,
      };
    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.category,
      };
    case DESELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: null,
      };
    default:
      return state;
  }
}
