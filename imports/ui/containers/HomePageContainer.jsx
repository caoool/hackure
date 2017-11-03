import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import HomePage from '../pages/HomePage.jsx';

export default withTracker(() => {
  return {
    primaryColor: Session.get('primaryColor')
  }
})(HomePage);
