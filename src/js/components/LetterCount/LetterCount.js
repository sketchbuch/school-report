// @flow

import React from 'react';
import './LetterCount.css';

type Props = {
  count: string,
};

/**
 * Letter count indicator component.
 */
const LetterCount = (props: Props) => {
  return <i className="LetterCount">{props.count}</i>;
};

export default LetterCount;
