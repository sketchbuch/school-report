// @flow

import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { Formik } from 'formik';
import { RouteComponentProps } from 'react-router';
import { toastr } from 'react-redux-toastr';
import * as reportActions from '../../../actions/reportActions';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditReportForm from '../Form/EditReportForm';
import reportDefault from '../../../types/report';
import reportSchema from '../../../validation/schemas/reports';
import setTitle from '../../../utils/setTitle';
import type { ClassType } from '../../../types/class';
import type { FsObject } from '../../../types/fsObject';
import type { ReportType } from '../../../types/report';
import { ROUTE_REPORTS } from '../../../constants/routes';
import { getActiveReport } from '../../../utils/redux';
import { text } from '../../../components/Translation/Translation';

export type Props = {
  ...RouteComponentProps,
  classes: ClassType[],
  dispatch: Dispatch,
  maxChars: number,
  reports: ReportType[],
};

type State = {
  error: boolean,
  report: ReportType,
  saving: boolean,
};

export class EditReportLayout extends Component<Props, State> {
  static defaultProps = {
    classes: [],
    reports: [],
  };

  props: Props;
  state: State = {
    error: false,
    report: { ...reportDefault, ...this.getActiveReport() },
    saving: false,
  };

  componentDidMount() {
    setTitle(
      text('WinTitle', 'EditReportsLayout', {
        REPORT_NAME: this.state.report.getLabel(),
      })
    );
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceEditError', 'Reports'));
      this.props.history.push(ROUTE_REPORTS);
    } else if (this.state.saving) {
      this.props.dispatch(reportActions.update(this.state.report, this.dataSaved));
      this.setState({ saving: false });
    }
  }

  // TODO - fix types
  handleSubmit = (values: Object): void => {
    const updatedReport = { ...values };
    updatedReport.updated = Date.now();

    this.setState({
      report: updatedReport,
      saving: true,
    });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceEdit', 'Reports'), this.state.report.getLabel());
      this.props.history.push(ROUTE_REPORTS);
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  };

  getActiveReport(): ReportType {
    return getActiveReport(this.props.reports, this.props.match.params.reportId);
  }

  render() {
    const activeReport: ReportType = this.getActiveReport();

    return (
      <EditPanel>
        <EditPanelHeader
          title={text('EditClass', 'EditPanelHeader', {
            CLASS_NAME: activeReport.getLabel(),
          })}
        />
        <EditPanelContent>
          <Formik
            initialValues={{ ...reportDefault, ...activeReport }}
            enableReinitialize={true}
            validationSchema={reportSchema}
            onSubmit={this.handleSubmit}
            render={formikProps => (
              <EditReportForm {...formikProps} saving={this.state.saving} classes={this.props.classes} />
            )}
          />
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default EditReportLayout;
