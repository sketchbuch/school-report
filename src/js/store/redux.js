/**
 * Store
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers';

let initialState = {};

if (window !== undefined) {
  if (window.reportr !== undefined) {
    initialState.languages = {
      available: window.reportr.languages,
      current: window.reportr.curLang,
      default: window.reportr.defLang,
    };
  }
}

let reduxMiddleware = null;

// If there are dev tools (i.e. not in electron) and not running in Jest, include dev tools.
if (
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  !navigator.userAgent.includes('Node.js')
) {
  reduxMiddleware = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  reduxMiddleware = applyMiddleware(thunk);
}

const store = createStore(allReducers, initialState, reduxMiddleware);

window.store = store; // Just for testing!!! Delete!!!
export default store;
