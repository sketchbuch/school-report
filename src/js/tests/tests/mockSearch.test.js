// @flow

import mockSearch from '../mockSearch';
import { defaultState } from '../../hoc/withSearch';
import type { WithSearchProps } from '../../hoc/withSearch';

const testFunctionIsInProps = (functionName: string, props: WithSearchProps): void => {
  test(`Search props contains the function "${functionName}"`, () => {
    expect(props.search).toHaveProperty(functionName);
    expect(typeof props.search[functionName]).toBe('function');
  });
};

describe('mockSearch:', () => {
  test('Returns an object with a search property', () => {
    expect(mockSearch).toHaveProperty('search');
  });

  test('Search props contain state', () => {
    expect(JSON.parse(JSON.stringify(mockSearch)).search).toEqual(defaultState);
  });

  testFunctionIsInProps('handleChange', mockSearch);
  testFunctionIsInProps('handleKeyUp', mockSearch);
  testFunctionIsInProps('handlePageChange', mockSearch);
  testFunctionIsInProps('handleReset', mockSearch);
  testFunctionIsInProps('handleToggleAnywhere', mockSearch);
  testFunctionIsInProps('handleToggleVisibility', mockSearch);
});
