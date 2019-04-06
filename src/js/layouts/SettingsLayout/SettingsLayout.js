// @flow

import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { Formik } from 'formik';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import * as settingsActions from '../../actions/settingsActions';
import SettingsForm from './Form/SettingsForm';
import setTitle from '../../utils/title';
import settingsDefault from '../../types/settings';
import settingsSchema from '../../validation/schemas/settings';
import type { FsObject } from '../../types/fsObject';
import type { LangType } from '../../types/lang';
import type { ReduxState } from '../../types/reduxstate';
import type { SettingsType } from '../../types/settings';
import { ROUTE_SETTINGS } from '../../constants/routes';
import { text } from '../../components/Translation/Translation';
import './SettingsLayout.css';

export type Props = {
  ...RouteComponentProps,
  dispatch: Dispatch,
  languages: LangType[],
  settings: SettingsType,
};

type State = {
  error: boolean,
  saving: boolean,
  settings: Object,
};

export class SettingsLayout extends Component<Props, State> {
  props: Props;
  state: State = {
    error: false,
    saving: false,
    settings: { ...settingsDefault, ...this.props.settings },
  };
  dataSaved: Function;
  handleSubmit: Function;
  prevLang: string = { ...settingsDefault, ...this.props.settings }.language;

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
      const newLang = this.state.settings.language;
      const updateLang = newLang !== this.prevLang;

      this.props.dispatch(settingsActions.update({ ...this.state.settings }, updateLang, this.dataSaved));

      if (updateLang) {
        this.prevLang = newLang;
      }

      this.setState({ saving: false });
    }
  }

  handleSubmit = (values: SettingsType): void => {
    this.setState({
      settings: { ...values },
      saving: true,
    });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceEdit', 'Settings'));
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  };

  render() {
    return (
      <div className="Panel">
        <div className="SettingsLayout">
          <Formik
            initialValues={{ ...settingsDefault, ...this.props.settings }}
            enableReinitialize={true}
            validationSchema={settingsSchema}
            onSubmit={this.handleSubmit}
            render={formikProps => (
              <SettingsForm {...formikProps} saving={this.state.saving} languages={this.props.languages} />
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  settings: state.settings,
  languages: state.languages.available,
});

export default connect(mapStateToProps)(SettingsLayout);
