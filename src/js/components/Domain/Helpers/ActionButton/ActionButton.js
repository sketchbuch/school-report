// @flow

import * as React from 'react';
import Icon from '../../../Icon/Icon';
import type { ButtonType } from '../../../../types/button';
import type { SidebarListTypes } from '../../../../types/sidebarList';
import { ICON_ADD, ICON_DELETE } from '../../../../constants/icons';
import { NavButtonCircular } from '../../../Ui';

export type Props = {
  disabled?: boolean,
  domainType: SidebarListTypes,
  title: string,
  to: string,
  type: 'add' | 'delete',
};

const ActionButton = ({ disabled = false, domainType, title, to, type }: Props): React.Node => {
  const iconType: string = type === 'add' ? ICON_ADD : ICON_DELETE;
  const buttonType: ButtonType = type === 'add' ? 'pos-rollover' : 'neg-rollover';

  return (
    <NavButtonCircular
      disabled={disabled}
      to={to}
      className="SidebarFooter__action"
      buttontype={buttonType}
      action={`${type}-${domainType}`}
      title={title}
    >
      <Icon type={iconType} />
    </NavButtonCircular>
  );
};

export default ActionButton;
