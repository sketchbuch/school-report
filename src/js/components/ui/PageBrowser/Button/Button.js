//@flow

import React from 'react';
import classNames from 'classnames';
import ButtonCircular from '../../ButtonCircular/ButtonCircular';
import { text } from '../../../Translation/Translation';

export type PbButtonProps = {
  disabled: boolean,
  label: string,
  onClick: (event: SyntheticMouseEvent<HTMLElement>) => void,
  page?: boolean,
  selected?: boolean,
  title?: string,
  type: string,
};

const Button = (props: PbButtonProps) => {
  return (
    <ButtonCircular
      action={props.type}
      className={classNames(`PageBrowser__btn PageBrowser__btn--${props.type}`, {
        'PageBrowser__btn--page': props.page,
        'PageBrowser__btn--selected': props.selected,
      })}
      disabled={props.disabled}
      onClick={props.onClick}
      title={props.title || text('Btn-' + props.type, 'PageBrowser')}
    >
      {props.label}
    </ButtonCircular>
  );
};

export default Button;
