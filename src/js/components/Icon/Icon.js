// @flow

import React from 'react';

type Props = {
  type: string,
};


/**
* Iconfont Icon component.
*/
const Icon = (props: Props) => <i className={'Icon icofont icofont-' + props.type}></i>


export default Icon;
