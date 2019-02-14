// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
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
import type { ReportType } from '../../types/report';
import { ICON_ADD, ICON_DELETE } from '../../constants/icons';
import { ROUTE_DEL_REPORTS, ROUTE_EDIT_REPORT, ROUTE_NEW_REPORT, ROUTE_REPORTS } from '../../constants/routes';
import { reportSort } from '../../types/report';
import { text } from '../../components/Translation/Translation';

type Props = {
  classes: Array<ClassType>,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
  maxChars: number,
  reports: Array<ReportType>,
};

type State = {
  anywhere: boolean,
  curPage: number,
  searchVisible: boolean,
  term: string,
};

/**
 * Layout for displaying reports.
 */
export class ReportsLayout extends Component<Props, State> {
  static defaultProps = {
    classes: [],
    reports: [],
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
    setTitle(text('WinTitle', 'Reports'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_REPORTS) {
      setTitle(text('WinTitle', 'Reports'));
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

  render() {
    const HAS_REPORTS = this.props.reports.length > 0 ? true : false;
    const leftActions = (
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

    const rightActions = (
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

const mapStateToProps = (state: Object) => ({
  classes: state.classes,
  maxChars: state.settings.maxChars,
  reports: state.reports,
});

export default connect(mapStateToProps)(ReportsLayout);
