// @flow

import * as React from 'react'

type Props = {

};

type State = {
  dragging: boolean,
};


/**
* A drag-and-drop HOC.
*/
export default function widthDnd(WrappedComponent: React.ComponentType<any>) {
  return class extends React.Component<Props, State> {
    props: Props;
    state: State;
    onDrag: Function;

    constructor(props: Props){
      super(props);

      this.state = {
        dragging: false,
      };

      this.onDrag = this.onDrag.bind(this);
    }

    onDrag(event: SyntheticEvent<>) {
      console.log('dragging...', event.currentTarget);
    }

    render() {
      return <WrappedComponent {...this.props} onDrag={this.onDrag} />;
    }
  };
}
