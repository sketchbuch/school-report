// @flow

import * as React from 'react';
import './FormHeader.css';

export type Props = {
  text: string,
};

class FormHeader extends React.PureComponent<Props> {
  static defaultProps = {
    text: '',
  };

  props: Props;

  render() {
    return <h2 className="FormHeader">{this.props.text}</h2>;
  }
}

export default FormHeader;
