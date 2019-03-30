// @flow

import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import SidebarInner from '../Inner/SidebarInner';
import type { SidebarBuilderItemType } from '../../../types/sidebarBuilderItem';
import type { SidebarListTypes } from '../../../types/sidebarList';
import { ICON_CONTRACT, ICON_EXPAND } from '../../../constants/icons';
import { text } from '../../Translation/Translation';
import '../Item/SidebarItem.css';
import './SidebarBuilderItem.css';

type Props = {
  description: ?(pupilId: string, classId: string) => string | null,
  item: SidebarBuilderItemType,
  itemType: SidebarListTypes,
  sortOrder: string[],
};

type State = {
  open: boolean,
};

class SidebarBuilderItem extends Component<Props, State> {
  static defaultProps = {
    description: null,
    itemType: 'class',
  };

  props: Props;
  state: State = {
    open: false,
  };

  handleExpandClick = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    event.preventDefault();
    if (this.props.item.pupils.length > 0) {
      this.setState({ open: !this.state.open });
    }
  };

  render() {
    const { classRec, pupils } = this.props.item;

    return (
      <li
        className={classNames('SidebarItem', 'SidebarBuilderItem', {
          'SidebarBuilderItem--open': this.state.open,
          'SidebarBuilderItem--active': pupils.length > 0,
          'SidebarBuilderItem--inactive': pupils.length < 1,
          ['SidebarItem--type-' + classRec.type]: classRec.type,
        })}
        title={classRec.getTooltip()}
      >
        <SidebarInner
          description={classRec.getDescription()}
          icon={classRec.getIcon()}
          id={classRec.id}
          label={classRec.getLabel()}
          type={classRec.type}
          onClick={this.handleExpandClick}
        >
          <span className="SidebarItem_expander" title={text('Expand', 'Actions')}>
            <Icon type={ICON_EXPAND} />
          </span>
          <span className="SidebarItem_contractor" title={text('Contract', 'Actions')}>
            <Icon type={ICON_CONTRACT} />
          </span>
        </SidebarInner>
        {this.state.open && (
          <ul className="SidebarBuilderItem__sub">
            {pupils.map(pupil => {
              return (
                <li className="SidebarItem" key={pupil.id} title={pupil.getTooltip(this.props.sortOrder[0])}>
                  <SidebarInner
                    description={
                      this.props.description
                        ? String(this.props.description(pupil.id, pupil.classId))
                        : pupil.getDescription()
                    }
                    icon={pupil.getIcon()}
                    id={pupil.id}
                    label={pupil.getLabel(this.props.sortOrder[0])}
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
