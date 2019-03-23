// @flow

import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { Formik } from 'formik';
import { RouteComponentProps } from 'react-router';
import { toastr } from 'react-redux-toastr';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditCategoryForm from '../Form/EditCategoryForm';
import { text } from '../../../components/Translation/Translation';
import categorySchema from '../../../validation/schemas/categories';
import * as categoryActions from '../../../actions/categoryActions';
import type { CategoryType } from '../../../types/category';
import type { FsObject } from '../../../types/fsObject';
import categoryDefault from '../../../types/category';
import { ROUTE_CATEGORIES } from '../../../constants/routes';
import { getActiveCategory } from '../../../utils/redux';
import setTitle from '../../../utils/title';

export type Props = {
  ...RouteComponentProps,
  categories: CategoryType[],
  dispatch: Dispatch,
};

type State = {
  category: CategoryType,
  error: boolean,
  saving: boolean,
};

export class EditCategoryLayout extends Component<Props, State> {
  static defaultProps = {
    categories: [],
  };

  props: Props;
  state: State = {
    category: {
      ...categoryDefault,
      ...getActiveCategory(this.props.categories, this.getactiveId()),
    },
    error: false,
    saving: false,
  };

  componentDidMount() {
    setTitle(
      text('WinTitle', 'EditCategoryLayout', {
        CAT: this.state.category.getLabel(),
      })
    );
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const activeId: string = this.getactiveId();
    const activeCategory: CategoryType = getActiveCategory(this.props.categories, activeId);
    setTitle(text('WinTitle', 'EditCategoryLayout', { CAT: activeCategory.getLabel() }));

    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceNewError', 'Texts'));
      this.props.history.push(ROUTE_CATEGORIES);
    } else if (this.state.saving) {
      this.props.dispatch(categoryActions.update(this.state.category, this.dataSaved));
      this.setState({ saving: false });
    }
  }

  // TODO - fix types
  handleSubmit = (values: Object): void => {
    const updatedCategory = { ...values };
    updatedCategory.updated = Date.now();

    this.setState({
      category: updatedCategory,
      saving: true,
    });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceEdit', 'Texts'), this.state.category.getLabel());
      this.props.history.push(ROUTE_CATEGORIES);
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  };

  getactiveId = (): string => {
    return this.props.match.params !== undefined ? this.props.match.params.categoryId : '';
  };

  render() {
    const activeId: string = this.getactiveId();
    const activeCategory: CategoryType = getActiveCategory(this.props.categories, activeId);
    const activeLabel: string = activeCategory.getLabel !== undefined ? activeCategory.getLabel() : '';

    return (
      <EditPanel>
        <EditPanelHeader
          title={text('EditCategory', 'EditPanelHeader', {
            CATEGORY_NAME: activeLabel,
          })}
        />
        <EditPanelContent>
          <Formik
            initialValues={{ ...categoryDefault, ...activeCategory }}
            enableReinitialize={true}
            validationSchema={categorySchema}
            onSubmit={this.handleSubmit}
            render={formikProps => <EditCategoryForm {...formikProps} saving={this.state.saving} />}
          />
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default EditCategoryLayout;
