// @flow

import * as React from 'react';
import type { TimeoutID } from '../../types/fixes';
import './EditPanel.css';

type Props = {
  children?: React.Node,
};

type State = {
  display: 'mounting' | 'slidein' | 'slideout' | 'unmounting',
};


/**
* The Edit Panel.
*/
export class EditPanel extends React.Component<Props, State> {
  props: Props;
  state: State;
  slidein: Function;
  slideinTimer: TimeoutID;

  constructor(props: Props){
    super(props);

    this.state = {
      display: 'mounting',
    };

    this.slidein = this.slidein.bind(this);
  }

  componentDidMount() {
    this.slideinTimer = setTimeout(this.slidein, 50);
  }

  componentWillMount() {
    clearTimeout(this.slideinTimer);
  }

  slidein() {
    this.setState({display: 'slidein'});
  }

  render() {
    return (
      <div className="EditPanel" data-state={this.state.display}>
        <section className="EditPanel__container">
          {this.props.children}
        </section>
      </div>
    )
  }
}


export default EditPanel;
