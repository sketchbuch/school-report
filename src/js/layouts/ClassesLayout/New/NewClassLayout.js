// @flow

import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { Formik } from 'formik';
import { RouteComponentProps } from 'react-router';
import { toastr } from 'react-redux-toastr';
import * as classActions from '../../../actions/classActions';
import EditClassForm from '../Form/EditClassForm';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import classDefault, { ClassFactory } from '../../../types/class';
import setTitle from '../../../utils/title';
import type { ClassType } from '../../../types/class';
import type { FsObject } from '../../../types/fsObject';
import { ROUTE_CLASSES } from '../../../constants/routes';
import { classSchema } from '../../../validation/schemas';
import { text } from '../../../components/Translation/Translation';

export type Props = {
  ...RouteComponentProps,
  dispatch: Dispatch,
};

type State = {
  error: boolean,
  class: ClassType,
  saving: boolean,
};

export class NewClassLayout extends Component<Props, State> {
  props: Props;
  state: State = {
    error: false,
    class: { ...classDefault },
    saving: false,
  };

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

  // TODO - fix types
  handleSubmit = (values: Object): void => {
    const newClass = ClassFactory(values, Date.now());

    this.setState({
      class: newClass,
      saving: true,
    });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceNew', 'Classes'), this.state.class.getLabel());
      this.props.history.push(ROUTE_CLASSES);
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  };

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
