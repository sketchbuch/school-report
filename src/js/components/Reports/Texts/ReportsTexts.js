// @flow

import React, { Component, Fragment } from 'react';
import { DragSource } from 'react-dnd';
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

const dndTypes = {
  TEXT: 'text'
};

// DnD:
const boxSource = {
	beginDrag(props: Object, monitor: Object | Function, component: Object | Function) {
    console.log('beginDrag', arguments);
    return { id: props.id };
	},

	endDrag(props: Object, monitor: Object | Function, component: Object | Function) {
		console.log('endDrag');
	},
}

let ReportTxt = (props: Object) => {
  const { isDragging, connectDragSource, text } = props;
  
  return connectDragSource(
    <li className="ReportsTexts__item" onClick={props.onClick(props.txt.id)} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <span dangerouslySetInnerHTML={getPupilTextHtml(props.txt.getLabel(0), props.activePupil)} />
    </li>
  )
}

ReportTxt = DragSource(dndTypes.TEXT, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(ReportTxt);


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
