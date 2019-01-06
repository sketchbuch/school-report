// @flow

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HeaderBreadcrumb from './Breadcrumb/HeaderBreadcrumb';
import HeaderPath from './Path/HeaderPath';
import HeaderTitle from './Title/HeaderTitle';
import {
  ROUTE_BUILDER,
  ROUTE_CATEGORIES,
  ROUTE_CLASSES,
  ROUTE_EDIT_BUILDER,
  ROUTE_EDIT_CATEGORY,
  ROUTE_EDIT_CLASS,
  ROUTE_EDIT_PUPIL,
  ROUTE_EDIT_REPORT,
  ROUTE_EDIT_TEXT,
  ROUTE_EXPORT_BUILDER,
  ROUTE_HOME,
  ROUTE_PUPILS,
  ROUTE_REPORTS,
  ROUTE_SETTINGS,
  ROUTE_TEXTS,
} from '../../constants/routes';
import './Header.css';

type Props = {};

/**
 * App Header.
 */
export class Header extends Component<Props> {
  props: Props;

  render() {
    return (
      <header className="Header" id="header">
        <p className="Header__sitetitle">
          <HeaderBreadcrumb link={ROUTE_HOME}>
            <HeaderTitle />
          </HeaderBreadcrumb>
          <Switch>
            <Route
              path={ROUTE_EXPORT_BUILDER}
              render={routerProps => (
                <HeaderPath {...routerProps} path="reports-builder-export" />
              )}
            />
            <Route
              path={ROUTE_EDIT_BUILDER}
              render={routerProps => (
                <HeaderPath {...routerProps} path="reports-builder-pupil" />
              )}
            />
            <Route
              path={ROUTE_BUILDER}
              render={routerProps => (
                <HeaderPath {...routerProps} path="reports-builder" />
              )}
            />
            <Route
              path={ROUTE_EDIT_CATEGORY}
              render={routerProps => (
                <HeaderPath {...routerProps} path="categories-category" />
              )}
            />
            <Route
              path={ROUTE_EDIT_CLASS}
              render={routerProps => (
                <HeaderPath {...routerProps} path="classes-class" />
              )}
            />
            <Route
              path={ROUTE_EDIT_PUPIL}
              render={routerProps => (
                <HeaderPath {...routerProps} path="classes-classlist-pupil" />
              )}
            />
            <Route
              path={ROUTE_EDIT_REPORT}
              render={routerProps => (
                <HeaderPath {...routerProps} path="reports-report" />
              )}
            />
            <Route
              path={ROUTE_EDIT_TEXT}
              render={routerProps => (
                <HeaderPath {...routerProps} path="texts-text" />
              )}
            />
            <Route
              path={ROUTE_PUPILS}
              render={routerProps => (
                <HeaderPath {...routerProps} path="classes-class" />
              )}
            />
            <Route
              path={ROUTE_CATEGORIES}
              render={routerProps => (
                <HeaderPath {...routerProps} path="categories" />
              )}
            />
            <Route
              path={ROUTE_SETTINGS}
              render={routerProps => (
                <HeaderPath {...routerProps} path="settings" />
              )}
            />
            <Route
              path={ROUTE_REPORTS}
              render={routerProps => (
                <HeaderPath {...routerProps} path="reports" />
              )}
            />
            <Route
              path={ROUTE_TEXTS}
              render={routerProps => (
                <HeaderPath {...routerProps} path="texts" />
              )}
            />
            <Route
              path={ROUTE_CLASSES}
              render={routerProps => (
                <HeaderPath {...routerProps} path="classes" />
              )}
            />
          </Switch>
        </p>
      </header>
    );
  }
}

export default Header;
