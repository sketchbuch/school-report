// @flow

import * as React from 'react';
import classNames from 'classnames';
import './Form.css';

export type Props = {
  children?: React.Node,
  classes: string,
  onSubmit?: () => boolean,
};

class Form extends React.PureComponent<Props> {
  static defaultProps: Props = {
    children: null,
    classes: '',
  };

  props: Props;

  render() {
    return (
      <form
        className={classNames('Form', { [this.props.classes]: !!this.props.classes })}
        method="get"
        action="#"
        onSubmit={this.props.onSubmit}
      >
        {this.props.children}
      </form>
    );
  }
}

export default Form;
