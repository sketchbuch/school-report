// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { HomeLayout, menuTypes } from './HomeLayout';

describe('<HomeLayout />', () => {
  const wrapper = shallow(<HomeLayout />);
  const LEN: number = menuTypes.length;

  test('Renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  test('Renders a Link for each menu option', () => {
    expect(wrapper.find('Link')).toHaveLength(LEN);
  });

  test('Renders a ButtonCircular for each menu option', () => {
    expect(wrapper.find('ButtonCircular')).toHaveLength(LEN);
  });

  test('Renders a Icon for each menu option', () => {
    expect(wrapper.find('Icon')).toHaveLength(LEN);
  });

  test('Renders a title for each menu option', () => {
    expect(wrapper.find('.HomeLayout__title')).toHaveLength(LEN);
  });

  test('Renders a description for each menu option', () => {
    expect(wrapper.find('.HomeLayout__description')).toHaveLength(LEN);
  });
});
