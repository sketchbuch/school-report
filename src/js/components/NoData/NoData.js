// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Formik } from 'formik';
import ClassForm from './Forms/ClassForm';
import PupilForm from './Forms/PupilForm';
import TextForm from './Forms/TextForm';
import { text } from '../Translation/Translation';
import { prefixedClassSchema, prefixedPupilSchema, prefixedTextSchema } from '../../validation/schemas';
import * as dataActions from '../../actions/dataActions';
import type { ClassType } from '../../types/class';
import type { PupilType } from '../../types/pupil';
import type { TextType } from '../../types/text';
import classDefault, { ClassFactory } from '../../types/class';
import pupilDefault, { PupilFactory } from '../../types/pupil';
import textDefault, { TextFactory } from '../../types/text';
import 'react-select/dist/react-select.css';
import './NoData.css';

type Props = {
  curLang: string,
  dispatch: Function,
};

type State = {
  class: ClassType,
  error: boolean,
  pupil: PupilType,
  saving: boolean,
  step: 'class' | 'pupil' | 'save' | 'text',
  text: TextType,
};

/**
 * NoClasses
 */
export class NoData extends Component<Props, State> {
  state: State;
  props: Props;
  initialValues: Object;
  handleSubmit: Function;
  handleClick: Function;
  dataSaved: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      class: { ...classDefault },
      error: false,
      pupil: { ...pupilDefault },
      saving: false,
      step: 'class',
      text: { ...textDefault },
    };

    this.initialValues = {
      class: { ...classDefault },
      pupil: { ...pupilDefault },
      text: { ...textDefault },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.dataSaved = this.dataSaved.bind(this);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceError', 'NoData'));
    } else if (this.state.saving) {
      this.props.dispatch(
        dataActions.replace(
          {
            categories: [],
            classes: [{ ...this.state.class }],
            pupils: [{ ...this.state.pupil }],
            reports: [],
            texts: [{ ...this.state.text }],
          },
          this.dataSaved
        )
      );
      this.setState({ saving: false });
    }
  }

  handleSubmit(values: Object) {
    values.text.lang = this.props.curLang;

    const newText = TextFactory(values.text, Date.now(), this.props.curLang);

    this.setState({
      saving: true,
      step: 'save',
      text: newText,
    });
  }

  handleClick(values: Object) {
    if (this.state.step === 'pupil') {
      const newPupil = PupilFactory(values.pupil, Date.now(), this.state.class.id);

      this.setState({
        step: 'text',
        pupil: newPupil,
      });
    } else {
      // Class
      const newClass = ClassFactory(values.class, Date.now());

      this.setState({
        step: 'pupil',
        class: newClass,
      });
    }
  }

  /**
   * Callback used by writeAppData.
   *
   * @param object ioResult An object: {success: boolean, errorObj?: object, data?: json}
   */
  dataSaved(ioResult: Object) {
    if (ioResult.success === true) {
      toastr.success(text('DataPersisted', 'NoData'));
      //this.props.history.push(ROUTE_CLASSES);
    } else {
      this.setState({ error: true });
    }
  }

  renderStep() {
    switch (this.state.step) {
      case 'save':
      case 'text':
        const busy = this.state.step === 'save' ? true : false;

        return (
          <Formik
            initialValues={this.initialValues}
            enableReinitialize={false}
            validationSchema={prefixedTextSchema}
            onSubmit={this.handleSubmit}
            render={formikProps => <TextForm {...formikProps} handleClick={this.handleClick} busy={busy} />}
          />
        );

      case 'pupil':
        return (
          <Formik
            initialValues={this.initialValues}
            enableReinitialize={false}
            validationSchema={prefixedPupilSchema}
            onSubmit={this.handleSubmit}
            render={formikProps => <PupilForm {...formikProps} handleClick={this.handleClick} />}
          />
        );

      case 'class':
      default:
        return (
          <Formik
            initialValues={this.initialValues}
            enableReinitialize={false}
            validationSchema={prefixedClassSchema}
            onSubmit={this.handleSubmit}
            render={formikProps => <ClassForm {...formikProps} handleClick={this.handleClick} />}
          />
        );
    }
  }

  render() {
    return <div className="NoData">{this.renderStep()}</div>;
  }
}

const mapStateToProps = (state: Object) => ({
  curLang: state.languages.current,
});

export default connect(mapStateToProps)(NoData);
