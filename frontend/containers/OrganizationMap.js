import { compose } from 'redux';
import { withScriptjs, withGoogleMap } from 'react-google-maps';

import OrganizationMap from '../components/OrganizationMap';

export default compose(
  withScriptjs,
  withGoogleMap,
)(OrganizationMap);
