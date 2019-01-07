// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import EditBuilderLayout from './Edit/EditBuilderLayout';
import ExportBuilderLayout from './Export/ExportBuilderLayout';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import NavButtonCircular from '../../components/ui/NavButtonCircular/NavButtonCircular';
import { text } from '../../components/Translation/Translation';
import { sortObjectsAz } from '../../utils/sort';
import { classSort } from '../../types/class';
import { pupilSort } from '../../types/pupil';
import type { ClassType } from '../../types/class';
import type { PupilSortOptions, PupilType } from '../../types/pupil';
import type { ReportType } from '../../types/report';
import type { TextType } from '../../types/text';
import type { SidebarBuilderItemType } from '../../types/sidebarBuilderItem';
import { getSelectedTexts } from '../../utils/redux';
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
  builder: Object,
  classes: Array<ClassType>,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
  pupils: Array<PupilType>,
  pupilsSort: PupilSortOptions,
  textCount: number,
  texts: Array<TextType>,
};

/**
 * Layout for building reports.
 */
export class BuilderLayout extends Component<Props> {
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

  /**
   * Returns the correct prop to be used as the items in the sidebar list.
   *
   * @return array The items to be rendered.
   */
  getItems() {
    let items: Array<SidebarBuilderItemType> = [];

    if (this.props.activeReport.id !== undefined) {
      const reportClasses = this.props.classes.filter(c =>
        this.props.activeReport.classes.includes(c.id)
      );
      const sortedClasses = sortObjectsAz(reportClasses, classSort);

      sortedClasses.forEach(item => {
        const newClassPupils = this.props.pupils.filter(
          p => p.classId === item.id
        );
        const sortedClassPupils = sortObjectsAz(
          newClassPupils,
          pupilSort[this.props.pupilsSort]
        );

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

  canExport(items: Array<SidebarBuilderItemType>): boolean {
    const { activeReport, builder } = this.props;
    const reportData = builder[activeReport.id];
    let canExport = false;

    if (reportData !== undefined) {
      items.forEach(item => {
        if (reportData[item.id] !== undefined) {
          item.pupils.forEach(pupil => {
            if (
              reportData[item.id][pupil.id] !== undefined &&
              reportData[item.id][pupil.id].length > 0
            ) {
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
    const items = this.getItems();
    const classCount = items.length;
    const pupilCount = items.reduce(
      (curCount, curClass) => curCount + curClass.classRec.pupilCount,
      0
    );
    const CAN_EXPORT = this.canExport(items);
    const leftActions = (
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

    const pupilBuilderSelectedCount = (
      pupilId: string,
      classId: string
    ): string => {
      const selectedTexts = getSelectedTexts(
        builder,
        activeReport.id,
        classId,
        pupilId
      );
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
              <ExportBuilderLayout
                {...routerProps}
                activeReport={this.props.activeReport}
                items={items}
              />
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
              <InfoMsg
                {...routerProps}
                headine={text('Builder', 'InfoMsg')}
                subtext={text('BuilderMsg', 'InfoMsg')}
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
