// @flow

import React, { Component } from 'react';
import NoItems from '../../NoItems/NoItems';
import SidebarItem from '../Item/SidebarItem';
import SidebarBuilderItem from '../BuilderItem/SidebarBuilderItem';
import type { SidebarListTypes } from '../../../types/sidebarList';
import { sortObjectsAz } from '../../../utils/sort';
import { getCustomNumProp } from '../../../utils/dom';
import * as categoryActions from '../../../actions/categoryActions';
import * as classActions from '../../../actions/classActions';
import * as pupilActions from '../../../actions/pupilActions';
import * as reportActions from '../../../actions/reportActions';
import * as textActions from '../../../actions/textActions';
import './SidebarList.css';

type Props = {
  builder: boolean,
  dispatch: Function,
  items: Array<Object>;
  listType: SidebarListTypes,
  noItemsTxt: string,
  sortOrder: Array<string>,
};

type State = {
  existingItems: Array<string>,
}

const actions = {
  'category': categoryActions,
  'class': classActions,
  'pupil': pupilActions,
  'report': reportActions,
  'text': textActions,
};


/**
* Sidebar list of items
*/
class SidebarList extends Component<Props, State> {
  static defaultProps = {
    builder: false,
    items: [],
    listType: 'class',
    sortOrder: ['updated'],
  };

  props: Props;
  state: State;
  existingItems: Array<string>;
  itemDuration: number;
  onDelete: Function;
  updateExistingItems: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      existingItems: [],
    };

    this.props.items.forEach(item => {
      if (!this.state.existingItems.includes(item.id)) this.state.existingItems.push(item.id);
    });

    this.itemDuration = getCustomNumProp('--sidebaritem-ms');
    this.onDelete = (id: string, callback?: Function) => this.props.dispatch(actions[this.props.listType].deleteOne(id, callback));
    this.onDelete = this.onDelete.bind(this);
    this.updateExistingItems = this.updateExistingItems.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.items.length < 1 && prevProps.items.length > 0) this.setState({ existingItems: [] });
  }

  /**
  * Updates the local state of existing items. Called by an item after its new animation finishes.
  *
  * @param string itemId The ID of a new item for the existing items.
  */
  updateExistingItems(itemId: string) {
    if (!this.state.existingItems.includes(itemId)) this.setState({ existingItems: [...this.state.existingItems, itemId] });
  }

  renderContent() {
    if (this.props.items.length > 0) {
      const sortedItems = sortObjectsAz(this.props.items, this.props.sortOrder);

      return (
        <ul className="SidebarList" data-type={this.props.listType}>
          {sortedItems.map(item => {
            if (this.props.builder) {
              return <SidebarBuilderItem item={item} itemType={this.props.listType} key={item.id} />;
            } else {
              return <SidebarItem
                isNew={!this.state.existingItems.includes(item.id)}
                item={item}
                itemDuration={this.itemDuration}
                itemType={this.props.listType}
                key={item.id}
                onDelete={this.onDelete}
                updateExistingItems={this.updateExistingItems}
              />;
            }
          })}
        </ul>
      )
    } else {
      return <NoItems message={this.props.noItemsTxt} />
    }
  }

  render() {
    return this.renderContent()
  }
}


export default SidebarList;
