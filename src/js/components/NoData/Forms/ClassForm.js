// @flow

import React, { Component } from 'react';
import { Button, FieldError, FieldWrap, Form, FormHeader, TextInput } from '../../Ui';
import Translation, { text } from '../../Translation/Translation';
import validate from '../../../validation/validation';

// TODO - fix types
type Props = {
  errors: Object,
  handleBlur: Function,
  handleChange: Function,
  handleClick: Function,
  handleSubmit: Function,
  isSubmitting: boolean,
  touched: Object,
  values: Object,
};

export class ClassForm extends Component<Props> {
  props: Props;

  render() {
    const { errors, handleBlur, handleChange, handleSubmit, touched, values } = this.props;
    const clValid: boolean = validate('label', errors.class, touched.class);
    const btnIsDisabled: boolean = !clValid || values.class.label === '' ? true : false;

    return (
      <Form classes="NoData__step--class" onSubmit={handleSubmit}>
        <FormHeader text={text('ClassMessage', 'NoData')} />
        <FieldWrap>
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.class.label}
            name="class.label"
            placeholder={text('LabelPlaceholder', 'Classes')}
            isValid={clValid}
          />
          {!clValid && <FieldError errors={[errors.class.label]} />}
        </FieldWrap>
        <FieldWrap>
          <Button type="button" disabled={btnIsDisabled} onClick={() => this.props.handleClick(values)}>
            <Translation name="CreateClassBtnLabel" ns="Classes" />
          </Button>
        </FieldWrap>
        <p className="NoData__msginfo">
          <Translation name="ClassMessageInfo" ns="NoData" />
        </p>
      </Form>
    );
  }
}

export default ClassForm;
