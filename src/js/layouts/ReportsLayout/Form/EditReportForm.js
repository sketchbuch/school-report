// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, FieldError, FieldWrap, Form, FormCancel, ItemSelection, TextInput } from '../../../components/Ui';
import Translation, { text } from '../../../components/Translation/Translation';
import validate from '../../../validation/validation';
import type { ClassType } from '../../../types/class';
import type { DomainType } from '../../../types/domain';
import { ROUTE_REPORTS } from '../../../constants/routes';
import { sortObjectsAz } from '../../../utils/sort';

// TODO - fix types
type Props = {
  classes: ClassType[],
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

    const rlValid: boolean = validate('label', errors, touched);
    const rcValid: boolean = validate('classes', errors, touched);
    const btnIsDisabled: boolean =
      !rcValid || !rlValid || values.label === '' || values.classes.length < 1 || saving || !dirty ? true : false;
    const sortedClasses: DomainType[] = sortObjectsAz(classes, ['label', 'updated']);
    const selCount: number = classes.filter(c => values.classes.includes(c.id)).length;

    return (
      <Form onSubmit={handleSubmit}>
        <FieldWrap>
          <TextInput
            isValid={rlValid}
            name="label"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={text('LabelPlaceholder', 'Reports')}
            value={values.label}
          />
          {!rlValid && <FieldError errors={[errors.label]} />}
        </FieldWrap>
        <FieldWrap>
          <p>
            <Translation
              name="ReportClasses"
              ns="Reports"
              placeholders={{
                SELECTED: selCount,
                TOTAL: classes.length,
              }}
            />
          </p>
          <ItemSelection items={sortedClasses} name="classes" selected={values.classes} />
          {!rcValid && <FieldError errors={[errors.classes]} />}
        </FieldWrap>
        <FieldWrap>
          <p>
            <Translation name="ReportMaxChars" ns="Reports" />
          </p>
          <div className="fieldwrap__columns">
            <div className="fieldwrap__column">
              <TextInput
                isValid={true}
                name="maxChars"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.maxChars}
              />
            </div>
            <div className="fieldwrap__column">
              <span className="fieldwrap__info">
                <Translation name="ReportMaxCharsInfo" ns="Reports" />
              </span>
            </div>
          </div>
        </FieldWrap>
        <FieldWrap>
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            {isNew ? (
              <Translation name="CreateReportBtnLabel" ns="Reports" />
            ) : (
              <Translation name="UpdateReportsBtnLabel" ns="Reports" />
            )}
          </Button>
        </FieldWrap>

        {!saving && (
          <FormCancel>
            <Link to={ROUTE_REPORTS}>
              <Translation name="BackToReports" ns="Reports" />
            </Link>
          </FormCancel>
        )}
      </Form>
    );
  }
}

export default EditReportForm;
