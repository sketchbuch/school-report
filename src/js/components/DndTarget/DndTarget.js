//@flow

import * as React from 'react';
import './DndTarget.css';

type Props = {
  children?: React.Node,
  title: string,
};

/**
* A drag-and-drop target element.
*/
class DndTarget extends React.Component<Props> {
  static defaultProps = {
    children: null,
    title: '',
  };

  props: Props;

  render() {
    return (
      <span className="DndTarget" title={this.props.title}>{ this.props.children }</span>
    )
  }
}


export default DndTarget;
