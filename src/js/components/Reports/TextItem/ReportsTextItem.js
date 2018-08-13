// @flow

import React, { Component, Fragment } from 'react';
import { DragSource } from 'react-dnd';
import Icon from '../../Icon/Icon';
import DndTarget from '../../Dnd/Target/DndTarget';
import { getPupilTextHtml } from '../../../utils/html';
import { ICON_ADD } from '../../../constants/icons';
import { dndTypes } from '../../../constants/dndTypes';
import type { PupilType } from '../../../types/pupil';
import type { TextType } from '../../../types/text';
import './ReportsTextItem.css';

type Props = {
  activePupil: PupilType | Object,
  handleTextToggle: Function,
  selectedTexts: Array<string>,
  texts: Array<TextType>,
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

let ReportsTextItem = (props: Object) => {
  const { isDragging, connectDragSource, text } = props;
  let classes = 'ReportsTextItem';
  if (isDragging) classes += ' ReportsTextItem--dragging';
  
  return connectDragSource(
    <li className={classes} onClick={props.onClick(props.txt.id)}>
      <span dangerouslySetInnerHTML={getPupilTextHtml(props.txt.getLabel(0), props.activePupil)} />
    </li>
  )
}

ReportsTextItem = DragSource(dndTypes.TEXT, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(ReportsTextItem);


export default ReportsTextItem;
