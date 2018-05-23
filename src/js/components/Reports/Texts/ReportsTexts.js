// @flow

import * as React from 'react';
import { text } from '../../Translation/Translation';
import Icon from '../../Icon/Icon';
import AddButton from '../../ui/AddButton/AddButton';
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
export class ReportsTexts extends React.Component<Props> {
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
      <div className="ReportsTexts">
        <AddButton title={text('TextAdd', 'Actions')}>
          <Icon type={ ICON_ADD } />
        </AddButton>
        
        {selectedTexts.map(text => (
            <li key={text.id} className="ReportsTextList__item" onClick={this.props.handleTextToggle(text.id)}>
              <span dangerouslySetInnerHTML={getPupilTextHtml(text.getLabel(0), this.props.activePupil)} />
            </li>
        ))}
      </div>
    )
  }
}


export default ReportsTexts;
