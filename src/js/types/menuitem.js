// @flow

import { generateId } from '../utils/ids';
import { ucFirst } from '../utils/strings';
import { text } from '../components/Translation/Translation';
import * as routes from '../constants/routes';
import * as icons from '../constants/icons';

export type MenuItemType = {
  description: string,
  icon: string,
  id: string,
  key: string,
  label: string,
  route: string,
};

const menuItemDefault: MenuItemType = {
  description: '',
  icon: '',
  id: '',
  key: '',
  label: '',
  route: '',
};

export const MenuItemFactory = (menuitemObj: MenuItemType, ts: number): MenuItemType => {
  const keyUpper = menuitemObj.key.toUpperCase();
  const keyCapped = ucFirst(menuitemObj.key);

  return {
    ...menuItemDefault,
    ...menuitemObj,
    description: text(keyCapped + 'Description', 'HomeLayout'),
    icon: icons['ICON_' + keyUpper],
    id: generateId(getMenuItemIdStr(menuitemObj), ts),
    label: text(keyCapped, 'HomeLayout'),
    route: routes['ROUTE_' + keyUpper],
  };
};

export const getMenuItemIdStr = (menuitemObj: MenuItemType): string => {
  return 'menuitem:' + menuitemObj.key;
};

export default menuItemDefault;
