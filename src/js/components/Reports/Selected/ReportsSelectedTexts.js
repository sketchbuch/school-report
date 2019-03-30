// @flow

import React, { Component } from 'react';
import ReportsTextItem from '../TextItem/ReportsTextItem';
import InfoMsg from '../../InfoMsg/InfoMsg';
import { text } from '../../Translation/Translation';
import type { PupilType } from '../../../types/pupil';
import type { TextType } from '../../../types/text';
import './ReportsSelectedTexts.css';

export type Props = {
  activePupil: PupilType | Object,
  onEndDrag: () => void,
  onTextMove: (sourceId: string, targetId: string, before: boolean) => void,
  onTextToggle: (textId: string) => (event: SyntheticEvent<>) => void,
  selectedTexts: string[],
  texts: TextType[],
};

export class ReportsSelectedTexts extends Component<Props> {
  static defaultProps = {
    activePupil: {},
    onEndDrag: () => {},
    onTextMove: () => {},
    onTextToggle: () => () => {},
    selectedTexts: [],
    texts: [],
  };

  props: Props;

  getSelectedTexts(): TextType[] {
    return this.props.selectedTexts.reduce((allTexts: TextType[], curSelText: string) => {
      const txt: ?TextType = this.props.texts.find((txt: TextType) => txt.id === curSelText);
      if (txt != null) {
        return [...allTexts, txt];
      }

      return [...allTexts];
    }, []);
  }

  render() {
    const selectedTexts: TextType[] = this.getSelectedTexts();

    return selectedTexts.length > 0 ? (
      <div className="ReportsSelectedTexts">
        {selectedTexts.map(text => (
          <ReportsTextItem
            activePupil={this.props.activePupil}
            key={text.id}
            onClick={this.props.onTextToggle}
            onMove={this.props.onTextMove}
            onEndDrag={this.props.onEndDrag}
            txt={text}
          />
        ))}
      </div>
    ) : (
      <InfoMsg headine={text('ReportsNoneSel', 'InfoMsg')} subtext={text('ReportsNoneSelMsg', 'InfoMsg')} />
    );
  }
}

export default ReportsSelectedTexts;
