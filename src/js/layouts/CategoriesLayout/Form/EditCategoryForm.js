// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../../../components/ui/TextInput/TextInput';
import Button from '../../../components/ui/Button/Button';
import Translation, { text } from '../../../components/Translation/Translation';
import validate from '../../../validation/validation';
import { ROUTE_CATEGORIES } from '../../../constants/routes';

type Props = {
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
 * Category form for the edit panel.
 */
export class EditCategoryForm extends Component<Props> {
  static defaultProps = {
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
    const btnIsDisabled = !lValid || saving || !dirty;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="fieldwrap">
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.label}
            name="label"
            placeholder={text('LabelPlaceholder', 'Categories')}
            isValid={lValid}
          />
          {!lValid && <p className="invalid-feedback">{errors.bodytext}</p>}
        </div>
        <div className="fieldwrap">
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            {isNew ? (
              <Translation name="CreateCategoryBtnLabel" ns="Categories" />
            ) : (
              <Translation name="UpdateCategoryBtnLabel" ns="Categories" />
            )}
          </Button>
        </div>

        {!saving && (
          <p className="form__submsg">
            <Link to={ROUTE_CATEGORIES}>
              <Translation name="BackToCategories" ns="Categories" />
            </Link>
          </p>
        )}
      </form>
    );
  }
}

export default EditCategoryForm;
