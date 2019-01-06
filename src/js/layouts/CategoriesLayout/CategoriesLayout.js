// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import TextInput from '../../components/ui/TextInput/TextInput';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import NavButtonCircular from '../../components/ui/NavButtonCircular/NavButtonCircular';
import DeleteCategoriesLayout from './Delete/DeleteCategoriesLayout';
import EditCategoryLayout from './Edit/EditCategoryLayout';
import NewCategoryLayout from './New/NewCategoryLayout';
import { text } from '../../components/Translation/Translation';
import { categorySort } from '../../types/category';
import type { CategoryType } from '../../types/category';
import { ICON_ADD, ICON_CLOSE, ICON_DELETE } from '../../constants/icons';
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

type State = {
  curPage: number,
  term: string,
};

/**
 * Layout for displaying catgeories.
 */
export class CategoriesLayout extends Component<Props, State> {
  static defaultProps = {
    categories: [],
  };

  props: Props;
  state: State;
  handleClear: (event: SyntheticInputEvent<HTMLInputElement>) => void;
  handleSearch: (event: SyntheticInputEvent<HTMLInputElement>) => void;
  handlePbChange: (curPage: number) => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      curPage: 1,
      term: '',
    };

    this.handleClear = this.handleClear.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePbChange = this.handlePbChange.bind(this);
  }

  componentDidMount() {
    setTitle(text('WinTitle', 'Categories'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_CATEGORIES)
      setTitle(text('WinTitle', 'Categories'));
  }

  handleClear(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ term: '', curPage: 1 });
  }

  handleSearch(event: SyntheticInputEvent<HTMLInputElement>) {
    const term = event.currentTarget.value;
    this.setState({ term, curPage: 1 });
  }

  handlePbChange(curPage: number) {
    this.setState({ curPage });
  }

  render() {
    const HAS_CATGEORIES = this.props.categories.length > 0 ? true : false;
    const leftActions = (
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
    const rightActions = (
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
        <React.Fragment>
          <TextInput
            className="SidebarHeader__search"
            onChange={this.handleSearch}
            placeholder={text('SearchPlaceholder', 'SidebarHeader')}
            value={this.state.term}
          />
          <span
            className="SidebarHeader__searchclear"
            onClick={this.handleClear}
            title={text('Clear', 'ItemSelection')}
          >
            <Icon type={ICON_CLOSE} />
          </span>
        </React.Fragment>
      );
    }

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader
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
            usePb
          />
          <SidebarFooter
            leftActions={leftActions}
            rightActions={rightActions}
          />
        </Sidebar>
        <Switch>
          <Route
            path={ROUTE_EDIT_CATEGORY}
            render={routerProps => (
              <EditCategoryLayout
                {...routerProps}
                categories={this.props.categories}
                dispatch={this.props.dispatch}
              />
            )}
          />
          <Route
            path={ROUTE_DEL_CATEGORIES}
            render={routerProps => (
              <DeleteCategoriesLayout
                {...routerProps}
                dispatch={this.props.dispatch}
              />
            )}
          />
          <Route
            path={ROUTE_NEW_CATEGORY}
            render={routerProps => (
              <NewCategoryLayout
                {...routerProps}
                categories={this.props.categories}
                dispatch={this.props.dispatch}
              />
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

const mapStateToProps = (state: Object) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(CategoriesLayout);
