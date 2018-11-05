import { connect } from 'react-redux';

import App from '../components/App';

const mapStateToProps = ({ organization: { selectedOrganization, selectedCategory } }) => ({
  selectedOrganization,
  selectedCategory,
});

export default connect(mapStateToProps)(App);
