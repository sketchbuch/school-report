// @flow

import React, { PureComponent } from 'react';
import './SidebarHeader.css';

type Props = {
  title: string,
  search: boolean,
  sort: boolean,
};


/**
* Sidebar header.
*/
class SidebarHeader extends PureComponent<Props> {
  static defaultProps = {
      title: '',
      search: true,
      sort: true,
   };

  props: Props;
  
  render() {
    return (
      <header className="SidebarHeader">
        <h1 className="SidebarHeader__headline">{this.props.title}</h1>
      </header>
    )
  }
}

export default SidebarHeader;
