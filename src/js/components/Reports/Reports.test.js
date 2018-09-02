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
    builder: {
      [ACTIVE_REPORT.id]: {
        [ACTIVE_CLASS.id]: {
          [ACTIVE_PUPIL.id]: [ texts[0].id, texts[2].id ],
        },
      },
    },
    categories: [
      CategoryFactory({...categoryDefault, label: 'Lister' }, Date.now()),
      CategoryFactory({...categoryDefault, label: 'Rimmer' }, Date.now()),
      CategoryFactory({...categoryDefault, label: 'The Cat' }, Date.now()),
    ],
    texts,
  };
  let dragReports = jest.fn();
  let saveReports = jest.fn();

  beforeEach(() => {
    dragReports = jest.fn();
    saveReports = jest.fn();
  });

  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><ConnectedReports {...props} /></Provider>);
    expect(wrapper).toHaveLength(1);
  });

  describe('handleTextMove()', () => {
    test('Exits sourceIndex or targetIndex less than 0', () => {
      const wrapper = mount(<Reports store={store} {...props} dragReports={dragReports} saveReports={saveReports} />);
      const instance = wrapper.find('Reports').instance();

      instance.handleTextMove(props.texts[0].id, props.texts[1].id, false);
      instance.handleTextMove(props.texts[1].id, props.texts[2].id, false);
      expect(dragReports).not.toHaveBeenCalled();

      instance.handleTextMove(props.texts[0].id, props.texts[2].id, false);
      expect(dragReports).toHaveBeenCalled();
    });

    test('Updates selected with the new text order', () => {
      const expectedSelected = [ props.texts[2].id, props.texts[0].id ];
      const wrapper = mount(<Reports store={store} {...props} dragReports={dragReports} saveReports={saveReports} />);
      const instance = wrapper.find('Reports').instance();
      
      instance.handleTextMove(props.texts[0].id, props.texts[2].id, false);
      expect(dragReports).toHaveBeenCalledWith(ACTIVE_REPORT.id, ACTIVE_CLASS.id, ACTIVE_PUPIL.id, expectedSelected);
    });
  });

  describe('handleTextToggle()', () => {
    const expectedSelected = [ 'p30' ];

    test('Adds textId if reportId is not in the builder object', () => {
      const testProps = {...props};
      testProps.builder = {};

      const wrapper = mount(<Reports store={store} {...testProps} dragReports={dragReports} saveReports={saveReports} />);
      const instance = wrapper.find('Reports').instance();
      
      instance.handleTextToggle(expectedSelected[0])(expectedSelected[0]);
      expect(saveReports).toHaveBeenCalledWith(ACTIVE_REPORT.id, ACTIVE_CLASS.id, ACTIVE_PUPIL.id, expectedSelected);
    });

    test('Adds textId if classId is not in the builder object', () => {
      const testProps = {...props};
      testProps.builder = { [ACTIVE_REPORT.id]: {} };

      const wrapper = mount(<Reports store={store} {...testProps} dragReports={dragReports} saveReports={saveReports} />);
      const instance = wrapper.find('Reports').instance();
      
      instance.handleTextToggle(expectedSelected[0])({});
      expect(saveReports).toHaveBeenCalledWith(ACTIVE_REPORT.id, ACTIVE_CLASS.id, ACTIVE_PUPIL.id, expectedSelected);
    });

    test('Adds textId if pupilId is not in the builder object', () => {
      const testProps = {...props};
      testProps.builder = {
        [ACTIVE_REPORT.id]: {
          [ACTIVE_CLASS.id]: {
          },
        },
      }

      const wrapper = mount(<Reports store={store} {...testProps} dragReports={dragReports} saveReports={saveReports} />);
      const instance = wrapper.find('Reports').instance();
      
      instance.handleTextToggle(expectedSelected[0])({});
      expect(saveReports).toHaveBeenCalledWith(ACTIVE_REPORT.id, ACTIVE_CLASS.id, ACTIVE_PUPIL.id, expectedSelected);
    });

    test('Adds the text if it is not already selected' , () => {
      const testProps = {...props};
      const textId = 'p31';
      const expectedResult = [...props.builder[ACTIVE_REPORT.id][ACTIVE_CLASS.id][ACTIVE_PUPIL.id], textId];

      const wrapper = mount(<Reports store={store} {...testProps} dragReports={dragReports} saveReports={saveReports} />);
      const instance = wrapper.find('Reports').instance();

      instance.handleTextToggle(textId)({});
      expect(saveReports).toHaveBeenCalledWith(ACTIVE_REPORT.id, ACTIVE_CLASS.id, ACTIVE_PUPIL.id, expectedResult);
    });

    test('Removes the text if it is already selected' , () => {
      const testProps = {...props};
      const textId = props.builder[ACTIVE_REPORT.id][ACTIVE_CLASS.id][ACTIVE_PUPIL.id][0];
      const expectedResult = [...props.builder[ACTIVE_REPORT.id][ACTIVE_CLASS.id][ACTIVE_PUPIL.id]];
      expectedResult.shift();

      const wrapper = mount(<Reports store={store} {...testProps} dragReports={dragReports} saveReports={saveReports} />);
      const instance = wrapper.find('Reports').instance();

      instance.handleTextToggle(textId)({});
      expect(saveReports).toHaveBeenCalledWith(ACTIVE_REPORT.id, ACTIVE_CLASS.id, ACTIVE_PUPIL.id, expectedResult);
    });
  });

  test('handleEndDrag()', () => {
    const testProps = {...props};
    const wrapper = mount(<Reports store={store} {...testProps} dragReports={dragReports} saveReports={saveReports} />);
    const instance = wrapper.find('Reports').instance();
    const expectedResult = [...props.builder[ACTIVE_REPORT.id][ACTIVE_CLASS.id][ACTIVE_PUPIL.id]];

    instance.handleEndDrag();
    expect(saveReports).toHaveBeenCalledWith(ACTIVE_REPORT.id, ACTIVE_CLASS.id, ACTIVE_PUPIL.id, expectedResult);
  });
});