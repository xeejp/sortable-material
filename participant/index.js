import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './App.js'

import saga from './saga'
import reducer from './reducer'

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware()

let middlewares = [sagaMiddleware, logger]

const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
)

sagaMiddleware.run(saga)

var _experiment = new Experiment(_topic, _token);

_experiment.onReceiveMessage(({ action }) => {
  store.dispatch(action)
})

function sendData(action, params=null) {
  _experiment.send_data({ action, params });
}

window.sendData = sendData

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("content")
)
