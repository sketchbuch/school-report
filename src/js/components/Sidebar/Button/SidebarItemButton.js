// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as H from 'history';
import ButtonCircular from '../../ui/ButtonCircular/ButtonCircular';
import Icon from '../../Icon/Icon';
import type { ButtonType } from '../../../types/button';
import './SidebarItemButton.css';

type Props = {
  action: string,
  handleClick?: Function,
  history: H.History,
  icon: string,
  link?: string,
  title: string,
  type: ButtonType,
};

class SidebarItemButton extends Component<Props> {
  props: Props;
  handleClick: Function;

  constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: SyntheticInputEvent<HTMLInputElement>) {
    event.preventDefault();
    this.props.history.push(this.props.link);
  }

  render() {
    return (
      <ButtonCircular
        action={this.props.action}
        buttontype={this.props.type}
        className="SidebarItemButton"
        onClick={this.props.handleClick || this.handleClick}
        title={this.props.title}
      >
        <Icon type={this.props.icon} />
      </ButtonCircular>
    );
  }
}

export default withRouter(SidebarItemButton);
