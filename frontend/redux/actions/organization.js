import { readOrganizations } from '../api/organizations'

export const FETCH_ORGANIZATIONS_REQUEST =
  'organization/FETCH_ORGANIZATIONS_REQUEST'
export const FETCH_ORGANIZATIONS_SUCCESS =
  'organization/FETCH_ORGANIZATIONS_SUCCESS'
export const FETCH_ORGANIZATIONS_FAILURE =
  'organization/FETCH_ORGANIZATIONS_FAILURE'

const fetchOrganizationsRequest = () => ({
  type: FETCH_ORGANIZATIONS_REQUEST
})

const fetchOrganizationsSuccess = organizations => ({
  type: FETCH_ORGANIZATIONS_SUCCESS,
  organizations
})

const fetchOrganizationsFailure = error => ({
  type: FETCH_ORGANIZATIONS_FAILURE,
  error
})

export const fetchOrganizations = () => async dispatch => {
  dispatch(fetchOrganizationsRequest())

  try {
    const organizations = await readOrganizations()
    dispatch(fetchOrganizationsSuccess(organizations))
  } catch (err) {
    dispatch(fetchOrganizationsFailure(err))
  }
}
