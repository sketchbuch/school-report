// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../ui/Button/Button';
import Translation from '../../../Translation/Translation';
import type { LangType } from '../../../../types/lang';
import { ROUTE_HOME } from '../../../../constants/routes';

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
    const {
      dirty,
      //errors,
      //handleBlur,
      handleChange,
      handleSubmit,
      saving,
      //touched,
      values,
    } = this.props;

    const btnIsDisabled = (saving || !dirty) ? true : false;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="fieldwrap fieldwrap--labeled">
          <div className="fieldwrap__left">
            <Translation name="LabelLanguage" ns="Settings" />
          </div>
          <div className="fieldwrap__right">
            <select name="language" value={values.language} onChange={handleChange}>
                {this.props.languages.map(lang => {
                  return <option value={lang.key} key={lang.key}>{lang.label}</option>
                })}
            </select>
          </div>
        </div>
        <div className="fieldwrap">
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            <Translation name="UpdateSettingsBtnLabel" ns="Settings" />
          </Button>
        </div>

        {!saving &&
          <p className="form__submsg">
            <Link to={ROUTE_HOME}><Translation name="Cancel" ns="Settings" /></Link>
          </p>
        }
      </form>
    );
  }
}


export default SettingsFrom;
