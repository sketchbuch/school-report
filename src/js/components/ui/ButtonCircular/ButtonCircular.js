//@flow

import * as React from 'react';
import type { ButtonType } from '../../../types/button';
import './ButtonCircular.css';

type Props = {
  action: string,
  buttontype: ButtonType,
  children?: React.Node,
  className?: string,
  disabled?: boolean,
  name?: string,
  onClick: Function,
  title?: string,
  type?: string,
  visual?: boolean,
};


/**
* A round action button.
*/
class ButtonCircular extends React.Component<Props> {
  static defaultProps = {
    action: '',
    buttontype: 'default',
    children: null,
    className: '',
    disabled: false,
    name: '',
    onClick: ()=>{},
    title: '',
    type: 'button',
    visual: false,
  };

  props: Props;
  onClick: Function;

  constructor(props: Object) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event: SyntheticInputEvent<HTMLInputElement>) {
    if (this.props.disabled) {
      event.preventDefault();
    } else {
      this.props.onClick(event);
    }
  }

  render() {
    const {
      action,
      buttontype,
      children,
      className,
      disabled,
      name,
      title,
      type,
      visual,
    } = this.props;

    let classes = 'ButtonCircular';
    if (className && className !== '') classes += ' ' + className;
    const tagName = (visual) ? 'span' : 'button';

    return React.createElement(tagName, {
      className: classes,
      "data-action": action,
      "data-buttontype": buttontype,
      disabled: disabled,
      name: name,
      onClick: this.onClick,
      title: title,
      type: type,
    }, children);
  }
}


export default ButtonCircular;
