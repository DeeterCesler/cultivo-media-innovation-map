import { connect } from 'react-redux';

import App from '../components/App';

const mapStateToProps = ({ organization: { selectedOrganization } }) => ({
  selectedOrganization,
});

export default connect(mapStateToProps)(App);
