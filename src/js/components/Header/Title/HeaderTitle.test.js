// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeaderTitle from './HeaderTitle';
import '../../Translation/testData';

configure({ adapter: new Adapter() });

describe('<HeaderTitle />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<HeaderTitle />);
    expect(wrapper).toHaveLength(1);
  });

  test('Uses window.reportr.appName if the translation for Name:App does not exist', () => {
    const newAppName = 'Red Dwarf';
    const newAppName2 = 'Dr. Who';
    const oldAppName = window.reportr.translations.EN.App.Name;
    window.reportr.translations.EN.App.Name = newAppName;
    window.reportr.appName = 'Dr. Who';

    const wrapper1 = shallow(<HeaderTitle />);
    expect(wrapper1.find('.HeaderTitle_text').text()).toBe(newAppName);

    delete window.reportr.translations.EN.App.Name;

    const wrapper2 = shallow(<HeaderTitle />);
    expect(wrapper2.find('.HeaderTitle_text').text()).toBe(newAppName2);

    window.reportr.translations.EN.App.Name = oldAppName;
  });
});