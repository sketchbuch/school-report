//@flow

import * as React from 'react';
import classNames from 'classnames';
import './Textarea.css';

export type Props = {
  className: string,
  disabled?: boolean,
  isValid?: boolean,
  name?: string,
  onBlur?: Function,
  onChange?: Function,
  placeholder?: string,
  title?: string,
  value?: string,
};

class Textarea extends React.Component<Props> {
  static defaultProps = {
    className: '',
    disabled: false,
    isValid: true,
    name: '',
    onBlur: null,
    onChange: null,
    placeholder: '',
    title: '',
    value: '',
  };

  props: Props;

  render() {
    const { className, disabled, isValid, name, onBlur, onChange, placeholder, title, value } = this.props;

    return (
      <textarea
        className={classNames('Textarea', { [className]: !!className, 'has--error': !isValid })}
        disabled={disabled}
        onBlur={disabled ? null : onBlur}
        onChange={disabled ? null : onChange}
        name={name}
        placeholder={placeholder}
        title={title}
        value={value}
      />
    );
  }
}

export default Textarea;
