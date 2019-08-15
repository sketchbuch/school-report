// @flow

import React, { Component } from 'react';
import { Button, FieldError, FieldWrap, Form, FormCancel, TextInput } from '../../../components/Ui';
import Translation, { text } from '../../../components/Translation/Translation';
import validate from '../../../validation/validation';
import { ROUTE_CLASSES } from '../../../constants/routes';

// TODO - fix types
type Props = {
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

export class EditClassForm extends Component<Props> {
  static defaultProps = {
    dirty: false,
    isNew: false,
  };

  props: Props;

  render() {
    const { dirty, errors, handleBlur, handleChange, handleSubmit, isNew, saving, touched, values } = this.props;
    const clValid: boolean = validate('label', errors, touched);
    const btnIsDisabled: boolean = !clValid || values.label === '' || saving || !dirty ? true : false;

    return (
      <Form onSubmit={handleSubmit}>
        <FieldWrap>
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.label}
            name="label"
            placeholder={text('LabelPlaceholder', 'Classes')}
            isValid={clValid}
          />
          {!clValid && <FieldError errors={[errors.label]} />}
        </FieldWrap>
        <FieldWrap>
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            {isNew ? (
              <Translation name="CreateClassBtnLabel" ns="Classes" />
            ) : (
              <Translation name="UpdateClassBtnLabel" ns="Classes" />
            )}
          </Button>
        </FieldWrap>

        {!saving && <FormCancel name="BackToClasses" ns="Classes" to={ROUTE_CLASSES} />}
      </Form>
    );
  }
}

export default EditClassForm;
