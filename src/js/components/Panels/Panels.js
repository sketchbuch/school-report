// @flow

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router';
import BuilderLayout from '../../layouts/BuilderLayout/BuilderLayout';
import CategoriesLayout from '../../layouts/CategoriesLayout/CategoriesLayout';
import ClassesLayout from '../../layouts/ClassesLayout/ClassesLayout';
import HomeLayout from '../../layouts/HomeLayout/HomeLayout';
import NotFound from '../NotFound/NotFound';
import PupilsLayout from '../../layouts/PupilsLayout/PupilsLayout';
import ReportsLayout from '../../layouts/ReportsLayout/ReportsLayout';
import SettingsLayout from '../../layouts/SettingsLayout/SettingsLayout';
import TextsLayout from '../../layouts/TextsLayout/TextsLayout';
import {
  ROUTE_BUILDER,
  ROUTE_CATEGORIES,
  ROUTE_CLASSES,
  ROUTE_HOME,
  ROUTE_PUPILS,
  ROUTE_REPORTS,
  ROUTE_SETTINGS,
  ROUTE_TEXTS,
} from '../../constants/routes';
import './Panels.css';

type Props = {
  ...RouteComponentProps,
};

/**
 * Panels containing the main app content.
 */
export class Panels extends Component<Props> {
  props: Props;

  componentDidMount() {
    if (this.props.match.path === ROUTE_HOME) {
      this.props.history.push(ROUTE_HOME);
    }
  }

  render() {
    return (
      <div className="Panels">
        <Switch>
          <Route path={ROUTE_BUILDER} component={BuilderLayout} />
          <Route path={ROUTE_CATEGORIES} component={CategoriesLayout} />
          <Route path={ROUTE_CLASSES} component={ClassesLayout} />
          <Route path={ROUTE_PUPILS} component={PupilsLayout} />
          <Route path={ROUTE_REPORTS} component={ReportsLayout} />
          <Route path={ROUTE_SETTINGS} component={SettingsLayout} />
          <Route path={ROUTE_TEXTS} component={TextsLayout} />
          <Route exact={true} path={ROUTE_HOME} component={HomeLayout} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Panels);
