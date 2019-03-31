// @flow

import * as React from 'react';
import './EditPanelHeader.css';

export type Props = {
  alert: boolean,
  children?: React.Node,
  subtitle: string,
  textCount: string,
  title: string,
};

/**
 * Edit Panel header.
 */
export class EditPanelHeader extends React.Component<Props> {
  static defaultProps = {
    alert: false,
    children: null,
    subtitle: '',
    textCount: '',
    title: '',
  };

  props: Props;

  render() {
    return (
      <header className="EditPanelHeader">
        <h1 className="EditPanelHeader__headline">
          {this.props.title}
          {this.props.textCount && <span className="EditPanelHeader__textCount">{this.props.textCount}</span>}
          <span data-alert={this.props.alert}>{this.props.subtitle}</span>
        </h1>
        {this.props.children && <div className="EditPanelHeader__controls">{this.props.children}</div>}
      </header>
    );
  }
}

export default EditPanelHeader;
