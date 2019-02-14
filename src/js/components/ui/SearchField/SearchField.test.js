import React from 'react';
import { shallow } from 'enzyme';
import SearchField from './SearchField';

describe('<SearchField />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<SearchField />);
    expect(wrapper).toHaveLength(1);
  });
});
