// @flow

import * as React from 'react';
import { getDisplayName } from '../utils/strings';

type State = {
  anywhere: boolean,
  page: number,
  term: string,
  visible: boolean,
};

export type SearchProps = {
  ...State,
  anywhereIconClick: (event: SyntheticMouseEvent<HTMLElement>) => void,
  externalUpdate: (newState: State) => void,
  pageChange: (page: number) => void,
  searchChange: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  searchIconClick: (event: SyntheticEvent<EventTarget>) => void,
};

export type WithSearchPropsDiff = {
  search: SearchProps | void,
};

export type WithSearchProps = {
  search: SearchProps,
};

function withSearch<PassedProps: {}>(
  WrappedComponent: React.AbstractComponent<PassedProps>
): React.AbstractComponent<$Diff<PassedProps, WithSearchPropsDiff>> {
  class WithSearch extends React.Component<PassedProps, State> {
    props: $Diff<PassedProps, WithSearchPropsDiff>;
    state: State = {
      anywhere: false,
      page: 1,
      term: '',
      visible: false,
    };

    handleAnywhereIconClick = (event: SyntheticMouseEvent<HTMLElement>): void => {
      this.setState({ anywhere: !this.state.anywhere });
    };

    /**
     * Use only when an external event should trigger a state change (see TextLayout as an example)
     */
    handleExternalUpdate = (newState: State): void => {
      this.setState({ ...newState });
    };

    handlePageChange = (page: number): void => {
      this.setState({ page });
    };

    handleSearchIconClick = (event: SyntheticEvent<EventTarget>): void => {
      const visible: boolean = !this.state.visible;
      if (visible === false) {
        this.setState({ anywhere: false, page: 1, term: '', visible });
      } else {
        this.setState({ visible });
      }
    };

    handleSearchChange = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
      if (event.type === 'keyup') {
        if (event.key === 'Escape') {
          this.handleSearchIconClick(event);
        }
      } else {
        const term = event.currentTarget.value;

        if (term !== this.state.term) {
          this.setState({ page: 1, term });
        } else {
          this.setState({ term });
        }
      }
    };

    render() {
      return (
        <WrappedComponent
          {...this.props} // PassedProps
          search={{
            ...this.state,
            anywhereIconClick: this.handleAnywhereIconClick,
            externalUpdate: this.handleExternalUpdate,
            pageChange: this.handlePageChange,
            searchChange: this.handleSearchChange,
            searchIconClick: this.handleSearchIconClick,
          }}
        />
      );
    }
  }

  WithSearch.displayName = getDisplayName('WithSearch', WrappedComponent);

  return WithSearch;
}

export default withSearch;
