//@flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import Translation from '../../../components/Translation/Translation';
import './FormCancel.css';

export type Props = {
  name: string,
  ns: string,
  to: string,
};

class FormCancel extends React.PureComponent<Props> {
  props: Props;

  render() {
    return (
      <p className="FormCancel">
        <Link to={this.props.to}>
          <Translation name={this.props.name} ns={this.props.ns} />
        </Link>
      </p>
    );
  }
}

export default FormCancel;
