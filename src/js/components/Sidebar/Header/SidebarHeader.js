// @flow

import * as React from 'react';
import classNames from 'classnames';
import './SidebarHeader.css';

type Props = {
  children?: React.Node,
  controlsExpanded: boolean,
  subtitle: string,
  title: string,
};

/**
 * Sidebar header.
 */
class SidebarHeader extends React.PureComponent<Props> {
  static defaultProps = {
    children: null,
    controlsExpanded: false,
    subtitle: '',
    title: '',
  };

  props: Props;

  render() {
    const { children, controlsExpanded, subtitle, title } = this.props;

    return (
      <header
        className={classNames('SidebarHeader', {
          'SidebarHeader--controlsExpanded': controlsExpanded,
        })}
      >
        <h1 className="SidebarHeader__headline">
          {title}
          {subtitle && <span className="SidebarHeader__subheadline">{subtitle}</span>}
        </h1>
        {children && <div className="SidebarHeader__controls">{children}</div>}
      </header>
    );
  }
}

export default SidebarHeader;
