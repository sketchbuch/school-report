// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { App } from './App';
import appDefault from '../../types/app';
import store from '../../store/redux';

describe('<App />', () => {
  const props = {
    app: appDefault,
    classes: [],
    currentLang: 'EN',
    dispatch: jest.fn(),
    settings: {},
  };
  const propsLoaded = Object.assign({}, props);
  propsLoaded.app.loaded = true;
  const propsLoadedWithClasses = Object.assign({}, propsLoaded, { classes: [{}] });

  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><App {...props} /></Provider>);
    expect(wrapper).toHaveLength(1);
  });

  test('Shows content if "loaded" is true & "error" is false and dataFolderCreated is false', () => {
    const wrapperWithClasses = mount(<Provider store={store}><App {...propsLoadedWithClasses} /></Provider>);
    expect(wrapperWithClasses.find('.Panels')).toHaveLength(1);
  });
});
