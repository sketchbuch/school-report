//@flow

import * as React from 'react';
import './FieldWrap.css';

type Props = {
  children?: React.Node,
};

/**
* A wrapping component for UI elements.
*/
class FieldWrap extends React.Component<Props> {
  static defaultProps = {
    children: null,
  };

  props: Props;

  render() {
    return (
      <div className="FieldWrap">
        {this.props.children}
      </div>
    )
  }
}


export default FieldWrap;
