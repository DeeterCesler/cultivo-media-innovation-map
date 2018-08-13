import { connect } from 'react-redux';

import OrganizationDetails from '../components/OrganizationDetails';

const mapStateToProps = ({ organization: { selectedOrganization } }) => ({
  selectedOrganization,
});

export default connect(mapStateToProps)(OrganizationDetails);
