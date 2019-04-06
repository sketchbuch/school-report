// @flow

import * as React from 'react';
import classNames from 'classnames';
import type { Tab, TabView } from '../../../types/ui';
import './Tabs.css';

const NS: string = 'Tabs';

export type Props = {
  selected: TabView,
  tabs: Tab[],
};

export class Tabs extends React.Component<Props> {
  static defaultProps = {
    tabs: [],
  };

  props: Props;

  render() {
    const { selected, tabs }: Props = this.props;

    return (
      <ul className={NS}>
        {tabs.map((tab: Tab) => {
          return (
            <li
              className={classNames('Tabs__tab', {
                'Tabs__tab--selected': selected === tab.view,
              })}
              key={tab.view}
              onClick={() => tab.onChange(tab.view)}
              title={tab.tooltip}
            >
              {tab.label}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Tabs;
