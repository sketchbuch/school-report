// @flow

import React, { Component } from 'react';
import { Button, TextInput } from '../../../components/Ui';
import Translation, { text } from '../../../components/Translation/Translation';
import validate from '../../../validation/validation';

// TODO - fix types
export type Props = {
  dirty: boolean,
  errors: Object,
  export: {},
  handleBlur: Function,
  handleChange: Function,
  handleSubmit: Function,
  isSubmitting: boolean,
  reportName: string,
  saving: boolean,
  touched: Object,
  values: Object,
};

export class ExportBuilderForm extends Component<Props> {
  static defaultProps = {
    export: {},
    dirty: false,
  };

  props: Props;

  render() {
    const { errors, handleBlur, handleChange, handleSubmit, saving, touched, values } = this.props;
    const lValid: boolean = validate('name', errors, touched);
    const btnIsDisabled: boolean = !lValid || saving || values.name === '';

    return (
      <form className="form" onSubmit={handleSubmit}>
        <p className="form__headline">
          <Translation name="Headline" ns="ExportBuilderForm" placeholders={{ REPORT_NAME: this.props.reportName }} />
        </p>
        <div className="fieldwrap">
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            name="name"
            placeholder={text('ExportPlaceholder', 'Builder')}
            isValid={lValid}
          />
          {!lValid && <p className="invalid-feedback">{errors.name}</p>}
        </div>
        <div className="fieldwrap">
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            <Translation name="ExportReportBtn" ns="Builder" />
          </Button>
        </div>
      </form>
    );
  }
}

export default ExportBuilderForm;
