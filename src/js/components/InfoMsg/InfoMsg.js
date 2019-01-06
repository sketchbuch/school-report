// @flow

import * as React from 'react';
import Icon from '../Icon/Icon';
import './InfoMsg.css';

type Props = {
  children?: React.Node,
  headine: string,
  icon: string,
  subtext?: string,
};

/**
 * An info message with optional icon, and subcontent.
 */
export class InfoMsg extends React.PureComponent<Props> {
  props: Props;

  static defaultProps = {
    children: null,
    headine: '',
    icon: '',
    subtext: '',
  };

  render() {
    return (
      <section className="InfoMsg">
        {this.props.icon !== '' && <Icon type={this.props.icon} />}

        <h1 className="InfoMsg__headine">{this.props.headine}</h1>

        {this.props.subtext !== '' && (
          <p className="InfoMsg__subtext">{this.props.subtext}</p>
        )}
        {this.props.children && (
          <div className="InfoMsg__sub">{this.props.children}</div>
        )}
      </section>
    );
  }
}

export default InfoMsg;
