// @flow

import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { Formik } from 'formik';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditCategoryForm from '../Form/EditCategoryForm';
import { text } from '../../../components/Translation/Translation';
import categorySchema from '../../../validation/schemas/categories';
import * as categoryActions from '../../../actions/categoryActions';
import type { CategoryType } from '../../../types/category';
import categoryDefault, { CategoryFactory } from '../../../types/category';
import { ROUTE_CATEGORIES } from '../../../constants/routes';
import setTitle from '../../../utils/title';

type Props = {
  categories: Array<CategoryType>,
  curLang: string,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
};

type State = {
  error: boolean,
  category: CategoryType,
  saving: boolean,
};

/**
 * Layout for adding a new category.
 */
export class NewCategoryLayout extends Component<Props, State> {
  static defaultProps = {
    categories: [],
  };

  props: Props;
  dataSaved: Function;
  handleSubmit: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      error: false,
      category: { ...categoryDefault },
      saving: false,
    };

    this.dataSaved = this.dataSaved.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  handleSubmit(values: Object) {
    const newCategory = CategoryFactory(values, Date.now());

    this.setState({
      category: newCategory,
      saving: true,
    });
  }

  /**
   * Callback used by writeAppData.
   *
   * @param object ioResult An object: {success: boolean, errorObj?: object, data?: json}
   */
  dataSaved(ioResult: Object) {
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
