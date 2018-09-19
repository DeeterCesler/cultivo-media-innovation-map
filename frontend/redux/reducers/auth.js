import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
} from '../actions/auth';

const defaultState = {
  loading: false,
  loaded: false,
  user: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.user,
      };
    case AUTHENTICATION_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}
