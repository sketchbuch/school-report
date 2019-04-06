// @flow

import * as React from 'react';
import classNames from 'classnames';
import './FormDescription.css';

const NS: string = 'FormDescription';

export type Props = {
  children?: React.Node,
  inline: boolean,
  text?: string,
};

class FormDescription extends React.PureComponent<Props> {
  static defaultProps = {
    children: null,
    inline: false,
  };

  props: Props;

  render() {
    return (
      <p className={classNames(NS, { [NS + '--inline']: this.props.inline })}>
        {this.props.text || this.props.children}
      </p>
    );
  }
}

export default FormDescription;
