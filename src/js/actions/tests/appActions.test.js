// @flow

import * as appActions from '../appActions';
import { APP_LOADED, APP_ERRORED } from '../../constants/actionTypes';


/**
* App Actions Tests
*/

describe.skip('Actions: AppActions:', () => {
  test('loaded() should return the loaded data object', () => {
    const EXPECTED_ACTION = { type: APP_LOADED };
    expect(appActions.loaded()).toEqual(EXPECTED_ACTION);
  });

  test('errored() should return boolean true', () => {
    const EXPECTED_ACTION = { type: APP_ERRORED };
    expect(appActions.errored()).toEqual(EXPECTED_ACTION);
  });
});
