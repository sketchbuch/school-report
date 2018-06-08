// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Textarea from '../../../ui/Textarea/Textarea';
import ItemSelection from '../../../ui/ItemSelection/ItemSelection';
import Button from '../../../ui/Button/Button';
import Translation, { text } from '../../../Translation/Translation';
import validate from '../../../../validation/validation';
import type { CategoryType } from '../../../../types/category';
import { categorySort } from '../../../../types/category';
import { ROUTE_TEXTS } from '../../../../constants/routes';
import { sortObjectsAz } from '../../../../utils/sort';

type Props = {
  categories: Array<CategoryType>,
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
* Text form for the edit panel.W
*/
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

    const cValid = validate('categories', errors, touched);
    const btValid = validate('bodytext', errors, touched);
    const btnIsDisabled = (
      !cValid ||
      !btValid ||
      saving ||
      !dirty
    ) ? true : false;
    const sortedCategories = sortObjectsAz(categories, categorySort);

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="fieldwrap">
          <Textarea
            autoFocus
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.bodytext}
            name="bodytext"
            placeholder={text('BodytextPlaceholder', 'Texts')}
            isValid={btValid}
          />
          {!btValid && <p className="invalid-feedback">{errors.bodytext}</p>}
        </div>
        <div className="fieldwrap">
          <p>
            <Translation name="ReportCategories" ns="Texts"
              placeholders={{
                SELECTED: values.categories.length,
                TOTAL: categories.length,
              }}
            />
          </p>
          <ItemSelection items={sortedCategories} name="categories" selected={values.categories} />
          {!cValid && <p className="invalid-feedback">{errors.categories}</p>}
        </div>
        <div className="fieldwrap">
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            {isNew ? (
              <Translation name="CreateTextBtnLabel" ns="Texts" />
            ) : (
              <Translation name="UpdateTextBtnLabel" ns="Texts" />
            )}
          </Button>
        </div>

        {!saving &&
          <p className="form__submsg">
            <Link to={ROUTE_TEXTS}><Translation name="BackToTexts" ns="Texts" /></Link>
          </p>
        }
      </form>
    );
  }
}


export default EditTextForm;