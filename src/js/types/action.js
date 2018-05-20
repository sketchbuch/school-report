// @flow

/**
* Action Creator return type def.
*/

export type ActionObj = {
  error?: boolean,
  meta?: Object,
  payload?: Object,
  type: string,
};

export type ActionCreator = ActionObj | Function;
