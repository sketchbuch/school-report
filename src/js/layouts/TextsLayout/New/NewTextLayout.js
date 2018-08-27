// @flow

import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr'
import { Formik } from 'formik';
import EditPanel from '../../../EditPanel/EditPanel';
import EditPanelHeader from '../../../EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../EditPanel/Content/EditPanelContent';
import EditTextForm from '../Form/EditTextForm';
import { text }  from '../../../Translation/Translation';
import { textSchema } from '../../../../validation/schemas';
import * as textActions from '../../../../actions/textActions';
import type { TextType } from '../../../../types/text';
import type { CategoryType } from '../../../../types/category';
import textDefault, { TextFactory } from '../../../../types/text';
import { ROUTE_TEXTS } from '../../../../constants/routes';
import { cropStr } from '../../../../utils/strings';
import { TEXT_CROP_LEN } from '../../../../constants/misc';
import setTitle from '../../../../utils/title';

type Props = {
  categories: Array<CategoryType>,
  curLang: string,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
};

type State = {
  error: boolean,
  text: TextType,
  saving: boolean,
}


/**
* Layout for adding a new text.
*/
export class NewTextLayout extends Component<Props, State> {
  static defaultProps = {
    categories: [],
  };

  props: Props;
  dataSaved: Function;
  handleSubmit: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      error: false,
      text: {...textDefault},
      saving: false,
    };

    this.dataSaved = this.dataSaved.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  handleSubmit(values: Object) {
    const newText = TextFactory(
      values,
      Date.now(),
      this.props.curLang
    );

    this.setState({
      text: newText,
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
      this.props.history.push(ROUTE_TEXTS);
      toastr.success(text('PersistenceNew', 'Texts'), cropStr(this.state.text.getLabel(), TEXT_CROP_LEN));
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
        <EditPanelHeader title={text('AddText', 'EditPanelHeader')} />
        <EditPanelContent>
          <Formik
            initialValues={{...textDefault}}
            enableReinitialize={true}
            validationSchema={textSchema}
            onSubmit={this.handleSubmit}
            render={(formikProps) => (
              <EditTextForm {...formikProps} saving={this.state.saving} isNew={true} categories={this.props.categories} />
            )}
          />
        </EditPanelContent>
      </EditPanel>
    )
  }
}


export default NewTextLayout;
