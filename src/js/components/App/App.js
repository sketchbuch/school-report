// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppError from '../AppError/AppError';
import Header from '../Header/Header';
import Panels from '../Panels/Panels';
import NoData from '../NoData/NoData';
import { text } from '../Translation/Translation';
import * as appActions from '../../actions/appActions';
import * as dataActions from '../../actions/dataActions';
import * as settingsActions from '../../actions/settingsActions';
import * as languageActions from '../../actions/languageActions';
import type { AppType } from '../../types/app';
import './App.css';

type Props = {
  app: AppType,
  classes: Array<Object>,
  currentLang: string,
  dispatch: Function,
  settings: Object,
};

/**
* App.
*/
export class App extends Component<Props> {
  props: Props;
  dataCreated: Function;
  dataLoaded: Function;
  languageLoaded: Function;
  settingsLoaded: Function;

  constructor(props: Object) {
    super(props);

    this.dataCreated = this.dataCreated.bind(this);
    this.dataLoaded = this.dataLoaded.bind(this);
    this.languageLoaded = this.languageLoaded.bind(this);
    this.settingsLoaded = this.settingsLoaded.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(settingsActions.load(this.settingsLoaded));
  }

  componentDidUpdate(prevProps: Props) {
    if (!this.props.app.loaded && !this.props.app.error) {
      const {
        dataCreated,
        dataLoaded,
        languageLoaded,
        settingsLoaded,
      } = this.props.app;

      if (dataLoaded || (!dataLoaded && languageLoaded && dataCreated)) {
        this.props.dispatch(appActions.loaded());
      } else if (languageLoaded && !dataCreated) {
        this.props.dispatch(dataActions.load(this.dataLoaded));
      } else if (settingsLoaded || dataCreated) {
        this.props.dispatch(languageActions.load(this.props.currentLang, this.languageLoaded));
      }
    }
  }

  /**
  * Callback used when the settings have loaded.
  *
  * @param object ioResult An object: {success: boolean, errorObj?: object, data?: string}
  */
  settingsLoaded(ioResult: Object) {
    if (ioResult.success === true) {
      this.props.dispatch(settingsActions.loaded(ioResult.data));
    } else if (ioResult.errorObj.code === 'ENOENT') { // File doesn't exist.
      this.props.dispatch(dataActions.create(this.dataCreated));
    } else {
      this.appError('settingsLoaded');
    }
  }

  /**
  * Callback used when the language has loaded.
  *
  * @param object ioResult An object: {success: boolean, errorObj?: object, data?: object}
  */
  languageLoaded(ioResult: Object) {
    if (ioResult.success === true) {
      Object.assign(window.reportr.translations, ioResult.data);
      this.props.dispatch(languageActions.loaded());
    } else {
      this.appError('languageLoaded');
    }
  }

  /**
  * Callback used by readAppData.
  *
  * @param object ioResult An object: {success: boolean, errorObj?: object, data?: string}
  */
  dataLoaded(ioResult: Object) {
    if (ioResult.success === true) {
      this.props.dispatch(dataActions.loaded(JSON.parse(ioResult.data)));
    } else {
      this.appError('dataLoaded');
    }
  }

  /**
  * Callback used when initial data is created.
  *
  * @param object ioResult An object: {success: boolean, errorObj?: object, data?: json}
  */
  dataCreated(ioResult: Object) {
    if (ioResult.success === true) {
      this.props.dispatch(dataActions.created());
    } else {
      this.props.dispatch(appActions.errored());
    }
  }

  /**
  * Update UI to show an error occured.
  */
  appError(type: string) {
    this.props.dispatch(appActions.errored());
  }

  /**
  * Returns the correct panel content.
  */
  renderContent() {
    if (this.props.app.error === false && this.props.app.loaded === true) {
      if (!this.props.app.dataCreated || this.props.classes.length > 0) {
        return <Panels />;
      } else {
        return <NoData />;
      }
    }

    let appError = text('ErrorTxt', 'AppError');
    if (appError.substr(0, 1) === '?') appError = window.reportr.appError;

    return <AppError errorTxt={appError}/>;
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

const mapStateToProps = (state: Object) => (
  {
    app: state.app,
    classes: state.classes,
    currentLang: state.languages.current,
    settings: state.settings,
  }
);


export default connect(mapStateToProps)(App);
