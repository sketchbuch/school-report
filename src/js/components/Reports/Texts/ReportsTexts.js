// @flow

import React, { Component, Fragment } from 'react';
import ReportsTextItem from '../TextItem/ReportsTextItem';
import Icon from '../../Icon/Icon';
import { getPupilTextHtml } from '../../../utils/html';
import { ICON_ADD } from '../../../constants/icons';
import { dndTypes } from '../../../constants/dndTypes';
import type { PupilType } from '../../../types/pupil';
import type { TextType } from '../../../types/text';
import './ReportsTexts.css';

type Props = {
  activePupil: PupilType | Object,
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
      <ul className="ReportsTexts">
        {selectedTexts.map(text => (
            <ReportsTextItem 
              activePupil={this.props.activePupil} 
              key={text.id}
              onClick={this.props.handleTextToggle}
              onMove={this.props.handleTextMove} 
              txt={text} 
            />
        ))}
      </ul>
    )
  }
}


export default ReportsTexts;
