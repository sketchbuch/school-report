// @flow

/**
* Reducers
*/
import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr'
import app from './app';
import categories from './categories';
import classes from './classes';
import languages from './languages';
import pupils from './pupils';
import reports from './reports';
import settings from './settings';
import texts from './texts';


export default combineReducers({
  app,
  categories,
  classes,
  languages,
  pupils,
  reports,
  settings,
  texts,
  toastr: toastrReducer,
});
