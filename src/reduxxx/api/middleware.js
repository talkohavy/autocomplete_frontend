import Axios from 'axios';
import { API_REQUEST } from './actions';

// this middleware care only for API calls
export const fetchApi =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === API_REQUEST) {
      const { method, URL, body, config, onSuccess, onFailure } = action.meta;
      if (method === 'GET') {
        Axios.get(URL, config)
          .then((response) => {
            const axiosData = response.data;
            const { error, errorMsg, data } = axiosData;
            if (error) {
              dispatch({ type: onFailure, payload: errorMsg });
              return;
            }
            dispatch({ type: onSuccess, payload: data });
          })
          .catch((errorMsg) => {
            dispatch({ type: onFailure, payload: errorMsg });
          });
      }
      if (method === 'POST') {
        Axios.post(URL, body, config)
          .then((response) => {
            const axiosData = response.data;
            const { error, errorMsg, data } = axiosData;
            if (error) {
              dispatch({ type: onFailure, payload: errorMsg });
              return;
            }
            dispatch({ type: onSuccess, payload: data });
          })
          .catch((error) => {
            console.error(error);
            const response = error.response;
            const errorMsg = response?.data?.errorMsg;
            if (errorMsg) {
              // My custom error:
              dispatch({ type: onFailure, payload: errorMsg });
            } else {
              // Some other error:
              dispatch({ type: onFailure, payload: response });
            }
          });
      }
      if (method === 'PATCH') {
        Axios.patch(URL, body, config)
          .then((response) => {
            const axiosData = response.data;
            const { error, errorMsg, data } = axiosData;
            if (error) {
              dispatch({ type: onFailure, payload: errorMsg });
              return;
            }
            dispatch({ type: onSuccess, payload: data });
          })
          .catch((error) => {
            const { errorMsg } = error.response.data;
            dispatch({ type: onFailure, payload: errorMsg });
          });
      }
    }
    return next(action);
  };
