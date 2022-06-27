export const ENTER_AUTOCOMPLETE = '[autoComplete] Enter autoComplete mode';
export const FETCH_RESULTS = '[autoComplete] Fetching autoComplete results...';
export const FETCH_RESULTS_FAILED =
  '[autoComplete] Fetch autoComplete results failed';
export const FETCH_RESULTS_SUCCESS =
  '[autoComplete] Fetch autoComplete results success';
export const UPDATE_RESULTS = '[autoComplete] Update results';

export const enterAutoComplete = (data) => {
  return {
    type: ENTER_AUTOCOMPLETE,
    payload: data,
  };
};

export const fetchAutoComplete = (data) => {
  return {
    type: FETCH_RESULTS,
    payload: data,
  };
};

export const updateResults = (data) => {
  return {
    type: UPDATE_RESULTS,
    payload: data,
  };
};
