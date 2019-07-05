// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { CategoriesLayout } from './CategoriesLayout';
import mockSearch from '../../tests/mockSearch';
import type { Props } from './CategoriesLayout';

describe('<CategoriesLayout />:', () => {
  const props: Props = {
    ...mockSearch,
    categories: [],
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<CategoriesLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  describe('Methods:', () => {
    test('renderDelete() returns DeleteCategoriesLayout', () => {
      const wrapper = shallow(<CategoriesLayout {...props} />);
      const instance = wrapper.instance();
      const result = instance.renderDelete();
      console.log(shallow(shallow(result).dive()).dive());
      ///expect(result).toHaveLength(1);
    });
  });
});
