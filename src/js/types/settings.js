// @flow

import type { PupilSortOptions } from './pupil';

/**
 * Settings type def.
 */

export type SettingsType = {
  language: string,
  pupilsSort: PupilSortOptions,
  maxChars: number,
};

const settingsDefault: SettingsType = {
  language: 'EN',
  pupilsSort: 'firstname',
  maxChars: 0,
};

export default settingsDefault;
