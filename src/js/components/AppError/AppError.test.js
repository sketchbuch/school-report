// @flow

import React from 'react';
import { shallow } from 'enzyme';
import AppError from './AppError';
import type { Props } from './AppError';

describe('<AppError />', () => {
  const props: Props = {
    errorTxt: 'Error Loading',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<AppError {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
