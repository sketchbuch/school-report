// @flow

import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr'
import { Formik } from 'formik';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditReportForm from '../Form/EditReportForm';
import { text }  from '../../../components/Translation/Translation';
import reportSchema from '../../../validation/schemas/reports';
import * as reportActions from '../../../actions/reportActions';
import reportDefault from '../../../types/report';
import type { ReportType } from '../../../types/report';
import type { ClassType } from '../../../types/class';
import { ROUTE_REPORTS } from '../../../constants/routes';
import { getActiveReport } from '../../../utils/redux';
import setTitle from '../../../utils/title';

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
  error: boolean,
  report: ReportType,
  saving: boolean,
}



/**
* Layout for editing an existing report.
*/
export class EditReportLayout extends Component<Props, State> {
  static defaultProps = {
    classes: [],
    reports: [],
  };

  props: Props;
  dataSaved: Function;
  handleSubmit: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      error: false,
      report: {...reportDefault, ...this.getActiveReport()},
      saving: false,
    };

    this.dataSaved = this.dataSaved.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    setTitle(text('WinTitle', 'EditReportsLayout', {'REPORT_NAME': this.state.report.getLabel()}));
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

  handleSubmit(values: Object) {
    const updatedReport = {...values};
    updatedReport.updated = Date.now();

    this.setState({
      report: updatedReport,
      saving: true
    });
  }

  /**
  * Returns the matching report or an empty object
  *
  * @return ReportType | object
  */
  getActiveReport() {
    return getActiveReport(this.props.reports, this.props.match.params.reportId);
  }

  /**
  * Callback used by electron fs functions.
  *
  * @param object ioResult An object: {success: boolean, errorObj?: object, data?: json}
  */
  dataSaved(ioResult: Object) {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceEdit', 'Reports'), this.state.report.getLabel());
      this.props.history.push(ROUTE_REPORTS);
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  }

  render() {
    const activeReport = this.getActiveReport();

    return (
      <EditPanel>
        <EditPanelHeader title={text('EditClass', 'EditPanelHeader', {'CLASS_NAME': activeReport.getLabel()})} />
        <EditPanelContent>
          <Formik
            initialValues={{...reportDefault, ...activeReport}}
            enableReinitialize={true}
            validationSchema={reportSchema}
            onSubmit={this.handleSubmit}
            render={(formikProps) => (
              <EditReportForm {...formikProps} saving={this.state.saving} classes={this.props.classes} />
            )}
          />
        </EditPanelContent>
      </EditPanel>
    )
  }
}


export default EditReportLayout;
