// @flow

import React, { Component } from 'react';
import { Formik } from 'formik';
import ExportBuilderForm from '../Form/ExportBuilderForm';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import { text }  from '../../../components/Translation/Translation';
import type { ReportType } from '../../../types/report';
import type { SidebarBuilderItemType } from '../../../types/sidebarBuilderItem';

type Props = {
  activeReport: ReportType | Object,
  history: Object,
  location: Object,
  match: Object,
};

type State = {
  export: Object,
  error: boolean,
  saving: boolean,
}


/**
* Layout for exporting a report
*/
export class ExportBuilderLayout extends Component<Props, State> {
  static defaultProps = {
    activeReport: {},
  };

  props: Props;
  state: State;
  handleSubmit: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      export: {},
      error: false,
      saving: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values: Object) {
    
  }

  render() {
    const reportName = this.props.activeReport.getLabel();

    return (
      <EditPanel>
        <EditPanelHeader title={text('ReportExport', 'EditPanelHeader', { 'REPORT_NAME': reportName })} />
        <EditPanelContent>
          <Formik
            initialValues={{}}
            enableReinitialize={true}
            validationSchema={{}}
            onSubmit={()=>{}}
            render={(formikProps) => (
              <ExportBuilderForm {...formikProps} saving={this.state.saving} reportName={reportName} />
            )}
          />
        </EditPanelContent>
      </EditPanel>
    )
  }
}


export default ExportBuilderLayout;
