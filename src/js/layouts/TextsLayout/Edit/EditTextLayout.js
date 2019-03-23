// @flow

import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { Formik } from 'formik';
import { RouteComponentProps } from 'react-router';
import { toastr } from 'react-redux-toastr';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditTextForm from '../Form/EditTextForm';
import { text } from '../../../components/Translation/Translation';
import { textSchema } from '../../../validation/schemas';
import * as textActions from '../../../actions/textActions';
import type { CategoryType } from '../../../types/category';
import type { FsObject } from '../../../types/fsObject';
import type { TextType } from '../../../types/text';
import textDefault from '../../../types/text';
import { ROUTE_TEXTS } from '../../../constants/routes';
import { getActiveText } from '../../../utils/redux';
import setTitle from '../../../utils/title';

export type Props = {
  ...RouteComponentProps,
  categories: CategoryType[],
  dispatch: Dispatch,
  texts: TextType[],
};

type State = {
  error: boolean,
  text: TextType,
  saving: boolean,
};

export class EditTextLayout extends Component<Props, State> {
  static defaultProps = {
    categories: [],
    texts: [],
  };

  props: Props;
  state: State = {
    error: false,
    saving: false,
    text: { ...textDefault, ...this.getActiveText() },
  };

  componentDidMount() {
    setTitle(text('WinTitle', 'EditTextLayout', { TEXT: this.state.text.getLabel() }));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const activeText: TextType = this.getActiveText();
    setTitle(text('WinTitle', 'EditTextLayout', { TEXT: activeText.getLabel() }));

    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceNewError', 'Texts'));
      this.props.history.push(ROUTE_TEXTS);
    } else if (this.state.saving) {
      this.props.dispatch(textActions.update(this.state.text, this.dataSaved));
      this.setState({ saving: false });
    }
  }

  // TODO - fix types
  handleSubmit = (values: Object): void => {
    const updatedText = { ...values };
    updatedText.updated = Date.now();
    updatedText.charCount = updatedText.bodytext.length;

    this.setState({
      text: updatedText,
      saving: true,
    });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceEdit', 'Texts'), this.state.text.getLabel());
      this.props.history.push(ROUTE_TEXTS);
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  };

  getActiveText(): TextType {
    return getActiveText(this.props.texts, this.props.match.params.textId);
  }

  render() {
    const activeText: TextType = this.getActiveText();

    return (
      <EditPanel>
        <EditPanelHeader
          title={text('EditText', 'EditPanelHeader', {
            TEXT: activeText.getLabel(),
          })}
        />
        <EditPanelContent>
          <Formik
            initialValues={{ ...textDefault, ...activeText }}
            enableReinitialize={true}
            validationSchema={textSchema}
            onSubmit={this.handleSubmit}
            render={formikProps => (
              <EditTextForm {...formikProps} saving={this.state.saving} categories={this.props.categories} />
            )}
          />
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default EditTextLayout;
