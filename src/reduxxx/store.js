//Redux stuff:
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
//Redux middlewares:
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
//My custom middlewares:
import { fetchApi } from './api/middleware';
import { autoCompleteMdlwr } from './autoComplete/middleware';

const myLogger = createLogger();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(myLogger, ...autoCompleteMdlwr, fetchApi))
);
