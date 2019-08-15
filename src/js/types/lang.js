// @flow

export type LangType = {
  key: string,
  label: string,
};

export type TranslationPaceholders = ?{
  [key: string]: string | number,
};
