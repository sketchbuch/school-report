//@flow

import * as React from 'react';
import './FieldError.css';

export type Props = {
  errors: string[],
};

class FieldError extends React.PureComponent<Props> {
  static defaultProps = {
    errors: [],
  };

  props: Props;

  render() {
    if (this.props.errors.length < 1) {
      return null;
    }

    return (
      <div className="FieldError">
        {this.props.errors.map(item => {
          const key = item.toLowerCase().replace(/[^A-Z0-9]+/gi, '');

          return (
            <p className="FieldError__error" key={key}>
              {item}
            </p>
          );
        })}
      </div>
    );
  }
}

export default FieldError;
