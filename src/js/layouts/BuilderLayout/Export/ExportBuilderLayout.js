// @flow

import React, { Component } from 'react';
import { Formik } from 'formik';
import ExportBuilderForm from '../Form/ExportBuilderForm';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import exportSchema from '../../../validation/schemas/export';
import { text }  from '../../../components/Translation/Translation';
import exportDefault from '../../../types/export';
import { getItemById } from '../../../utils/arrays';
import type { ReportType } from '../../../types/report';
import type { ExportType } from '../../../types/export';
import type { SidebarBuilderItemType } from '../../../types/sidebarBuilderItem';
import {
  exportWord,
  getClassCount,
  getClassList,
  getDateFromTs,
  getPupilCount,
} from '../../../fs/export';

type Props = {
  activeReport: ReportType | Object,
  history: Object,
  items: Array<SidebarBuilderItemType>,
  location: Object,
  match: Object,
};

type State = {
  export: ExportType,
  error: boolean,
  saving: boolean,
}


/**
* Layout for exporting a report
*/
export class ExportBuilderLayout extends Component<Props, State> {
  static defaultProps = {
    activeReport: {},
    items: [],
  };

  props: Props;
  state: State;
  handleSubmit: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      export: {...exportDefault},
      error: false,
      saving: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values: ExportType) {
    const { items } = this.props;
    const exportValues = {...values};

    exportValues.reportName = this.props.activeReport.getLabel();
    exportValues.classCount = getClassCount(items);
    exportValues.classes = getClassList(items);
    exportValues.exported = getDateFromTs(Date.now());
    exportValues.pupilCount = getPupilCount(items);
    
    exportWord(exportValues);
  }

  render() {
    const reportName = this.props.activeReport.getLabel();

    return (
      <EditPanel>
        <EditPanelHeader title={text('ReportExport', 'EditPanelHeader', { 'REPORT_NAME': reportName })} />
        <EditPanelContent>
          <Formik
            initialValues={{ name: '' }}
            enableReinitialize={true}
            validationSchema={exportSchema}
            onSubmit={this.handleSubmit}
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
