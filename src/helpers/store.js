import { connectRouter, routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import { createBrowserHistory } from 'history'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'

import * as reducers from '../reducers'
import {mapDataSagas } from '../sagas/map-data-sagas'
import {loginSagas} from '../sagas/login-sagas'
import {dataSagas} from '../sagas/data-sagas'

const rootReducer = combineReducers({
  ...reducers,
})

const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory()

export const store = createStore(
  connectRouter(history)(rootReducer),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      logger,
      sagaMiddleware
    )
  )
)

sagaMiddleware.run(mapDataSagas)
sagaMiddleware.run(loginSagas)
sagaMiddleware.run(dataSagas)
