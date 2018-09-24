import { connect } from 'react-redux';

import { fetchAuthenticate } from '../redux/actions/auth';

import Dashboard from '../components/Dashboard';

const mapStateToProps = ({ auth: { user } }) => ({
  user,
});

const mapDispatchToProps = {
  authenticate: fetchAuthenticate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
