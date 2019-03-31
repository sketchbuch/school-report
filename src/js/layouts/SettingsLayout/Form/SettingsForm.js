// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextInput } from '../../../components/Ui';
import Translation, { text } from '../../../components/Translation/Translation';
import type { LangType } from '../../../types/lang';
import { ROUTE_HOME } from '../../../constants/routes';
import { pupilSortOptions } from '../../../types/pupil';

type Props = {
  dirty: boolean,
  errors: Object,
  handleBlur: Function,
  handleChange: Function,
  handleSubmit: Function,
  isSubmitting: boolean,
  languages: Array<LangType>,
  saving: boolean,
  touched: Object,
  values: Object,
};

/**
 * Settings form.
 */
export class SettingsFrom extends Component<Props> {
  props: Props;

  render() {
    const { dirty, handleBlur, handleChange, handleSubmit, saving, values } = this.props;

    const btnIsDisabled = saving || !dirty ? true : false;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Misc.</legend>
          <div className="fieldwrap fieldwrap--labeled">
            <div className="fieldwrap__left">
              <Translation name="LabelLanguage" ns="Settings" />
            </div>
            <div className="fieldwrap__right">
              <select name="language" value={values.language} onChange={handleChange}>
                {this.props.languages.map(lang => {
                  return (
                    <option value={lang.key} key={lang.key}>
                      {lang.label}
                    </option>
                  );
                })}
              </select>
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
              <select name="pupilsSort" value={values.pupilsSort} onChange={handleChange}>
                {pupilSortOptions.map(sortOpt => {
                  return (
                    <option value={sortOpt} key={'pupilsort-' + sortOpt}>
                      {text('PupilsSort-' + sortOpt, 'Settings')}
                    </option>
                  );
                })}
              </select>
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
        <div className="fieldwrap">
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            <Translation name="UpdateSettingsBtnLabel" ns="Settings" />
          </Button>
        </div>

        {!saving && (
          <p className="form__submsg">
            <Link to={ROUTE_HOME}>
              <Translation name="Cancel" ns="Settings" />
            </Link>
          </p>
        )}
      </form>
    );
  }
}

export default SettingsFrom;
