// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps, RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import * as categoryActions from '../../actions/categoryActions';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import categorySchema from '../../validation/schemas/categories';
import getDomainRec from '../../utils/domain';
import type { CategoryType } from '../../types/category';
import type { ReduxState } from '../../types/reduxstate';
import type { WithSearchProps } from '../../hoc/withSearch';
import withSearch from '../../hoc/withSearch';
import { ActionButton, Delete, Edit, SearchBox } from '../../components/Domain';
import categoryDefault, { CategoryFactory, categorySort } from '../../types/category';
import { text } from '../../components/Translation/Translation';
import {
  ROUTE_DEL_CATEGORIES,
  ROUTE_EDIT_CATEGORY,
  ROUTE_NEW_CATEGORY,
  ROUTE_CATEGORIES,
} from '../../constants/routes';
import setLayoutTitle from '../../utils/setLayoutTitle';

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
    setLayoutTitle(text('WinTitle', 'Categories'));
  }

  componentDidUpdate() {
    setLayoutTitle(text('WinTitle', 'Categories'), ROUTE_CATEGORIES);
  }

  renderActionsLeft = (): React.Node => {
    return (
      <ActionButton domainType="category" title={text('CategoryAdd', 'Actions')} to={ROUTE_NEW_CATEGORY} type="add" />
    );
  };

  renderActionsRight = (disabled: boolean): React.Node => {
    return (
      <ActionButton
        disabled={!disabled}
        domainType="category"
        title={text('CategoryDelete', 'Actions')}
        to={ROUTE_DEL_CATEGORIES}
        type="delete"
      />
    );
  };

  renderDelete = (routerProps: RouteChildrenProps): React.Node => {
    return (
      <Delete
        {...routerProps}
        butCancelLabel={text('BackToCategories', 'Categories')}
        butDeleteLabel={text('BtnLabel', 'DeleteCategoriesLayout')}
        dispatch={this.props.dispatch}
        domainType="category"
        editPanelTitle={text('DeleteCategories', 'EditPanelHeader')}
        formHeadline={text('Headline', 'DeleteCategoriesLayout')}
        formHeadlineDeleting={text('HeadlineDeleting', 'DeleteCategoriesLayout')}
        persistenceErrorMsg={text('PersistenceError', 'Categories')}
        persistenceSuccessMsg={text('PersistenceDeleted', 'Categories')}
        redirectRoute={ROUTE_CATEGORIES}
      />
    );
  };

  renderEdit = (routerProps: RouteChildrenProps): React.Node => {
    const {
      match: { params },
    }: RouteChildrenProps = routerProps;
    const { categories }: Props = this.props;
    const domainRec = getDomainRec(categoryDefault, categories, params, 'categoryId');

    return (
      <Edit
        {...routerProps}
        actionAdd={categoryActions.add}
        actionUpdate={categoryActions.update}
        dispatch={this.props.dispatch}
        domainObjects={categories}
        domainRec={domainRec}
        domainType="category"
        editPanelTitle={text('EditCategory', 'EditPanelHeader', { CATEGORY_NAME: domainRec.getLabel() })}
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
        editPanelTitle={text('AddCategory', 'EditPanelHeader')}
        isNew
        persistenceErrorMsg={text('PersistenceNewError', 'Categories')}
        persistenceSuccessMsg={text('PersistenceNew', 'Categories')}
        redirectRoute={ROUTE_CATEGORIES}
        schema={categorySchema}
      />
    );
  };

  render() {
    const { categories, dispatch, search }: Props = this.props;
    const HAS_CATGEORIES: boolean = categories.length > 0 ? true : false;
    const leftActions: React.Node = this.renderActionsLeft();
    const rightActions: React.Node = this.renderActionsRight(HAS_CATGEORIES);

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
            <SearchBox domainType="category" hasSearch={HAS_CATGEORIES} search={search} />
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
