// @flow

import { generateId } from '../utils/ids';
import { ucFirst } from '../utils/strings';
import { text } from '../components/Translation/Translation';
import * as routes from '../constants/routes';
import * as icons from '../constants/icons';

/**
 * Home Menu Item def.
 */

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

/**
 * Returns an object of MenuItemType based on menuitemObj but with additional props set.
 *
 * @param MenuItemType menuitemObj The initial class object.
 * @return MenuItemType The new menu item object.
 */
export function MenuItemFactory(menuitemObj: MenuItemType, ts: number): MenuItemType {
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
}

/**
 * Returns a string to be used when creating an ID for a menu item.
 *
 * @param MenuItemType menuitemObj The class record.
 * @return string The string to be used in creating the ID.
 */
export function getMenuItemIdStr(menuitemObj: MenuItemType): string {
  return 'menuitem:' + menuitemObj.key;
}

export default menuItemDefault;
