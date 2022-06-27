export const API_REQUEST = '[app] API Request';

export const apiRequest = ({
  method = 'GET',
  URL,
  body,
  config,
  onSuccess,
  onFailure,
}) => ({
  type: API_REQUEST,
  payload: body,
  meta: {
    method,
    URL,
    body,
    config,
    onSuccess,
    onFailure,
  },
});
