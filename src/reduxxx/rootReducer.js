// Step 1: import redux's combineReducers
import { combineReducers } from 'redux';

// Step 2: import all reducers
import autoCompleteReducer from './autoComplete/reducer';

// Step 3: Combine all reducers + decide on NAMES, to create your rootReducer.
export default combineReducers({
  autoComplete: autoCompleteReducer,
});
