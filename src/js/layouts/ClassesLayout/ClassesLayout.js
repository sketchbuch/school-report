// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
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
import type { DomainType } from '../../types/domain';
import type { PupilType } from '../../types/pupil';
import type { ReduxState } from '../../types/reduxstate';
import { ICON_ADD, ICON_DELETE } from '../../constants/icons';
import { ROUTE_CLASSES, ROUTE_DEL_CLASSES, ROUTE_EDIT_CLASS, ROUTE_NEW_CLASS } from '../../constants/routes';
import { classSort } from '../../types/class';
import { text } from '../../components/Translation/Translation';

export type Props = {
  ...RouteComponentProps,
  classes: ClassType[],
  dispatch: Dispatch,
  pupils: PupilType[],
};

type State = {
  anywhere: boolean,
  curPage: number,
  searchVisible: boolean,
  term: string,
};

export class ClassesLayout extends React.Component<Props, State> {
  static defaultProps = {
    classes: [],
    pupils: [],
  };

  props: Props;
  state: State = {
    anywhere: false,
    curPage: 1,
    searchVisible: false,
    term: '',
  };

  componentDidMount() {
    setTitle(text('WinTitle', 'Classes'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_CLASSES) {
      setTitle(text('WinTitle', 'Classes'));
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

  getClasses(): DomainType[] {
    return this.props.classes.map(
      (item: ClassType): ClassType => {
        return {
          ...item,
          pupilCount: this.props.pupils.filter((pupil: PupilType): boolean => pupil.classId === item.id).length,
        };
      }
    );
  }

  render() {
    const HAS_CLASSES: boolean = this.props.classes.length > 0 ? true : false;
    const leftActions: React.Element<*> = (
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
    const rightActions: React.Element<*> = (
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
            items={this.getClasses()}
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

const mapStateToProps = (state: ReduxState, props: Props) => {
  return {
    classes: state.classes,
    pupils: state.pupils,
  };
};

export default connect(mapStateToProps)(ClassesLayout);
