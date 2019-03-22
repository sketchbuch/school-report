// @flow

import React, { Component } from 'react';
import Icon from '../../Icon/Icon';
import { ICON_BRAND } from '../../../constants/icons';
import { text } from '../../Translation/Translation';
import './HeaderTitle.css';

type Props = {
  appName?: string,
  icon: string,
};

export class HeaderTitle extends Component<Props> {
  static defaultProps = {
    appName: '',
    icon: ICON_BRAND,
  };

  props: Props;
  appName: string;

  constructor(props: Props) {
    super(props);

    this.appName = text('Name', 'App');
    if (this.appName.substr(0, 1) === '?') {
      this.appName = window.reportr.appName;
    }
  }

  render() {
    return (
      <span className="HeaderTitle">
        <span className="HeaderTitle_icon">
          <Icon type={this.props.icon} />
        </span>
        <span className="HeaderTitle_text">{this.props.appName || this.appName}</span>
      </span>
    );
  }
}

export default HeaderTitle;
