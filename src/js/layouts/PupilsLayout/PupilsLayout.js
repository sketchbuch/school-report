// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import DeletePupilsLayout from './Delete/DeletePupilsLayout';
import EditPupilLayout from './Edit/EditPupilLayout';
import Icon from '../../components/Icon/Icon';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import NavButtonCircular from '../../components/ui/NavButtonCircular/NavButtonCircular';
import NewPupilLayout from './New/NewPupilLayout';
import SearchField from '../../components/ui/SearchField/SearchField';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import setTitle from '../../utils/title';
import type { ClassType } from '../../types/class';
import type { PupilSortOptions, PupilType } from '../../types/pupil';
import { ICON_ADD, ICON_DELETE } from '../../constants/icons';
import { ROUTE_DEL_PUPILS, ROUTE_EDIT_PUPIL, ROUTE_NEW_PUPIL, ROUTE_PUPILS } from '../../constants/routes';
import { getActiveClass, getClassPupils } from '../../utils/redux';
import { pupilSort } from '../../types/pupil';
import { text } from '../../components/Translation/Translation';

type Props = {
  activeClass: ClassType | Object,
  dispatch: Function,
  location: Object,
  match: Object,
  pupilsSort: PupilSortOptions,
  pupils: Array<PupilType>,
};

type State = {
  anywhere: boolean,
  curPage: number,
  searchVisible: boolean,
  term: string,
};

/**
 * Layout for displaying pupils.
 */
export class PupilsLayout extends Component<Props, State> {
  static defaultProps = {
    activeClass: {},
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
    setTitle(text('WinTitle', 'Pupils', { CLASS_NAME: this.getClassLabel() }));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_PUPILS.replace(':classId', this.props.match.params.classId)) {
      setTitle(text('WinTitle', 'Pupils', { CLASS_NAME: this.getClassLabel() }));
    }
  }

  handleSearch(event: SyntheticInputEvent<HTMLInputElement>) {
    const term = event.currentTarget.value;

    if (event.type === 'keyup') {
      if (event.key === 'Escape' || term === '') {
        this.handleSearchIconClick(event);
      }
    } else {
      const newState = { term };
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
   * Returns the class name or id if not found.
   *
   * @return string
   */
  getClassLabel(): string {
    return this.props.activeClass.label !== undefined ? this.props.activeClass.label : this.props.match.params.classId;
  }

  render() {
    const HAS_PUPILS = this.props.pupils.length > 0 ? true : false;
    const leftActions = (
      <NavButtonCircular
        to={ROUTE_NEW_PUPIL.replace(':classId', this.props.match.params.classId)}
        className="SidebarFooter__action"
        buttontype="pos-rollover"
        action="add-pupil"
        title={text('PupilAdd', 'Actions')}
      >
        <Icon type={ICON_ADD} />
      </NavButtonCircular>
    );
    const rightActions = (
      <NavButtonCircular
        disabled={!HAS_PUPILS}
        to={ROUTE_DEL_PUPILS.replace(':classId', this.props.match.params.classId)}
        className="SidebarFooter__action"
        buttontype="neg-rollover"
        action="delete-pupils"
        title={text('PupilDelete', 'Actions')}
      >
        <Icon type={ICON_DELETE} />
      </NavButtonCircular>
    );
    let searchBox = null;

    if (HAS_PUPILS) {
      searchBox = (
        <SearchField
          anywhere={this.state.anywhere}
          anywhereOnClick={this.handleSearchAnywhereClick}
          clearOnClick={this.handleSearchIconClick}
          iconOnClick={this.handleSearchIconClick}
          onKeyUp={this.handleSearch}
          onChange={this.handleSearch}
          placeholder={text('SearchPlaceholder-pupil', 'SidebarHeader')}
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
            title={text('Header-pupil', 'SidebarHeader')}
            subtitle={text('Subheader-count', 'SidebarHeader', {
              COUNT: this.props.pupils.length,
            })}
          >
            {searchBox}
          </SidebarHeader>
          <SidebarList
            curPage={this.state.curPage}
            dispatch={this.props.dispatch}
            items={this.props.pupils}
            listType="pupil"
            noItemsTxt={text('Pupils', 'SidebarNoItems')}
            onChange={this.handlePbChange}
            sortOrder={pupilSort[this.props.pupilsSort]}
            term={this.state.term}
            termAnywhere={this.state.anywhere}
            usePb
          />
          <SidebarFooter leftActions={leftActions} rightActions={rightActions} />
        </Sidebar>
        <Switch>
          <Route
            path={ROUTE_EDIT_PUPIL}
            render={routerProps => (
              <EditPupilLayout
                {...routerProps}
                dispatch={this.props.dispatch}
                pupils={this.props.pupils}
                sortOrder={pupilSort[this.props.pupilsSort]}
                activeClass={this.props.activeClass}
              />
            )}
          />
          <Route
            path={ROUTE_DEL_PUPILS}
            render={routerProps => (
              <DeletePupilsLayout
                {...routerProps}
                dispatch={this.props.dispatch}
                pupils={this.props.pupils}
                activeClass={this.props.activeClass}
              />
            )}
          />
          <Route
            path={ROUTE_NEW_PUPIL}
            render={routerProps => (
              <NewPupilLayout
                {...routerProps}
                dispatch={this.props.dispatch}
                pupils={this.props.pupils}
                activeClass={this.props.activeClass}
              />
            )}
          />
          <Route
            path={ROUTE_PUPILS}
            render={routerProps => (
              <InfoMsg
                {...routerProps}
                headine={text('Pupils', 'InfoMsg', {
                  CLASS_NAME: this.getClassLabel(),
                })}
                subtext={text('PupilsMsg', 'InfoMsg', {
                  CLASS_NAME: this.getClassLabel(),
                })}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: Object, props: Props) => {
  return {
    activeClass: getActiveClass(state.classes, props.match.params.classId),
    pupils: getClassPupils(state.pupils, props.match.params.classId),
    pupilsSort: state.settings.pupilsSort,
  };
};

export default connect(mapStateToProps)(PupilsLayout);
