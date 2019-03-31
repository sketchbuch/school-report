// @flow

import React from 'react';
import { shallow } from 'enzyme';
import ReportsCategories from './ReportsCategories';
import type { Props } from './ReportsCategories';
import mockSearch from '../../../tests/mockSearch';

describe('<ReportsCategories />', () => {
  const props: Props = {
    ...mockSearch,
    catClick: jest.fn(),
    catId: '12345',
    categories: [],
    selectedTexts: [],
    texts: [],
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<ReportsCategories {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
