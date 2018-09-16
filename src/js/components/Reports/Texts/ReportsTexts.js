// @flow

import React, { Component } from 'react';
import ReportsTextItem from '../TextItem/ReportsTextItem';
import InfoMsg from '../../InfoMsg/InfoMsg';
import { text } from '../../Translation/Translation';
import type { PupilType } from '../../../types/pupil';
import type { TextType } from '../../../types/text';
import './ReportsTexts.css';

type Props = {
  activePupil: PupilType | Object,
  handleEndDrag: Function,
  handleTextMove: Function,
  handleTextToggle: Function,
  selectedTexts: Array<string>,
  texts: Array<TextType>,
};


/**
* Selected texts for a pupil in a report.
*/
export class ReportsTexts extends Component<Props> {
  static defaultProps = {
    activePupil: {},
    handleEndDrag: ()=>{},
    handleTextMove: ()=>{},
    handleTextToggle: ()=>{},
    selectedTexts: [],
    texts: [],
  };

  props: Props;

  /**
   * Returns the selected texts in the order that they are selected.
   * this.props.selectedTexts is just an array of IDs.
   */
  getSelectedTexts() {
    const visibleTexts = [];

    this.props.selectedTexts.forEach(selTxtId => {
      const txt = this.props.texts.find(txt => txt.id === selTxtId);
      if (txt !== undefined) visibleTexts.push({...txt});
    });

    return visibleTexts;
  }

  render() {
    const selectedTexts = this.getSelectedTexts();

    return (
      selectedTexts.length > 0 ? (
        <ul className="ReportsTexts">
          {selectedTexts.map(text => (
              <ReportsTextItem 
                activePupil={this.props.activePupil} 
                key={text.id}
                onClick={this.props.handleTextToggle}
                onMove={this.props.handleTextMove} 
                onEndDrag={this.props.handleEndDrag} 
                txt={text} 
              />
          ))}
        </ul>
      ) : (
        <InfoMsg
          headine={text('ReportsNoneSel', 'InfoMsg')}
          subtext={text('ReportsNoneSelMsg', 'InfoMsg')}
        />
      )
    )
  }
}


export default ReportsTexts;
