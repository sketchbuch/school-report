// @flow

import { getCustomNumProp } from '../dom';


/**
* ID Tests
*/

describe('Util: DOM', () => {
  test('getCustomNumProp() returns the same MD5 hash given the same arguments', () => {
    const htmlEle = getComputedStyle(document.getElementsByTagName('html')[0]);

    console.log(htmlEle);
    console.log('"' + htmlEle.getPropertyValue('scrollBlocksOn') + '"');
  });
});
