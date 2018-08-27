// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr'
import { Formik } from 'formik';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import NewPupilForm from './Form/NewPupilForm';
import { text }  from '../../../components/Translation/Translation';
import { pupilSchema } from '../../../validation/schemas';
import * as pupilActions from '../../../actions/pupilActions';
import pupilDefault, { PupilFactory } from '../../../types/pupil';
import type { ClassType } from '../../../types/class';
import type { PupilType } from '../../../types/pupil';
import { ROUTE_PUPILS } from '../../../constants/routes';
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
* Layout for adding a new pupil.
*/
export class NewPupilLayout extends Component<Props, State> {
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
      pupil: {...pupilDefault},
      saving: false,
    };

    this.dataSaved = this.dataSaved.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  handleSubmit(values: Object) {
    const newPupil = PupilFactory(
      values,
      Date.now(),
      this.props.match.params.classId,
    );

    this.setState({
      pupil: newPupil,
      saving: true
    });
  }

  /**
  * Callback used by writeAppData.
  *
  * @param object ioResult An object: {success: boolean, errorObj?: object, data?: json}
  */
  dataSaved(ioResult: Object) {
    if (ioResult.success === true) {
      this.props.history.push(ROUTE_PUPILS.replace(':classId', this.props.activeClass.id));
      toastr.success(text('PersistenceNew', 'Pupils'), this.state.pupil.getLabel());
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
        <EditPanelHeader title={text('AddPupil', 'EditPanelHeader')} />
        <EditPanelContent>
          <Formik
            initialValues={{...pupilDefault}}
            enableReinitialize={true}
            validationSchema={pupilSchema}
            onSubmit={this.handleSubmit}
            render={(formikProps) => (
              <NewPupilForm {...formikProps} saving={this.state.saving} classId={this.props.activeClass.id} />
            )}
          />
        </EditPanelContent>
      </EditPanel>
    )
  }
}


export default connect()(NewPupilLayout);
