//@flow

import React, { PureComponent } from 'react';
import Icon from '../../Icon/Icon';
import type { DomainType } from '../../../types/domain';
import { ICON_SUCCESS } from '../../../constants/icons';
import './ItemList.css';

// TODO - fix types
export type Props = {
  form: Object,
  insert: Function,
  items: DomainType[],
  move: Function,
  name: string,
  pop: Function,
  push: Function,
  remove: Function,
  selected: string[],
  swap: Function,
  unshift: Function,
};

class ItemList extends PureComponent<Props> {
  static defaultProps = {
    items: [], // Already sorted for display.
    name: '',
    selected: [], // IDs from the domain objects.
    totalCount: 0,
  };

  props: Props;

  render() {
    const { items, name, push, remove, selected } = this.props;

    return (
      <ul className="ItemList">
        {items.map(item => {
          return (
            <li className="ItemList__item" key={item.id} title={item.getTooltip()}>
              <label className="ItemList__itemLabel">
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
                  <span className="ItemList__iconItem">
                    <Icon type={item.getIcon()} />
                  </span>
                  <span className="ItemList__text">
                    <span className="ItemList__label">{item.getLabel()}</span>
                    <span className="ItemList__description">{item.getDescription()}</span>
                  </span>
                  {selected.includes(item.id) && (
                    <span className="ItemList__iconSelected">
                      <Icon type={ICON_SUCCESS} />
                    </span>
                  )}
                </div>
              </label>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ItemList;
