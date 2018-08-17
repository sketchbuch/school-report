//@flow

import * as React from 'react';
import { UI_ERROR_CLASS } from '../../../constants/ui';
import type { EventHandlerType } from '../../../types/functions';
import './TextInput.css';

type Props = {
  autoFocus: boolean,
  className?: string,
  defaultValue?: string,
  disabled?: boolean,
  isValid?: boolean,
  maxLength?: number,
  name?: string,
  onBlur?: EventHandlerType | null,
  onChange?: EventHandlerType | null,
  onKeyUp?: EventHandlerType | null,
  placeholder?: string,
  title?: string,
  type?: string,
  value?: string,
};


/**
* Generic input tag.
*/
class TextInput extends React.Component<Props> {
  static defaultProps = {
    autoFocus: false,
    disabled: false,
    isValid: true,
    onBlur: null,
    onChange: null,
    onKeyUp: null,
    type: 'text',
  };

  props: Props;

  render() {
    const {
      autoFocus,
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

    let classes = 'TextInput';
    if (className) classes += ` ${className}`;
    if (isValid === false) classes += ` ${UI_ERROR_CLASS}`;

    return (
        <input
          autoFocus={autoFocus}
          className={classes}
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
    )
  }
}


export default TextInput;
