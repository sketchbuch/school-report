// @flow

import menuItemDefault, { MenuItemFactory, getMenuItemIdStr } from '../menuitem';
import type { MenuItemType } from '../menuitem';
import { generateId } from '../../utils/ids';

describe('Types: Menuitem', () => {
  const miObj: MenuItemType = {
    ...menuItemDefault,
    key: 'classes',
  };
  const ts: number = Date.now();
  const idStr: string = getMenuItemIdStr(miObj);
  const id: string = generateId(idStr, ts);
  const testMi: MenuItemType = {
    ...menuItemDefault,
    description: 'Create/Edit classes and pupils',
    icon: 'group-students',
    id: id,
    key: 'classes',
    label: 'Classes',
    route: '/classes',
  };

  test('MenuItemFactory() correctly returns a new menuitm object', () => {
    const newMiObj: MenuItemType = MenuItemFactory(miObj, ts);
    expect(newMiObj).toEqual(testMi);
  });

  test('getMenuItemIdStr() returns the same string given the same object', () => {
    const idStrCompare: string = getMenuItemIdStr(miObj);
    expect(idStr).toEqual(idStrCompare);
  });
});
