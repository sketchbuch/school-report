// @flow

import React, { Component, Fragment } from 'react';
import ReportsTextItem from '../TextItem/ReportsTextItem';
import Icon from '../../Icon/Icon';
import DndTarget from '../../Dnd/Target/DndTarget';
import { getPupilTextHtml } from '../../../utils/html';
import { ICON_ADD } from '../../../constants/icons';
import { dndTypes } from '../../../constants/dndTypes';
import type { PupilType } from '../../../types/pupil';
import type { TextType } from '../../../types/text';
import './ReportsTexts.css';

type Props = {
  activePupil: PupilType | Object,
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
    handleTextToggle: ()=>{},
    selectedTexts: [],
    texts: [],
  };

  props: Props;

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
        <li className="ReportsText__item ReportsText__item--dnd">
          <DndTarget><Icon type={ ICON_ADD } /></DndTarget>
        </li>

        {selectedTexts.map(text => (
          <Fragment key={text.id}>
            <ReportsTextItem txt={text} activePupil={this.props.activePupil} onClick={this.props.handleTextToggle} />
            <li className="ReportsText__item ReportsText__item--dnd">
              <DndTarget><Icon type={ ICON_ADD } /></DndTarget>
            </li>
          </Fragment>
        ))}
      </ul>
    )
  }
}


export default ReportsTexts;
