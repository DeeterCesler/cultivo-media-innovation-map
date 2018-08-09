import {
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS_FAILURE
} from '../actions/organization'

const defaultState = {
  loading: false,
  loaded: false
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case FETCH_ORGANIZATIONS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        organizations: action.organizations
      }
    case FETCH_ORGANIZATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }
    default:
      return state
  }
}
