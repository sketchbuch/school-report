// @flow

import React, { Component } from 'react';
import Translation, { text } from '../../../components/Translation/Translation';
import type { FormProps } from '../../../types/forms';
import validate from '../../../validation/validation';
import { Button, FieldError, FieldWrap, Form as FormComp, FormCancel, TextInput } from '../../../components/Ui';
import { ROUTE_CATEGORIES } from '../../../constants/routes';

export type Props = FormProps;

export class Form extends Component<Props> {
  static defaultProps = {
    dirty: false,
    isNew: false,
  };

  props: Props;

  render() {
    const { dirty, errors, handleBlur, handleChange, handleSubmit, isNew, saving, touched, values } = this.props;
    const lValid: boolean = validate('label', errors, touched);
    const btnIsDisabled: boolean = !lValid || saving || !dirty;

    return (
      <FormComp onSubmit={handleSubmit}>
        <FieldWrap>
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.label}
            name="label"
            placeholder={text('LabelPlaceholder', 'Categories')}
            isValid={lValid}
          />
          {!lValid && <FieldError errors={[errors.bodytext]} />}
        </FieldWrap>
        <FieldWrap>
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            {isNew ? (
              <Translation name="CreateCategoryBtnLabel" ns="Categories" />
            ) : (
              <Translation name="UpdateCategoryBtnLabel" ns="Categories" />
            )}
          </Button>
        </FieldWrap>

        {!saving && <FormCancel name="BackToCategories" ns="Categories" to={ROUTE_CATEGORIES} />}
      </FormComp>
    );
  }
}

export default Form;
