// @flow

import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr'
import { Formik } from 'formik';
import EditPanel from '../../../EditPanel/EditPanel';
import EditPanelHeader from '../../../EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../EditPanel/Content/EditPanelContent';
import EditClassForm from './Form/EditClassForm';
import { text }  from '../../../Translation/Translation';
import { classSchema } from '../../../../validation/schemas';
import * as classActions from '../../../../actions/classActions';
import classDefault from '../../../../types/class';
import type { ClassType } from '../../../../types/class';
import { ROUTE_CLASSES } from '../../../../constants/routes';
import { getActiveClass } from '../../../../utils/redux';
import setTitle from '../../../../utils/title';

type Props = {
  classes: Array<ClassType>,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
};

type State = {
  error: boolean,
  class: ClassType,
  saving: boolean,
}



/**
* Layout for editing an existing class.
*/
export class EditClassLayout extends Component<Props, State> {
  static defaultProps = {
    classes: [],
  };

  props: Props;
  dataSaved: Function;
  handleSubmit: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      error: false,
      class: {...classDefault, ...this.getActiveClass()},
      saving: false,
    };

    this.dataSaved = this.dataSaved.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    setTitle(text('WinTitle', 'EditClassesLayout', {'CLASS_NAME': this.state.class.getLabel()}));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceEditError', 'Classes'));
      this.props.history.push(ROUTE_CLASSES);
    } else if (this.state.saving) {
      this.props.dispatch(classActions.update(this.state.class, this.dataSaved));
      this.setState({ saving: false });
    }
  }

  handleSubmit(values: ClassType) {
    const updatedClass = {...values};
    updatedClass.updated = Date.now();

    this.setState({
      class: updatedClass,
      saving: true
    });
  }

  /**
  * Returns the matching class or an empty object
  *
  * @return ClassType | object
  */
  getActiveClass() {
    return getActiveClass(this.props.classes, this.props.match.params.classId);
  }

  /**
  * Callback used by electron fs functions.
  *
  * @param object ioResult An object: {success: boolean, errorObj?: object, data?: json}
  */
  dataSaved(ioResult: Object) {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceEdit', 'Classes'), this.state.class.getLabel());
      this.props.history.push(ROUTE_CLASSES);
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  }

  render() {
    const activeClass = this.getActiveClass();

    return (
      <EditPanel>
        <EditPanelHeader title={text('EditClass', 'EditPanelHeader', {'CLASS_NAME': activeClass.getLabel()})} />
        <EditPanelContent>
          <Formik
            initialValues={{...classDefault, ...activeClass}}
            enableReinitialize={true}
            validationSchema={classSchema}
            onSubmit={this.handleSubmit}
            render={(formikProps) => (
              <EditClassForm {...formikProps} saving={this.state.saving} />
            )}
          />
        </EditPanelContent>
      </EditPanel>
    )
  }
}


export default EditClassLayout;
