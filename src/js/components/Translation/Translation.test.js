// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Translation from './Translation';
import './testData';

configure({ adapter: new Adapter() });

const windowApp = {...window.reportr};

describe('<Translation />', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Translation name="Name" ns="App" />, div);
  });

  test('Renders the correct translation', () => {
    const wrapper = shallow(<Translation name="Name" ns="App" />);
    expect(wrapper.text()).toBe(window.reportr.translations.EN.App.Name);
  });

  test('Handles Language change', () => {
    const wrapper = mount(<Translation name="Name" ns="App" />);
    expect(wrapper.text()).toBe(window.reportr.translations.EN.App.Name);
    window.reportr.curLang = 'DE';
    wrapper.instance().forceUpdate();
    expect(wrapper.text()).toBe(window.reportr.translations.DE.App.Name);
    window.reportr.curLang = 'EN';
  });

  test('Replaces placeholders', () => {
    const wrapper = shallow(<Translation name='Placeholder' ns= 'App' placeholders={{ PH: 'Find me' }} />);
    expect(wrapper.text()).toBe(window.reportr.translations.EN.App.Placeholder.replace('%PH%', 'Find me'));
  });

  describe('Handles window.reportr correctly', () => {
    beforeEach(() => {
      window.reportr = {...windowApp};
    });

    test('Returns ?name:ns if translations undefined', () => {
      delete window.reportr.translations;
      const wrapper = shallow(<Translation name="Name" ns="App" />);
      expect(wrapper.text()).toBe('?Name:App');
    });
    
    test('Returns ?name:ns if the language is undefined in translations', () => {
      window.reportr.curLang = 'IT';
      const wrapper = shallow(<Translation name="Name" ns="App" />);
      expect(wrapper.text()).toBe('?Name:App');
    });

    test('Returns ?name:ns if the namespace is undefined', () => {
      const wrapper = shallow(<Translation name="Name" ns="Wrong" />);
      expect(wrapper.text()).toBe('?Name:Wrong');
    });

    test('Returns ?name:ns if the name is undefined', () => {
      const wrapper = shallow(<Translation name="Wrong" ns="App" />);
      expect(wrapper.text()).toBe('?Wrong:App');
    });
  });

  describe('shouldComponentUpdate', () => {
    const initialProps = { name: 'Name', ns: 'App'};
    const wrapper = shallow(<Translation {...initialProps} />);
    const wrapperInstance = wrapper.instance();

    test('should not update if the props are the same', () => {
      const shouldUpdate = wrapperInstance.shouldComponentUpdate({ name: 'Name', ns: 'App' });
      expect(shouldUpdate).toBe(false);
    });

    test('should update if the props are different', () => {
      const shouldUpdate1 = wrapperInstance.shouldComponentUpdate({ name: 'Placeholder', ns: 'App' });
      const shouldUpdate2 = wrapperInstance.shouldComponentUpdate({ name: 'Placeholder', ns: 'NotFound' });
      window.reportr.curLang = 'DE';
      const shouldUpdate3 = wrapperInstance.shouldComponentUpdate({ name: 'Placeholder', ns: 'NotFound' });
      window.reportr.curLang = 'EN';
      expect(shouldUpdate1).toBe(true);
      expect(shouldUpdate2).toBe(true);
      expect(shouldUpdate3).toBe(true);
    });
  });

  test('componentWillUpdate()', () => {
    const wrapper = mount(<Translation name="Name" ns="App" />);
    const wrapperInstance = wrapper.instance();
    expect(wrapperInstance.prevLang).toBe('EN');
    window.reportr.curLang = 'DE';
    wrapper.setProps({ name: 'Placeholder' });
    expect(wrapperInstance.prevLang).toBe('DE');
    window.reportr.curLang = 'EN';
  });
});