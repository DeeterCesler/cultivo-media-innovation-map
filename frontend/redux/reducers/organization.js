import {
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATION_REQUEST,
  FETCH_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION_FAILURE,
  DESELECT_ORGANIZATION,
} from '../actions/organization';

const defaultState = {
  loading: false,
  loaded: false,
  organizations: [],
  selectedOrganization: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_ORGANIZATIONS_REQUEST:
    case FETCH_ORGANIZATION_REQUEST:
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
    case FETCH_ORGANIZATIONS_FAILURE:
    case FETCH_ORGANIZATION_FAILURE:
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
    default:
      return state;
  }
}
