// @flow

type SelectedTextsBase = {
  id: string,
};

export type SelectedTexts = {
  ...SelectedTextsBase,
  sub: SelectedTextsBase[],
};
