// @flow

import React, { Component, Fragment } from 'react';
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';
import HeaderBreadcrumb from '../Breadcrumb/HeaderBreadcrumb';
import type { Breadcrumb } from '../../../types/breadcrumb';
import type { ReactRouterProps } from '../../../types/misc';
import type { ReduxState } from '../../../types/reduxstate';
import { getBreadcrumbs } from '../../../utils/redux';
import './HeaderPath.css';

type Props = {
  ...ReactRouterProps,
  breadcrumbs: Breadcrumb[],
  dispatch: Dispatch,
};

export class HeaderPath extends Component<Props> {
  props: Props;

  render() {
    if (this.props.breadcrumbs.length > 0) {
      return (
        <Fragment>
          {this.props.breadcrumbs.map(ele => {
            return <HeaderBreadcrumb {...ele} key={ele.id} />;
          })}
        </Fragment>
      );
    }

    return null;
  }
}

const mapStateToProps = (state: ReduxState, props: Props) => {
  return {
    breadcrumbs: getBreadcrumbs(state, props),
  };
};

export default connect(mapStateToProps)(HeaderPath);
