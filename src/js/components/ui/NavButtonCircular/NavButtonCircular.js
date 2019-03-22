//@flow

import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import type { ButtonType } from '../../../types/button';
import '../ButtonCircular/ButtonCircular.css';

export type Props = {
  action: string,
  buttontype?: ButtonType,
  children?: React.Node,
  className: string,
  disabled?: boolean,
  title?: string,
  to: string,
  type?: string,
};

/**
 * A round action react router Nav link.
 */
class NavButtonCircular extends React.Component<Props> {
  static defaultProps = {
    action: '',
    buttontype: 'default',
    children: null,
    className: '',
    disabled: false,
    title: '',
    type: 'button',
  };

  props: Props;

  render() {
    const { action, buttontype, children, className, disabled, title, to, type } = this.props;

    return (
      <Link
        className={classNames('ButtonCircular', { [className]: className !== '' })}
        data-action={action}
        data-buttontype={buttontype}
        disabled={disabled}
        title={title}
        to={to}
        type={type}
      >
        {children}
      </Link>
    );
  }
}

export default NavButtonCircular;
