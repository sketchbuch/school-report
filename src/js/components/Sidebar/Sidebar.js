// @flow

import * as React from 'react';
import './Sidebar.css';

type Props = {
  children?: React.Node,
  footer: boolean,
  header: boolean,
};

/**
 * Sidebar containing the class and pupil lists
 */
class Sidebar extends React.Component<Props> {
  static defaultProps = {
    footer: true,
    header: true,
  };

  props: Props;

  render() {
    let classes = 'Sidebar';
    if (this.props.footer) classes += ' Sidebar--footer';
    if (this.props.header) classes += ' Sidebar--header';

    return <section className={classes}>{this.props.children}</section>;
  }
}

export default Sidebar;
