// @flow

import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import * as dataActions from '../../actions/dataActions';
import ClassForm from './Forms/ClassForm';
import PupilForm from './Forms/PupilForm';
import TextForm from './Forms/TextForm';
import classDefault, { ClassFactory } from '../../types/class';
import pupilDefault, { PupilFactory } from '../../types/pupil';
import textDefault, { TextFactory } from '../../types/text';
import type { ClassType } from '../../types/class';
import type { FsObject } from '../../types/fsObject';
import type { PupilType } from '../../types/pupil';
import type { ReduxState } from '../../types/reduxstate';
import type { RenderHelperReturn } from '../../types/misc';
import type { TextType } from '../../types/text';
import { prefixedClassSchema, prefixedPupilSchema, prefixedTextSchema } from '../../validation/schemas';
import { text } from '../Translation/Translation';
import './NoData.css';

export type Props = {
  curLang: string,
  dispatch: Dispatch,
};

type State = {
  class: ClassType,
  error: boolean,
  pupil: PupilType,
  saving: boolean,
  step: 'class' | 'pupil' | 'save' | 'text',
  text: TextType,
};

export type ValuesObject = {
  class: ClassType,
  pupil: PupilType,
  text: TextType,
};

export class NoData extends Component<Props, State> {
  props: Props;
  state: State = {
    class: { ...classDefault },
    error: false,
    pupil: { ...pupilDefault },
    saving: false,
    step: 'class',
    text: { ...textDefault },
  };
  initialValues: ValuesObject = {
    class: { ...classDefault },
    pupil: { ...pupilDefault },
    text: { ...textDefault },
  };

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

  handleSubmit = (values: ValuesObject): void => {
    switch (this.state.step) {
      case 'class':
        const newClass = ClassFactory(values.class, Date.now());

        this.setState({
          step: 'pupil',
          class: newClass,
        });
        break;

      case 'pupil':
        const newPupil = PupilFactory(values.pupil, Date.now(), this.state.class.id);

        this.setState({
          step: 'text',
          pupil: newPupil,
        });
        break;

      case 'text':
        values.text.lang = this.props.curLang;

        const newText = TextFactory(values.text, Date.now(), this.props.curLang);

        this.setState({
          saving: true,
          step: 'save',
          text: newText,
        });
        break;

      default:
        console.log(`<NoData /> handleSubmit() unknown step: ${this.state.step}`);
        break;
    }
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      toastr.success(text('DataPersisted', 'NoData'));
    } else {
      this.setState({ error: true });
    }
  };

  renderStep(): RenderHelperReturn {
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
            render={formikProps => <TextForm {...formikProps} busy={busy} />}
          />
        );

      case 'pupil':
        return (
          <Formik
            initialValues={this.initialValues}
            enableReinitialize={false}
            validationSchema={prefixedPupilSchema}
            onSubmit={this.handleSubmit}
            render={formikProps => <PupilForm {...formikProps} />}
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
            render={formikProps => <ClassForm {...formikProps} />}
          />
        );
    }
  }

  render() {
    return <div className="NoData">{this.renderStep()}</div>;
  }
}

const mapStateToProps = (state: ReduxState) => ({
  curLang: state.languages.current,
});

export default connect(mapStateToProps)(NoData);
