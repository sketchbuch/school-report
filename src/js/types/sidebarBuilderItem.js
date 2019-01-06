// @flow

import type { ClassType } from './class';
import type { PupilType } from './pupil';

/**
 * Type for sidebar builder items.
 */

export type SidebarBuilderItemType = {
  classRec: ClassType,
  id: string,
  pupils: Array<PupilType>,
  reportId: string,
};
