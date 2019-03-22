// @flow

import * as React from 'react';
import './EditPanel.css';

export type Props = {
  children?: React.Node,
};

type State = {
  display: 'mounting' | 'slidein' | 'slideout' | 'unmounting',
};

export class EditPanel extends React.Component<Props, State> {
  props: Props;
  state: State = {
    display: 'mounting',
  };
  slideinTimer: TimeoutID;

  componentDidMount() {
    this.slideinTimer = setTimeout(this.slidein, 50);
  }

  componentWillMount() {
    clearTimeout(this.slideinTimer);
  }

  slidein = (): void => {
    this.setState({ display: 'slidein' });
  };

  render() {
    return (
      <div className="EditPanel" data-state={this.state.display}>
        <section className="EditPanel__container">{this.props.children}</section>
      </div>
    );
  }
}

export default EditPanel;
