// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ButtonCircular } from '../../components/Ui';
import Icon from '../../components/Icon/Icon';
import menuItemDefault, { MenuItemFactory } from '../../types/menuitem';
import setTitle from '../../utils/setTitle';
import type { MenuItemType } from '../../types/menuitem';
import './HomeLayout.css';

const menuTypes: string[] = ['classes', 'texts', 'categories', 'reports', 'settings'];

export type Props = {};

export class HomeLayout extends Component<Props> {
  props: Props;
  menuItems: MenuItemType[] = menuTypes.map((mt: string) => {
    return MenuItemFactory({ ...menuItemDefault, key: mt }, Date.now());
  });

  componentDidMount() {
    setTitle('');
  }

  render() {
    return (
      <div className="Panel">
        <div className="HomeLayout">
          {this.menuItems.map(item => {
            return (
              <div key={item.id} className="HomeLayout__item">
                <Link to={item.route} className="HomeLayout__link">
                  <ButtonCircular action="start-action" className="HomeLayout__icon" visual={true}>
                    <Icon type={item.icon} />
                  </ButtonCircular>
                  <span className="HomeLayout__title">{item.label}</span>
                  <span className="HomeLayout__description">{item.description}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default HomeLayout;
