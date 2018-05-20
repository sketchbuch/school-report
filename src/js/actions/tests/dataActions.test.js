// @flow

import * as dataActions from '../dataActions';
import { REPLACE_DATA } from '../../constants/actionTypes';


/**
* Data Actions Tests
*/

describe.skip('Actions: dataActions:', () => {
  test('replace() should return the new data', () => {
    const TEST_DATA = {
      classes: [
        {label: 'class 1', id: 1 },
        {label: 'class 2', id: 2},
      ],
    };

    const EXPECTED_ACTION = {
      type: REPLACE_DATA,
      payload: TEST_DATA,
    };

    expect(dataActions.replace(TEST_DATA, jest.fn())).toEqual(EXPECTED_ACTION);
  });
});
