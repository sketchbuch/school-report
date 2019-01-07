// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Formik } from 'formik';
import SettingsForm from './Form/SettingsForm';
import { text } from '../../components/Translation/Translation';
import type { LangType } from '../../types/lang';
import settingsSchema from '../../validation/schemas/settings';
import settingsDefault from '../../types/settings';
import type { SettingsType } from '../../types/settings';
import * as settingsActions from '../../actions/settingsActions';
import * as languageActions from '../../actions/languageActions';
import { ROUTE_HOME, ROUTE_SETTINGS } from '../../constants/routes';
import setTitle from '../../utils/title';
import './SettingsLayout.css';

type Props = {
  dispatch: Function,
  history: Object,
  languages: Array<LangType>,
  location: Object,
  match: Object,
  settings: SettingsType,
};

type State = {
  error: boolean,
  saving: boolean,
  settings: Object,
};

/**
 * Home Layout.
 */
export class SettingsLayout extends Component<Props, State> {
  props: Props;
  dataSaved: Function;
  handleSubmit: Function;
  initialValues: Object;
  languageChanged: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      error: false,
      saving: false,
      settings: { ...settingsDefault, ...this.props.settings },
    };

    this.dataSaved = this.dataSaved.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.languageChanged = this.languageChanged.bind(this);
    this.initialValues = { ...settingsDefault, ...this.props.settings };
  }

  componentDidMount() {
    setTitle(text('WinTitle', 'Settings'));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (window.location.pathname === ROUTE_SETTINGS) {
      setTitle(text('WinTitle', 'Settings'));
    }

    if (this.state.error) {
      console.log('error');
      //toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceEditError', 'Classes'));
      //this.props.history.push(ROUTE_CLASSES);
    } else if (this.state.saving) {
      this.props.dispatch(
        settingsActions.update({ ...this.state.settings }, this.dataSaved)
      );
      this.setState({ saving: false });
    }
  }

  handleSubmit(values: SettingsType) {
    this.setState({
      settings: { ...values },
      saving: true,
    });
  }

  /**
   * Callback used by settingsActions.update.
   *
   * @param object ioResult An object: {success: boolean, errorObj?: object, data?: json}
   */
  dataSaved(ioResult: Object) {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceEdit', 'Settings'));
      this.props.dispatch(
        languageActions.change(
          this.state.settings.language,
          this.languageChanged
        )
      );
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  }

  /**
   * Callback used by languageActions.change.
   */
  languageChanged() {
    this.props.history.push(ROUTE_HOME);
  }

  render() {
    return (
      <div className="Panel">
        <div className="SettingsLayout">
          <Formik
            initialValues={this.initialValues}
            enableReinitialize={true}
            validationSchema={settingsSchema}
            onSubmit={this.handleSubmit}
            render={formikProps => (
              <SettingsForm
                {...formikProps}
                saving={this.state.saving}
                languages={this.props.languages}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  settings: state.settings,
  languages: state.languages.available,
});

export default connect(mapStateToProps)(SettingsLayout);
