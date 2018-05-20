// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import InfoMessage from './InfoMessage';

configure({ adapter: new Adapter() });

describe('<InfoMessage />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<MemoryRouter><InfoMessage headline="School" subtext="Report" /></MemoryRouter>);
    expect(wrapper).toHaveLength(1);
  });
});
