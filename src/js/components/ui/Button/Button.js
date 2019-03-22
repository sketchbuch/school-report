//@flow

import * as React from 'react';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import type { EventHandlerType } from '../../../types/functions';
import { ICON_BUSY } from '../../../constants/icons';
import './Button.css';

export type Props = {
  busy: boolean,
  buttontype?: 'default' | 'warning',
  children?: React.Node,
  className: string,
  disabled?: boolean,
  name?: string,
  onClick?: EventHandlerType | null,
  title?: string,
  type?: string,
};

class Button extends React.Component<Props> {
  static defaultProps = {
    busy: false,
    buttontype: 'default',
    children: null,
    className: '',
    disabled: false,
    onClick: null,
    type: 'button',
  };

  props: Props;

  render() {
    const { buttontype, className, children, disabled, busy, name, onClick, title, type } = this.props;

    return (
      <button
        className={classNames('Button', { [className]: className !== '' })}
        data-buttontype={buttontype}
        disabled={disabled}
        name={name}
        onClick={onClick}
        title={title}
        type={type}
      >
        {children}
        {busy && (
          <span className="Button__busy">
            <Icon type={ICON_BUSY} />
          </span>
        )}
      </button>
    );
  }
}

export default Button;
