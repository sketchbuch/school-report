// @flow

import React, { Component } from 'react';
import TextInput from '../../../components/ui/TextInput/TextInput';
import Button from '../../../components/ui/Button/Button';
import Translation, { text } from '../../../components/Translation/Translation';
import validate from '../../../validation/validation';

type Props = {
  dirty: boolean,
  errors: Object,
  export: {},
  handleBlur: Function,
  handleChange: Function,
  handleSubmit: Function,
  isNew: boolean,
  isSubmitting: boolean,
  reportName: string,
  saving: boolean,
  touched: Object,
  values: Object,
};


/**
* Export form for the edit panel.
*/
export class ExportBuilderForm extends Component<Props> {
  static defaultProps = {
    export: {},
    dirty: false,
    isNew: false,
  };

  props: Props;

  render() {
    const {
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

    const lValid = validate('label', errors, touched);
    const btnIsDisabled = (
      !lValid ||
      saving ||
      !dirty
    ) ? true : false;

    return (
      <form className="form" onSubmit={handleSubmit}>
      <p className="form__headline"><Translation name="Headline" ns="ExportBuilderForm" placeholders={{ REPORT_NAME: this.props.reportName }}/></p>
      <div className="fieldwrap">
        <TextInput
          autoFocus
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