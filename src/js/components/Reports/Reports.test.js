// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../store/redux';
import ConnectedReports, { Reports } from './Reports';
import categoryDefault, { CategoryFactory } from '../../types/category';
import classDefault, { ClassFactory } from '../../types/class';
import pupilDefault, { PupilFactory } from '../../types/pupil';
import reportDefault, { ReportFactory } from '../../types/report';
import textDefault, { TextFactory } from '../../types/text';
import '../Translation/testData';
import { CLIENT_RENEG_LIMIT } from 'tls';

configure({ adapter: new Adapter() });

describe('<Reports />', () => {
  const ACTIVE_REPORT = ReportFactory({...reportDefault, label: 'Test Report'}, Date.now());
  const ACTIVE_CLASS = ClassFactory({...classDefault, label: 'Latimer Yr.1'}, Date.now());
  const ACTIVE_PUPIL = PupilFactory({...pupilDefault, firstname: 'Dr', lastname: 'Who'}, Date.now(), ACTIVE_CLASS.id);
  const texts = [
    TextFactory({...textDefault, bodytext: 'Red Dwarf', categories: [] }, Date.now(), 'EN'),
    TextFactory({...textDefault, bodytext: 'Blue Midget', categories: [] }, Date.now(), 'EN'),
    TextFactory({...textDefault, bodytext: 'Starbug', categories: [] }, Date.now(), 'EN'),
  ]
  const props = {
    activeClass: ACTIVE_CLASS,
    activePupil: ACTIVE_PUPIL,
    activeReport: ACTIVE_REPORT,
    categories: [
      CategoryFactory({...categoryDefault, label: 'Lister' }, Date.now()),
      CategoryFactory({...categoryDefault, label: 'Rimmer' }, Date.now()),
      CategoryFactory({...categoryDefault, label: 'The Cat' }, Date.now()),
    ],
    texts,
  };
  let saveReports = jest.fn();

  beforeEach(() => {
    saveReports = jest.fn();
  });

  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><ConnectedReports {...props} /></Provider>);
    expect(wrapper).toHaveLength(1);
  });
});