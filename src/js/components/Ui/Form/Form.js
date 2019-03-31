// @flow

import * as React from 'react';
import './Form.css';

export type Props = {
  children?: React.Node,
  onSubmit?: () => boolean,
};

class Form extends React.PureComponent<Props> {
  static defaultProps: Props = {
    children: null,
  };

  props: Props;

  render() {
    return (
      <form className="Form" method="get" action="#" onSubmit={this.props.onSubmit}>
        {this.props.children}
      </form>
    );
  }
}

export default Form;
