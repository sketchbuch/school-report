// @flow

import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from './SearchBox';
import type { Props } from './SearchBox';
import type { SearchProps } from '../../../../hoc/withSearch';
import { SearchField } from '../../../Ui';

describe('<SearchBox />', () => {
  const search: SearchProps = {
    anywhere: false,
    page: 1,
    term: '',
    visible: false,
    handleChange: jest.fn(),
    handleKeyUp: jest.fn(),
    handlePageChange: jest.fn(),
    handleReset: jest.fn(),
    handleToggleAnywhere: jest.fn(),
    handleToggleVisibility: jest.fn(),
  };
  const props: Props = {
    hasSearch: true,
    search,
    domainType: 'category',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<SearchBox {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Should return null if !hasSearch', () => {
    const wrapper = shallow(<SearchBox {...props} hasSearch={false} />);
    expect(wrapper.type()).toEqual(null);
  });

  test('Returns a SearchField if hasSearch', () => {
    const wrapper = shallow(<SearchBox {...props} />);
    expect(wrapper.find(SearchField)).toHaveLength(1);
  });
});
