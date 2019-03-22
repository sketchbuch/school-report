// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import HeaderBreadcrumb from '../Breadcrumb/HeaderBreadcrumb';
import type { BreadcrumbProps } from '../../../types/breadcrumb';
import type { ReduxState } from '../../../types/reduxstate';
import { getBreadcrumbs } from '../../../utils/redux';
import './HeaderPath.css';

export type Props = {
  ...BreadcrumbProps,
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
