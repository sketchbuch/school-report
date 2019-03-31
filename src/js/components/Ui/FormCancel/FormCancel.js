//@flow

import * as React from 'react';
import './FormCancel.css';

export type Props = {
  children?: React.Node,
};

class FormCancel extends React.PureComponent<Props> {
  static defaultProps = {
    children: null,
  };

  props: Props;

  render() {
    return <p className="FormCancel">{this.props.children}</p>;
  }
}

export default FormCancel;
