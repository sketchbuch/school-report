// @flow

/**
 * Selected Texts type def.
 */

type SelectedTextsBase = {
  id: string,
};

export type SelectedTexts = {
  ...SelectedTextsBase,
  sub: Array<SelectedTextsBase>,
};
