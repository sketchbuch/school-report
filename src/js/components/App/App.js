// @flow

import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions';
import * as dataActions from '../../actions/dataActions';
import * as languageActions from '../../actions/languageActions';
import * as settingsActions from '../../actions/settingsActions';
import AppError from '../AppError/AppError';
import Header from '../Header/Header';
import NoData from '../NoData/NoData';
import Panels from '../Panels/Panels';
import type { AppType } from '../../types/app';
import type { ClassType } from '../../types/class';
import type { RenderHelperReturn } from '../../types/misc';
import type { SettingsType } from '../../types/settings';
import type { ReduxState } from '../../types/reduxstate';
import { getCustomNumProp } from '../../utils/dom';
import { text } from '../Translation/Translation';
import './App.css';

export type Props = {
  app: AppType,
  classes: ClassType[],
  currentLang: string,
  dispatch: Dispatch,
  settings: SettingsType,
};

const hideLoader = (): void => {
  const alDuration = getCustomNumProp('--apploader-ms');
  document.getElementsByTagName('html')[0].classList.add('app-initialised');

  setTimeout(() => {
    let appLoaderEle = document && document.getElementById('apploader');
    if (appLoaderEle && appLoaderEle.parentNode) {
      appLoaderEle.parentNode.removeChild(appLoaderEle);
    }
  }, alDuration);
};

export class App extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.props.dispatch(settingsActions.load(this.settingsLoaded));
  }

  componentDidUpdate(prevProps: Props) {
    if (!this.props.app.loaded && !this.props.app.error) {
      const { dataCreated, dataLoaded, languageLoaded, settingsLoaded } = this.props.app;

      if (dataLoaded || (!dataLoaded && languageLoaded && dataCreated)) {
        this.props.dispatch(appActions.loaded(hideLoader));
      } else if (languageLoaded && !dataCreated) {
        this.props.dispatch(dataActions.load(this.dataLoaded));
      } else if (settingsLoaded || dataCreated) {
        this.props.dispatch(languageActions.load(this.props.currentLang, this.languageLoaded));
      }
    }
  }

  settingsLoaded = (ioResult: Object): void => {
    if (ioResult.success === true) {
      this.props.dispatch(settingsActions.loaded(ioResult.data));
    } else if (ioResult.errorObj.code === 'ENOENT') {
      // File doesn't exist.
      this.props.dispatch(dataActions.create(this.dataCreated));
    } else {
      this.appError('settingsLoaded');
    }
  };

  languageLoaded = (ioResult: Object): void => {
    if (ioResult.success === true) {
      Object.assign(window.reportr.translations, ioResult.data);
      this.props.dispatch(languageActions.loaded());
    } else {
      this.appError('languageLoaded');
    }
  };

  dataLoaded = (ioResult: Object): void => {
    if (ioResult.success === true) {
      this.props.dispatch(dataActions.loaded(JSON.parse(ioResult.data)));
    } else {
      this.appError('dataLoaded');
    }
  };

  dataCreated = (ioResult: Object): void => {
    if (ioResult.success === true) {
      this.props.dispatch(dataActions.created());
    } else {
      this.props.dispatch(appActions.errored(hideLoader));
    }
  };

  /**
   * Update UI to show an error occured.
   */
  appError(type: string): void {
    this.props.dispatch(appActions.errored(hideLoader));
  }

  renderContent(): RenderHelperReturn {
    if (this.props.app.error === false && this.props.app.loaded === true) {
      if (!this.props.app.dataCreated || this.props.classes.length > 0) {
        return <Panels />;
      } else {
        return <NoData />;
      }
    }

    let appError = text('ErrorTxt', 'AppError');
    if (appError.substr(0, 1) === '?') {
      appError = window.reportr.appError;
    }

    return <AppError errorTxt={appError} />;
  }

  render() {
    return (
      <BrowserRouter>
        <section className="App__content">
          <Header />
          {this.renderContent()}
        </section>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  app: state.app,
  classes: state.classes,
  currentLang: state.languages.current,
  settings: state.settings,
});

export default connect(mapStateToProps)(App);
