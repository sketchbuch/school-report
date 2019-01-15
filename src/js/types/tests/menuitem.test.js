// @flow

import menuItemDefault, { MenuItemFactory, getMenuItemIdStr } from '../menuitem';
import { generateId } from '../../utils/ids';

describe('Types: Menuitem', () => {
  const miObj = {
    ...menuItemDefault,
    key: 'classes',
  };
  const ts = Date.now();
  const idStr = getMenuItemIdStr(miObj);
  const id = generateId(idStr, ts);
  const testMi = {
    ...menuItemDefault,
    description: 'Create/Edit classes and pupils',
    icon: 'group-students',
    id: id,
    key: 'classes',
    label: 'Classes',
    route: '/classes',
  };

  test('MenuItemFactory() correctly returns a new menuitm object', () => {
    const newMiObj = MenuItemFactory(miObj, ts);
    expect(newMiObj).toEqual(testMi);
  });

  test('getMenuItemIdStr() returns the same string given the same object', () => {
    const idStrCompare = getMenuItemIdStr(miObj);
    expect(idStr).toEqual(idStrCompare);
  });
});
