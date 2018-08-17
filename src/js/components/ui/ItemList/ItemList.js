//@flow

import React, { Component } from 'react';
import Icon from '../../Icon/Icon';
import NoItems from '../../NoItems/NoItems';
import Translation  from '../../Translation/Translation';
import type { ClassType } from '../../../types/class';
import type { PupilType } from '../../../types/pupil';
import type { ReportType } from '../../../types/report';
import type { TextType } from '../../../types/text';
import { ICON_SUCCESS } from '../../../constants/icons';
import './ItemList.css';

type DomainTypes = ClassType | PupilType | ReportType | TextType;

type Props = {
  form: Object,
  insert: Function,
  items: Array<DomainTypes>, // Items, could be filtered so length != totalCount.
  move: Function,
  name: string,
  pop: Function,
  push: Function,
  remove: Function,
  selected: Array<string>,
  swap: Function,
  totalCount: number, // Total number of items
  unshift: Function,
};


/**
* A list of items for selection.
*/
class ItemList extends Component<Props> {
  static defaultProps = {
    items: [], // Already sorted for display.
    name: '',
    selected: [], // IDs from the domain objects.
    totalCount: 0,
  };

  props: Props;

  render() {
    const {
      items,
      name,
      push,
      remove,
      selected,
      totalCount,
    } = this.props;
    const labelName = (totalCount === 0) ? 'None' : 'NoItems';

    return (
      <div className="ItemList">
        {totalCount > 0 && items.length > 0 ? (
          items.map(item => {
            return (
              <label className="ItemList__item" key={item.id} title={item.getTooltip()}>
                <input
                  type="checkbox"
                  value={item.id}
                  name={name}
                  checked={selected.includes(item.id)}
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    if (event.target.checked) {
                      push(item.id);
                    } else {
                      remove(selected.indexOf(item.id));
                    }
                  }}
                />
                <div className="ItemList__inner" key={item.id} title={item.getTooltip()}>
                  {selected.includes(item.id) ? (<Icon type={ ICON_SUCCESS } />) : (<Icon type={item.getIcon()} />)}
                  <span className="ItemList__label">{item.getLabel()}</span>
                  <span className="ItemList__description">{item.getDescription()}</span>
                </div>
              </label>
            )
          })
        ) : (
          <NoItems><Translation name={ labelName } ns="ItemList" placeholders={{ NAME: name }} /></NoItems>
        )}
      </div>
    )
  }
}


export default ItemList;
