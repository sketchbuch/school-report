// @flow

import type { ClassType } from './class';
import type { PupilType } from './pupil';
import type { ReportType } from './report';
import type { CategoryType } from './category';
import type { TextType } from './text';

export type DomainType = ClassType | PupilType | ReportType | TextType | CategoryType;

export type DomainBaseType = {
  contains: Function,
  created: number,
  getDescription: Function,
  getIcon: Function,
  getLabel: Function,
  getTooltip: Function,
  getUrl: Function,
  id: string,
  updated: number,
};

const domainBaseDefault: DomainBaseType = {
  contains: () => {},
  created: -1,
  getDescription: () => {},
  getIcon: () => {},
  getLabel: () => {},
  getTooltip: () => {},
  getUrl: () => {},
  id: '',
  updated: -1,
};

export default domainBaseDefault;
