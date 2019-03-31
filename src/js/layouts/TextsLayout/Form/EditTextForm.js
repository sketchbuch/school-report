// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, FieldError, FieldWrap, Form, FormCancel, ItemSelection, Textarea } from '../../../components/Ui';
import Translation, { text } from '../../../components/Translation/Translation';
import type { CategoryType } from '../../../types/category';
import type { DomainType } from '../../../types/domain';
import validate from '../../../validation/validation';
import { ROUTE_TEXTS } from '../../../constants/routes';
import { categorySort } from '../../../types/category';
import { placeholderMap } from '../../../utils/html';
import { sortObjectsAz } from '../../../utils/sort';

// TODO - fix types
export type Props = {
  categories: CategoryType[],
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

export class EditTextForm extends Component<Props> {
  static defaultProps = {
    categories: [],
    dirty: false,
    isNew: false,
  };

  props: Props;

  render() {
    const {
      categories,
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

    const cValid: boolean = validate('categories', errors, touched);
    const btValid: boolean = validate('bodytext', errors, touched);
    const btnIsDisabled: boolean = !cValid || !btValid || saving || !dirty ? true : false;
    const sortedCategories: DomainType[] = sortObjectsAz(categories, categorySort);
    const selCount: number = categories.filter(c => values.categories.includes(c.id)).length;

    return (
      <Form onSubmit={handleSubmit}>
        <FieldWrap>
          <Textarea
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.bodytext}
            name="bodytext"
            placeholder={text('BodytextPlaceholder', 'Texts')}
            isValid={btValid}
          />
          {!btValid && <FieldError errors={[errors.bodytext]} />}
          <div className="fiedwrap__placeholders">
            {placeholderMap.map(ph => (
              <span key={ph.symbol} className="fiedwrap__placeholder" title={text('Title' + ph.symbol, '##')}>
                #{ph.symbol}#
              </span>
            ))}
          </div>
        </FieldWrap>
        <FieldWrap>
          <p>
            <Translation
              name="ReportCategories"
              ns="Texts"
              placeholders={{
                SELECTED: selCount,
                TOTAL: categories.length,
              }}
            />
          </p>

          <ItemSelection items={sortedCategories} name="categories" selected={values.categories} />
          {!cValid && <FieldError errors={[errors.categories]} />}
        </FieldWrap>
        <FieldWrap>
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            {isNew ? (
              <Translation name="CreateTextBtnLabel" ns="Texts" />
            ) : (
              <Translation name="UpdateTextBtnLabel" ns="Texts" />
            )}
          </Button>
        </FieldWrap>

        {!saving && (
          <FormCancel>
            <Link to={ROUTE_TEXTS}>
              <Translation name="BackToTexts" ns="Texts" />
            </Link>
          </FormCancel>
        )}
      </Form>
    );
  }
}

export default EditTextForm;
