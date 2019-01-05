// @flow

import * as React from 'react';
import './SidebarSubheader.css';

type Props = {
  children?: React.Node,
};


/**
* Sidebar subheader.
*/
class SidebarSubheader extends React.Component<Props> {
  static defaultProps = {
      children: null,
   };

  props: Props;
  
  render() {
    return (
      <div className="SidebarSubheader">
        {this.props.children}
      </div>
    )
  }
}

export default SidebarSubheader;
