// @flow

import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr'
import { Formik } from 'formik';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditCategoryForm from '../Form/EditCategoryForm';
import { text }  from '../../../components/Translation/Translation';
import categorySchema from '../../../validation/schemas/categories';
import * as categoryActions from '../../../actions/categoryActions';
import type { CategoryType } from '../../../types/category';
import categoryDefault from '../../../types/category';
import { ROUTE_CATEGORIES } from '../../../constants/routes';
import { getActiveCategory } from '../../../utils/redux';
import setTitle from '../../../utils/title';

type Props = {
  categories: Array<CategoryType>,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
};

type State = {
  category: CategoryType,
  error: boolean,
  saving: boolean,
}


/**
* Layout for editing an existing category.
*/
export class EditCategoryLayout extends Component<Props, State> {
  static defaultProps = {
    categories: [],
  };

  props: Props;
  dataSaved: Function;
  handleSubmit: Function;
  initialValues: Object;

  constructor(props: Props) {
    super(props);

    this.state = {
      category: {...categoryDefault, ...this.getActiveCategory()},
      error: false,
      saving: false,
    };

    this.dataSaved = this.dataSaved.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    setTitle(text('WinTitle', 'EditTextLayout', { TEXT: this.state.category.getLabel() }));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceNewError', 'Texts'));
      this.props.history.push(ROUTE_CATEGORIES);
    } else if (this.state.saving) {
      this.props.dispatch(categoryActions.update(this.state.category, this.dataSaved));
      this.setState({ saving: false });
    }
  }

  handleSubmit(values: Object) {
    const updatedCategory = {...values};
    updatedCategory.updated = Date.now();

    this.setState({
      category: updatedCategory,
      saving: true
    });
  }

  /**
  * Returns the matching class or an empty object
  *
  * @return ClassType | object
  */
  getActiveCategory() {
    return getActiveCategory(this.props.categories, this.props.match.params.categoryId);
  }

  /**
  * Callback used by writeAppData.
  *
  * @param object ioResult An object: {success: boolean, errorObj?: object, data?: json}
  */
  dataSaved(ioResult: Object) {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceEdit', 'Texts'), this.state.category.getLabel());
      this.props.history.push(ROUTE_CATEGORIES);
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  }

  render() {
    const activeCategory = this.getActiveCategory();

    return (
      <EditPanel>
        <EditPanelHeader title={text('EditCategory', 'EditPanelHeader', { CATEGORY_NAME: activeCategory.getLabel() })} />
        <EditPanelContent>
          <Formik
            initialValues={{...categoryDefault, ...activeCategory}}
            enableReinitialize={true}
            validationSchema={categorySchema}
            onSubmit={this.handleSubmit}
            render={(formikProps) => (
              <EditCategoryForm {...formikProps} saving={this.state.saving} />
            )}
          />
        </EditPanelContent>
      </EditPanel>
    )
  }
}


export default EditCategoryLayout;
