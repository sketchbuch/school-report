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
import EditClassLayout from './Edit/EditClassLayout';
import DeleteClassesLayout from './Delete/DeleteClassesLayout';
import NewClassLayout from './New/NewClassLayout';
import { text } from '../../components/Translation/Translation';
import { classSort } from '../../types/class';
import type { ClassType } from '../../types/class';
import type { PupilType } from '../../types/pupil';
import { ICON_ADD, ICON_CLOSE, ICON_DELETE } from '../../constants/icons';
import {
  ROUTE_CLASSES,
  ROUTE_DEL_CLASSES,
  ROUTE_EDIT_CLASS,
  ROUTE_NEW_CLASS,
} from '../../constants/routes';
import setTitle from '../../utils/title';

type Props = {
  classes: Array<ClassType>,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
  pupils: Array<PupilType>,
};

type State = {
  curPage: number,
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
    setTitle(text('WinTitle', 'Classes'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_CLASSES)
      setTitle(text('WinTitle', 'Classes'));
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

  /**
   * Returns the correct prop to be used as the items in the sidebar list.
   *
   * @return array The items to be rendered.
   */
  getItems() {
    let items = [...this.props.classes];
    items.forEach(
      item =>
        (item.pupilCount = this.props.pupils.filter(
          pupil => pupil.classId === item.id
        ).length)
    );

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
            usePb
          />
          <SidebarFooter
            leftActions={leftActions}
            rightActions={rightActions}
          />
        </Sidebar>
        <Switch>
          <Route
            path={ROUTE_EDIT_CLASS}
            render={routerProps => (
              <EditClassLayout
                {...routerProps}
                dispatch={this.props.dispatch}
                classes={this.props.classes}
              />
            )}
          />
          <Route
            path={ROUTE_DEL_CLASSES}
            render={routerProps => (
              <DeleteClassesLayout
                {...routerProps}
                dispatch={this.props.dispatch}
              />
            )}
          />
          <Route
            path={ROUTE_NEW_CLASS}
            render={routerProps => (
              <NewClassLayout {...routerProps} dispatch={this.props.dispatch} />
            )}
          />
          <Route
            path={ROUTE_CLASSES}
            render={routerProps => (
              <InfoMsg
                {...routerProps}
                headine={text('Classes', 'InfoMsg')}
                subtext={text('ClassesMsg', 'InfoMsg')}
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
    classes: state.classes,
    pupils: state.pupils,
  };
};

export default connect(mapStateToProps)(ClassesLayout);
