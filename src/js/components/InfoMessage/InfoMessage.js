// @flow

import React, { Component } from 'react';
import './InfoMessage.css';

type Props = {
  headine: string,
  subtext: string,
};


/**
* An info message only visible on desktops that displays on the right of the sidebar.
*/
export class InfoMessage extends Component<Props> {
  props: Props;

  static defaultProps = {
    headine: '',
    subtext: '',
  };

  render() {
    return (
      <section className="InfoMessage">
        <h1 className="InfoMessage__headine">{this.props.headine}</h1>
        <p className="InfoMessage__subtext">{this.props.subtext}</p>
      </section>
    )
  }
}


export default InfoMessage;
