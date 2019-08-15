// @flow

export type FormProps = {
  dirty: boolean,
  errors: Object,
  handleBlur: Function,
  handleChange: Function,
  handleSubmit: Function,
  isNew: boolean,
  isSubmitting: boolean,
  saving: boolean,
  touched: Object,
  values: Object,
};

const defaultFormProps = (jest: JestObjectType): FormProps => ({
  dirty: false,
  errors: {},
  export: {},
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  isNew: false,
  isSubmitting: false,
  saving: false,
  touched: {},
  values: {},
});

export default defaultFormProps;
