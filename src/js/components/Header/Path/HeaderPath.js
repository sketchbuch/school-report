// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import HeaderBreadcrumb from '../Breadcrumb/HeaderBreadcrumb';
import { getBreadcrumbs } from '../../../utils/redux';
import type { Breadcrumb } from '../../../types/breadcrumb';
import './HeaderPath.css';

type Props = {
  breadcrumbs: Array<Breadcrumb>,
  dispatch: Function,
  location: Object,
  match: Object,
  path: string,
};

/**
* App Header path showing breadcrumb on desktop.
*/
export class HeaderPath extends Component<Props> {
  props: Props;

  render() {
    if (this.props.breadcrumbs.length > 0) {
      return (
        <Fragment>
          {this.props.breadcrumbs.map(ele => {
            return (
              <HeaderBreadcrumb {...ele} key={ele.id} />
            )
          })}
        </Fragment>
      )
    }

    return null;
  }
}

const mapStateToProps = (state: Object, props: Props) => {
  return {
    breadcrumbs: getBreadcrumbs(state, props),
  };
};


export default connect(mapStateToProps)(HeaderPath);
