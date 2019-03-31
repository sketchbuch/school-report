//@flow

import * as React from 'react';
import classNames from 'classnames';
import './Field.css';

export type Props = {
  children?: React.Node,
  classes: string,
};

class Field extends React.PureComponent<Props> {
  static defaultProps = {
    children: null,
  };

  props: Props;

  render() {
    return (
      <div
        className={classNames('Field', {
          [this.props.classes]: !!this.props.classes,
        })}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Field;
