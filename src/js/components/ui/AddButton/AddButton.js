//@flow

import * as React from 'react';
import Icon from '../../Icon/Icon';
import './AddButton.css';

type Props = {
  busy: boolean,
  buttontype?: 'default' | 'warning',
  children?: React.Node,
  className?: string,
  disabled?: boolean,
  name?: string,
  onClick: Function,
  title?: string,
  type?: string,
};

/**
* A button.
*/
class AddButton extends React.Component<Props> {
  static defaultProps = {
    busy: false,
    buttontype: 'default',
    children: null,
    className: '',
    disabled: false,
    name: '',
    onClick: ()=>{},
    title: '',
    type: 'button',
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
    return (
      <button
        className="AddButton"
        disabled={this.props.disabled}
        data-buttontype={this.props.buttontype}
        onClick={this.onClick}
        title={this.props.title}
        type={this.props.type}
      >
        {this.props.children}{this.props.busy && <Icon type="refresh" />}
      </button>
    )
  }
}


export default AddButton;
