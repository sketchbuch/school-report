// @flow

import * as React from 'react';
import './SidebarFooter.css';

type Props = {
  leftActions?: React.Node,
  rightActions?: React.Node,
};

/**
 * Sidebar footer controls.
 */
class SidebarFooter extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <footer className="SidebarFooter">
        <div className="SidebarFooter__actionsBox">
          <div className="SidebarFooter__actions SidebarFooter__actions--left">{this.props.leftActions}</div>
          <div className="SidebarFooter__actions SidebarFooter__actions--right">{this.props.rightActions}</div>
        </div>
      </footer>
    );
  }
}

export default SidebarFooter;
