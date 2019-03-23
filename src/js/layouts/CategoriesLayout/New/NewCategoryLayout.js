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
import categoryDefault, { CategoryFactory } from '../../../types/category';
import { ROUTE_CATEGORIES } from '../../../constants/routes';
import setTitle from '../../../utils/title';

export type Props = {
  ...RouteComponentProps,
  categories: CategoryType[],
  curLang: string,
  dispatch: Dispatch,
};

type State = {
  error: boolean,
  category: CategoryType,
  saving: boolean,
};

export class NewCategoryLayout extends Component<Props, State> {
  static defaultProps = {
    categories: [],
  };

  props: Props;
  state: State = {
    error: false,
    category: { ...categoryDefault },
    saving: false,
  };

  componentDidMount() {
    setTitle(text('WinTitle', 'NewCategoryLayout'));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceNewError', 'Categories'));
      this.props.history.push(ROUTE_CATEGORIES);
    } else if (this.state.saving) {
      this.props.dispatch(categoryActions.add(this.state.category, this.dataSaved));
      this.setState({ saving: false });
    }
  }

  // TODO - fix types
  handleSubmit = (values: Object): void => {
    const newCategory: CategoryType = CategoryFactory(values, Date.now());

    this.setState({
      category: newCategory,
      saving: true,
    });
  };

  dataSaved(ioResult: FsObject) {
    if (ioResult.success === true) {
      this.props.history.push(ROUTE_CATEGORIES);
      toastr.success(text('PersistenceNew', 'Categories'), this.state.category.getLabel());
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  }

  render() {
    return (
      <EditPanel>
        <EditPanelHeader title={text('AddCategory', 'EditPanelHeader')} />
        <EditPanelContent>
          <Formik
            initialValues={{ ...categoryDefault }}
            enableReinitialize={true}
            validationSchema={categorySchema}
            onSubmit={this.handleSubmit}
            render={formikProps => <EditCategoryForm {...formikProps} saving={this.state.saving} isNew={true} />}
          />
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default NewCategoryLayout;
