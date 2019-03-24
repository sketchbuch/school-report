// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import type { Props } from './Header';

jest.doMock('./Path/HeaderPath', () => {
  const HeaderPath = props => {
    return <div className="MockHeaderPath">{props.path}</div>;
  };
  return HeaderPath;
});

describe('<Header />', () => {
  const props: Props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
