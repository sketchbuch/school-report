// @flow

import React, { Component } from 'react';
import { Button, FieldError, FieldWrap, Form, FormHeader, GenderSwitch, TextInput } from '../../Ui';
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
          <Button type="button" disabled={btnIsDisabled} onClick={() => this.props.handleClick(values)}>
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
