// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../../../components/ui/TextInput/TextInput';
import Button from '../../../components/ui/Button/Button';
import Translation, { text } from '../../../components/Translation/Translation';
import validate from '../../../validation/validation';
import { ROUTE_CLASSES } from '../../../constants/routes';

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


/**
* Class form for the edit panel.
*/
export class EditClassForm extends Component<Props> {
  static defaultProps = {
    dirty: false,
    isNew: false,
  };

  props: Props;

  render() {
    const {
      dirty,
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      isNew,
      saving,
      touched,
      values,
    } = this.props;

    const clValid = validate('label', errors, touched);
    const btnIsDisabled = (!clValid || values.label === '' || saving || !dirty) ? true : false;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="fieldwrap">
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.label}
            name="label"
            placeholder={text('LabelPlaceholder', 'Classes')}
            isValid={clValid}
          />
          {!clValid && <p className="invalid-feedback">{errors.label}</p>}
        </div>
        <div className="fieldwrap">
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            {isNew ? (
              <Translation name="CreateClassBtnLabel" ns="Classes" />
            ) : (
              <Translation name="UpdateClassBtnLabel" ns="Classes" />
            )}
          </Button>
        </div>

        {!saving &&
          <p className="form__submsg">
            <Link to={ROUTE_CLASSES}><Translation name="BackToClasses" ns="Classes" /></Link>
          </p>
        }
      </form>
    );
  }
}


export default EditClassForm;
