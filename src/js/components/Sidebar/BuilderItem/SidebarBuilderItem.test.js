// @flow

import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import SidebarBuilderItem from './SidebarBuilderItem';
import  classDefault, { ClassFactory } from '../../../types/class';
import  pupilDefault, { PupilFactory } from '../../../types/pupil';
import '../../Translation/testData';

configure({ adapter: new Adapter() });

describe('<SidebarBuilderItem />', () => {
  const classRec = ClassFactory({...classDefault, label: 'Starbug' }, Date.now());
  const pupilRec = PupilFactory({...pupilDefault, firstname: 'Arnold', lastname: 'Rimme' }, Date.now(), classRec.id);
  const props = {
    item: {
      classRec: classRec,
      id: classRec.id,
      pupils: [],
      reportId: 'r1',
    },
    itemType: 'class',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<SidebarBuilderItem {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('className correctly set', () => {
    const props1 = {...props};
    const wrapper1 = shallow(<SidebarBuilderItem {...props1} />);
    expect(wrapper1.find('.SidebarBuilderItem--active')).toHaveLength(0);
    expect(wrapper1.find('.SidebarBuilderItem--inactive')).toHaveLength(1);
    expect(wrapper1.find('.SidebarBuilderItem--open')).toHaveLength(0);

    const props2 = {...props, item: {...props.item, pupils: [ pupilRec ]}};
    const wrapper2 = shallow(<SidebarBuilderItem {...props2} />);
    expect(wrapper2.find('.SidebarBuilderItem--active')).toHaveLength(1);
    expect(wrapper2.find('.SidebarBuilderItem--inactive')).toHaveLength(0);
    expect(wrapper2.find('.SidebarBuilderItem--open')).toHaveLength(0);
  });

  describe('Opens/Closes', () => {
    test('Stays closed if no pupils', () => {
      const wrapper = mount(<MemoryRouter><SidebarBuilderItem {...props} /></MemoryRouter>);
      const sidebarInner = wrapper.find('.SidebarInner');

      expect(sidebarInner).toHaveLength(1);
      expect(wrapper.find('.SidebarBuilderItem--open')).toHaveLength(0);

      sidebarInner.first().simulate('click');
      expect(wrapper.find('.SidebarBuilderItem--open')).toHaveLength(0);
    });

    test('Opens and closes if there are pupils', () => {
      const propsOc = {...props, item: {...props.item, pupils: [ pupilRec ]}};
      const wrapper = mount(<MemoryRouter><SidebarBuilderItem {...propsOc} /></MemoryRouter>);
      const sidebarInner = wrapper.find('.SidebarInner');

      expect(sidebarInner).toHaveLength(1);
      expect(wrapper.find('.SidebarBuilderItem--open')).toHaveLength(0);

      sidebarInner.first().simulate('click');
      expect(wrapper.find('.SidebarBuilderItem--open')).toHaveLength(1);

      sidebarInner.first().simulate('click');
      expect(wrapper.find('.SidebarBuilderItem--open')).toHaveLength(0);
    });
  });
});
