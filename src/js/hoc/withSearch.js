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
  handleChange: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  handleKeyUp: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  handlePageChange: (page: number) => void,
  handleReset: (newState: State) => void,
  handleToggleAnywhere: (event: SyntheticMouseEvent<HTMLElement>) => void,
  handleToggleVisibility: (event: SyntheticEvent<EventTarget>) => void,
};

export type WithSearchPropsDiff = {
  search: SearchProps | void,
};

export type WithSearchProps = {
  search: SearchProps,
};

export const defaultState: State = {
  anywhere: false,
  page: 1,
  term: '',
  visible: false,
};

const withSearch = <PassedProps: {}>(
  WrappedComponent: React.AbstractComponent<PassedProps>,
  alwaysVisible: boolean = false
): React.AbstractComponent<$Diff<PassedProps, WithSearchPropsDiff>> => {
  class WithSearch extends React.Component<PassedProps, State> {
    props: $Diff<PassedProps, WithSearchPropsDiff>;
    state: State = { ...defaultState };
    alwaysVisible: boolean = alwaysVisible;

    change = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
      const term = event.currentTarget.value;

      if (term !== this.state.term) {
        this.setState({ page: 1, term });
      } else {
        this.setState({ term });
      }
    };

    keyUp = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
      if (event.key === 'Escape') {
        this.toggleVisibility(event);
      }
    };

    pageChange = (page: number): void => {
      this.setState({ page });
    };

    reset = (newVisibility?: boolean): void => {
      this.setState({
        anywhere: false,
        page: 1,
        term: '',
        visible: newVisibility != null ? newVisibility : this.state.visible,
      });
    };

    toggleAnywhere = (event: SyntheticMouseEvent<HTMLElement>): void => {
      this.setState({ anywhere: !this.state.anywhere });
    };

    toggleVisibility = (event: SyntheticEvent<EventTarget>): void => {
      if (this.alwaysVisible) {
        this.reset(true);
        return;
      }

      const visible: boolean = !this.state.visible;

      if (visible === false) {
        this.reset(visible);
      } else {
        this.setState({ visible });
      }
    };

    render() {
      return (
        <WrappedComponent
          {...this.props} // PassedProps
          search={{
            ...this.state,
            handleChange: this.change,
            handleKeyUp: this.keyUp,
            handlePageChange: this.pageChange,
            handleReset: this.reset,
            handleToggleAnywhere: this.toggleAnywhere,
            handleToggleVisibility: this.toggleVisibility,
          }}
        />
      );
    }
  }

  WithSearch.displayName = getDisplayName('WithSearch', WrappedComponent);

  return WithSearch;
};

export default withSearch;
