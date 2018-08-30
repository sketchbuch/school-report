// @flow

import React, { Component } from 'react';
import EditPanel from '../../../components/EditPanel/EditPanel';
import Reports from '../../../components/Reports/Reports';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import { text }  from '../../../components/Translation/Translation';
import { getItemById } from '../../../utils/arrays';
import type { ReportType } from '../../../types/report';
import type { SidebarBuilderItemType } from '../../../types/sidebarBuilderItem';

type Props = {
  activeReport: ReportType | Object,
  history: Object,
  items: Array<SidebarBuilderItemType>,
  location: Object,
  match: Object,
};



/**
* Layout for editing an existing class.
*/
export class EditBuilderLayout extends Component<Props> {
  static defaultProps = {
    activeReport: {},
    categories: [],
    items: [],
    texts: [],
  };

  props: Props;

  render() {
    const activeItem = getItemById(this.props.items, this.props.match.params.classId);
    const activePupil = getItemById(activeItem.pupils, this.props.match.params.pupilId);

    return (
      <EditPanel>
        <EditPanelHeader title={text('ReportBuilder', 'EditPanelHeader', { 'PUPIL_NAME': activePupil.getLabel(), 'CLASS_NAME': activeItem.classRec.getLabel() })} />
        <EditPanelContent noPadding={true}>
          <Reports activeClass={activeItem.classRec}  activePupil={activePupil} activeReport={this.props.activeReport} />
        </EditPanelContent>
      </EditPanel>
    )
  }
}


export default EditBuilderLayout;
