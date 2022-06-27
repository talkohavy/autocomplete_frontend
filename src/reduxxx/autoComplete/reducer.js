import { UPDATE_RESULTS } from './actions';

const INITIAL_STATE = {
  results: [],
};

export default function autoCompleteReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_RESULTS:
      return {
        ...state,
        results: action.payload,
      };
    default:
      return state;
  }
}
