// @flow

import React from 'react';
import { cropStr, getDisplayName, ucFirst } from '../strings';

class MockComp extends React.Component<{}> {
  render() {
    return <div />;
  }
}

describe('Util: strings', () => {
  test('cropStr() should crop strings correctly', () => {
    expect(cropStr('abcdefghijklmnopqrstuvwxyz', 10)).toBe('abcdefghij…');
    expect(cropStr('abcde', 10)).toBe('abcde');
    expect(cropStr('abcdefghij', 10)).toBe('abcdefghij');
    expect(cropStr('abcdefghijklmnopqrstuvwxyz', 10, false)).toBe('abcdefghij');
  });

  describe('getDisplayName()', () => {
    const HOC_NAME = 'withHoc';
    test('Should return (Component) if no displayName or name', () => {
      const component = React.createElement('Test', {}, null);
      expect(getDisplayName(HOC_NAME, component)).toBe(`${HOC_NAME}(Component)`);
    });

    test('Should return (name)', () => {
      expect(getDisplayName(HOC_NAME, MockComp)).toBe(`${HOC_NAME}(MockComp)`);
    });

    test('Should return (displayName)', () => {
      MockComp.displayName = 'MockCompDn';
      expect(getDisplayName(HOC_NAME, MockComp)).toBe(`${HOC_NAME}(MockCompDn)`);
    });
  });

  test('ucFirst() should capitalise the first letter of a string', () => {
    expect(ucFirst('test')).toBe('Test');
  });
});
