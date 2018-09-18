// @flow

import React, { Component } from 'react';
import {
  DragSource,
  DropTarget,
	DragSourceConnector,
	DragSourceMonitor,
} from 'react-dnd';
import { getPupilTextHtml } from '../../../utils/html';
import { dndTypes } from '../../../constants/dndTypes';
import type { PupilType } from '../../../types/pupil';
import type { TextType } from '../../../types/text';
import './ReportsTextItem.css';

type Props = {
  activePupil: PupilType | Object,
  onClick: (id: string)=>{},
  onMove: (sourceId: string, targetId: string, before?: boolean)=>{},
  onEndDrag: ()=>{},
  txt: TextType,
  canDrop: boolean,
  connectDragSource: Function,
  connectDropTarget: Function,
  isDragging: boolean,
  isOver: boolean,
};

// DnD Source and Target:
const textSource = {
	beginDrag(props: Props, monitor: DragSourceMonitor | Function, component: Object | Function) {
    return { id: props.txt.id };
	},
	endDrag(props: Props, monitor: DragSourceMonitor | Function, component: Object | Function) {
    props.onEndDrag();
	},
};

const textTarget = {
	hover(props: Props, monitor: DragSourceMonitor | Function, component: Object | Function) {
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
    
		monitor.getItem().index = hoverIndex
	},
};

export class ReportsTextItem extends Component<Props> {
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
      <div className={classes} onClick={onClick(txt.id)} ref={ ele => (this.ele = ele) }>
        <span dangerouslySetInnerHTML={getPupilTextHtml(txt.getLabel(0), activePupil)} />
      </div>
    ));
  }
}

// DnD Source and Target connection:
ReportsTextItem = DragSource(dndTypes.TEXT, textSource, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(ReportsTextItem);


ReportsTextItem = DropTarget(dndTypes.TEXT, textTarget, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
}))(ReportsTextItem);


export default ReportsTextItem;
