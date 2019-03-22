// @flow

import * as React from 'react';
import './NoItems.css';

export type Props = {
  children?: React.Node,
  message?: string,
};

/**
 * Displayed instead of a list when there are no items.
 */
class NoItems extends React.PureComponent<Props> {
  static defaultProps = {
    message: '',
  };

  props: Props;

  render() {
    if (!this.props.message && !this.props.children) {
      return null;
    }
    return <p className="NoItems">{this.props.message || this.props.children}</p>;
  }
}

export default NoItems;
