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
import EditReportLayout from './Edit/EditReportLayout';
import NewReportLayout from './New/NewReportLayout';
import DeleteReportsLayout from './Delete/DeleteReportsLayout';
import { text } from '../../components/Translation/Translation';
import { reportSort } from '../../types/report';
import type { ReportType } from '../../types/report';
import type { ClassType } from '../../types/class';
import { ICON_ADD, ICON_CLOSE, ICON_DELETE } from '../../constants/icons';
import { ROUTE_DEL_REPORTS, ROUTE_EDIT_REPORT, ROUTE_NEW_REPORT, ROUTE_REPORTS } from '../../constants/routes';
import setTitle from '../../utils/title';

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
  curPage: number,
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
    setTitle(text('WinTitle', 'Reports'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_REPORTS) {
      setTitle(text('WinTitle', 'Reports'));
    }
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
