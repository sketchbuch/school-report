// @flow

import React, { PureComponent } from 'react';
import Icon from '../../Icon/Icon';
import './Alert.css';

type Props = {
  body: string,
  icon: boolean,
  title?: string,
  type: 'info' | 'success' | 'warn' | 'error',
};

const alertIcons = {
  info: 'info-circle',
  warn: 'warning-alt',
  error: 'thumbs-down',
  success: 'thumbs-up',
};

/**
 * A message to display to the user.
 */
class Alert extends PureComponent<Props> {
  static defaultProps = {
    body: 'A body text is required',
    icon: true,
    title: '',
    type: 'success',
  };

  props: Props;

  getIcon() {
    return <Icon type={alertIcons[this.props.type]} />;
  }

  render() {
    const { body, icon, title, type } = this.props;

    const tooltip = title ? `${title} - ${body}` : body;

    return (
      <section className={'Alert Alert--' + type} title={tooltip}>
        {icon && this.getIcon()}
        {title && <h1 className="Alert__headline">{title}</h1>}
        <p className="Alert__body">{body}</p>
      </section>
    );
  }
}

export default Alert;
