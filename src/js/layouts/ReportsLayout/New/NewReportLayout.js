// @flow

import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { Formik } from 'formik';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditReportForm from '../Form/EditReportForm';
import { text } from '../../../components/Translation/Translation';
import reportSchema from '../../../validation/schemas/reports';
import * as reportActions from '../../../actions/reportActions';
import reportDefault, { ReportFactory } from '../../../types/report';
import type { ReportType } from '../../../types/report';
import type { ClassType } from '../../../types/class';
import { ROUTE_REPORTS } from '../../../constants/routes';
import setTitle from '../../../utils/title';

type Props = {
  classes: Array<ClassType>,
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
  maxChars: number,
};

type State = {
  error: boolean,
  report: ReportType,
  saving: boolean,
};

/**
 * Layout for adding a new report.
 */
export class NewReportLayout extends Component<Props, State> {
  static defaultProps = {
    classes: [],
  };

  props: Props;
  dataSaved: Function;
  handleSubmit: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      error: false,
      report: { ...reportDefault },
      saving: false,
    };

    this.dataSaved = this.dataSaved.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    setTitle(text('WinTitle', 'NewReportLayout'));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceNewError', 'Reports'));
      this.props.history.push(ROUTE_REPORTS);
    } else if (this.state.saving) {
      this.props.dispatch(reportActions.add(this.state.report, this.dataSaved));
      this.setState({ saving: false });
    }
  }

  handleSubmit(values: Object) {
    const newReport = ReportFactory(values, Date.now());

    this.setState({
      report: newReport,
      saving: true,
    });
  }

  /**
   * Callback used by electron fs functions.
   *
   * @param object ioResult An object: {success: boolean, errorObj?: object, data?: json}
   */
  dataSaved(ioResult: Object) {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceNew', 'Reports'), this.state.report.getLabel());
      this.props.history.push(ROUTE_REPORTS);
    } else {
      this.setState({
        error: true,
        saving: false,
      });
    }
  }

  render() {
    return (
      <EditPanel>
        <EditPanelHeader title={text('AddReport', 'EditPanelHeader')} />
        <EditPanelContent>
          <Formik
            initialValues={{ ...reportDefault, maxChars: this.props.maxChars }}
            enableReinitialize={true}
            validationSchema={reportSchema}
            onSubmit={this.handleSubmit}
            render={formikProps => (
              <EditReportForm {...formikProps} saving={this.state.saving} classes={this.props.classes} isNew={true} />
            )}
          />
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default NewReportLayout;
