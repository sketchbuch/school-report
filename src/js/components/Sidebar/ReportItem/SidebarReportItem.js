// @flow

import React, { Component } from 'react';
import SidebarInner from '../Inner/SidebarInner';
import SidebarItemButton from '../Button/SidebarItemButton';
import type { CategoryType } from '../../../types/category';
import type { SidebarListTypes } from '../../../types/sidebarList';
import { ICON_EDIT } from '../../../constants/icons';
import { text } from '../../Translation/Translation';
import './SidebarReportItem.css';

type Props = {
  item: CategoryType,
  itemType: SidebarListTypes,
  onReportClick: (id: string, label: string) => void,
  selected: string | false,
  sortOrder: string[],
};

class SidebarReportItem extends Component<Props> {
  static defaultProps = {
    itemType: 'category',
    onReportClick: () => {},
    selected: false,
    updateExistingItems: () => {},
  };

  props: Props;

  render() {
    const classes = 'SidebarItem SidebarItem--report';
    const editUrl = this.props.item.getUrl('edit');

    return (
      <li className={classes} title={this.props.item.getTooltip(undefined)}>
        <SidebarInner
          description={this.props.item.getDescription()}
          icon={this.props.item.getIcon()}
          label={this.props.item.getLabel()}
          link={this.props.item.getUrl('link')}
          linkEdit={editUrl}
          onSubClick={this.props.onReportClick(this.props.item.id, this.props.item.getLabel())}
          selected={this.props.item.id === this.props.selected}
        >
          <SidebarItemButton
            title={text('SidebarItemEdit', 'Actions')}
            action="item-edit"
            type="default"
            icon={ICON_EDIT}
            link={editUrl}
          />
        </SidebarInner>
      </li>
    );
  }
}

export default SidebarReportItem;
