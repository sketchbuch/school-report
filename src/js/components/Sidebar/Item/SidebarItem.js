// @flow

import React, { Component } from 'react';
import classNames from 'classnames';
import SidebarInner from '../Inner/SidebarInner';
import SidebarItemButton from '../Button/SidebarItemButton';
import type { ClassType } from '../../../types/class';
import type { PupilType } from '../../../types/pupil';
import type { ReportType } from '../../../types/report';
import type { SidebarListTypes } from '../../../types/sidebarList';
import type { TextType } from '../../../types/text';
import { ICON_DELETE, ICON_EDIT, ICON_ERROR, ICON_SUCCESS } from '../../../constants/icons';
import { text } from '../../Translation/Translation';
import './SidebarItem.css';

// TODO - Move to external type
type DomainTypes = ClassType | PupilType | ReportType | TextType;

// TODO - Update types
type Props = {
  description: ?(config?: Object) => string | null,
  isNew: boolean,
  item: DomainTypes,
  itemDuration: number,
  itemType: SidebarListTypes,
  onDelete: Function,
  sortOrder: string[],
  updateExistingItems: Function,
};

type State = {
  delete: boolean,
  deleting: boolean,
  confirmed: boolean,
};

class SidebarItem extends Component<Props, State> {
  static defaultProps = {
    description: null,
    isNew: false,
    itemDuration: 0,
    itemType: 'class',
    onDelete: () => {},
    updateExistingItems: () => {},
  };

  props: Props;
  state: State = {
    delete: false,
    deleting: false,
    confirmed: false,
  };
  deleteTimer: TimeoutID;
  deletingTimer: TimeoutID;
  newTimer: TimeoutID;
  timeoutDuration: number = 3000;

  componentDidMount() {
    if (this.props.isNew) {
      this.newTimer = setTimeout(() => {
        console.log('this.props.item', this.props.item);
        this.props.updateExistingItems(this.props.item.id);
      }, this.props.itemDuration);
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.confirmed) {
      this.props.onDelete(this.props.item.id);
    } else if (this.state.deleting) {
      this.deletingTimer = setTimeout(() => this.setState({ confirmed: true }), this.props.itemDuration);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.deleteTimer);
    clearTimeout(this.deletingTimer);
    clearTimeout(this.newTimer);
  }

  handleClick = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    event.preventDefault();

    switch (event.target.dataset.action) {
      case 'item-delete':
        this.setState({ delete: true });
        this.deleteTimer = setTimeout(() => this.setState({ delete: false }), this.timeoutDuration);
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
  };

  render() {
    const editUrl: string = this.props.item.getUrl('edit');
    const canDelete: boolean = window.location.pathname !== editUrl;
    const displayProp: ?string = this.props.itemType === 'pupil' ? this.props.sortOrder[0] : undefined;

    return (
      <li
        className={classNames('SidebarItem', {
          'SidebarItem--delete': this.state.delete,
          'SidebarItem--deleting': this.state.deleting,
          'SidebarItem--new': this.props.isNew,
          ['SidebarItem--type-' + this.props.item.type]: this.props.item.type,
        })}
        title={this.props.item.getTooltip(displayProp)}
      >
        {this.state.delete ? (
          <SidebarInner
            description={this.props.item.getLabel(displayProp)}
            icon={ICON_DELETE}
            id={this.props.item.id}
            label={text('Delete', 'SidebarItem')}
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
            description={this.props.description ? String(this.props.description()) : this.props.item.getDescription()}
            icon={this.props.item.getIcon()}
            id={this.props.item.id}
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
