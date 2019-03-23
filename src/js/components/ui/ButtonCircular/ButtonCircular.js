//@flow

import * as React from 'react';
import classNames from 'classnames';
import type { ButtonType } from '../../../types/button';
import './ButtonCircular.css';

export type Props = {
  action: string,
  buttontype?: ButtonType,
  children?: React.Node,
  className: string,
  disabled?: boolean,
  name?: string,
  onClick?: (event: SyntheticMouseEvent<HTMLElement>) => void,
  title?: string,
  type?: string,
  visual?: boolean,
};

class ButtonCircular extends React.Component<Props> {
  static defaultProps = {
    buttontype: 'default',
    children: null,
    className: '',
    disabled: false,
    type: 'button',
    visual: false,
  };

  props: Props;

  render() {
    const { action, buttontype, children, className, disabled, name, onClick, title, type, visual } = this.props;
    const tagName = visual ? 'span' : 'button';

    return React.createElement(
      tagName,
      {
        className: classNames('ButtonCircular', { [className]: !!className }),
        'data-action': action,
        'data-buttontype': buttontype,
        disabled: disabled,
        name: name,
        onClick: onClick,
        title: title,
        type: type,
      },
      children
    );
  }
}

export default ButtonCircular;
