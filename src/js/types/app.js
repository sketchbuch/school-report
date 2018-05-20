// @flow

/**
* App type def.
*/

export type AppType = {
  dataCreated: boolean,
  dataLoaded: boolean,
  error: boolean,
  languageLoaded: boolean,
  loaded: boolean,
  loading: boolean,
  settingsLoaded: boolean,
};

const appDefault: AppType = {
  dataCreated: false,
  dataLoaded: false,
  error: false,
  languageLoaded: false,
  loaded: false,
  loading: true,
  settingsLoaded: false,
};

export default appDefault;
