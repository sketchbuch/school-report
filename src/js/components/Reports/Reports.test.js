// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../store/redux';
import ConnectedReports, { Reports } from './Reports';
import categoryDefault, { CategoryFactory } from '../../types/category';
import pupilDefault, { PupilFactory } from '../../types/pupil';
import textDefault, { TextFactory } from '../../types/text';
import '../Translation/testData';
import { CLIENT_RENEG_LIMIT } from 'tls';

configure({ adapter: new Adapter() });

describe('<Reports />', () => {
  const props = {
    activePupil: PupilFactory({...pupilDefault, firstname: 'Dr', lastname: 'Who'}, Date.now(), 'cl1'),
    activeReport: {},
    categories: [
      CategoryFactory({...categoryDefault, label: 'Lister' }, Date.now()),
      CategoryFactory({...categoryDefault, label: 'Rimmer' }, Date.now()),
      CategoryFactory({...categoryDefault, label: 'The Cat' }, Date.now()),
    ],
    texts: [
      TextFactory({...textDefault, bodytext: 'Red Dwarf', categories: [] }, Date.now(), 'EN'),
      TextFactory({...textDefault, bodytext: 'Blue Midget', categories: [] }, Date.now(), 'EN'),
      TextFactory({...textDefault, bodytext: 'Starbug', categories: [] }, Date.now(), 'EN'),
    ],
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><ConnectedReports /></Provider>);
    expect(wrapper).toHaveLength(1);
  });

  describe('handleTextMove()', () => {
    test('Exits if newSelected[activePupilId] === undefined', () => {
      const wrapper = mount(<Provider store={store}><ConnectedReports /></Provider>);
      const instance = wrapper.find('Reports').instance();
      
      instance.handleTextMove(props.texts[0].id, props.texts[1].id, false);
      expect(instance.state.selected).toEqual({});
    });

    test('Exits sourceIndex or targetIndex less than 0', () => {
      const wrapper = mount(<Provider store={store}><ConnectedReports /></Provider>);
      const instance = wrapper.find('Reports').instance();
      
      instance.handleTextMove(props.texts[0].id, props.texts[1].id, false);
      expect(instance.state.selected).toEqual({});
    });

    test('Updates selected with the new text order', () => {
      const activeId = props.activePupil.id;
      const initialSelected = { [activeId]: [] };
      const expectedSelected = { [activeId]: [] };

      initialSelected[activeId].push(props.texts[0].id);
      initialSelected[activeId].push(props.texts[1].id);
      expectedSelected[activeId].push(props.texts[1].id);
      expectedSelected[activeId].push(props.texts[0].id);

      const wrapper = mount(<Provider store={store}><ConnectedReports {...props} initialSelected={initialSelected} /></Provider>);
      const instance = wrapper.find('Reports').instance();
      
      expect(instance.state.selected).toEqual(initialSelected);
      instance.handleTextMove(props.texts[0].id, props.texts[1].id, false);
      expect(instance.state.selected).toEqual(expectedSelected);
    });
  });
});
