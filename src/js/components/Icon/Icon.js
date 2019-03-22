// @flow

import React from 'react';

export type Props = {
  type: string,
};

const Icon = (props: Props) => <i className={'Icon icofont icofont-' + props.type} />;

export default Icon;
