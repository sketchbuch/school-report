// @flow

import React from 'react';
import { shallow } from 'enzyme';
import appDefault from '../../types/app';
import classDefault from '../../types/class';
import settingsDefault from '../../types/settings';
import type { Props } from './App';
import { App } from './App';

describe('<App />', () => {
  const props: Props = {
    app: { ...appDefault },
    classes: [],
    currentLang: 'EN',
    dispatch: jest.fn(),
    settings: { ...settingsDefault },
  };
  const propsLoaded: Props = { ...props, app: { ...props.app, loaded: true } };

  test('Renders without crashing', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Shows Panels if "loaded" is true & "error" is false and dataFolderCreated is false', () => {
    const propsLoadedWithClasses: Props = { ...propsLoaded, classes: [{ ...classDefault }] };
    const wrapper = shallow(<App {...propsLoadedWithClasses} />);
    expect(wrapper.find('withRouter(Panels)')).toHaveLength(1);
  });

  test('Shows AppError if "app.error" is true', () => {
    const propsError: Props = { ...props, app: { ...props.app, error: true } };
    const wrapper = shallow(<App {...propsError} />);
    expect(wrapper.find('AppError')).toHaveLength(1);
  });
});
