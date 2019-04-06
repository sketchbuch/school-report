// @flow

import React from 'react';
import { shallow } from 'enzyme';
import TextPreview from './TextPreview';
import pupilDefault, { PupilFactory } from '../../types/pupil';
import type { Props } from './TextPreview';

describe('<TextPreview />', () => {
  const props: Props = {
    editor: false,
    pupil: PupilFactory({ ...pupilDefault, firstname: 'Joe', id: 'dummy', lastname: 'Bloggs' }, Date.now(), 'c1'),
    text: 'Some text...',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<TextPreview {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
