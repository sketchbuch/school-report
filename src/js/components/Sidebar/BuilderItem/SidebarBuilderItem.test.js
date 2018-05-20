// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SidebarBuilderItem from './SidebarBuilderItem';
import  classDefault, { ClassFactory } from '../../../types/class';
import '../../Translation/testData';

configure({ adapter: new Adapter() });

describe('<SidebarBuilderItem />', () => {
  test('Renders without crashing', () => {
    const classRec = ClassFactory({...classDefault}, Date.now());
    const props = {
      item: {
        classRec: classRec,
        id: classRec.id,
        pupils: [],
        reportId: 'r1',
      },
      itemType: 'class',
    };

    const wrapper = shallow(<SidebarBuilderItem {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
