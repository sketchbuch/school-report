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
  refProp?: React.ElementRef<any>,
  title?: string,
  value?: string,
};

class Textarea extends React.PureComponent<Props> {
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
    const { className, disabled, isValid, name, onBlur, onChange, placeholder, refProp, title, value } = this.props;

    return (
      <textarea
        className={classNames('Textarea', { [className]: !!className, 'has--error': !isValid })}
        disabled={disabled}
        onBlur={disabled ? null : onBlur}
        onChange={disabled ? null : onChange}
        name={name}
        placeholder={placeholder}
        ref={refProp}
        title={title}
        value={value}
      />
    );
  }
}

export default Textarea;
