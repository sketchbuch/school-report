// @flow

import React, { Component } from 'react';
import type { Element } from 'react';

type Props = {
  children?: Element<any>,
};

type State = {
  hasError: boolean,
};


/**
* A React 16 Error Boundary.
*/
class ErrorBoundary extends Component<Props, State> {
  props: Props;
  state: State = {
    hasError: false,
  };

  componentDidCatch(error: Object, info: Object) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <p style={{ color: 'red' }}>Something went wrong.</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
