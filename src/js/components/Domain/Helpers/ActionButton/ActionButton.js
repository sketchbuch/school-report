// @flow

import * as React from 'react';
import type { SidebarListTypes } from '../../../../types/sidebarList';
import Icon from '../../../Icon/Icon';
import { NavButtonCircular } from '../../../Ui';
import { ICON_ADD, ICON_DELETE } from '../../../../constants/icons';

export type Props = {
  disabled?: boolean,
  domainType: SidebarListTypes,
  title: string,
  to: string,
  type: 'add' | 'delete',
};

const ActionButton = ({ disabled = false, domainType, title, to, type }: Props): React.Node => {
  const iconType: string = type === 'add' ? ICON_ADD : ICON_DELETE;

  return (
    <NavButtonCircular
      disabled={disabled}
      to={to}
      className="SidebarFooter__action"
      buttontype="pos-rollover"
      action={`${type}-${domainType}`}
      title={title}
    >
      <Icon type={iconType} />
    </NavButtonCircular>
  );
};

export default ActionButton;
