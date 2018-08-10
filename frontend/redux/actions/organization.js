import { readOrganizations } from '../api/organization'

export const FETCH_ORGANIZATIONS_REQUEST =
  'organization/FETCH_ORGANIZATIONS_REQUEST'
export const FETCH_ORGANIZATIONS_SUCCESS =
  'organization/FETCH_ORGANIZATIONS_SUCCESS'
export const FETCH_ORGANIZATIONS_FAILURE =
  'organization/FETCH_ORGANIZATIONS_FAILURE'

export const SELECT_ORGANIZATION = 'organization/SELECT_ORGANIZATION'
export const DESELECT_ORGANIZATION = 'organization/DESELECT_ORGANIZATION'

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

export const selectOrganization = organization => ({
  type: SELECT_ORGANIZATION,
  organization
})

export const deselectOrganization = () => ({
  type: DESELECT_ORGANIZATION
})
