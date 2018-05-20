// @flow

import * as textActions from '../textActions';
import { REPLACE_TEXTS } from '../../constants/actionTypes';
import textDefault from '../../types/text';


/**
* Report Text Actions Tests
*/

describe.skip('Actions: repTxtActions:', () => {
  test.skip('replace() should return the new text object', () => {
    const TEST_TEXTS = [
      {
        ...textDefault,
        id: "p1",
        text: '',
      },
    ];

    const EXPECTED_ACTION = {
      type: REPLACE_TEXTS,
      payload: TEST_TEXTS,
    };

    expect(textActions.replace(TEST_TEXTS, ()=>{})).toEqual(EXPECTED_ACTION);
  });
});
