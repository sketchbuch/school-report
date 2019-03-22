// @flow

import React from 'react';
import { shallow } from 'enzyme';
import FieldWrap from './FieldWrap';
import type { Props } from './FieldWrap';

describe('<FieldWrap />:', () => {
  const props: Props = { children: null };

  test('Renders without crashing', () => {
    const wrapper = shallow(<FieldWrap {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
