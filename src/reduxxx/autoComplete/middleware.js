import {
  ENTER_AUTOCOMPLETE,
  FETCH_RESULTS,
  FETCH_RESULTS_SUCCESS,
  FETCH_RESULTS_FAILED,
  fetchAutoComplete,
  updateResults,
} from './actions';
import { apiRequest } from '../api';
import { BACKEND } from '../../utils/AAAConstants';

export const enterAutoComplete =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === ENTER_AUTOCOMPLETE) {
      const searchedText = action.payload;
      // Step 1: validate text
      if (!/^[a-zA-Z]+(\s?[a-zA-z]+)*$/.test(searchedText)) {
        // validation failed...
        return;
      }
      // Step 2: validation PASSED! get autoComplete results
      return dispatch(fetchAutoComplete(searchedText));
    }
  };

export const fetchAutoCompleteFlow =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === FETCH_RESULTS) {
      const data = {
        method: 'POST',
        URL: `${BACKEND}/search`,
        body: { searchedText: action.payload },
        config: null,
        onSuccess: FETCH_RESULTS_SUCCESS,
        onFailure: FETCH_RESULTS_FAILED,
      };
      return dispatch(apiRequest(data));
    }
  };

export const processAutoComplete =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === FETCH_RESULTS_SUCCESS) {
      dispatch(updateResults(action.payload));
    }

    if (action.type === FETCH_RESULTS_FAILED) {
      console.log('and error has occurred...');
    }
  };

export const autoCompleteMdlwr = [
  enterAutoComplete,
  fetchAutoCompleteFlow,
  processAutoComplete,
];
