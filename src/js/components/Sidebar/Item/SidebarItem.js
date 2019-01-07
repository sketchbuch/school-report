// @flow

import React, { Component } from 'react';
import { text } from '../../Translation/Translation';
import SidebarInner from '../Inner/SidebarInner';
import SidebarItemButton from '../Button/SidebarItemButton';
import type { SidebarListTypes } from '../../../types/sidebarList';
import type { ClassType } from '../../../types/class';
import type { PupilType } from '../../../types/pupil';
import type { ReportType } from '../../../types/report';
import type { TextType } from '../../../types/text';
import type { TimeoutID } from '../../../types/fixes';
import {
  ICON_DELETE,
  ICON_EDIT,
  ICON_ERROR,
  ICON_SUCCESS,
} from '../../../constants/icons';
import './SidebarItem.css';

type DomainTypes = ClassType | PupilType | ReportType | TextType;

type Props = {
  isNew: boolean,
  item: DomainTypes,
  itemDuration: number,
  itemType: SidebarListTypes,
  onDelete: Function,
  sortOrder: Array<string>,
  updateExistingItems: Function,
};

type State = {
  delete: boolean,
  deleting: boolean,
  confirmed: boolean,
};

/**
 * An item in a sidebar list.
 */
class SidebarItem extends Component<Props, State> {
  static defaultProps = {
    isNew: false,
    itemDuration: 0,
    itemType: 'class',
    onDelete: () => {},
    updateExistingItems: () => {},
  };

  props: Props;
  deleteTimer: TimeoutID;
  deletingTimer: TimeoutID;
  handleClick: Function;
  newTimer: TimeoutID;
  timeoutDuration: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      delete: false,
      deleting: false,
      confirmed: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.timeoutDuration = 3000;
  }

  componentDidMount() {
    if (this.props.isNew) {
      this.newTimer = setTimeout(
        () => this.props.updateExistingItems(this.props.item.id),
        this.props.itemDuration
      );
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.confirmed) {
      this.props.onDelete(this.props.item.id);
    } else if (this.state.deleting) {
      this.deletingTimer = setTimeout(
        () => this.setState({ confirmed: true }),
        this.props.itemDuration
      );
    }
  }

  componentWillUnmount() {
    clearTimeout(this.deleteTimer);
    clearTimeout(this.deletingTimer);
    clearTimeout(this.newTimer);
  }

  handleClick(event: SyntheticInputEvent<HTMLInputElement>) {
    event.preventDefault();

    switch (event.target.dataset.action) {
      case 'item-delete':
        this.setState({ delete: true });
        this.deleteTimer = setTimeout(
          () => this.setState({ delete: false }),
          this.timeoutDuration
        );
        break;

      case 'item-delete-no':
        clearTimeout(this.deleteTimer);
        this.setState({ delete: false });
        break;

      case 'item-delete-yes':
        clearTimeout(this.deleteTimer);
        this.setState({ deleting: true });
        break;

      default:
        break;
    }
  }

  render() {
    let classes = 'SidebarItem';
    if (this.props.isNew) {
      classes += ' SidebarItem--new';
    }
    if (this.state.delete) {
      classes += ' SidebarItem--delete';
    }
    if (this.state.deleting) {
      classes += ' SidebarItem--deleting';
    }

    const editUrl = this.props.item.getUrl('edit');
    const canDelete = window.location.pathname !== editUrl;
    const displayProp =
      this.props.itemType === 'pupil' ? this.props.sortOrder[0] : undefined;

    return (
      <li className={classes} title={this.props.item.getTooltip(displayProp)}>
        {this.state.delete ? (
          <SidebarInner
            description={this.props.item.getLabel(displayProp)}
            label={text('Delete', 'SidebarItem')}
            icon={ICON_DELETE}
          >
            <SidebarItemButton
              handleClick={this.handleClick}
              title={text('No', 'Actions')}
              action="item-delete-no"
              type="neg"
              icon={ICON_ERROR}
            />
            <SidebarItemButton
              handleClick={this.handleClick}
              title={text('Yes', 'Actions')}
              action="item-delete-yes"
              type="pos"
              icon={ICON_SUCCESS}
            />
          </SidebarInner>
        ) : (
          <SidebarInner
            description={this.props.item.getDescription()}
            icon={this.props.item.getIcon()}
            label={this.props.item.getLabel(displayProp)}
            link={this.props.item.getUrl('link')}
            linkEdit={editUrl}
          >
            {canDelete && (
              <SidebarItemButton
                handleClick={this.handleClick}
                title={text('SidebarItemDelete', 'Actions')}
                action="item-delete"
                type="neg-rollover"
                icon={ICON_DELETE}
              />
            )}
            <SidebarItemButton
              title={text('SidebarItemEdit', 'Actions')}
              action="item-edit"
              type="default"
              icon={ICON_EDIT}
              link={editUrl}
            />
          </SidebarInner>
        )}
      </li>
    );
  }
}

export default SidebarItem;
