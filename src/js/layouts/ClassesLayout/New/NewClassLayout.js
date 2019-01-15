// @flow

import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { Formik } from 'formik';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditClassForm from '../Form/EditClassForm';
import { text } from '../../../components/Translation/Translation';
import { classSchema } from '../../../validation/schemas';
import * as classActions from '../../../actions/classActions';
import classDefault, { ClassFactory } from '../../../types/class';
import type { ClassType } from '../../../types/class';
import { ROUTE_CLASSES } from '../../../constants/routes';
import setTitle from '../../../utils/title';

type Props = {
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
};

type State = {
  error: boolean,
  class: ClassType,
  saving: boolean,
};

/**
 * Layout for adding a new class.
 */
export class NewClassLayout extends Component<Props, State> {
  props: Props;
  dataSaved: Function;
  handleSubmit: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      error: false,
      class: { ...classDefault },
      saving: false,
    };

    this.dataSaved = this.dataSaved.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    setTitle(text('WinTitle', 'NewClassLayout'));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceNewError', 'Classes'));
      this.props.history.push(ROUTE_CLASSES);
    } else if (this.state.saving) {
      this.props.dispatch(classActions.add(this.state.class, this.dataSaved));
      this.setState({ saving: false });
    }
  }

  handleSubmit(values: Object) {
    const newClass = ClassFactory(values, Date.now());

    this.setState({
      class: newClass,
      saving: true,
    });
  }

  /**
   * Callback used by electron fs functions.
   *
   * @param object ioResult An object: {success: boolean, errorObj?: object, data?: json}
   */
  dataSaved(ioResult: Object) {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceNew', 'Classes'), this.state.class.getLabel());
      this.props.history.push(ROUTE_CLASSES);
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
        <EditPanelHeader title={text('AddClass', 'EditPanelHeader')} />
        <EditPanelContent>
          <Formik
            initialValues={{ ...classDefault }}
            enableReinitialize={true}
            validationSchema={classSchema}
            onSubmit={this.handleSubmit}
            render={formikProps => <EditClassForm {...formikProps} saving={this.state.saving} isNew={true} />}
          />
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default NewClassLayout;
