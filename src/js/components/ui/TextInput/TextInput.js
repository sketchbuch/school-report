//@flow

import * as React from 'react';
import classNames from 'classnames';
import { UI_ERROR_CLASS } from '../../../constants/ui';
import './TextInput.css';

export type Props = {
  className: string,
  defaultValue?: string,
  disabled?: boolean,
  isValid?: boolean,
  maxLength?: number,
  name?: string,
  onBlur?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onChange?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onKeyUp?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  placeholder?: string,
  title?: string,
  type?: string,
  value?: string,
};

class TextInput extends React.Component<Props> {
  static defaultProps = {
    className: '',
    disabled: false,
    isValid: true,
    type: 'text',
  };

  props: Props;

  render() {
    const {
      className,
      defaultValue,
      disabled,
      isValid,
      maxLength,
      name,
      onBlur,
      onChange,
      onKeyUp,
      placeholder,
      title,
      type,
      value,
    } = this.props;

    return (
      <input
        className={classNames('TextInput', { [className]: !!className, [UI_ERROR_CLASS]: isValid })}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        maxLength={maxLength}
        onBlur={disabled ? null : onBlur}
        onKeyUp={disabled ? null : onKeyUp}
        onChange={disabled ? null : onChange}
        placeholder={placeholder}
        title={title}
        type={type}
        value={value}
      />
    );
  }
}

export default TextInput;
