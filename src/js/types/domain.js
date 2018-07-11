// @flow

import type { ClassType } from './class';
import type { PupilType } from './pupil';
import type { ReportType } from './report';
import type { CategoryType } from './category';
import type { TextType } from './text';

/**
* Domain object type def.
*/

export type DomainType = ClassType | PupilType | ReportType | TextType | CategoryType;
