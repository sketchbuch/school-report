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
import NewClassLayout from './New/NewClassLayout';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import setTitle from '../../utils/title';
import type { ClassType } from '../../types/class';
import type { DomainType } from '../../types/domain';
import type { PupilType } from '../../types/pupil';
import type { ReduxState } from '../../types/reduxstate';
import type { WithSearchProps } from '../../hoc/withSearch';
import withSearch from '../../hoc/withSearch';
import { ICON_ADD, ICON_DELETE } from '../../constants/icons';
import { NavButtonCircular, SearchField } from '../../components/Ui';
import { ROUTE_CLASSES, ROUTE_DEL_CLASSES, ROUTE_EDIT_CLASS, ROUTE_NEW_CLASS } from '../../constants/routes';
import { classSort } from '../../types/class';
import { text } from '../../components/Translation/Translation';

export type Props = {
  ...RouteComponentProps,
  classes: ClassType[],
  dispatch: Dispatch,
  pupils: PupilType[],
} & WithSearchProps;

export class ClassesLayout extends React.Component<Props> {
  static defaultProps = {
    classes: [],
    pupils: [],
  };

  props: Props;

  componentDidMount() {
    setTitle(text('WinTitle', 'Classes'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_CLASSES) {
      setTitle(text('WinTitle', 'Classes'));
    }
  }

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
    const { classes, dispatch, search } = this.props;
    const HAS_CLASSES: boolean = classes.length > 0 ? true : false;
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
          anywhere={search.anywhere}
          anywhereOnClick={search.anywhereIconClick}
          clearOnClick={search.searchIconClick}
          iconOnClick={search.searchIconClick}
          onKeyUp={search.searchChange}
          onChange={search.searchChange}
          placeholder={text('SearchPlaceholder-class', 'SidebarHeader')}
          term={search.term}
          visible={search.visible}
        />
      );
    }

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader
            controlsExpanded={search.visible}
            title={text('Header-class', 'SidebarHeader')}
            subtitle={text('Subheader-count', 'SidebarHeader', {
              COUNT: classes.length,
            })}
          >
            {searchBox}
          </SidebarHeader>
          <SidebarList
            curPage={search.page}
            dispatch={dispatch}
            items={this.getClasses()}
            listType="class"
            noItemsTxt={text('Classes', 'SidebarNoItems')}
            onPbChange={search.pageChange}
            sortOrder={classSort}
            term={search.term}
            termAnywhere={search.anywhere}
            usePb
          />
          <SidebarFooter leftActions={leftActions} rightActions={rightActions} />
        </Sidebar>
        <Switch>
          <Route
            path={ROUTE_EDIT_CLASS}
            render={routerProps => <EditClassLayout {...routerProps} dispatch={dispatch} classes={classes} />}
          />
          <Route
            path={ROUTE_DEL_CLASSES}
            render={routerProps => <DeleteClassesLayout {...routerProps} dispatch={dispatch} />}
          />
          <Route
            path={ROUTE_NEW_CLASS}
            render={routerProps => <NewClassLayout {...routerProps} dispatch={dispatch} />}
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

export default connect(mapStateToProps)(withSearch(ClassesLayout));
