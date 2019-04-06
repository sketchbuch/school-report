// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, FieldWrap, Form, FormCancel, Select as ReactSelect, TextInput } from '../../../components/Ui';
import Translation, { text } from '../../../components/Translation/Translation';
import type { LangType } from '../../../types/lang';
import { ROUTE_HOME } from '../../../constants/routes';
import { pupilSortOptions } from '../../../types/pupil';
import type { SelectOption } from '../../../types/ui';
import { defaultSelectOption } from '../../../types/ui';

// TODO - fix types
type Props = {
  dirty: boolean,
  errors: Object,
  handleBlur: Function,
  handleChange: Function,
  handleSubmit: Function,
  setFieldValue: Function,
  isSubmitting: boolean,
  languages: LangType[],
  saving: boolean,
  touched: Object,
  values: Object,
};

export class SettingsFrom extends Component<Props> {
  props: Props;

  handleSelectChange = (fieldName: string) => (option: SelectOption) => {
    this.props.setFieldValue(fieldName, option.value);
  };

  render() {
    const { dirty, handleBlur, handleChange, handleSubmit, saving, values } = this.props;
    const btnIsDisabled: boolean = saving || !dirty ? true : false;

    return (
      <Form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Misc.</legend>
          <div className="fieldwrap fieldwrap--labeled">
            <div className="fieldwrap__left">
              <Translation name="LabelLanguage" ns="Settings" />
            </div>
            <div className="fieldwrap__right">
              <ReactSelect
                name="language"
                value={values.language}
                onChange={this.handleSelectChange('language')}
                options={this.props.languages.map(
                  (lang: LangType): SelectOption => {
                    return {
                      ...defaultSelectOption,
                      label: lang.label,
                      value: lang.key,
                    };
                  }
                )}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Sidebar</legend>
          <div className="fieldwrap fieldwrap--labeled">
            <div className="fieldwrap__left">
              <Translation name="LabelPupilsSort" ns="Settings" />
            </div>
            <div className="fieldwrap__right">
              <ReactSelect
                name="pupilsSort"
                value={values.pupilsSort}
                onChange={this.handleSelectChange('pupilsSort')}
                options={pupilSortOptions.map(
                  (sortOpt: string): SelectOption => {
                    return {
                      ...defaultSelectOption,
                      label: text('PupilsSort-' + sortOpt, 'Settings'),
                      value: sortOpt,
                    };
                  }
                )}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Reports</legend>
          <div className="fieldwrap fieldwrap--labeled">
            <div className="fieldwrap__left">
              <Translation name="ReportMaxChars" ns="Reports" />
            </div>
            <div className="fieldwrap__right">
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
            </div>
          </div>
        </fieldset>
        <FieldWrap>
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            <Translation name="UpdateSettingsBtnLabel" ns="Settings" />
          </Button>
        </FieldWrap>

        {!saving && (
          <FormCancel>
            <Link to={ROUTE_HOME}>
              <Translation name="Cancel" ns="Settings" />
            </Link>
          </FormCancel>
        )}
      </Form>
    );
  }
}

export default SettingsFrom;
