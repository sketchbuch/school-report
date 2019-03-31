// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import DeleteReportsLayout from './Delete/DeleteReportsLayout';
import EditReportLayout from './Edit/EditReportLayout';
import Icon from '../../components/Icon/Icon';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import NewReportLayout from './New/NewReportLayout';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import setTitle from '../../utils/title';
import type { ClassType } from '../../types/class';
import type { ReduxState } from '../../types/reduxstate';
import type { ReportType } from '../../types/report';
import type { WithSearchProps } from '../../hoc/withSearch';
import withSearch from '../../hoc/withSearch';
import { ICON_ADD, ICON_DELETE } from '../../constants/icons';
import { NavButtonCircular, SearchField } from '../../components/Ui';
import { ROUTE_DEL_REPORTS, ROUTE_EDIT_REPORT, ROUTE_NEW_REPORT, ROUTE_REPORTS } from '../../constants/routes';
import { reportSort } from '../../types/report';
import { text } from '../../components/Translation/Translation';

export type Props = {
  ...RouteComponentProps,
  classes: ClassType[],
  dispatch: Dispatch,
  maxChars: number,
  reports: ReportType[],
} & WithSearchProps;

export class ReportsLayout extends React.Component<Props> {
  static defaultProps = {
    classes: [],
    reports: [],
  };

  props: Props;

  componentDidMount() {
    setTitle(text('WinTitle', 'Reports'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_REPORTS) {
      setTitle(text('WinTitle', 'Reports'));
    }
  }

  render() {
    const { classes, dispatch, maxChars, reports, search } = this.props;
    const HAS_REPORTS: boolean = reports.length > 0 ? true : false;
    const leftActions: React.Element<*> = (
      <NavButtonCircular
        to={ROUTE_NEW_REPORT}
        className="SidebarFooter__action"
        buttontype="pos-rollover"
        action="add-report"
        title={text('ReportAdd', 'Actions')}
      >
        <Icon type={ICON_ADD} />
      </NavButtonCircular>
    );

    const rightActions: React.Element<*> = (
      <NavButtonCircular
        disabled={!HAS_REPORTS}
        to={ROUTE_DEL_REPORTS}
        className="SidebarFooter__action"
        buttontype="neg-rollover"
        action="delete-reports"
        title={text('ReportDelete', 'Actions')}
      >
        <Icon type={ICON_DELETE} />
      </NavButtonCircular>
    );
    let searchBox = null;

    if (HAS_REPORTS) {
      searchBox = (
        <SearchField
          anywhere={search.anywhere}
          anywhereOnClick={search.anywhereIconClick}
          clearOnClick={search.searchIconClick}
          iconOnClick={search.searchIconClick}
          onKeyUp={search.searchChange}
          onChange={search.searchChange}
          placeholder={text('SearchPlaceholder-report', 'SidebarHeader')}
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
            title={text('Header-report', 'SidebarHeader')}
            subtitle={text('Subheader-count', 'SidebarHeader', {
              COUNT: reports.length,
            })}
          >
            {searchBox}
          </SidebarHeader>
          <SidebarList
            curPage={search.page}
            dispatch={dispatch}
            items={reports}
            listType="report"
            noItemsTxt={text('Reports', 'SidebarNoItems')}
            onPbChange={search.pageChange}
            sortOrder={reportSort}
            term={search.term}
            termAnywhere={search.anywhere}
            usePb
          />
          <SidebarFooter leftActions={leftActions} rightActions={rightActions} />
        </Sidebar>
        <Switch>
          u
          <Route
            path={ROUTE_EDIT_REPORT}
            render={routerProps => (
              <EditReportLayout
                {...routerProps}
                dispatch={dispatch}
                reports={reports}
                classes={classes}
                maxChars={maxChars}
              />
            )}
          />
          <Route
            path={ROUTE_DEL_REPORTS}
            render={routerProps => <DeleteReportsLayout {...routerProps} dispatch={dispatch} />}
          />
          <Route
            path={ROUTE_NEW_REPORT}
            render={routerProps => (
              <NewReportLayout {...routerProps} dispatch={dispatch} classes={classes} maxChars={maxChars} />
            )}
          />
          <Route
            path={ROUTE_REPORTS}
            render={routerProps => (
              <InfoMsg {...routerProps} headine={text('Reports', 'InfoMsg')} subtext={text('ReportsMsg', 'InfoMsg')} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  classes: state.classes,
  maxChars: state.settings.maxChars,
  reports: state.reports,
});

export default connect(mapStateToProps)(withSearch(ReportsLayout));
