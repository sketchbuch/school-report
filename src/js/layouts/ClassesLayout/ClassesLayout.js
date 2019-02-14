// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import DeleteClassesLayout from './Delete/DeleteClassesLayout';
import EditClassLayout from './Edit/EditClassLayout';
import Icon from '../../components/Icon/Icon';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import NavButtonCircular from '../../components/ui/NavButtonCircular/NavButtonCircular';
import NewClassLayout from './New/NewClassLayout';
import SearchField from '../../components/ui/SearchField/SearchField';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import setTitle from '../../utils/title';
import type { ClassType } from '../../types/class';
import type { PupilType } from '../../types/pupil';
import { ICON_ADD, ICON_DELETE } from '../../constants/icons';
import { ROUTE_CLASSES, ROUTE_DEL_CLASSES, ROUTE_EDIT_CLASS, ROUTE_NEW_CLASS } from '../../constants/routes';
import { classSort } from '../../types/class';
import { text } from '../../components/Translation/Translation';

type Props = {
  classes: Array<ClassType>,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
  pupils: Array<PupilType>,
};

type State = {
  anywhere: boolean,
  curPage: number,
  searchVisible: boolean,
  term: string,
};

/**
 * Layout for displaying classes.
 */
export class ClassesLayout extends Component<Props, State> {
  static defaultProps = {
    classes: [],
    pupils: [],
  };

  props: Props;
  state: State;
  handlePbChange: (curPage: number) => void;
  handleSearch: (event: SyntheticInputEvent<HTMLInputElement>) => void;
  handleSearchAnywhereClick: (event: SyntheticEvent<MouseEvent>) => void;
  handleSearchIconClick: (event: SyntheticEvent<MouseEvent>) => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      anywhere: false,
      curPage: 1,
      searchVisible: false,
      term: '',
    };

    this.handlePbChange = this.handlePbChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchAnywhereClick = this.handleSearchAnywhereClick.bind(this);
    this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
  }

  componentDidMount() {
    setTitle(text('WinTitle', 'Classes'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_CLASSES) {
      setTitle(text('WinTitle', 'Classes'));
    }
  }

  handleSearch(event: SyntheticInputEvent<HTMLInputElement>) {
    if (event.type === 'keyup') {
      if (event.key === 'Escape') {
        this.handleSearchIconClick(event);
      }
    } else {
      const newState = { term: event.currentTarget.value };
      if (newState.term !== this.state.term) {
        newState.curPage = 1;
      }

      this.setState(newState);
    }
  }

  handlePbChange(curPage: number) {
    this.setState({ curPage });
  }

  handleSearchIconClick(event: SyntheticEvent<MouseEvent>) {
    const newState = { searchVisible: !this.state.searchVisible };
    if (newState.searchVisible === false) {
      newState.term = '';
      newState.curPage = 1;
    }

    this.setState(newState);
  }

  handleSearchAnywhereClick(event: SyntheticEvent<MouseEvent>) {
    this.setState({ anywhere: !this.state.anywhere });
  }

  /**
   * Returns the correct prop to be used as the items in the sidebar list.
   *
   * @return array The items to be rendered.
   */
  getItems() {
    let items = [...this.props.classes];
    items.forEach(item => (item.pupilCount = this.props.pupils.filter(pupil => pupil.classId === item.id).length));

    return items;
  }

  render() {
    const HAS_CLASSES = this.props.classes.length > 0 ? true : false;
    const leftActions = (
      <NavButtonCircular
        to={ROUTE_NEW_CLASS}
        className="SidebarFooter__action"
        buttontype="pos-rollover"
        action="add-class"
        title={text('ClassAdd', 'Actions')}
      >
        <Icon type={ICON_ADD} />
      </NavButtonCircular>
    );
    const rightActions = (
      <NavButtonCircular
        disabled={!HAS_CLASSES}
        to={ROUTE_DEL_CLASSES}
        className="SidebarFooter__action"
        buttontype="neg-rollover"
        action="delete-classes"
        title={text('ClassDelete', 'Actions')}
      >
        <Icon type={ICON_DELETE} />
      </NavButtonCircular>
    );
    let searchBox = null;

    if (HAS_CLASSES) {
      searchBox = (
        <SearchField
          anywhere={this.state.anywhere}
          anywhereOnClick={this.handleSearchAnywhereClick}
          clearOnClick={this.handleSearchIconClick}
          iconOnClick={this.handleSearchIconClick}
          onKeyUp={this.handleSearch}
          onChange={this.handleSearch}
          placeholder={text('SearchPlaceholder-class', 'SidebarHeader')}
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
            title={text('Header-class', 'SidebarHeader')}
            subtitle={text('Subheader-count', 'SidebarHeader', {
              COUNT: this.props.classes.length,
            })}
          >
            {searchBox}
          </SidebarHeader>
          <SidebarList
            curPage={this.state.curPage}
            dispatch={this.props.dispatch}
            items={this.getItems()}
            listType="class"
            noItemsTxt={text('Classes', 'SidebarNoItems')}
            onChange={this.handlePbChange}
            sortOrder={classSort}
            term={this.state.term}
            termAnywhere={this.state.anywhere}
            usePb
          />
          <SidebarFooter leftActions={leftActions} rightActions={rightActions} />
        </Sidebar>
        <Switch>
          <Route
            path={ROUTE_EDIT_CLASS}
            render={routerProps => (
              <EditClassLayout {...routerProps} dispatch={this.props.dispatch} classes={this.props.classes} />
            )}
          />
          <Route
            path={ROUTE_DEL_CLASSES}
            render={routerProps => <DeleteClassesLayout {...routerProps} dispatch={this.props.dispatch} />}
          />
          <Route
            path={ROUTE_NEW_CLASS}
            render={routerProps => <NewClassLayout {...routerProps} dispatch={this.props.dispatch} />}
          />
          <Route
            path={ROUTE_CLASSES}
            render={routerProps => (
              <InfoMsg {...routerProps} headine={text('Classes', 'InfoMsg')} subtext={text('ClassesMsg', 'InfoMsg')} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: Object, props: Props) => {
  return {
    classes: state.classes,
    pupils: state.pupils,
  };
};

export default connect(mapStateToProps)(ClassesLayout);
