// @flow

import * as React from 'react';
import type { Tag } from '../../../types/ui';
import './TagList.css';

const NS: string = 'TagList';

export type Props = {
  onClick: (tag: Tag) => (event: SyntheticMouseEvent<HTMLElement> | SyntheticInputEvent<HTMLElement>) => void,
  tags: Tag[],
};

export class TagList extends React.Component<Props> {
  static defaultProps = {
    onClick: (tag: Tag) => (event: SyntheticMouseEvent<HTMLElement> | SyntheticInputEvent<HTMLElement>) => {},
  };

  props: Props;

  render() {
    return (
      <ul className={NS}>
        {this.props.tags.map((tag: Tag) => (
          <li key={tag.id} className="TagList__tag" onClick={tag.onClick(tag)} title={tag.tooltip}>
            {tag.label}
          </li>
        ))}
      </ul>
    );
  }
}

export default TagList;
