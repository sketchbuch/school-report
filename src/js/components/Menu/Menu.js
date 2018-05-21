// @flow

import React, { PureComponent } from 'react';
import MenuButton from './Button/MenuButton';
import MenuPanel from './Panel/MenuPanel';
import './Menu.css';

type Props = {
};

type State = {
  open: boolean,
};


/**
* The Menu including the button.
*/
class Menu extends PureComponent<Props, State> {
  static defaultProps = {
  };

  props: Props;
  handleButtonClick: Function;
  handleItemClick: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleButtonClick(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ open: !this.state.open });
  }

  handleItemClick(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="Menu">
        <MenuButton open={this.state.open} clickHandler={this.handleButtonClick} />
        <MenuPanel open={this.state.open} clickHandler={this.handleItemClick} />
      </div>
    )
  }
}

export default Menu;
