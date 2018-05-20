// @flow

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './MenuPanel.css';

type Props = {
  clickHandler: Function,
  open: boolean,
};


/**
* The slidein menu
*/
class MenuPanel extends PureComponent<Props> {
  props: Props;
  menuItems: Array<Object> = [
    {
      id: 'menu-1-classes',
      label: 'Classes',
      route: '/classes',
    },
    {
      id: 'menu-2-texts',
      label: 'Texts',
      route: '/texts',
    },
    {
      id: 'menu-3-reports',
      label: 'Reports',
      route: '/reports',
    },
  ];

  render() {
    let classes = 'MenuPanel';
    if (this.props.open) classes += ' MenuPanel--open';

    return (
      <div className={classes}>
          {this.menuItems.map(item => {
            return <div key={item.id}><Link to={item.route} onClick={this.props.clickHandler}>{item.label}</Link></div>;
          })}
      </div>
    )
  }
}

export default MenuPanel;
