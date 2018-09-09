// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import ExportBuilderForm from '../Form/ExportBuilderForm';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import exportSchema from '../../../validation/schemas/export';
import { text }  from '../../../components/Translation/Translation';
import exportDefault from '../../../types/export';
import type { ExportType } from '../../../types/export';
import type { ReportType } from '../../../types/report';
import type { TextType } from '../../../types/text';
import type { SidebarBuilderItemType } from '../../../types/sidebarBuilderItem';
import {
  exportWord,
  getContent,
  getDateFromTs,
} from '../../../fs/export';

type Props = {
  activeReport: ReportType | Object,
  builder: Object,
  history: Object,
  items: Array<SidebarBuilderItemType>,
  location: Object,
  match: Object,
  texts: Array<TextType>,
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
    builder: {},
    items: [],
    texts: [],
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
    const { activeReport, builder, items, texts } = this.props;
    const content = getContent(items, builder[activeReport.id] || {}, texts);
    const exportValues = {
      ...values,
      classCount: content.classCount,
      content: content.content,
      exported: getDateFromTs(Date.now()),
      pupilCount: content.pupilCount,
      reportName: this.props.activeReport.getLabel(),
    };
    
    // Todo... only export if there is content
    //exportWord(exportValues);
  }

  render() {
    const reportName = this.props.activeReport.getLabel();

    return (
      <EditPanel>
        <EditPanelHeader title={text('ReportExport', 'EditPanelHeader', { 'REPORT_NAME': reportName })} />
        <EditPanelContent>
          <Formik
            initialValues={{ name: reportName }}
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


const mapStateToProps = (state: Object, props: Props) => {
  return {
    builder: state.builder,
    texts: state.texts,
  }
};


export default connect(mapStateToProps)(ExportBuilderLayout);
