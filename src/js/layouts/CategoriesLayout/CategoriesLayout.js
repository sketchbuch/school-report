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
import NavButtonCircular from '../../components/ui/NavButtonCircular/NavButtonCircular';
import NewCategoryLayout from './New/NewCategoryLayout';
import SearchField from '../../components/ui/SearchField/SearchField';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import type { CategoryType } from '../../types/category';
import type { ReduxState } from '../../types/reduxstate';
import { ICON_ADD, ICON_DELETE } from '../../constants/icons';
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
};

type State = {
  anywhere: boolean,
  curPage: number,
  searchVisible: boolean,
  term: string,
};

export class CategoriesLayout extends React.Component<Props, State> {
  static defaultProps = {
    categories: [],
  };

  props: Props;
  state: State = {
    anywhere: false,
    curPage: 1,
    searchVisible: false,
    term: '',
  };

  componentDidMount() {
    setTitle(text('WinTitle', 'Categories'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_CATEGORIES) {
      setTitle(text('WinTitle', 'Categories'));
    }
  }

  handleSearch = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    if (event.type === 'keyup') {
      if (event.key === 'Escape') {
        this.handleSearchIconClick(event);
      }
    } else {
      const newTerm: string = event.currentTarget.value;

      if (newTerm !== this.state.term) {
        this.setState({ curPage: 1, term: newTerm });
      } else {
        this.setState({ term: newTerm });
      }
    }
  };

  handlePbChange = (curPage: number): void => {
    this.setState({ curPage });
  };

  handleSearchIconClick = (event: SyntheticEvent<EventTarget>): void => {
    const newSearchVisible: boolean = !this.state.searchVisible;

    if (newSearchVisible === false) {
      this.setState({ curPage: 1, searchVisible: newSearchVisible, term: '' });
    } else {
      this.setState({ searchVisible: newSearchVisible });
    }
  };

  handleSearchAnywhereClick = (event: SyntheticMouseEvent<HTMLElement>): void => {
    this.setState({ anywhere: !this.state.anywhere });
  };

  render() {
    const HAS_CATGEORIES: boolean = this.props.categories.length > 0 ? true : false;
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
          anywhere={this.state.anywhere}
          anywhereOnClick={this.handleSearchAnywhereClick}
          clearOnClick={this.handleSearchIconClick}
          iconOnClick={this.handleSearchIconClick}
          onKeyUp={this.handleSearch}
          onChange={this.handleSearch}
          placeholder={text('SearchPlaceholder-category', 'SidebarHeader')}
          term={this.state.term}
          visible={this.state.searchVisible}
        />
      );
    }

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader
            controlsExpanded={this.state.searchVisible}
            title={text('Header-category', 'SidebarHeader')}
            subtitle={text('Subheader-count', 'SidebarHeader', {
              COUNT: this.props.categories.length,
            })}
          >
            {searchBox}
          </SidebarHeader>
          <SidebarList
            curPage={this.state.curPage}
            dispatch={this.props.dispatch}
            items={this.props.categories}
            listType="category"
            noItemsTxt={text('Categories', 'SidebarNoItems')}
            onChange={this.handlePbChange}
            sortOrder={categorySort}
            term={this.state.term}
            termAnywhere={this.state.anywhere}
            usePb
          />
          <SidebarFooter leftActions={leftActions} rightActions={rightActions} />
        </Sidebar>
        <Switch>
          <Route
            path={ROUTE_EDIT_CATEGORY}
            render={routerProps => (
              <EditCategoryLayout {...routerProps} categories={this.props.categories} dispatch={this.props.dispatch} />
            )}
          />
          <Route
            path={ROUTE_DEL_CATEGORIES}
            render={routerProps => <DeleteCategoriesLayout {...routerProps} dispatch={this.props.dispatch} />}
          />
          <Route
            path={ROUTE_NEW_CATEGORY}
            render={routerProps => (
              <NewCategoryLayout {...routerProps} categories={this.props.categories} dispatch={this.props.dispatch} />
            )}
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

export default connect(mapStateToProps)(CategoriesLayout);
