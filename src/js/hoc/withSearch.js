// @flow

import * as React from 'react';
import { getDisplayName } from '../utils/strings';

type Searchkey = {
  anywhere: boolean,
  page: number,
  term: string,
  visible: boolean,
};

export type SearchkeyProp = {
  ...Searchkey,
  anywhereIconClick: (event: SyntheticMouseEvent<HTMLElement>) => void,
  pageChange: (page: number) => void,
  searchChange: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  searchIconClick: (event: SyntheticEvent<EventTarget>) => void,
};

type SearchkeyProps = {
  [key: string]: SearchkeyProp,
};

type State = {
  [key: string]: Searchkey,
};

export type WithSearchProps = {
  search: SearchkeyProps,
};

export type WithSearchDiffProps = {
  search: SearchkeyProps | void,
};

function withSearch<PassedProps: {}>(
  WrappedComponent: React.AbstractComponent<PassedProps>,
  searchKeys: string[]
): React.AbstractComponent<$Diff<PassedProps, WithSearchDiffProps>> {
  class WithSearch extends React.Component<PassedProps, State> {
    props: $Diff<PassedProps, WithSearchDiffProps>;
    state: State = searchKeys.reduce(function(curState: State, searchKey: string) {
      return {
        ...curState,
        [searchKey]: {
          anywhere: false,
          page: 1,
          term: '',
          visible: false,
        },
      };
    }, {});

    handleAnywhereIconClick = (event: SyntheticMouseEvent<HTMLElement>, searchKey: string): void => {
      this.setState({ [searchKey]: { ...this.state[searchKey], anywhere: !this.state[searchKey].anywhere } });
    };

    handlePageChange = (page: number, searchKey: string): void => {
      this.setState({ [searchKey]: { ...this.state[searchKey], page } });
    };

    handleSearchIconClick = (event: SyntheticEvent<EventTarget>, searchKey: string): void => {
      const searchVisible: boolean = !this.state[searchKey].visible;
      if (searchVisible === false) {
        this.setState({
          [searchKey]: { ...this.state[searchKey], anywhere: false, page: 1, term: '', visible: searchVisible },
        });
      } else {
        this.setState({ [searchKey]: { ...this.state[searchKey], visible: searchVisible } });
      }
    };

    handleSearchChange = (event: SyntheticKeyboardEvent<HTMLInputElement>, searchKey: string): void => {
      if (event.type === 'keyup') {
        if (event.key === 'Escape') {
          this.handleSearchIconClick(event, searchKey);
        }
      } else {
        const searchTerm = event.currentTarget.value;

        if (searchTerm !== this.state.searchTerm) {
          this.setState({ [searchKey]: { ...this.state[searchKey], page: 1, term: searchTerm } });
        } else {
          this.setState({ [searchKey]: { ...this.state[searchKey], term: searchTerm } });
        }
      }
    };

    // TODO - fix curSearch type
    render() {
      return (
        <WrappedComponent
          {...this.props} // PassedProps
          search={Object.keys(this.state).reduce((curSearch: Object, searchKey: string) => {
            return {
              ...curSearch,
              [searchKey]: {
                ...this.state[searchKey],
                anywhereIconClick: (event: SyntheticMouseEvent<HTMLElement>) => {
                  this.handleAnywhereIconClick(event, searchKey);
                },
                pageChange: (page: number) => {
                  this.handlePageChange(page, searchKey);
                },
                searchChange: (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
                  this.handleSearchChange(event, searchKey);
                },
                searchIconClick: (event: SyntheticEvent<EventTarget>) => {
                  this.handleSearchIconClick(event, searchKey);
                },
              },
            };
          }, {})}
        />
      );
    }
  }

  WithSearch.displayName = getDisplayName('WithSearch', WrappedComponent);

  return WithSearch;
}

export default withSearch;
