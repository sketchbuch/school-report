// @flow

import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { Formik } from 'formik';
import { RouteComponentProps } from 'react-router';
import { toastr } from 'react-redux-toastr';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditPupilForm from '../Form/EditPupilForm';
import { text } from '../../../components/Translation/Translation';
import { pupilSchema } from '../../../validation/schemas';
import * as pupilActions from '../../../actions/pupilActions';
import pupilDefault from '../../../types/pupil';
import type { ClassType } from '../../../types/class';
import type { FsObject } from '../../../types/fsObject';
import type { PupilType } from '../../../types/pupil';
import { ROUTE_PUPILS } from '../../../constants/routes';
import { getActivePupil } from '../../../utils/redux';
import setTitle from '../../../utils/title';

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

export class EditPupilLayout extends Component<Props, State> {
  static defaultProps = {
    activeClass: {},
    pupils: [],
  };

  props: Props;
  state: State = {
    error: false,
    pupil: { ...pupilDefault, ...this.getActivePupil() },
    saving: false,
  };

  componentDidMount() {
    setTitle(
      text('WinTitle', 'EditPupilLayout', {
        PUPIL_NAME: this.state.pupil.getLabel(),
      })
    );
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const activePupil: PupilType = this.getActivePupil();
    setTitle(
      text('WinTitle', 'EditPupilLayout', {
        PUPIL_NAME: activePupil.getLabel(),
      })
    );

    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceNewError', 'Pupils'));
      this.props.history.push(ROUTE_PUPILS.replace(':classId', this.props.activeClass.id));
    } else if (this.state.saving) {
      this.props.dispatch(pupilActions.update(this.state.pupil, this.dataSaved));
      this.setState({ saving: false });
    }
  }

  // TODO - fix types
  handleSubmit = (values: Object): void => {
    const updatedPupil = { ...values };
    updatedPupil.updated = Date.now();

    this.setState({
      pupil: updatedPupil,
      saving: true,
    });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceEdit', 'Pupils'), this.state.pupil.getLabel());
      this.props.history.push(ROUTE_PUPILS.replace(':classId', this.props.activeClass.id));
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  };

  getActivePupil(): PupilType {
    return getActivePupil(this.props.pupils, this.props.match.params.pupilId);
  }

  render() {
    const activePupil: PupilType = this.getActivePupil();

    return (
      <EditPanel>
        <EditPanelHeader
          title={text('EditPupil', 'EditPanelHeader', {
            PUPIL_NAME: activePupil.getLabel(),
          })}
        />
        <EditPanelContent>
          <Formik
            initialValues={{ ...pupilDefault, ...activePupil }}
            enableReinitialize={true}
            validationSchema={pupilSchema}
            onSubmit={this.handleSubmit}
            render={formikProps => (
              <EditPupilForm {...formikProps} saving={this.state.saving} classId={this.props.activeClass.id} />
            )}
          />
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default EditPupilLayout;
