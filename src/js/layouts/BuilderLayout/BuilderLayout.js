// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import EditBuilderLayout from './Edit/EditBuilderLayout';
import ExportBuilderLayout from './Export/ExportBuilderLayout';
import InfoMessage from '../../components/InfoMessage/InfoMessage';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import NavButtonCircular from '../../components/ui/NavButtonCircular/NavButtonCircular';
import { text }  from '../../components/Translation/Translation';
import { sortObjectsAz } from '../../utils/sort';
import type { SidebarBuilderItemType } from '../../types/sidebarBuilderItem';
import { classSort } from '../../types/class';
import { pupilSort } from '../../types/pupil';
import type { ClassType } from '../../types/class';
import type { PupilType } from '../../types/pupil';
import type { ReportType } from '../../types/report';
import { ICON_EXPORT } from '../../constants/icons';
import {
  ROUTE_BUILDER,
  ROUTE_EDIT_BUILDER,
  ROUTE_EXPORT_BUILDER,
} from '../../constants/routes';
import { getActiveReport } from '../../utils/redux';
import setTitle from '../../utils/title';

type Props = {
  activeReport: ReportType | Object,
  classes: Array<ClassType>,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
  pupils: Array<PupilType>,
};


/**
* Layout for building reports.
*/
export class BuilderLayout extends Component<Props> {
  static defaultProps = {
    activeReport: {},
    classes: [],
    pupils: [],
  };

  props: Props;

  componentDidMount() {
    setTitle(text('WinTitle', 'Builder'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_BUILDER) setTitle(text('WinTitle', 'Builder'));
  }

  /**
  * Returns the correct prop to be used as the items in the sidebar list.
  *
  * @return array The items to be rendered.
  */
  getItems() {
    let items: Array<SidebarBuilderItemType> = [];

    if (this.props.activeReport.id !== undefined) {
      const reportClasses = this.props.classes.filter(c => this.props.activeReport.classes.includes(c.id));
      const sortedClasses = sortObjectsAz(reportClasses, classSort);

      sortedClasses.forEach((item) => {
        const newClassPupils = this.props.pupils.filter(p => p.classId === item.id);
        const sortedClassPupils = sortObjectsAz(newClassPupils, pupilSort);

        items.push({
          classRec: {...item},
          id: item.id,
          pupils: sortedClassPupils,
          reportId: this.props.activeReport.id,
        });
      });
    }

    return items;
  }

  render() {
    const items = this.getItems();
    
    const leftActions = (
      <NavButtonCircular
        to={ROUTE_EXPORT_BUILDER.replace(':reportId', this.props.activeReport.id,)}
        className="SidebarFooter__action"
        buttontype="pos-rollover"
        action="add-category"
        title={text('ReportExport', 'Actions')}
      >
        <Icon type={ICON_EXPORT} />
      </NavButtonCircular>
    );

    return (
      <div className="Panel">
        <Sidebar footer={false}>
          <SidebarHeader title={text('Header-build', 'SidebarHeader')} />
          <SidebarList
            builder={true}
            dispatch={this.props.dispatch}
            items={items}
            listType="class"
            noItemsTxt={text('Classes', 'SidebarNoItems')}
            sortOrder={[]}
          />
          <SidebarFooter leftActions={leftActions} />
        </Sidebar>
        <Switch>
          <Route path={ROUTE_EXPORT_BUILDER} render={routerProps => <ExportBuilderLayout {...routerProps} activeReport={this.props.activeReport} items={items} />} />
          <Route path={ROUTE_EDIT_BUILDER} render={routerProps => <EditBuilderLayout {...routerProps} activeReport={this.props.activeReport} items={items} />} />
          <Route path={ROUTE_BUILDER} render={routerProps => <InfoMessage {...routerProps} headine={text('Builder', 'InfoMessage')} subtext={text('BuilderMsg', 'InfoMessage')} />} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state: Object, props: Props) => {
  return {
    activeReport: getActiveReport(state.reports, props.match.params.reportId),
    classes: state.classes,
    pupils: state.pupils,
  }
};


export default connect(mapStateToProps)(BuilderLayout);
