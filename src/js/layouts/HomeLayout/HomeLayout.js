// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon/Icon';
import ButtonCircular from '../../components/ui/ButtonCircular/ButtonCircular';
import type { MenuItemType } from '../../types/menuitem';
import menuItemDefault, { MenuItemFactory } from '../../types/menuitem';
import setTitle from '../../utils/title';
import './HomeLayout.css';

type Props = {};

/**
 * Home Layout.
 */
export class HomeLayout extends Component<Props> {
  props: Props;
  menuItems: Array<MenuItemType>;

  constructor(props: Props) {
    super(props);

    this.menuItems = [];
    ['classes', 'texts', 'categories', 'reports', 'settings'].forEach((item, index) => {
      this.menuItems.push(MenuItemFactory({ ...menuItemDefault, key: item }, Date.now()));
    });
  }

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
                  <ButtonCircular className="HomeLayout__icon" visual={true}>
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
