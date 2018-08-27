// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import InfoMessage from '../../components/InfoMessage/InfoMessage';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import NavButtonCircular from '../../components/ui/NavButtonCircular/NavButtonCircular';
import DeleteCategoriesLayout from './Delete/DeleteCategoriesLayout';
import EditCategoryLayout from './Edit/EditCategoryLayout';
import NewCategoryLayout from './New/NewCategoryLayout';
import { text }  from '../../components/Translation/Translation';
import { categorySort } from '../../types/category';
import type { CategoryType } from '../../types/category';
import {
  ROUTE_DEL_CATEGORIES,
  ROUTE_EDIT_CATEGORY,
  ROUTE_NEW_CATEGORY,
  ROUTE_CATEGORIES,
} from '../../constants/routes';
import setTitle from '../../utils/title';

type Props = {
  categories: Array<CategoryType>,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
};


/**
* Layout for displaying catgeories.
*/
export class CategoriesLayout extends Component<Props> {
  static defaultProps = {
      categories: [],
   };

  props: Props;

  componentDidMount() {
    setTitle(text('WinTitle', 'Categories'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_CATEGORIES) setTitle(text('WinTitle', 'Categories'));
  }

  render() {
    const HAS_CATGEORIES = (this.props.categories.length > 0) ? true : false;
    const leftActions = (
      <NavButtonCircular
        to={ROUTE_NEW_CATEGORY}
        className="SidebarFooter__action"
        buttontype="pos-rollover"
        action="add-category"
        title={text('CategoryAdd', 'Actions')}
      >
        <Icon type="ui-add" />
      </NavButtonCircular>
    );
    const rightActions = (
      <NavButtonCircular
        disabled={!HAS_CATGEORIES}
        to={ROUTE_DEL_CATEGORIES}
        className="SidebarFooter__action"
        buttontype="neg-rollover"
        action="delete-categories"
        title={text('CategoryDelete', 'Actions')}
      >
        <Icon type="trash" />
      </NavButtonCircular>
    );

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader title={text('Header-category', 'SidebarHeader')} />
          <SidebarList dispatch={this.props.dispatch} listType="category" items={this.props.categories} noItemsTxt={text('Categories', 'SidebarNoItems')} sortOrder={categorySort} />
          <SidebarFooter leftActions={leftActions} rightActions={rightActions} />
        </Sidebar>
        <Switch>
          <Route path={ROUTE_EDIT_CATEGORY} render={ routerProps => <EditCategoryLayout {...routerProps} categories={this.props.categories} dispatch={this.props.dispatch} />} />
          <Route path={ROUTE_DEL_CATEGORIES} render={ routerProps => <DeleteCategoriesLayout {...routerProps} dispatch={this.props.dispatch} />} />
          <Route path={ROUTE_NEW_CATEGORY} render={ routerProps => <NewCategoryLayout {...routerProps} categories={this.props.categories} dispatch={this.props.dispatch} />} />
          <Route path={ROUTE_CATEGORIES} render={routerProps => <InfoMessage {...routerProps} headine={text('Categories', 'InfoMessage')} subtext={text('CategoriesMsg', 'InfoMessage')} /> } />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state: Object) => (
  {
    categories: state.categories
  }
);


export default connect(mapStateToProps)(CategoriesLayout);
