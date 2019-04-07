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
import type { FsObject } from '../../../types/fsObject';
import type { TextType } from '../../../types/text';
import type { CategoryType } from '../../../types/category';
import textDefault, { TextFactory } from '../../../types/text';
import { ROUTE_TEXTS } from '../../../constants/routes';
import { cropStr } from '../../../utils/strings';
import { TEXT_CROP_LEN } from '../../../constants/misc';
import setTitle from '../../../utils/title';

export type Props = {
  ...RouteComponentProps,
  categories: CategoryType[],
  curLang: string,
  dispatch: Dispatch,
};

type State = {
  error: boolean,
  text: TextType,
  saving: boolean,
};

export class NewTextLayout extends Component<Props, State> {
  static defaultProps = {
    categories: [],
  };

  props: Props;
  state: State = {
    error: false,
    text: { ...textDefault },
    saving: false,
  };

  componentDidMount() {
    setTitle(text('WinTitle', 'NewTextLayout'));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceNewError', 'Texts'));
      this.props.history.push(ROUTE_TEXTS);
    } else if (this.state.saving) {
      this.props.dispatch(textActions.add(this.state.text, this.dataSaved));
      this.setState({ saving: false });
    }
  }

  // TODO - fix types
  handleSubmit = (values: Object): void => {
    const newText: TextType = TextFactory(values, Date.now(), this.props.curLang);
    newText.bodytext = newText.bodytext.trim();

    this.setState({
      text: newText,
      saving: true,
    });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      this.props.history.push(ROUTE_TEXTS);
      toastr.success(text('PersistenceNew', 'Texts'), cropStr(this.state.text.getLabel(), TEXT_CROP_LEN));
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
        <EditPanelHeader title={text('AddText', 'EditPanelHeader')} />
        <EditPanelContent>
          <Formik
            initialValues={{ ...textDefault }}
            enableReinitialize={true}
            validationSchema={textSchema}
            onSubmit={this.handleSubmit}
            render={formikProps => (
              <EditTextForm
                {...formikProps}
                saving={this.state.saving}
                isNew={true}
                categories={this.props.categories}
              />
            )}
          />
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default NewTextLayout;
