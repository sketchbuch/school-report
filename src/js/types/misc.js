// @flow

import { UI_VIEW_ALL, UI_VIEW_SELECTED, UI_VIEW_UNSELECTED } from '../constants/ui';

export type FuncCompReturn = React.Element<*>;
export type RenderHelperReturn = React.Element<*>;
export type InsertDangerousHtmlObj = { __html: string };
export type UiView = UI_VIEW_ALL | UI_VIEW_SELECTED | UI_VIEW_UNSELECTED;
export type UiTab = { view: UiView, transKey: string };
