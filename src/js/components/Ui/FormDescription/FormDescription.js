// @flow

import * as React from 'react';
import './FormDescription.css';

export type Props = {
  text: string,
};

class FormDescription extends React.PureComponent<Props> {
  static defaultProps = {
    text: '',
  };

  props: Props;

  render() {
    return <p className="FormDescription">{this.props.text}</p>;
  }
}

export default FormDescription;
