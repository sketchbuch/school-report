// @flow

import React, { Component } from 'react';
import Translation, { text } from '../../Translation/Translation';
import type { FormikErrors, FormikTouched } from 'formik';
import type { ValuesObject } from '../NoData';
import validate from '../../../validation/validation';
import { Button, FieldError, FieldWrap, Form, FormHeader, GenderSwitch, TextInput } from '../../Ui';

// TODO - fix types
type Props = {
  errors: ValuesObject,
  handleBlur: Function,
  handleChange: Function,
  handleSubmit: Function,
  isSubmitting: boolean,
  touched: FormikErrors<ValuesObject>,
  values: FormikTouched<ValuesObject>,
};

export class PupilForm extends Component<Props> {
  props: Props;

  render() {
    const { errors, handleBlur, handleChange, handleSubmit, touched, values } = this.props;
    const fnValid: boolean = validate('firstname', errors.pupil, touched.pupil);
    const lnValid: boolean = validate('lastname', errors.pupil, touched.pupil);
    const btnIsDisabled: boolean =
      !fnValid || !lnValid || values.pupil.firstname === '' || values.pupil.lastname === '' ? true : false;

    return (
      <Form classes="NoData__step--pupil" onSubmit={handleSubmit}>
        <FormHeader text={text('PupilMessage', 'NoData')} />
        <FieldWrap>
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.pupil.firstname}
            name="pupil.firstname"
            placeholder={text('FirstnamePlaceholder', 'Pupils')}
            isValid={fnValid}
          />
          {!fnValid && <FieldError errors={[errors.pupil.firstname]} />}
        </FieldWrap>
        <FieldWrap>
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.pupil.lastname}
            name="pupil.lastname"
            placeholder={text('FirstnamePlaceholder', 'Pupils')}
            isValid={lnValid}
          />
          {!lnValid && <FieldError errors={[errors.pupil.lastname]} />}
        </FieldWrap>
        <FieldWrap>
          <GenderSwitch
            large={true}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.pupil.gender}
            name="pupil.gender"
            titleFemale={text('Female', 'Gender')}
            titleMale={text('Male', 'Gender')}
          />
        </FieldWrap>
        <FieldWrap>
          <Button type="submit" disabled={btnIsDisabled}>
            <Translation name="CreatePupilBtnLabel" ns="Pupils" />
          </Button>
        </FieldWrap>
        <p className="NoData__msginfo">
          <Translation name="PupilMessageInfo" ns="NoData" />
        </p>
      </Form>
    );
  }
}

export default PupilForm;
