// @flow

export type SelectOption = {
  disabled: boolean,
  label: string | React.Node,
  value: string,
};

export const defaultSelectOption = {
  disabled: false,
  label: '',
  value: '',
};
