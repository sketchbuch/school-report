// @flow

import React, { Component } from 'react';
import {
  Button,
  FieldError,
  FieldWrap,
  Form as FormComp,
  FormCancel,
  GenderSwitch,
  TextInput,
} from '../../../components/Ui';
import Translation, { text } from '../../../components/Translation/Translation';
import type { FormProps } from '../../../types/forms';
import validate from '../../../validation/validation';
import { ROUTE_PUPILS } from '../../../constants/routes';

export type Props = {
  classId: string,
  isSubmitting: boolean,
} & FormProps;

export class Form extends Component<Props> {
  static defaultProps = {
    dirty: false,
    isNew: false,
  };

  props: Props;

  render() {
    const {
      classId,
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

    const fnValid: boolean = validate('firstname', errors, touched);
    const lnValid: boolean = validate('lastname', errors, touched);
    const dValid: boolean = validate('description', errors, touched);
    const btnIsDisabled: boolean = !fnValid || !lnValid || !dValid || saving || !dirty;

    return (
      <FormComp onSubmit={handleSubmit}>
        <FieldWrap>
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstname}
            name="firstname"
            placeholder={text('FirstnamePlaceholder', 'Pupils')}
            isValid={fnValid}
          />
          {!fnValid && <FieldError errors={[errors.firstname]} />}
        </FieldWrap>
        <FieldWrap>
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastname}
            name="lastname"
            placeholder={text('LastnamePlaceholder', 'Pupils')}
            isValid={lnValid}
          />
          {!lnValid && <FieldError errors={[errors.lastname]} />}
        </FieldWrap>
        <FieldWrap>
          <GenderSwitch
            large={true}
            onChange={handleChange}
            classId
            onBlur={handleBlur}
            value={values.gender}
            name="gender"
            titleFemale={text('Female', 'Gender')}
            titleMale={text('Male', 'Gender')}
          />
        </FieldWrap>
        <FieldWrap>
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            name="description"
            placeholder={text('DescriptionPlaceholder', 'Pupils')}
            isValid={dValid}
          />
          {!dValid && <FieldError errors={[errors.description]} />}
        </FieldWrap>
        <FieldWrap>
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            {isNew ? (
              <Translation name="CreatePupilBtnLabel" ns="Pupils" />
            ) : (
              <Translation name="UpdatePupilBtnLabel" ns="Pupils" />
            )}
          </Button>
        </FieldWrap>

        {!saving && <FormCancel name="BackToPupils" ns="Pupils" to={ROUTE_PUPILS.replace(':classId', classId)} />}
      </FormComp>
    );
  }
}

export default Form;
