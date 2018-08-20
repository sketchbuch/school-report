// @flow

import * as appActions from '../appActions';
import { APP_LOADED, APP_ERRORED } from '../../constants/actionTypes';


/**
* App Actions Tests
*/

describe('Actions: AppActions:', () => {
  let hideLoader = ()=>{};

  beforeEach(() => {
    hideLoader = jest.fn();
  });

  test('loaded() should return the loaded data object', () => {
    const EXPECTED_ACTION = { type: APP_LOADED };
    expect(appActions.loaded(hideLoader)).toEqual(EXPECTED_ACTION);
    expect(hideLoader).toBeCalled();
  });

  test('errored() should return boolean true', () => {
    const EXPECTED_ACTION = { type: APP_ERRORED };
    expect(appActions.errored(hideLoader)).toEqual(EXPECTED_ACTION);
    expect(hideLoader).toBeCalled();
  });
});
