// @flow

import React, { Component, Fragment } from 'react';
import Icon from '../../Icon/Icon';
import DndTarget from '../../Dnd/Target/DndTarget';
import { getPupilTextHtml } from '../../../utils/html';
import { ICON_ADD } from '../../../constants/icons';
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
* A list of available texts.
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
            <li className="ReportsText__item ReportsText__item--txt" onClick={this.props.handleTextToggle(text.id)}>
              <span dangerouslySetInnerHTML={getPupilTextHtml(text.getLabel(0), this.props.activePupil)} />
            </li>
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
