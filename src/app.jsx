import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { createLogger } from 'redux-logger'

import * as reducers from './reducers'
import { MainContainer } from './components'


const rootReducer = combineReducers({
  ...reducers
})

const store = createStore(
  rootReducer,
  applyMiddleware(
    createLogger()
  )
)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <MainContainer />
    </div>
  </Provider>,
  document.getElementById('maps-app')
)
