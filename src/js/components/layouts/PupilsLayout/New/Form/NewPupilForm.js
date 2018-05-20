// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../../../../ui/TextInput/TextInput';
import Button from '../../../../ui/Button/Button';
import GenderSwitch from '../../../../ui/GenderSwitch/GenderSwitch';
import Translation, { text } from '../../../../Translation/Translation';
import validate from '../../../../../validation/validation';
import { ROUTE_PUPILS } from '../../../../../constants/routes';

type Props = {
  classId: string,
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
* Pupil form for the edit panel.
*/
export class NewPupilForm extends Component<Props> {
  props: Props;

  render() {
    const {
      classId,
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      saving,
      touched,
      values,
    } = this.props;

    const fnValid = validate('firstname', errors, touched);
    const lnValid = validate('lastname', errors, touched);
    const dValid = validate('description', errors, touched);
    const btnIsDisabled = (
      saving ||
      !fnValid ||
      !lnValid ||
      !dValid ||
      values.firstname === '' ||
      values.lastname === ''
    ) ? true : false;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="fieldwrap">
          <TextInput
            autoFocus
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
            <Translation name="CreatePupilBtnLabel" ns="Pupils" />
          </Button>
        </div>

        {!saving &&
          <p className="form__submsg">
            <Link to={ROUTE_PUPILS.replace(':classId', classId)}><Translation name="BackToPupils" ns="Pupils" /></Link>
          </p>
        }
      </form>
    );
  }
}


export default NewPupilForm;
