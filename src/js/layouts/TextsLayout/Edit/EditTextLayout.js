// @flow

import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr'
import { Formik } from 'formik';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditTextForm from '../Form/EditTextForm';
import { text }  from '../../../components/Translation/Translation';
import { textSchema } from '../../../validation/schemas';
import * as textActions from '../../../actions/textActions';
import type { TextType } from '../../../types/text';
import type { CategoryType } from '../../../types/category';
import textDefault from '../../../types/text';
import { ROUTE_TEXTS } from '../../../constants/routes';
import { getActiveText } from '../../../utils/redux';
import setTitle from '../../../utils/title';

type Props = {
  categories: Array<CategoryType>,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
  texts: Array<TextType>,
};

type State = {
  error: boolean,
  text: TextType,
  saving: boolean,
}


/**
* Layout for editing an existing text.
*/
export class EditTextLayout extends Component<Props, State> {
  static defaultProps = {
    categories: [],
    texts: [],
  };

  props: Props;
  dataSaved: Function;
  handleSubmit: Function;
  initialValues: Object;

  constructor(props: Props) {
    super(props);

    this.state = {
      error: false,
      saving: false,
      text: {...textDefault, ...this.getActiveText()},
    };

    this.dataSaved = this.dataSaved.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    setTitle(text('WinTitle', 'EditTextLayout', { TEXT: this.state.text.getLabel() }));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceNewError', 'Texts'));
      this.props.history.push(ROUTE_TEXTS);
    } else if (this.state.saving) {
      this.props.dispatch(textActions.update(this.state.text, this.dataSaved));
      this.setState({ saving: false });
    }
  }

  handleSubmit(values: Object) {
    const updatedText = {...values};
    updatedText.updated = Date.now();
    updatedText.charCount = updatedText.bodytext.length;

    this.setState({
      text: updatedText,
      saving: true
    });
  }

  /**
  * Returns the matching class or an empty object
  *
  * @return ClassType | object
  */
  getActiveText() {
    return getActiveText(this.props.texts, this.props.match.params.textId);
  }

  /**
  * Callback used by writeAppData.
  *
  * @param object ioResult An object: {success: boolean, errorObj?: object, data?: json}
  */
  dataSaved(ioResult: Object) {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceEdit', 'Texts'), this.state.text.getLabel());
      this.props.history.push(ROUTE_TEXTS);
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  }

  render() {
    const activeText = this.getActiveText();

    return (
      <EditPanel>
        <EditPanelHeader title={text('EditText', 'EditPanelHeader', { TEXT: activeText.getLabel() })} />
        <EditPanelContent>
          <Formik
            initialValues={{...textDefault, ...activeText}}
            enableReinitialize={true}
            validationSchema={textSchema}
            onSubmit={this.handleSubmit}
            render={(formikProps) => (
              <EditTextForm {...formikProps} saving={this.state.saving} categories={this.props.categories} />
            )}
          />
        </EditPanelContent>
      </EditPanel>
    )
  }
}


export default EditTextLayout;
