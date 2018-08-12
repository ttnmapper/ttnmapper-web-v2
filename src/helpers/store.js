import { connectRouter, routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import { createBrowserHistory } from 'history'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import * as reducers from '../reducers'

const rootReducer = combineReducers({
  ...reducers,
})

export const history = createBrowserHistory()


if (process.env.NODE_ENV !== 'production') {
  const loggerChecked = null
}
else {
  const loggerChecked = logger
}


export const store = createStore(
  connectRouter(history)(rootReducer),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      (process.env.NODE_ENV !== 'production' ? null : logger)
    )
  )
)
