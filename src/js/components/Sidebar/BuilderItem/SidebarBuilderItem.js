// @flow

import React, { Component } from 'react';
import Icon from '../../Icon/Icon';
import SidebarInner from '../Inner/SidebarInner';
import type { SidebarListTypes } from '../../../types/sidebarList';
import type { SidebarBuilderItemType } from '../../../types/sidebarBuilderItem';
import { ICON_CONTRACT, ICON_EXPAND } from '../../../constants/icons';
import { text } from '../../Translation/Translation';
import '../Item/SidebarItem.css';
import './SidebarBuilderItem.css';

type Props = {
  description: ?(pupilId: string, classId: string) => string | null,
  item: SidebarBuilderItemType,
  itemType: SidebarListTypes,
  sortOrder: Array<string>,
};

type State = {
  open: boolean,
};

/**
 * An item in a sidebar list for the builder layout.
 */
class SidebarBuilderItem extends Component<Props, State> {
  static defaultProps = {
    description: null,
    itemType: 'class',
  };

  props: Props;
  handleExpandClick: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick(event: SyntheticInputEvent<HTMLInputElement>) {
    event.preventDefault();
    if (this.props.item.pupils.length > 0) {
      this.setState({ open: !this.state.open });
    }
  }

  render() {
    const { classRec, pupils } = this.props.item;

    let classes = 'SidebarItem SidebarBuilderItem';
    if (this.state.open) {
      classes += ' SidebarBuilderItem--open';
    }
    if (this.props.item.pupils.length > 0) {
      classes += ' SidebarBuilderItem--active';
    } else {
      classes += ' SidebarBuilderItem--inactive';
    }

    return (
      <li className={classes} title={classRec.getTooltip()}>
        <SidebarInner
          onClick={this.handleExpandClick}
          description={classRec.getDescription()}
          label={classRec.getLabel()}
          icon={classRec.getIcon()}
        >
          <span
            className="SidebarItem_expander"
            title={text('Expand', 'Actions')}
          >
            <Icon type={ICON_EXPAND} />
          </span>
          <span
            className="SidebarItem_contractor"
            title={text('Contract', 'Actions')}
          >
            <Icon type={ICON_CONTRACT} />
          </span>
        </SidebarInner>
        {this.state.open && (
          <ul className="SidebarBuilderItem__sub">
            {pupils.map(pupil => {
              return (
                <li
                  className="SidebarItem"
                  key={pupil.id}
                  title={pupil.getTooltip(this.props.sortOrder[0])}
                >
                  <SidebarInner
                    description={
                      this.props.description
                        ? String(
                            this.props.description(pupil.id, pupil.classId)
                          )
                        : pupil.getDescription()
                    }
                    label={pupil.getLabel(this.props.sortOrder[0])}
                    icon={pupil.getIcon()}
                    link={pupil.getUrl('builder', this.props.item.reportId)}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  }
}

export default SidebarBuilderItem;
