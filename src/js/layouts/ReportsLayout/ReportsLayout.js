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
import NavButtonCircular from '../../components/ui/NavButtonCircular/NavButtonCircular';
import NewReportLayout from './New/NewReportLayout';
import SearchField from '../../components/ui/SearchField/SearchField';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import setTitle from '../../utils/title';
import type { ClassType } from '../../types/class';
import type { ReduxState } from '../../types/reduxstate';
import type { ReportType } from '../../types/report';
import { ICON_ADD, ICON_DELETE } from '../../constants/icons';
import { ROUTE_DEL_REPORTS, ROUTE_EDIT_REPORT, ROUTE_NEW_REPORT, ROUTE_REPORTS } from '../../constants/routes';
import { reportSort } from '../../types/report';
import { text } from '../../components/Translation/Translation';

export type Props = {
  ...RouteComponentProps,
  classes: ClassType[],
  dispatch: Dispatch,
  maxChars: number,
  reports: ReportType[],
};

type State = {
  anywhere: boolean,
  curPage: number,
  searchVisible: boolean,
  term: string,
};

export class ReportsLayout extends React.Component<Props, State> {
  static defaultProps = {
    classes: [],
    reports: [],
  };

  props: Props;
  state: State = {
    anywhere: false,
    curPage: 1,
    searchVisible: false,
    term: '',
  };

  componentDidMount() {
    setTitle(text('WinTitle', 'Reports'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_REPORTS) {
      setTitle(text('WinTitle', 'Reports'));
    }
  }

  handleSearch = (event: SyntheticInputEvent<HTMLInputElement>): void => {
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

  handleSearchIconClick = (event: SyntheticEvent<MouseEvent>): void => {
    const newSearchVisible: boolean = !this.state.searchVisible;

    if (newSearchVisible === false) {
      this.setState({ curPage: 1, searchVisible: newSearchVisible, term: '' });
    } else {
      this.setState({ searchVisible: newSearchVisible });
    }
  };

  handleSearchAnywhereClick = (event: SyntheticEvent<MouseEvent>): void => {
    this.setState({ anywhere: !this.state.anywhere });
  };

  render() {
    const HAS_REPORTS: boolean = this.props.reports.length > 0 ? true : false;
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
          anywhere={this.state.anywhere}
          anywhereOnClick={this.handleSearchAnywhereClick}
          clearOnClick={this.handleSearchIconClick}
          iconOnClick={this.handleSearchIconClick}
          onKeyUp={this.handleSearch}
          onChange={this.handleSearch}
          placeholder={text('SearchPlaceholder-report', 'SidebarHeader')}
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
            title={text('Header-report', 'SidebarHeader')}
            subtitle={text('Subheader-count', 'SidebarHeader', {
              COUNT: this.props.reports.length,
            })}
          >
            {searchBox}
          </SidebarHeader>
          <SidebarList
            curPage={this.state.curPage}
            dispatch={this.props.dispatch}
            items={this.props.reports}
            listType="report"
            noItemsTxt={text('Reports', 'SidebarNoItems')}
            onChange={this.handlePbChange}
            sortOrder={reportSort}
            term={this.state.term}
            termAnywhere={this.state.anywhere}
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
                dispatch={this.props.dispatch}
                reports={this.props.reports}
                classes={this.props.classes}
                maxChars={this.props.maxChars}
              />
            )}
          />
          <Route
            path={ROUTE_DEL_REPORTS}
            render={routerProps => <DeleteReportsLayout {...routerProps} dispatch={this.props.dispatch} />}
          />
          <Route
            path={ROUTE_NEW_REPORT}
            render={routerProps => (
              <NewReportLayout
                {...routerProps}
                dispatch={this.props.dispatch}
                classes={this.props.classes}
                maxChars={this.props.maxChars}
              />
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

export default connect(mapStateToProps)(ReportsLayout);
