// @flow

jest.doMock('./Path/HeaderPath', () => {
  const HeaderPath = (props) => {
    console.log('path', props.path);
    return <div className="MockHeaderPath">{props.path}</div>
  };
  return HeaderPath;
});

import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import {
  ROUTE_BUILDER,
  ROUTE_CATEGORIES,
  ROUTE_CLASSES,
  ROUTE_EDIT_BUILDER,
  ROUTE_EDIT_CATEGORY,
  ROUTE_EDIT_CLASS,
  ROUTE_EDIT_PUPIL,
  ROUTE_EDIT_REPORT,
  ROUTE_EDIT_TEXT,
  ROUTE_HOME,
  ROUTE_PUPILS,
  ROUTE_REPORTS,
  ROUTE_SETTINGS,
  ROUTE_TEXTS,
} from '../../constants/routes';
import store from '../../store/redux';
import '../Translation/testData';

configure({ adapter: new Adapter() });

describe('<Header />', () => {
  const props = {
    history: {},
    location: {},
    match: {},
  }

  test('Renders without crashing', () => {
    const wrapper = shallow(<MemoryRouter><Header {...props} /></MemoryRouter>);
    expect(wrapper).toHaveLength(1);
  });

  test.skip('Renders without crashing', () => {
    const wrapper = mount(<Provider store={store}><MemoryRouter initialEntries={[ ROUTE_CATEGORIES ]}><Header {...props} /></MemoryRouter></Provider>);
    expect(wrapper.find('.Header__sitetitle')).toHaveLength(1);
  });
});