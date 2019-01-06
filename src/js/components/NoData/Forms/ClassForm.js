// @flow

import React, { Component } from 'react';
import TextInput from '../../ui/TextInput/TextInput';
import Button from '../../ui/Button/Button';
import Translation, { text } from '../../Translation/Translation';
import validate from '../../../validation/validation';

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

/**
 * Class form for NoData component.
 */
export class ClassForm extends Component<Props> {
  props: Props;

  render() {
    const {
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      touched,
      values,
    } = this.props;

    const clValid = validate('label', errors.class, touched.class);
    const btnIsDisabled = !clValid || values.class.label === '' ? true : false;

    return (
      <form className="NoData__step--class" onSubmit={handleSubmit}>
        <p className="NoData__msg">
          <Translation name="ClassMessage" ns="NoData" />
        </p>
        <div className="fieldwrap">
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.class.label}
            name="class.label"
            placeholder={text('LabelPlaceholder', 'Classes')}
            isValid={clValid}
          />
          {!clValid && <p className="invalid-feedback">{errors.class.label}</p>}
        </div>
        <div className="fieldwrap">
          <Button
            type="button"
            disabled={btnIsDisabled}
            onClick={() => this.props.handleClick(values)}
          >
            <Translation name="CreateClassBtnLabel" ns="Classes" />
          </Button>
        </div>
        <p className="NoData__msginfo">
          <Translation name="ClassMessageInfo" ns="NoData" />
        </p>
      </form>
    );
  }
}

export default ClassForm;
