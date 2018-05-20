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

  getActions() {
    let actions = [];

    //if (this.props.search) actions.push(<span className="SidebarHeader__action" data-action="search">S1</span>);
    //if (this.props.sort) actions.push(<span className="SidebarHeader__action" data-action="sort">S2</span>);

    return actions;
  }

  render() {
    return (
      <header className="SidebarHeader">
        <h1 className="SidebarHeader__headline">{this.props.title}</h1>
      </header>
    )
  }
}

export default SidebarHeader;
