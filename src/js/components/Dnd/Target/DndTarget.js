// @flow

import * as React from 'react';
import './DndTarget.css';

type Props = {
  children?: React.Node,
};


/**
* A target for drag and drop.
*/
export class DndTarget extends React.Component<Props> {
  static defaultProps = {
    children: null,
  };

  props: Props;

  render() {
    return (
      <div className="DndTarget">
        {this.props.children}
      </div>
    )
  }
}


export default DndTarget;
