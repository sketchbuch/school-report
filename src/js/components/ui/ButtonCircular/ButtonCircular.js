//@flow

import * as React from 'react';
import type { ButtonType } from '../../../types/button';
import type { EventHandlerType } from '../../../types/functions';
import './ButtonCircular.css';

type Props = {
  action: string,
  buttontype?: ButtonType,
  children?: React.Node,
  className?: string,
  disabled?: boolean,
  name?: string,
  onClick?: EventHandlerType | null,
  title?: string,
  type?: string,
  visual?: boolean,
};

/**
 * A round action button.
 */
class ButtonCircular extends React.Component<Props> {
  static defaultProps = {
    buttontype: 'default',
    children: null,
    className: '',
    disabled: false,
    onClick: null,
    type: 'button',
    visual: false,
  };

  props: Props;

  render() {
    const {
      action,
      buttontype,
      children,
      className,
      disabled,
      name,
      onClick,
      title,
      type,
      visual,
    } = this.props;

    let classes = 'ButtonCircular';
    if (className && className !== '') classes += ' ' + className;
    const tagName = visual ? 'span' : 'button';

    return React.createElement(
      tagName,
      {
        className: classes,
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
