// @flow

import React, { Component } from 'react';
import { text } from '../../Translation/Translation';
import SidebarInner from '../Inner/SidebarInner';
import SidebarItemButton from '../Button/SidebarItemButton';
import type { SidebarListTypes } from '../../../types/sidebarList';
import type { CategoryType } from '../../../types/category';
import { ICON_EDIT } from '../../../constants/icons';
import './SidebarReportItem.css';

type Props = {
  item: CategoryType,
  itemType: SidebarListTypes,
  onReportClick: () => {},
  sortOrder: Array<string>,
};

/**
 * An item in a sidebar list on the report builder.
 */
class SidebarReportItem extends Component<Props> {
  static defaultProps = {
    itemType: 'category',
    onReportClick: () => {},
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
          onSubClick={this.props.onReportClick(this.props.item.id)}
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
