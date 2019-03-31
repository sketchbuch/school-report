//@flow

import * as React from 'react';
import './FieldWrap.css';

export type Props = {
  children?: React.Node,
};

class FieldWrap extends React.Component<Props> {
  static defaultProps = {
    children: null,
  };

  props: Props;

  render() {
    return <div className="FieldWrap">{this.props.children}</div>;
  }
}

export default FieldWrap;
