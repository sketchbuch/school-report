// @flow

import * as React from 'react';
import type { SearchProps } from '../../../../hoc/withSearch';
import type { SidebarListTypes } from '../../../../types/sidebarList';
import { SearchField } from '../../../Ui';
import { text } from '../../../Translation/Translation';

export type Props = {
  hasSearch: boolean,
  search: SearchProps,
  domainType: SidebarListTypes,
};

const SearchBox = ({ hasSearch, search, domainType }: Props): React.Node => {
  return hasSearch ? (
    <SearchField
      anywhere={search.anywhere}
      anywhereOnClick={search.handleToggleAnywhere}
      clearOnClick={search.handleToggleVisibility}
      iconOnClick={search.handleToggleVisibility}
      onKeyUp={search.handleKeyUp}
      onChange={search.handleChange}
      placeholder={text(`SearchPlaceholder-${domainType}`, 'SidebarHeader')}
      term={search.term}
      visible={search.visible}
    />
  ) : null;
};

export default SearchBox;
