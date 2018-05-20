// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Translation from './Translation';
import './testData';

configure({ adapter: new Adapter() });

describe('<Translation />', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Translation name="ErrorTxt" ns="AppError" />, div);
  });

  test('Renders the correct translation', () => {
    const wrapper = shallow(<Translation name="Name" ns="App" />);
    expect(wrapper.text()).toBe(window.reportr.translations.EN.App.Name);
  });

  test('Handles Language change', () => {
    const wrapper = mount(<Translation name="ErrorTxt" ns="AppError" />);
    expect(wrapper.text()).toBe(window.reportr.translations.EN.AppError.ErrorTxt);
    window.reportr.curLang = 'DE';
    wrapper.instance().forceUpdate(); // Todo: forcing until wrapper.update() is fixed.
    expect(wrapper.text()).toBe(window.reportr.translations.DE.AppError.ErrorTxt);
    window.reportr.curLang = 'EN';
  });
});
