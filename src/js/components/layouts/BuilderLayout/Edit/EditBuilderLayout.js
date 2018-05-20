// @flow

import React, { Component } from 'react';
import EditPanel from '../../../EditPanel/EditPanel';
import Reports from '../../../Reports/Reports';
import EditPanelHeader from '../../../EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../EditPanel/Content/EditPanelContent';
import { text }  from '../../../Translation/Translation';
import { getItemById } from '../../../../utils/arrays';
import type { ReportType } from '../../../../types/report';
import type { TextType } from '../../../../types/text';
import type { SidebarBuilderItemType } from '../../../../types/sidebarBuilderItem';

type Props = {
  activeReport: ReportType | Object,
  history: Object,
  items: Array<SidebarBuilderItemType>,
  location: Object,
  match: Object,
  texts: Array<TextType>,
};



/**
* Layout for editing an existing class.
*/
export class EditBuilderLayout extends Component<Props> {
  static defaultProps = {
    activeReport: {},
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
          <Reports texts={this.props.texts} />
        </EditPanelContent>
      </EditPanel>
    )
  }
}


export default EditBuilderLayout;
