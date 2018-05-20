//@flow

import * as React from 'react';
import './Textarea.css';

type Props = {
  className?: string,
  disabled?: boolean,
  isValid?: boolean,
  name?: string,
  onBlur?: Function,
  onChange?: Function,
  placeholder?: string,
  title?: string,
  value?: string,
};


/**
* Textarea tag.
*/
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
    let classes = 'Textarea';
    if (this.props.className && this.props.className !== '') classes += ' ' + this.props.className;
    if (this.props.isValid === false) classes += ' has--error';

    return (
        <textarea
          className={classes}
          disabled={this.props.disabled}
          onBlur={this.props.disabled ? null : this.props.onBlur}
          onChange={this.props.disabled ? null : this.props.onChange}
          name={this.props.name}
          placeholder={this.props.placeholder}
          title={this.props.title}
          value={this.props.value}
        />
    )
  }
}


export default Textarea;
