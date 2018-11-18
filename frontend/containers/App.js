import { connect } from 'react-redux';

import App from '../components/App';

const mapStateToProps = ({
  organization: {
    selectedOrganization,
    selectedCategory,
    searchInputValue,
  },
}) => ({
  selectedOrganization,
  selectedCategory,
  searchInputValue,
});

export default connect(mapStateToProps)(App);
