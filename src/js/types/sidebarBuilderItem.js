// @flow

import type { ClassType } from './class';
import type { PupilType } from './pupil';

export type SidebarBuilderItemType = {
  classRec: ClassType,
  id: string,
  pupils: PupilType[],
  reportId: string,
};
