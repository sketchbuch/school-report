// @flow

import React, { Component, Fragment } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import Icon from '../../Icon/Icon';
import { getPupilTextHtml } from '../../../utils/html';
import { ICON_ADD } from '../../../constants/icons';
import { dndTypes } from '../../../constants/dndTypes';
import type { PupilType } from '../../../types/pupil';
import type { TextType } from '../../../types/text';
import './ReportsTextItem.css';

type Props = {
  activePupil: PupilType | Object,
  onClick: (id: string)=>{},
  onMove: ()=>{},
  txt: TextType,
  canDrop: boolean,
  connectDragSource: Function,
  connectDropTarget: Function,
  isDragging: boolean,
  isOver: boolean,
};

// DnD Source and Target:
const textSource = {
	beginDrag(props: Object, monitor: Object | Function, component: Object | Function) {
    return { id: props.txt.id };
	},
};

const textTarget = {
	hover(props: Object, monitor: Object | Function, component: Object | Function) {
    if (!component) return null;
    
		const dragIndex = monitor.getItem().id;
    const hoverIndex = props.txt.id;
    if (dragIndex === hoverIndex) return;

    const undecoratedComponent = component.getDecoratedComponentInstance();
    if (!undecoratedComponent) return;

		const hoverBoundingRect = undecoratedComponent.ele.getBoundingClientRect();
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const hoverClientY = monitor.getClientOffset().y - hoverBoundingRect.top;
    
		if (hoverClientY < hoverMiddleY) {
      props.onMove(dragIndex, hoverIndex, true);
    } else {
      props.onMove(dragIndex, hoverIndex);
    }
	},
};

export class ReportsTextItem extends Component<Props> {
  static defaultProps = {
      title: '',
   };

  props: Props;
  ele: ?HTMLElement;

  render() {
    const { 
      activePupil,
      connectDragSource,
      connectDropTarget,
      isDragging,
      onClick,
      txt,
    } = this.props;

    let classes = 'ReportsTextItem';
    if (isDragging) classes += ' ReportsTextItem--dragging';
    
    return connectDragSource(connectDropTarget(
      <li className={classes} onClick={onClick(txt.id)} ref={ ele => (this.ele = ele) }>
        <span dangerouslySetInnerHTML={getPupilTextHtml(txt.getLabel(0), activePupil)} />
      </li>
    ));
  }
}

// DnD Source and Target connection:
ReportsTextItem = DragSource(dndTypes.TEXT, textSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(ReportsTextItem);


ReportsTextItem = DropTarget(dndTypes.TEXT, textTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
}))(ReportsTextItem);


export default ReportsTextItem;
