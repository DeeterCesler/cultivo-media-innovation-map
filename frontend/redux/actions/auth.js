import { authenticate } from '../api/auth';

export const AUTHENTICATION_REQUEST = 'auth/AUTHENTICATION_REQUEST';
export const AUTHENTICATION_SUCCESS = 'auth/AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAILURE = 'auth/AUTHENTICATION_FAILURE';

// ACTIONS FOR AUTHENTICATING A USER

const authenticationRequest = () => ({
  type: AUTHENTICATION_REQUEST,
});

const authenticationSuccess = user => ({
  type: AUTHENTICATION_SUCCESS,
  user,
});

const authenticationFailure = error => ({
  type: AUTHENTICATION_FAILURE,
  error,
});

export const fetchAuthenticate = () => (dispatch) => {
  dispatch(authenticationRequest());

  return authenticate
    .then(user => dispatch(authenticationSuccess(user)))
    .catch(err => dispatch(authenticationFailure(err)));
};
