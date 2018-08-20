// @flow

import { APP_ERRORED, APP_LOADED } from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';


/**
* App Actions
*/

export function loaded(hideLoader: Function): ActionCreator {
  hideLoader();
  return { type: APP_LOADED };
}

export function errored(hideLoader: Function): ActionCreator {
  hideLoader();
  return { type: APP_ERRORED };
}