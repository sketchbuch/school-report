// @flow

import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { Formik } from 'formik';
import { RouteComponentProps } from 'react-router';
import { toastr } from 'react-redux-toastr';
import * as pupilActions from '../../../actions/pupilActions';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPupilForm from '../Form/EditPupilForm';
import pupilDefault, { PupilFactory } from '../../../types/pupil';
import setTitle from '../../../utils/setTitle';
import type { ClassType } from '../../../types/class';
import type { FsObject } from '../../../types/fsObject';
import type { PupilType } from '../../../types/pupil';
import { ROUTE_PUPILS } from '../../../constants/routes';
import { pupilSchema } from '../../../validation/schemas';
import { text } from '../../../components/Translation/Translation';

export type Props = {
  ...RouteComponentProps,
  activeClass: ClassType,
  dispatch: Dispatch,
  pupils: PupilType[],
};

type State = {
  error: boolean,
  pupil: PupilType,
  saving: boolean,
};

export class NewPupilLayout extends Component<Props, State> {
  static defaultProps = {
    activeClass: {},
    pupils: [],
  };

  props: Props;
  state: State = {
    error: false,
    pupil: { ...pupilDefault },
    saving: false,
  };

  componentDidMount() {
    setTitle(text('WinTitle', 'NewPupilLayout'));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceNewError', 'Pupils'));
      this.props.history.push(ROUTE_PUPILS.replace(':classId', this.props.activeClass.id));
    } else if (this.state.saving) {
      this.props.dispatch(pupilActions.add(this.state.pupil, this.dataSaved));
      this.setState({ saving: false });
    }
  }

  // TODO - fix types
  handleSubmit = (values: Object): void => {
    const newPupil: PupilType = PupilFactory(values, Date.now(), this.props.match.params.classId);

    this.setState({
      pupil: newPupil,
      saving: true,
    });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      this.props.history.push(ROUTE_PUPILS.replace(':classId', this.props.activeClass.id));
      toastr.success(text('PersistenceNew', 'Pupils'), this.state.pupil.getLabel());
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
        <EditPanelHeader title={text('AddPupil', 'EditPanelHeader')} />
        <EditPanelContent>
          <Formik
            initialValues={{ ...pupilDefault }}
            enableReinitialize={true}
            validationSchema={pupilSchema}
            onSubmit={this.handleSubmit}
            render={formikProps => (
              <EditPupilForm
                {...formikProps}
                saving={this.state.saving}
                classId={this.props.activeClass.id}
                isNew={true}
              />
            )}
          />
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default NewPupilLayout;
