import React from 'react';
import { shallow } from 'enzyme';
import Select from './Select';

describe('<Select />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<Select />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders the correct number of opions', () => {
    const wrapper = shallow(<Select options={{ a: 'A', b: 'B', c: 'C' }} />);
    expect(wrapper.find('option')).toHaveLength(3);
  });
});
