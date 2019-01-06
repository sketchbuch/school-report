// @flow

/**
 * Settings type def.
 */

export type SettingsType = {
  language: string,
  maxChars: number,
};

const settingsDefault: SettingsType = {
  language: 'EN',
  maxChars: 0,
};

export default settingsDefault;
