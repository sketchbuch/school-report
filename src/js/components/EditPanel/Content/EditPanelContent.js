// @flow

import * as React from 'react';
import './EditPanelContent.css';

type Props = {
  children?: React.Node,
  noPadding: boolean,
};


/**
* Edit Panel content section.
*/
export class EditPanelContent extends React.Component<Props> {
  static defaultProps = {
      noPadding: false,
   };

  props: Props;

  render() {
    const classes = (this.props.noPadding) ? 'EditPanelContent EditPanelContent--noPadding' : 'EditPanelContent';

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    )
  }
}


export default EditPanelContent;
