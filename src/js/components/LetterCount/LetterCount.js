// @flow

import React from 'react';
import './LetterCount.css';

type Props = {
  count: string,
};

const LetterCount = (props: Props) => {
  return <i className="LetterCount">{props.count}</i>;
};

export default LetterCount;
