// @flow

import { APP_ERRORED, APP_LOADED } from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';

export const loaded = (hideLoader: () => void): ActionCreator => {
  hideLoader();
  return { type: APP_LOADED };
};

export const errored = (hideLoader: () => void): ActionCreator => {
  hideLoader();
  return { type: APP_ERRORED };
};
