// @flow

import React, { Component, Fragment } from 'react';
import NoItems from '../../NoItems/NoItems';
import Translation from '../../Translation/Translation';
import SidebarItem from '../Item/SidebarItem';
import SidebarPageBrowser from '../PageBrowser/SidebarPageBrowser';
import SidebarBuilderItem from '../BuilderItem/SidebarBuilderItem';
import type { PageBrowserProps } from '../../../types/pageBrowser';
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
  description: ?(pupilId: string, classId: string) => string  | null,
  dispatch: Function,
  items: Array<Object>;
  listType: SidebarListTypes,
  noItemsTxt: string,
  pagesToShow: number,
  perPage: number,
  sortOrder: Array<string>,
  term: string,
  usePb: boolean,
};

type State = {
  curPage: number,
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
    description: null,
    items: [],
    listType: 'class',
    pagesToShow: 3,
    perPage: 20,
    sortOrder: ['updated'],
    term: '',
    usePb: false,
  };

  props: Props;
  state: State;
  existingItems: Array<string>;
  itemDuration: number;
  onDelete: Function;
  updateExistingItems: (itemId: string) => void;
  handlePbChange: (curPage: number) => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      curPage: 1,
      existingItems: [],
    };

    this.props.items.forEach(item => {
      if (!this.state.existingItems.includes(item.id)) this.state.existingItems.push(item.id);
    });

    this.itemDuration = getCustomNumProp('--sidebaritem-ms');
    this.onDelete = (id: string, callback?: Function = ()=>{}) => this.props.dispatch(actions[this.props.listType].deleteOne(id, callback));
    this.onDelete = this.onDelete.bind(this);
    this.updateExistingItems = this.updateExistingItems.bind(this);
    this.handlePbChange = this.handlePbChange.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.items.length < 1 && prevProps.items.length > 0) this.setState({ existingItems: [] });
  }

  /**
  * Updates the local state of existing items. Called by an item after its new animation finishes.
  *
  * @param string itemId The ID of a new item for the existing items.
  */
  updateExistingItems(itemId: string): void {
    if (!this.state.existingItems.includes(itemId)) this.setState({ existingItems: [...this.state.existingItems, itemId] });
  }

  handlePbChange(curPage: number) {
    this.setState({ curPage });
  }

  renderContent() {
    let sortedItems = sortObjectsAz(this.props.items, this.props.sortOrder);
    if (this.props.term !== '') sortedItems = sortedItems.filter(item => item.contains(this.props.term));
    const itemForPaging = sortedItems.length;

    if (this.props.usePb) {
      const itemstart = 0 + (this.props.perPage * (this.state.curPage - 1));
      sortedItems = sortedItems.slice(itemstart, itemstart + this.props.perPage);
    }

    if (itemForPaging > 0) {
      const showPb = this.props.usePb && itemForPaging > this.props.perPage;
      const pbProps: PageBrowserProps = {
        curPage: this.state.curPage,
        itemCount: itemForPaging,
        pagesToShow: this.props.pagesToShow,
        perPage: this.props.perPage,
      };
      let classes = 'SidebarList';
      if (showPb) classes += ' SidebarList--pb';

      return (
        <Fragment>
          <ul className={classes} data-type={this.props.listType}>
            {sortedItems.map(item => {
              if (this.props.builder) {
                return <SidebarBuilderItem description={this.props.description} item={item} itemType={this.props.listType} key={item.id} />;
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
          {showPb && <SidebarPageBrowser {...pbProps} onChange={this.handlePbChange} />}
        </Fragment>
      )
    } else if (this.props.term !== '') {
      return <NoItems><Translation name="NoneSearched" ns="SidebarList" /></NoItems>
    } else {
      return <NoItems message={this.props.noItemsTxt} />
    }
  }

  render() {
    return this.renderContent()
  }
}


export default SidebarList;
