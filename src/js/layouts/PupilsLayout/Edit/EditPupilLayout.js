// @flow

import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr'
import { Formik } from 'formik';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditPupilForm from './Form/EditPupilForm';
import { text }  from '../../../components/Translation/Translation';
import { pupilSchema } from '../../../validation/schemas';
import * as pupilActions from '../../../actions/pupilActions';
import pupilDefault from '../../../types/pupil';
import type { ClassType } from '../../../types/class';
import type { PupilType } from '../../../types/pupil';
import { ROUTE_PUPILS } from '../../../constants/routes';
import { getActivePupil } from '../../../utils/redux';
import setTitle from '../../../utils/title';

type Props = {
  activeClass: ClassType,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
  pupils: Array<PupilType>,
};

type State = {
  error: boolean,
  pupil: PupilType,
  saving: boolean,
}


/**
* Layout for editing an existing pupil.
*/
export class EditPupilLayout extends Component<Props, State> {
  static defaultProps = {
    activeClass: {},
    pupils: [],
  };

  props: Props;
  dataSaved: Function;
  handleSubmit: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      error: false,
      pupil: {...pupilDefault, ...this.getActivePupil()},
      saving: false,
    };

    this.dataSaved = this.dataSaved.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    setTitle(text('WinTitle', 'EditPupilLayout', {'PUPIL_NAME': this.state.pupil.getLabel()}));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceNewError', 'Pupils'));
      this.props.history.push(ROUTE_PUPILS.replace(':classId', this.props.activeClass.id));
    } else if (this.state.saving) {
      this.props.dispatch(pupilActions.update(this.state.pupil, this.dataSaved));
      this.setState({ saving: false });
    }
  }

  handleSubmit(values: Object) {
    const updatedPupil = {...values};
    updatedPupil.updated = Date.now();

    this.setState({
      pupil: updatedPupil,
      saving: true
    });
  }

  /**
  * Returns the matching pupil or an empty object
  *
  * @return PupilType | object
  */
  getActivePupil() {
    return getActivePupil(this.props.pupils, this.props.match.params.pupilId);
  }

  /**
  * Callback used by writeAppData.
  *
  * @param object ioResult An object: {success: boolean, errorObj?: object, data?: json}
  */
  dataSaved(ioResult: Object) {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceEdit', 'Pupils'), this.state.pupil.getLabel());
      this.props.history.push(ROUTE_PUPILS.replace(':classId', this.props.activeClass.id));
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  }

  render() {
    const activePupil = this.getActivePupil();

    return (
      <EditPanel>
        <EditPanelHeader title={text('EditPupil', 'EditPanelHeader', {'PUPIL_NAME': activePupil.getLabel()})} />
        <EditPanelContent>
          <Formik
            initialValues={{...pupilDefault, ...activePupil}}
            enableReinitialize={true}
            validationSchema={pupilSchema}
            onSubmit={this.handleSubmit}
            render={(formikProps) => (
              <EditPupilForm {...formikProps} saving={this.state.saving} classId={this.props.activeClass.id} />
            )}
          />
        </EditPanelContent>
      </EditPanel>
    )
  }
}


export default EditPupilLayout;
