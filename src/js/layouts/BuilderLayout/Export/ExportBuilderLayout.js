// @flow

import React, { Component } from 'react';
import { Formik } from 'formik';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import ExportBuilderForm from '../Form/ExportBuilderForm';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import exportSchema from '../../../validation/schemas/export';
import { text } from '../../../components/Translation/Translation';
import exportDefault from '../../../types/export';
import type { ExportType } from '../../../types/export';
import type { ReduxState } from '../../../types/reduxstate';
import type { ReportType } from '../../../types/report';
import type { TextType } from '../../../types/text';
import type { SidebarBuilderItemType } from '../../../types/sidebarBuilderItem';
import { exportWord, getContent, getDateFromTs } from '../../../fs/export';
import setTitle from '../../../utils/setTitle';
import { TOASTR_DURATION_LONG } from '../../../constants/misc';

export type Props = {
  ...RouteComponentProps,
  activeReport: ReportType | Object,
  builder: Object,
  items: SidebarBuilderItemType[],
  texts: TextType[],
};

type State = {
  export: ExportType,
  error: boolean,
  saving: boolean,
};

export class ExportBuilderLayout extends Component<Props, State> {
  static defaultProps = {
    activeReport: {},
    builder: {},
    items: [],
    texts: [],
  };

  props: Props;
  state: State = {
    export: { ...exportDefault },
    error: false,
    saving: false,
  };
  saveName: string = '';

  componentDidMount() {
    setTitle(text('WinTitle', 'ExportBuilderLayout'));
  }

  handleSubmit(values: ExportType) {
    const { activeReport, builder, items, texts }: Props = this.props;
    const content = getContent(items, builder[activeReport.id] || {}, texts);
    const exportValues: ExportType = {
      ...values,
      classCount: content.classCount,
      content: content.content,
      exported: getDateFromTs(Date.now()),
      pupilCount: content.pupilCount,
      reportName: this.props.activeReport.getLabel(),
    };
    this.saveName = `${values.name}.docx`;

    exportWord(exportValues, this.exportResult);
  }

  // TODO - fix type
  exportResult(ioResult: Object) {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceSuccess', 'ExportBuilderLayout'), this.saveName);
    } else {
      toastr.error(
        text('PersistenceError', 'ExportBuilderLayout'),
        text('PersistenceErrorMsg', 'ExportBuilderLayout', {
          ERROR: ioResult.errorObj.message,
        }),
        { timeOut: TOASTR_DURATION_LONG }
      );
    }
  }

  render() {
    const reportName: string = this.props.activeReport.getLabel();

    return (
      <EditPanel>
        <EditPanelHeader
          title={text('ReportExport', 'EditPanelHeader', {
            REPORT_NAME: reportName,
          })}
        />
        <EditPanelContent>
          <Formik
            initialValues={{ name: reportName }}
            enableReinitialize={true}
            validationSchema={exportSchema}
            onSubmit={this.handleSubmit}
            render={formikProps => (
              <ExportBuilderForm {...formikProps} saving={this.state.saving} reportName={reportName} />
            )}
          />
        </EditPanelContent>
      </EditPanel>
    );
  }
}

const mapStateToProps = (state: ReduxState, props: Props) => {
  return {
    builder: state.builder,
    texts: state.texts,
  };
};

export default connect(mapStateToProps)(ExportBuilderLayout);
