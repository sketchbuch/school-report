// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps, RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import * as categoryActions from '../../actions/categoryActions';
import DeleteCategoriesLayout from './Delete/DeleteCategoriesLayout';
import Edit from '../../components/Domain/Edit/Edit';
import Icon from '../../components/Icon/Icon';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import categoryDefault from '../../types/category';
import categorySchema from '../../validation/schemas/categories';
import type { CategoryType } from '../../types/category';
import type { ReduxState } from '../../types/reduxstate';
import type { SearchProps, WithSearchProps } from '../../hoc/withSearch';
import withSearch from '../../hoc/withSearch';
import { CategoryFactory, categorySort } from '../../types/category';
import { ICON_ADD, ICON_DELETE } from '../../constants/icons';
import { NavButtonCircular, SearchField } from '../../components/Ui';
import { getActiveCategory } from '../../utils/redux';
import { text } from '../../components/Translation/Translation';
import {
  ROUTE_DEL_CATEGORIES,
  ROUTE_EDIT_CATEGORY,
  ROUTE_NEW_CATEGORY,
  ROUTE_CATEGORIES,
} from '../../constants/routes';
import setTitle from '../../utils/title';

const getActiveId = (params: { [key: string]: string }): string => {
  return params !== undefined ? params.categoryId : '';
};

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

  getDomainRec = (params: { [key: string]: string }) => {
    return {
      ...categoryDefault,
      ...getActiveCategory(this.props.categories, getActiveId(params)),
    };
  };

  renderActionsLeft = (): React.Node => {
    return (
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
  };

  renderActionsRight = (hasCategories: boolean): React.Node => {
    return (
      <NavButtonCircular
        disabled={!hasCategories}
        to={ROUTE_DEL_CATEGORIES}
        className="SidebarFooter__action"
        buttontype="neg-rollover"
        action="delete-categories"
        title={text('CategoryDelete', 'Actions')}
      >
        <Icon type={ICON_DELETE} />
      </NavButtonCircular>
    );
  };

  renderDelete = (routerProps: RouteChildrenProps): React.Node => {
    return <DeleteCategoriesLayout {...routerProps} dispatch={this.props.dispatch} />;
  };

  renderEdit = (routerProps: RouteChildrenProps): React.Node => {
    const {
      categories,
      match: { params },
    }: Props = routerProps;

    const domainRec = this.getDomainRec(params);

    return (
      <Edit
        {...routerProps}
        actionAdd={categoryActions.add}
        actionUpdate={categoryActions.update}
        dispatch={this.props.dispatch}
        domainObjects={categories}
        domainRec={domainRec}
        domainType="category"
        editPanelHeader={text('EditCategory', 'EditPanelHeader', { CATEGORY_NAME: domainRec.getLabel() })}
        isNew={false}
        persistenceErrorMsg={text('PersistenceEditError', 'Categories')}
        persistenceSuccessMsg={text('PersistenceEdit', 'Categories')}
        redirectRoute={ROUTE_CATEGORIES}
        schema={categorySchema}
      />
    );
  };

  renderInfo = (routerProps: RouteChildrenProps): React.Node => {
    return (
      <InfoMsg {...routerProps} headine={text('Categories', 'InfoMsg')} subtext={text('CategoriesMsg', 'InfoMsg')} />
    );
  };

  renderNew = (routerProps: RouteChildrenProps): React.Node => {
    return (
      <Edit
        {...routerProps}
        actionAdd={categoryActions.add}
        actionUpdate={categoryActions.update}
        createNew={(values: CategoryType): CategoryType => {
          return CategoryFactory(values, Date.now());
        }}
        dispatch={this.props.dispatch}
        domainObjects={this.props.categories}
        domainRec={{ ...categoryDefault }}
        domainType="category"
        editPanelHeader={text('AddCategory', 'EditPanelHeader')}
        isNew
        persistenceErrorMsg={text('PersistenceNewError', 'Categories')}
        persistenceSuccessMsg={text('PersistenceNew', 'Categories')}
        redirectRoute={ROUTE_CATEGORIES}
        schema={categorySchema}
      />
    );
  };

  renderSearchBox = (hasCategories: boolean, search: SearchProps): React.Node => {
    return hasCategories ? (
      <SearchField
        anywhere={search.anywhere}
        anywhereOnClick={search.handleToggleAnywhere}
        clearOnClick={search.handleToggleVisibility}
        iconOnClick={search.handleToggleVisibility}
        onKeyUp={search.handleKeyUp}
        onChange={search.handleChange}
        placeholder={text('SearchPlaceholder-category', 'SidebarHeader')}
        term={search.term}
        visible={search.visible}
      />
    ) : null;
  };

  render() {
    const { categories, dispatch, search }: Props = this.props;
    const HAS_CATGEORIES: boolean = categories.length > 0 ? true : false;
    const leftActions: React.Node = this.renderActionsLeft();
    const rightActions: React.Node = this.renderActionsRight(HAS_CATGEORIES);
    const searchBox: React.Node = this.renderSearchBox(HAS_CATGEORIES, search);

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
            onPbChange={search.handlePageChange}
            sortOrder={categorySort}
            term={search.term}
            termAnywhere={search.anywhere}
            usePb
          />
          <SidebarFooter leftActions={leftActions} rightActions={rightActions} />
        </Sidebar>
        <Switch>
          <Route path={ROUTE_EDIT_CATEGORY} render={routerProps => this.renderEdit(routerProps)} />
          <Route path={ROUTE_DEL_CATEGORIES} render={routerProps => this.renderDelete(routerProps)} />
          <Route path={ROUTE_NEW_CATEGORY} render={routerProps => this.renderNew(routerProps)} />
          <Route path={ROUTE_CATEGORIES} render={routerProps => this.renderInfo(routerProps)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(withSearch(CategoriesLayout));
