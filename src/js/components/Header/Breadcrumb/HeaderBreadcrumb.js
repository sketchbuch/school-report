// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import './HeaderBreadcrumb.css';

export type Props = {
  children?: React.Node,
  link?: string,
  text?: string,
};

/**
 * Header breadcrumb component.
 */
export class HeaderBreadcrumb extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <Link className="HeaderBreadcrumb" to={this.props.link}>
        {this.props.children || this.props.text}
      </Link>
    );
  }
}

export default HeaderBreadcrumb;
