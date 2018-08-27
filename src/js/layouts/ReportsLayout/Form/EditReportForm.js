// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../../../components/ui/TextInput/TextInput';
import ItemSelection from '../../../components/ui/ItemSelection/ItemSelection';
import Button from '../../../components/ui/Button/Button';
import Translation, { text } from '../../../components/Translation/Translation';
import validate from '../../../validation/validation';
import type { ClassType } from '../../../types/class';
import { ROUTE_REPORTS } from '../../../constants/routes';
import { sortObjectsAz } from '../../../utils/sort';

type Props = {
  classes: Array<ClassType>,
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
* Report form for the edit panel.
*/
export class EditReportForm extends Component<Props> {
  static defaultProps = {
    dirty: false,
    isNew: false,
  };

  props: Props;

  render() {
    const {
      classes,
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

    const rlValid = validate('label', errors, touched);
    const rcValid = validate('classes', errors, touched);
    const btnIsDisabled = (!rcValid || !rlValid || values.label === '' || values.classes.length < 1 || saving || !dirty) ? true : false;
    const sortedClasses = sortObjectsAz(classes, ['label', 'updated']);

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="fieldwrap">
          <TextInput
            autoFocus
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.label}
            name="label"
            placeholder={text('LabelPlaceholder', 'Reports')}
            isValid={rlValid}
          />
          {!rlValid && <p className="invalid-feedback">{errors.label}</p>}
        </div>
        <div className="fieldwrap">
          <p>
            <Translation name="ReportClasses" ns="Reports"
              placeholders={{
                SELECTED: values.classes.length,
                TOTAL: classes.length,
              }}
            />
          </p>
          <ItemSelection items={sortedClasses} name="classes" selected={values.classes} />
          {!rcValid && <p className="invalid-feedback">{errors.classes}</p>}
        </div>
        <div className="fieldwrap">
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            {isNew ? (
              <Translation name="CreateReportBtnLabel" ns="Reports" />
            ) : (
              <Translation name="UpdateReportsBtnLabel" ns="Reports" />
            )}
          </Button>
        </div>

        {!saving &&
          <p className="form__submsg">
            <Link to={ROUTE_REPORTS}><Translation name="BackToReports" ns="Reports" /></Link>
          </p>
        }
      </form>
    );
  }
}


export default EditReportForm;
