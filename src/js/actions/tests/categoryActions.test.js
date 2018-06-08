// @flow

import * as categoryActions from '../categoryActions';
import { REPLACE_CATEGORIES } from '../../constants/actionTypes';
import catgeoryDefault from '../../types/category';


/**
* Category Actions Tests
*/

describe.skip('Actions: textActions:', () => {
  test.skip('replace() should return the new catgeory object', () => {
    const TEST_CATEGORIES = [
      {
        ...catgeoryDefault,
        id: "l1",
        label: '',
      },
    ];

    const EXPECTED_ACTION = {
      type: REPLACE_CATEGORIES,
      payload: TEST_CATEGORIES,
    };

    expect(categoryActions.replace(TEST_CATEGORIES, ()=>{})).toEqual(EXPECTED_ACTION);
  });
});