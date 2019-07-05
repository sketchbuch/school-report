// @flow

import * as React from 'react';
import type { SearchProps } from '../../../../hoc/withSearch';
import { SearchField } from '../../../Ui';

const SearchBox = (hasSearch: boolean, search: SearchProps, placeholder: string): React.Node => {
  return hasSearch ? (
    <SearchField
      anywhere={search.anywhere}
      anywhereOnClick={search.handleToggleAnywhere}
      clearOnClick={search.handleToggleVisibility}
      iconOnClick={search.handleToggleVisibility}
      onKeyUp={search.handleKeyUp}
      onChange={search.handleChange}
      placeholder={placeholder}
      term={search.term}
      visible={search.visible}
    />
  ) : null;
};

export default SearchBox;
