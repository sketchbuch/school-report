// @flow

import type { PupilSortOptions } from './pupil';
import { pupilSortDefault } from './pupil';

export type SettingsType = {
  language: string,
  pupilsSort: PupilSortOptions,
  maxChars: number,
};

const settingsDefault: SettingsType = {
  language: 'EN',
  pupilsSort: pupilSortDefault,
  maxChars: 0,
};

export default settingsDefault;
