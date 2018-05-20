// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import SidebarItem from './SidebarItem';
import ClassDefault, { ClassFactory } from '../../../types/class';
import '../../Translation/testData';

describe('<SidebarItem />', () => {
  const props = {
    isNew: false,
    item: ClassFactory({...ClassDefault}, Date.now()),
    itemDuration: 1000,
    itemType: 'class',
    onDelete: ()=>{},
    updateExistingItems: ()=>{},
  };

  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><SidebarItem {...props} /></MemoryRouter>, div);
  });
});
