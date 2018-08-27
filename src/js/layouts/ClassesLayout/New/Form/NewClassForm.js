// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../../../../ui/TextInput/TextInput';
import Button from '../../../../ui/Button/Button';
import Translation, { text } from '../../../../Translation/Translation';
import validate from '../../../../../validation/validation';
import { CLASS_LABEL_MAX } from '../../../../../validation/schemas';
import { ROUTE_CLASSES } from '../../../../../constants/routes';

type Props = {
  errors: Object,
  handleBlur: Function,
  handleChange: Function,
  handleSubmit: Function,
  isSubmitting: boolean,
  saving: boolean,
  touched: Object,
  values: Object,
};


/**
* Class form for the edit panel.
*/
export class NewClassForm extends Component<Props> {
  props: Props;

  render() {
    const {
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      saving,
      touched,
      values,
    } = this.props;

    const clValid = validate('label', errors, touched);
    const btnIsDisabled = (!clValid || values.label === '' || saving) ? true : false;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="fieldwrap">
          <TextInput
            autoFocus
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.label}
            name="label"
            maxLength={CLASS_LABEL_MAX}
            placeholder={text('LabelPlaceholder', 'Classes')}
            isValid={clValid}
          />
          {!clValid && <p className="invalid-feedback">{errors.label}</p>}
        </div>
        <div className="fieldwrap">
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            <Translation name="CreateClassBtnLabel" ns="Classes" />
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


export default NewClassForm;
