// @flow

import React, { PureComponent } from 'react';
import './EditPanelHeader.css';

type Props = {
  title: string,
};


/**
* Edit Panel header.
*/
export class EditPanelHeader extends PureComponent<Props> {
  static defaultProps = {
      title: '',
   };

  props: Props;

  render() {
    return (
      <header className="EditPanelHeader">
        <h1 className="EditPanelHeader_headline">{this.props.title}</h1>
      </header>
    )
  }
}


export default EditPanelHeader;
