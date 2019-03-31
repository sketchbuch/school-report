// @flow

import React from 'react';
import { shallow } from 'enzyme';
import ReportsCategories from './ReportsCategories';
import type { Props } from './ReportsCategories';

describe('<ReportsCategories />', () => {
  const props: Props = {
    catClick: jest.fn(),
    catId: '12345',
    categories: [],
    search: {
      anywhere: false,
      anywhereIconClick: jest.fn(),
      page: 1,
      pageChange: jest.fn(),
      searchChange: jest.fn(),
      searchIconClick: jest.fn(),
      term: '',
      visible: false,
    },
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<ReportsCategories {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
