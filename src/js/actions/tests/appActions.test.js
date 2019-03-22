// @flow

import * as appActions from '../appActions';
import type { ActionObj } from '../../types/action';
import { APP_LOADED, APP_ERRORED } from '../../constants/actionTypes';

describe('Actions: AppActions:', () => {
  let hideLoader = () => {};

  beforeEach(() => {
    hideLoader = jest.fn();
  });

  test('loaded() should return the loaded data object', () => {
    const EXPECTED_ACTION: ActionObj = { type: APP_LOADED };
    expect(appActions.loaded(hideLoader)).toEqual(EXPECTED_ACTION);
    expect(hideLoader).toBeCalled();
  });

  test('errored() should return boolean true', () => {
    const EXPECTED_ACTION: ActionObj = { type: APP_ERRORED };
    expect(appActions.errored(hideLoader)).toEqual(EXPECTED_ACTION);
    expect(hideLoader).toBeCalled();
  });
});
