// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import EditBuilderLayout from './Edit/EditBuilderLayout';
import ExportBuilderLayout from './Export/ExportBuilderLayout';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import { NavButtonCircular } from '../../components/Ui';
import { text } from '../../components/Translation/Translation';
import { sortObjectsAz } from '../../utils/sort';
import { classSort } from '../../types/class';
import { pupilSort } from '../../types/pupil';
import type { ClassType } from '../../types/class';
import type { PupilSortOptions, PupilType } from '../../types/pupil';
import type { ReduxState } from '../../types/reduxstate';
import type { ReportType } from '../../types/report';
import type { TextType } from '../../types/text';
import type { SidebarBuilderItemType } from '../../types/sidebarBuilderItem';
import { getSelectedTexts } from '../../utils/redux';
import { ICON_EXPORT } from '../../constants/icons';
import { ROUTE_BUILDER, ROUTE_EDIT_BUILDER, ROUTE_EXPORT_BUILDER } from '../../constants/routes';
import { getActiveReport } from '../../utils/redux';
import setTitle from '../../utils/title';

export type Props = {
  ...RouteComponentProps,
  activeReport: ReportType | Object,
  builder: Object,
  classes: ClassType[],
  dispatch: Dispatch,
  pupils: PupilType[],
  pupilsSort: PupilSortOptions,
  textCount: number,
  texts: TextType[],
};

export class BuilderLayout extends React.Component<Props> {
  static defaultProps = {
    activeReport: {},
    builder: {},
    classes: [],
    pupils: [],
    textCount: 0,
    texts: [],
  };

  props: Props;

  componentDidMount() {
    setTitle(text('WinTitle', 'Builder'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_BUILDER) {
      setTitle(text('WinTitle', 'Builder'));
    }
  }

  getItems(): SidebarBuilderItemType[] {
    let items: SidebarBuilderItemType[] = [];

    if (this.props.activeReport.id !== undefined) {
      const reportClasses: ClassType[] = this.props.classes.filter(c => this.props.activeReport.classes.includes(c.id));
      const sortedClasses: ClassType[] = sortObjectsAz(reportClasses, classSort);

      sortedClasses.forEach((item: ClassType) => {
        const newClassPupils: PupilType[] = this.props.pupils.filter(p => p.classId === item.id);
        const sortedClassPupils: PupilType[] = sortObjectsAz(newClassPupils, pupilSort[this.props.pupilsSort]);

        items.push({
          classRec: { ...item },
          id: item.id,
          pupils: sortedClassPupils,
          reportId: this.props.activeReport.id,
        });
      });
    }

    return items;
  }

  canExport(items: SidebarBuilderItemType[]): boolean {
    const { activeReport, builder } = this.props;
    const reportData = builder[activeReport.id];
    let canExport: boolean = false;

    if (reportData !== undefined) {
      items.forEach((item: SidebarBuilderItemType) => {
        if (reportData[item.id] !== undefined) {
          item.pupils.forEach((pupil: PupilType) => {
            if (reportData[item.id][pupil.id] !== undefined && reportData[item.id][pupil.id].length > 0) {
              canExport = true;
            }
          });
        }
      });
    }

    return canExport;
  }

  render() {
    const { activeReport, builder } = this.props;
    const items: SidebarBuilderItemType[] = this.getItems();
    const classCount: number = items.length;
    const pupilCount: number = items.reduce((curCount, curClass) => curCount + curClass.classRec.pupilCount, 0);
    const CAN_EXPORT: boolean = this.canExport(items);
    const leftActions: React.Element<*> = (
      <NavButtonCircular
        action="add-category"
        buttontype="pos-rollover"
        className="SidebarFooter__action"
        disabled={!CAN_EXPORT}
        title={text('ReportExport', 'Actions')}
        to={ROUTE_EXPORT_BUILDER.replace(':reportId', activeReport.id)}
      >
        <Icon type={ICON_EXPORT} />
      </NavButtonCircular>
    );

    const pupilBuilderSelectedCount = (pupilId: string, classId: string): string => {
      const selectedTexts: string[] = getSelectedTexts(builder, activeReport.id, classId, pupilId);
      return selectedTexts.length > 0 ? `(${selectedTexts.length})` : '';
    };

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader
            title={text('Header-build', 'SidebarHeader')}
            subtitle={text('Subheader-countmulti', 'SidebarHeader', {
              COUNT1: classCount,
              COUNT2: pupilCount,
            })}
          />
          <SidebarList
            builder={true}
            description={pupilBuilderSelectedCount}
            dispatch={this.props.dispatch}
            items={items}
            listType="class"
            noItemsTxt={text('Classes', 'SidebarNoItems')}
            sortOrder={pupilSort[this.props.pupilsSort]}
          />
          <SidebarFooter leftActions={leftActions} />
        </Sidebar>
        <Switch>
          <Route
            path={ROUTE_EXPORT_BUILDER}
            render={routerProps => (
              <ExportBuilderLayout {...routerProps} activeReport={this.props.activeReport} items={items} />
            )}
          />
          <Route
            path={ROUTE_EDIT_BUILDER}
            render={routerProps => (
              <EditBuilderLayout
                {...routerProps}
                activeReport={this.props.activeReport}
                builder={this.props.builder}
                items={items}
                textCount={this.props.textCount}
                texts={this.props.texts}
              />
            )}
          />
          <Route
            path={ROUTE_BUILDER}
            render={routerProps => (
              <InfoMsg {...routerProps} headine={text('Builder', 'InfoMsg')} subtext={text('BuilderMsg', 'InfoMsg')} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState, props: Props) => {
  return {
    activeReport: getActiveReport(state.reports, props.match.params.reportId),
    builder: state.builder,
    classes: state.classes,
    pupils: state.pupils,
    pupilsSort: state.settings.pupilsSort,
    textCount: state.texts.length,
    texts: state.texts,
  };
};

export default connect(mapStateToProps)(BuilderLayout);
