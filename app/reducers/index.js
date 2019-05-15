import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alerts.reducer';
import { configurations } from './configurations.reducer';

const rootReducer = combineReducers({
  authentication,
  alert,
  configurations
});

export default rootReducer;
