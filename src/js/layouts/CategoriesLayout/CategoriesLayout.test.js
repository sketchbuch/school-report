// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import mockRouter from '../../tests/mockRouter';
import mockSearch from '../../tests/mockSearch';
import type { Props } from './CategoriesLayout';
import { CategoriesLayout } from './CategoriesLayout';

describe('<CategoriesLayout />:', () => {
  const props: Props = {
    ...mockSearch,
    categories: [],
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<CategoriesLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  describe('render():', () => {
    const wrapper = shallow(<CategoriesLayout {...props} />);

    test('Renders .Panel', () => {
      expect(wrapper.find('.Panel')).toHaveLength(1);
    });

    test('Renders <Switch />', () => {
      expect(wrapper.find('Switch')).toHaveLength(1);
    });

    describe('Sidebar:', () => {
      const sidebar = wrapper.find('Sidebar');

      test('Renders <Sidebar />', () => {
        expect(sidebar).toHaveLength(1);
      });

      test('Renders <SidebarHeader />', () => {
        expect(sidebar.dive().find('SidebarHeader')).toHaveLength(1);
      });

      test('Renders <SearchBox />', () => {
        expect(
          sidebar
            .dive()
            .find('SidebarHeader')
            .dive()
            .find('SearchBox')
        ).toHaveLength(1);
      });

      test('Renders <SidebarList />', () => {
        expect(sidebar.dive().find('SidebarList')).toHaveLength(1);
      });
    });
  });

  describe('Render helpers:', () => {
    const wrapper = shallow(<CategoriesLayout {...props} />);
    const instance = wrapper.instance();

    test('renderDelete() returns <Delete />', () => {
      const RenderDelete = instance.renderDelete;
      const comp = shallow(<RenderDelete {...mockRouter} />);
      expect(comp.find('Delete')).toHaveLength(1);
    });

    test('renderInfo() returns <InfoMsg />', () => {
      const RenderInfo = instance.renderInfo;
      const comp = shallow(<RenderInfo {...mockRouter} />);
      expect(comp.find('InfoMsg')).toHaveLength(1);
    });

    test('renderActionsLeft() returns <ActionButton />', () => {
      const RenderActionsLeft = instance.renderActionsLeft;
      const comp = shallow(<RenderActionsLeft />);
      expect(comp.find('ActionButton')).toHaveLength(1);
    });

    test('renderActionsRight() returns <ActionButton />', () => {
      const RenderActionsRight = instance.renderActionsRight;
      const comp = shallow(<RenderActionsRight />);
      expect(comp.find('ActionButton')).toHaveLength(1);
    });

    test('renderNew() returns <Edit />', () => {
      const RenderNew = instance.renderNew;
      const comp = shallow(<RenderNew {...mockRouter} />);
      expect(comp.find('Edit')).toHaveLength(1);
    });

    test('renderEdit() returns <Edit />', () => {
      const RenderEdit = instance.renderEdit;
      const comp = shallow(<RenderEdit {...mockRouter} />);
      expect(comp.find('Edit')).toHaveLength(1);
    });
  });
});
