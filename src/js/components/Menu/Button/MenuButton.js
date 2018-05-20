// @flow

import React, { PureComponent } from 'react';
import './MenuButton.css';

type Props = {
  clickHandler: Function,
  open: boolean,
};


/**
* Burger Menu Button for the main header.
*/
class MenuButton extends PureComponent<Props> {
  static defaultProps = {
    open: false,
  };

  props: Props;

  render() {
    return (
      <button className="MenuButton" data-open={this.props.open} onClick={this.props.clickHandler}>
        <span className="MenuButton__inner">
          <span />
          <span />
          <span />
        </span>
      </button>
    )
  }
}

export default MenuButton;
