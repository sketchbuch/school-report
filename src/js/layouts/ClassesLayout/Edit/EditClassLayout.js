// @flow

import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { Formik } from 'formik';
import { RouteComponentProps } from 'react-router';
import { toastr } from 'react-redux-toastr';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditClassForm from '../Form/EditClassForm';
import { text } from '../../../components/Translation/Translation';
import { classSchema } from '../../../validation/schemas';
import * as classActions from '../../../actions/classActions';
import classDefault from '../../../types/class';
import type { ClassType } from '../../../types/class';
import type { FsObject } from '../../../types/fsObject';
import { ROUTE_CLASSES } from '../../../constants/routes';
import { getActiveClass } from '../../../utils/redux';
import setTitle from '../../../utils/setTitle';

export type Props = {
  ...RouteComponentProps,
  classes: ClassType[],
  dispatch: Dispatch,
};

type State = {
  error: boolean,
  class: ClassType,
  saving: boolean,
};

export class EditClassLayout extends Component<Props, State> {
  static defaultProps = {
    classes: [],
  };

  props: Props;
  state: State = {
    error: false,
    class: { ...classDefault, ...this.getActiveClass() },
    saving: false,
  };

  componentDidMount() {
    setTitle(
      text('WinTitle', 'EditClassesLayout', {
        CLASS_NAME: this.state.class.getLabel(),
      })
    );
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const activeClass = this.getActiveClass();
    setTitle(
      text('WinTitle', 'EditClassesLayout', {
        CLASS_NAME: activeClass.getLabel(),
      })
    );

    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceEditError', 'Classes'));
      this.props.history.push(ROUTE_CLASSES);
    } else if (this.state.saving) {
      this.props.dispatch(classActions.update(this.state.class, this.dataSaved));
      this.setState({ saving: false });
    }
  }

  // TODO - fix types
  handleSubmit = (values: ClassType): void => {
    const updatedClass = { ...values };
    updatedClass.updated = Date.now();

    this.setState({
      class: updatedClass,
      saving: true,
    });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceEdit', 'Classes'), this.state.class.getLabel());
      this.props.history.push(ROUTE_CLASSES);
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  };

  getActiveClass(): ClassType {
    return getActiveClass(this.props.classes, this.props.match.params.classId);
  }

  render() {
    const activeClass: ClassType = this.getActiveClass();

    return (
      <EditPanel>
        <EditPanelHeader
          title={text('EditClass', 'EditPanelHeader', {
            CLASS_NAME: activeClass.getLabel(),
          })}
        />
        <EditPanelContent>
          <Formik
            initialValues={{ ...classDefault, ...activeClass }}
            enableReinitialize={true}
            validationSchema={classSchema}
            onSubmit={this.handleSubmit}
            render={formikProps => <EditClassForm {...formikProps} saving={this.state.saving} />}
          />
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default EditClassLayout;
