// @flow

import { UI_VIEW_EDIT, UI_VIEW_PREVIEW, UI_VIEW_ALL, UI_VIEW_SELECTED, UI_VIEW_UNSELECTED } from '../constants/ui';

export type SelectOption = {
  disabled: boolean,
  label: string | React.Node,
  value: string,
};

export const defaultSelectOption: SelectOption = {
  disabled: false,
  label: '',
  value: '',
};

export type Tag = {
  id: string,
  label: string,
  onClick: (tag: Tag) => (event: SyntheticMouseEvent<HTMLElement> | SyntheticInputEvent<HTMLElement>) => void,
  tooltip: string,
};

export const defaultTag: Tag = {
  id: '',
  label: '',
  onClick: (tag: Tag) => (event: SyntheticMouseEvent<HTMLElement> | SyntheticInputEvent<HTMLElement>) => {},
  tooltip: '',
};

export type View = UI_VIEW_ALL | UI_VIEW_SELECTED | UI_VIEW_UNSELECTED;
export type TextView = UI_VIEW_EDIT | UI_VIEW_PREVIEW;
export type TabView = View | TextView;
export type Tab = {
  label: string,
  onChange: (view: TabView) => void,
  tooltip: string,
  view: TabView,
};
