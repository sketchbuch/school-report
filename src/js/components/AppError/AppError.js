// @flow

import React from 'react';
import Icon from '../Icon/Icon';
import './AppError.css';

type Props = {
  errorTxt: string,
};

const defaultProps = {
  errorTxt: 'Error',
};

/**
 * App Error component.
 */
const AppError = (props: Props) => (
  <div className="AppError">
    <div className="AppError__icon">
      <Icon type="warning-alt" />
    </div>
    <p className="AppError__text">{props.errorTxt}</p>
  </div>
);

AppError.defaultProps = defaultProps;

export default AppError;
