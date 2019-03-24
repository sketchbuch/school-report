// @flow

import React from 'react';
import { shallow } from 'enzyme';
import LetterCount from './LetterCount';
import type { Props } from './LetterCount';

describe('<LetterCount />', () => {
  const props: Props = {
    count: '5',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<LetterCount {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
