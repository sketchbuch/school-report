// @flow

import React, { Component } from 'react';
import TextInput from '../../ui/TextInput/TextInput';
import GenderSwitch from '../../ui/GenderSwitch/GenderSwitch';
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
 * Pupil form for NoData component.
 */
export class PupilForm extends Component<Props> {
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

    const fnValid = validate('firstname', errors.pupil, touched.pupil);
    const lnValid = validate('lastname', errors.pupil, touched.pupil);
    const btnIsDisabled =
      !fnValid ||
      !lnValid ||
      values.pupil.firstname === '' ||
      values.pupil.lastname === ''
        ? true
        : false;

    return (
      <form className="NoData__step--pupil" onSubmit={handleSubmit}>
        <p className="NoData__msg">
          <Translation name="PupilMessage" ns="NoData" />
        </p>
        <div className="fieldwrap">
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.pupil.firstname}
            name="pupil.firstname"
            placeholder={text('FirstnamePlaceholder', 'Pupils')}
            isValid={fnValid}
          />
          {!fnValid && (
            <p className="invalid-feedback">{errors.pupil.firstname}</p>
          )}
        </div>
        <div className="fieldwrap">
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.pupil.lastname}
            name="pupil.lastname"
            placeholder={text('FirstnamePlaceholder', 'Pupils')}
            isValid={lnValid}
          />
          {!lnValid && (
            <p className="invalid-feedback">{errors.pupil.lastname}</p>
          )}
        </div>
        <div className="fieldwrap">
          <GenderSwitch
            large={true}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.pupil.gender}
            name="pupil.gender"
            titleFemale={text('Female', 'Gender')}
            titleMale={text('Male', 'Gender')}
          />
        </div>
        <div className="fieldwrap">
          <Button
            type="button"
            disabled={btnIsDisabled}
            onClick={() => this.props.handleClick(values)}
          >
            <Translation name="CreatePupilBtnLabel" ns="Pupils" />
          </Button>
        </div>
        <p className="NoData__msginfo">
          <Translation name="PupilMessageInfo" ns="NoData" />
        </p>
      </form>
    );
  }
}

export default PupilForm;
