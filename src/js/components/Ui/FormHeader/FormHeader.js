// @flow

import * as React from 'react';
import './FormHeader.css';

const NS: string = 'FormHeader';

export type Props = {
  children?: React.Node,
  text?: string,
};

class FormHeader extends React.PureComponent<Props> {
  static defaultProps = {
    children: null,
  };

  props: Props;

  render() {
    return <h2 className={NS}>{this.props.text || this.props.children}</h2>;
  }
}

export default FormHeader;
