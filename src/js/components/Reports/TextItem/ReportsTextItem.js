// @flow

import React, { Component } from 'react';
import classNames from 'classnames';
import { DragSource, DropTarget, DragSourceConnector, DragSourceMonitor } from 'react-dnd';
import LetterCount from '../../LetterCount/LetterCount';
import type { InsertDangerousHtmlObj } from '../../../types/misc';
import type { PupilType } from '../../../types/pupil';
import type { TextType } from '../../../types/text';
import { dndTypes } from '../../../constants/dndTypes';
import { getPupilTextHtml } from '../../../utils/html';
import './ReportsTextItem.css';

// TODO - Fix types

export type Props = {
  activePupil: PupilType | Object,
  onClick: (id: string) => {},
  onMove: (sourceId: string, targetId: string, before?: boolean) => {},
  onEndDrag: () => {},
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
    if (!component) {
      return null;
    }

    const dragIndex = monitor.getItem().id;
    const hoverIndex = props.txt.id;
    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = component.ele.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const hoverClientY = monitor.getClientOffset().y - hoverBoundingRect.top;

    if (hoverClientY < hoverMiddleY) {
      props.onMove(dragIndex, hoverIndex, true);
    } else {
      props.onMove(dragIndex, hoverIndex);
    }

    monitor.getItem().index = hoverIndex;
  },
};

export class ReportsTextItem extends Component<Props> {
  props: Props;
  ele: ?HTMLElement;

  render() {
    const { activePupil, connectDragSource, connectDropTarget, isDragging, onClick, txt } = this.props;
    const pupilText: InsertDangerousHtmlObj = getPupilTextHtml(txt.getLabel(0), activePupil);

    return connectDragSource(
      connectDropTarget(
        <div
          className={classNames('ReportsTextItem', { 'ReportsTextItem--dragging': isDragging })}
          onClick={onClick(txt.id)}
          ref={ele => (this.ele = ele)}
        >
          <span dangerouslySetInnerHTML={pupilText} />
          <LetterCount count={pupilText.__html.replace(/<(.|\n)*?>/g, '').length.toString()} />
        </div>
      )
    );
  }
}

// DnD Source and Target connection:
ReportsTextItem = DragSource(dndTypes.TEXT, textSource, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(ReportsTextItem);

ReportsTextItem = DropTarget(dndTypes.TEXT, textTarget, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
}))(ReportsTextItem);

export default ReportsTextItem;
