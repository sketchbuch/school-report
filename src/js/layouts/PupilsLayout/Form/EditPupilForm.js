// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, GenderSwitch, TextInput } from '../../../components/Ui';
import Translation, { text } from '../../../components/Translation/Translation';
import validate from '../../../validation/validation';
import { ROUTE_PUPILS } from '../../../constants/routes';

// TODO - fix types
export type Props = {
  classId: string,
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

export class EditPupilForm extends Component<Props> {
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
    const btnIsDisabled: boolean =
      saving || !fnValid || !lnValid || !dValid || values.firstname === '' || values.lastname === '' || !dirty
        ? true
        : false;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="fieldwrap">
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstname}
            name="firstname"
            placeholder={text('FirstnamePlaceholder', 'Pupils')}
            isValid={fnValid}
          />
          {!fnValid && <p className="invalid-feedback">{errors.firstname}</p>}
        </div>
        <div className="fieldwrap">
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastname}
            name="lastname"
            placeholder={text('LastnamePlaceholder', 'Pupils')}
            isValid={lnValid}
          />
          {!lnValid && <p className="invalid-feedback">{errors.lastname}</p>}
        </div>
        <div className="fieldwrap">
          <GenderSwitch
            large={true}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.gender}
            name="gender"
            titleFemale={text('Female', 'Gender')}
            titleMale={text('Male', 'Gender')}
          />
        </div>
        <div className="fieldwrap">
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            name="description"
            placeholder={text('DescriptionPlaceholder', 'Pupils')}
            isValid={dValid}
          />
          {!dValid && <p className="invalid-feedback">{errors.description}</p>}
        </div>
        <div className="fieldwrap">
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            {isNew ? (
              <Translation name="CreatePupilBtnLabel" ns="Pupils" />
            ) : (
              <Translation name="UpdatePupilBtnLabel" ns="Pupils" />
            )}
          </Button>
        </div>

        {!saving && (
          <p className="form__submsg">
            <Link to={ROUTE_PUPILS.replace(':classId', classId)}>
              <Translation name="BackToPupils" ns="Pupils" />
            </Link>
          </p>
        )}
      </form>
    );
  }
}

export default EditPupilForm;
