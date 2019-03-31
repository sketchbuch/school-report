//@flow

import * as React from 'react';
import classNames from 'classnames';
import './Label.css';

export type Props = {
  children?: React.Node,
  classes: string,
  htmlFor: string,
};

class Label extends React.PureComponent<Props> {
  static defaultProps = {
    children: null,
  };

  props: Props;

  render() {
    return (
      <label
        className={classNames('Label', {
          [this.props.classes]: !!this.props.classes,
        })}
        htmlFor={this.props.htmlFor}
      >
        {this.props.children}
      </label>
    );
  }
}

export default Label;
