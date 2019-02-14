// @flow

import React, { Component } from 'react';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import Reports from '../../../components/Reports/Reports';
import InfoMsg from '../../../components/InfoMsg/InfoMsg';
import { getSelectedTexts } from '../../../utils/redux';
import { getPupilTextHtml } from '../../../utils/html';
import { text } from '../../../components/Translation/Translation';
import { getItemById } from '../../../utils/arrays';
import type { ReportType } from '../../../types/report';
import type { SidebarBuilderItemType } from '../../../types/sidebarBuilderItem';
import type { TextType } from '../../../types/text';
import setTitle from '../../../utils/title';

type Props = {
  activeReport: ReportType | Object,
  builder: Object,
  history: Object,
  items: Array<SidebarBuilderItemType>,
  location: Object,
  match: Object,
  textCount: number,
  texts: Array<TextType>,
};

/**
 * Layout for creating a report.
 */
export class EditBuilderLayout extends Component<Props> {
  static defaultProps = {
    activeReport: {},
    builder: {},
    items: [],
    textCount: 0,
    texts: [],
  };

  props: Props;
  state: State;

  componentDidMount() {
    setTitle(text('WinTitle', 'EditBuilderLayout'));
  }

  render() {
    const activeItem = getItemById(this.props.items, this.props.match.params.classId);
    const activePupil = getItemById(activeItem.pupils, this.props.match.params.pupilId);
    const maxChars = this.props.activeReport.maxChars;

    const selectedTexts = getSelectedTexts(
      this.props.builder,
      this.props.activeReport.id,
      activeItem.classRec.id,
      activePupil.id
    );
    let textCount = 0;

    selectedTexts.forEach(selTxtId => {
      const txt = this.props.texts.find(txt => txt.id === selTxtId);
      if (txt !== undefined) {
        const pupilText = getPupilTextHtml(txt.getLabel(0), activePupil);
        textCount += pupilText.__html.replace(/<(.|\n)*?>/g, '').length;
      }
    });

    return (
      <EditPanel>
        <EditPanelHeader
          alert={maxChars > 0 && textCount >= maxChars ? true : false}
          count={selectedTexts.length > 0 ? selectedTexts.length : -1}
          title={text('ReportBuilder', 'EditPanelHeader', {
            PUPIL_NAME: activePupil.getLabel(),
            CLASS_NAME: activeItem.classRec.getLabel(),
          })}
          subtitle={text(maxChars > 0 ? 'ReportBuilderCount' : 'ReportBuilderCountNoLimit', 'EditPanelHeader', {
            TEXT_COUNT: textCount,
            MAX_CHARS: maxChars,
          })}
        />
        <EditPanelContent noPadding={true}>
          {this.props.textCount > 0 ? (
            <Reports
              activeClass={activeItem.classRec}
              activePupil={activePupil}
              activeReport={this.props.activeReport}
              disableTexts={maxChars > 0 && textCount >= maxChars ? true : false}
            />
          ) : (
            <InfoMsg headine={text('BuilderNoTexts', 'InfoMsg')} subtext={text('BuilderNoTextsMsg', 'InfoMsg')} />
          )}
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default EditBuilderLayout;
