// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import appDefault from '../../types/app';
import classDefault from '../../types/class';
import settingsDefault from '../../types/settings';
import store from '../../store/redux';
import { App } from './App';

describe('<App />', () => {
  const props = {
    app: { ...appDefault },
    classes: [],
    currentLang: 'EN',
    dispatch: jest.fn(),
    settings: { ...settingsDefault },
  };
  const propsLoaded = { ...props, app: { ...props.app, loaded: true } };
  const propsLoadedWithClasses = { ...propsLoaded, classes: [{ ...classDefault }] };

  test('Renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App {...props} />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });

  test('Shows content if "loaded" is true & "error" is false and dataFolderCreated is false', () => {
    const wrapperWithClasses = mount(
      <Provider store={store}>
        <App {...propsLoadedWithClasses} />
      </Provider>
    );
    expect(wrapperWithClasses.find('.Panels')).toHaveLength(1);
  });
});
