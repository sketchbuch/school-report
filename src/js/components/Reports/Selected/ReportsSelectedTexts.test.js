// @flow

import React from 'react';
import { shallow } from 'enzyme';
import ReportsSelectedTexts from './ReportsSelectedTexts';
import InfoMsg from '../../InfoMsg/InfoMsg';
import textDefault from '../../../types/text';

describe('<ReportsSelectedTexts />', () => {
  const props = {
    activePupil: {},
    selectedTexts: ['t1', 't2'],
    texts: [],
  };
  const texts1 = [{ ...textDefault, id: 't3', bodytext: 'Starbug', categories: ['c1', 'c2'] }];
  const texts2 = [
    { ...textDefault, id: 't1', bodytext: 'Red Dwarf', categories: ['c1'] },
    { ...textDefault, id: 't2', bodytext: 'Blue Midget', categories: ['c1'] },
    { ...textDefault, id: 't3', bodytext: 'Starbug', categories: ['c1', 'c2'] },
  ];

  test('Renders without crashing', () => {
    const wrapper = shallow(<ReportsSelectedTexts />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders selectedTexts correctly', () => {
    const wrapper1 = shallow(<ReportsSelectedTexts {...props} texts={texts1} />);
    const wrapper2 = shallow(<ReportsSelectedTexts {...props} texts={texts2} />);

    expect(wrapper1.find('.ReportsSelectedTexts')).toHaveLength(0);
    expect(wrapper1.find(InfoMsg)).toHaveLength(1);
    expect(wrapper2.find('.ReportsSelectedTexts').prop('children')).toHaveLength(2);
  });

  test('getSelectedTexts() returns the expected texts', () => {
    const wrapper = shallow(<ReportsSelectedTexts {...props} texts={texts2} />);
    const expectedTexts = texts2.slice(0, 2);
    expect(wrapper.instance().getSelectedTexts()).toEqual(expectedTexts);
  });
});
