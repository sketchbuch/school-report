// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import DeleteCategoriesLayout from './Delete/DeleteCategoriesLayout';
import EditCategoryLayout from './Edit/EditCategoryLayout';
import Icon from '../../components/Icon/Icon';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import NewCategoryLayout from './New/NewCategoryLayout';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import type { CategoryType } from '../../types/category';
import type { ReduxState } from '../../types/reduxstate';
import type { WithSearchProps } from '../../hoc/withSearch';
import withSearch from '../../hoc/withSearch';
import { ICON_ADD, ICON_DELETE } from '../../constants/icons';
import { NavButtonCircular, SearchField } from '../../components/Ui';
import { categorySort } from '../../types/category';
import { text } from '../../components/Translation/Translation';
import {
  ROUTE_DEL_CATEGORIES,
  ROUTE_EDIT_CATEGORY,
  ROUTE_NEW_CATEGORY,
  ROUTE_CATEGORIES,
} from '../../constants/routes';
import setTitle from '../../utils/title';

export type Props = {
  ...RouteComponentProps,
  categories: CategoryType[],
  dispatch: Dispatch,
} & WithSearchProps;

export class CategoriesLayout extends React.Component<Props> {
  static defaultProps = {
    categories: [],
  };

  props: Props;

  componentDidMount() {
    setTitle(text('WinTitle', 'Categories'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_CATEGORIES) {
      setTitle(text('WinTitle', 'Categories'));
    }
  }

  render() {
    const { categories, dispatch, search } = this.props;
    const HAS_CATGEORIES: boolean = categories.length > 0 ? true : false;
    const leftActions: React.Element<*> = (
      <NavButtonCircular
        to={ROUTE_NEW_CATEGORY}
        className="SidebarFooter__action"
        buttontype="pos-rollover"
        action="add-category"
        title={text('CategoryAdd', 'Actions')}
      >
        <Icon type={ICON_ADD} />
      </NavButtonCircular>
    );
    const rightActions: React.Element<*> = (
      <NavButtonCircular
        disabled={!HAS_CATGEORIES}
        to={ROUTE_DEL_CATEGORIES}
        className="SidebarFooter__action"
        buttontype="neg-rollover"
        action="delete-categories"
        title={text('CategoryDelete', 'Actions')}
      >
        <Icon type={ICON_DELETE} />
      </NavButtonCircular>
    );
    let searchBox = null;

    if (HAS_CATGEORIES) {
      searchBox = (
        <SearchField
          anywhere={search.anywhere}
          anywhereOnClick={search.anywhereIconClick}
          clearOnClick={search.searchIconClick}
          iconOnClick={search.searchIconClick}
          onKeyUp={search.searchChange}
          onChange={search.searchChange}
          placeholder={text('SearchPlaceholder-category', 'SidebarHeader')}
          term={search.term}
          visible={search.searchVisible}
        />
      );
    }

    console.log('page', search.page);

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader
            controlsExpanded={search.visible}
            title={text('Header-category', 'SidebarHeader')}
            subtitle={text('Subheader-count', 'SidebarHeader', {
              COUNT: categories.length,
            })}
          >
            {searchBox}
          </SidebarHeader>
          <SidebarList
            curPage={search.page}
            dispatch={dispatch}
            items={categories}
            listType="category"
            noItemsTxt={text('Categories', 'SidebarNoItems')}
            onPbChange={search.pageChange}
            sortOrder={categorySort}
            term={search.term}
            termAnywhere={search.anywhere}
            usePb
          />
          <SidebarFooter leftActions={leftActions} rightActions={rightActions} />
        </Sidebar>
        <Switch>
          <Route
            path={ROUTE_EDIT_CATEGORY}
            render={routerProps => <EditCategoryLayout {...routerProps} categories={categories} dispatch={dispatch} />}
          />
          <Route
            path={ROUTE_DEL_CATEGORIES}
            render={routerProps => <DeleteCategoriesLayout {...routerProps} dispatch={dispatch} />}
          />
          <Route
            path={ROUTE_NEW_CATEGORY}
            render={routerProps => <NewCategoryLayout {...routerProps} categories={categories} dispatch={dispatch} />}
          />
          <Route
            path={ROUTE_CATEGORIES}
            render={routerProps => (
              <InfoMsg
                {...routerProps}
                headine={text('Categories', 'InfoMsg')}
                subtext={text('CategoriesMsg', 'InfoMsg')}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(withSearch(CategoriesLayout));
