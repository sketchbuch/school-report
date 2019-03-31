// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import DeletePupilsLayout from './Delete/DeletePupilsLayout';
import EditPupilLayout from './Edit/EditPupilLayout';
import Icon from '../../components/Icon/Icon';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import NewPupilLayout from './New/NewPupilLayout';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import setTitle from '../../utils/title';
import type { ClassType } from '../../types/class';
import type { PupilSortOptions, PupilType } from '../../types/pupil';
import type { ReduxState } from '../../types/reduxstate';
import type { WithSearchProps } from '../../hoc/withSearch';
import withSearch from '../../hoc/withSearch';
import { ICON_ADD, ICON_DELETE } from '../../constants/icons';
import { NavButtonCircular, SearchField } from '../../components/Ui';
import { ROUTE_DEL_PUPILS, ROUTE_EDIT_PUPIL, ROUTE_NEW_PUPIL, ROUTE_PUPILS } from '../../constants/routes';
import { getActiveClass, getClassPupils } from '../../utils/redux';
import { pupilSort } from '../../types/pupil';
import { text } from '../../components/Translation/Translation';

export type Props = {
  ...RouteComponentProps,
  activeClass: ClassType | Object,
  dispatch: Dispatch,
  pupilsSort: PupilSortOptions,
  pupils: PupilType[],
} & WithSearchProps;

export class PupilsLayout extends React.Component<Props> {
  static defaultProps = {
    activeClass: {},
    pupils: [],
  };

  props: Props;

  componentDidMount() {
    setTitle(text('WinTitle', 'Pupils', { CLASS_NAME: this.getClassLabel() }));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_PUPILS.replace(':classId', this.props.match.params.classId)) {
      setTitle(text('WinTitle', 'Pupils', { CLASS_NAME: this.getClassLabel() }));
    }
  }

  getClassLabel(): string {
    return this.props.activeClass.label !== undefined ? this.props.activeClass.label : this.props.match.params.classId;
  }

  render() {
    const { activeClass, dispatch, match, pupils, search } = this.props;
    const HAS_PUPILS: boolean = pupils.length > 0 ? true : false;
    const leftActions: React.Element<*> = (
      <NavButtonCircular
        to={ROUTE_NEW_PUPIL.replace(':classId', match.params.classId)}
        className="SidebarFooter__action"
        buttontype="pos-rollover"
        action="add-pupil"
        title={text('PupilAdd', 'Actions')}
      >
        <Icon type={ICON_ADD} />
      </NavButtonCircular>
    );
    const rightActions: React.Element<*> = (
      <NavButtonCircular
        disabled={!HAS_PUPILS}
        to={ROUTE_DEL_PUPILS.replace(':classId', match.params.classId)}
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
          anywhere={search.anywhere}
          anywhereOnClick={search.anywhereIconClick}
          clearOnClick={search.searchIconClick}
          iconOnClick={search.searchIconClick}
          onKeyUp={search.searchChange}
          onChange={search.searchChange}
          placeholder={text('SearchPlaceholder-pupil', 'SidebarHeader')}
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
            title={text('Header-pupil', 'SidebarHeader')}
            subtitle={text('Subheader-count', 'SidebarHeader', {
              COUNT: pupils.length,
            })}
          >
            {searchBox}
          </SidebarHeader>
          <SidebarList
            curPage={search.page}
            dispatch={dispatch}
            items={pupils}
            listType="pupil"
            noItemsTxt={text('Pupils', 'SidebarNoItems')}
            onPbChange={search.pageChange}
            sortOrder={pupilSort[this.props.pupilsSort]}
            term={search.term}
            termAnywhere={search.anywhere}
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
                dispatch={dispatch}
                pupils={pupils}
                sortOrder={pupilSort[this.props.pupilsSort]}
                activeClass={activeClass}
              />
            )}
          />
          <Route
            path={ROUTE_DEL_PUPILS}
            render={routerProps => (
              <DeletePupilsLayout {...routerProps} dispatch={dispatch} pupils={pupils} activeClass={activeClass} />
            )}
          />
          <Route
            path={ROUTE_NEW_PUPIL}
            render={routerProps => (
              <NewPupilLayout {...routerProps} dispatch={dispatch} pupils={pupils} activeClass={activeClass} />
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

const mapStateToProps = (state: ReduxState, props: Props) => {
  return {
    activeClass: getActiveClass(state.classes, props.match.params.classId),
    pupils: getClassPupils(state.pupils, props.match.params.classId),
    pupilsSort: state.settings.pupilsSort,
  };
};

export default connect(mapStateToProps)(withSearch(PupilsLayout));
