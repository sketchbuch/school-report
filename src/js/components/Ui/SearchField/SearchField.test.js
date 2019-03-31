//@flow

import React from 'react';
import { shallow } from 'enzyme';
import SearchField from './SearchField';
import type { Props } from './SearchField';

describe('<SearchField />', () => {
  const props: Props = {
    anywhere: false,
    anywhereOnClick: jest.fn(),
    classes: '',
    clearOnClick: jest.fn(),
    iconOnClick: jest.fn(),
    onChange: jest.fn(),
    onKeyUp: jest.fn(),
    placeholder: '',
    term: '',
    visible: false,
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<SearchField {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
