import { connect } from 'react-redux';

import { deselectOrganization } from '../redux/actions/organization';

import OrganizationDetails from '../components/OrganizationDetails';

const mapStateToProps = ({ organization: { selectedOrganization } }) => ({
  selectedOrganization,
});

const mapDispatchToProps = {
  deselectOrganization,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationDetails);
