import React from 'react';
import { createStore, combineReducers } from 'redux'
import { Provider as ReduxProvider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers'
import logger from 'redux-logger'
import { applyMiddleware } from 'redux';

const store = createStore(
  combineReducers({ ...reducers }),
  applyMiddleware(thunk, logger))

export default function Provider({ story }) {
  return (
    <ReduxProvider store={store}>
      {story}
    </ReduxProvider>
  );
};
