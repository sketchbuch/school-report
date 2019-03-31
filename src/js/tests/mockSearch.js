// @flow

import type { WithSearchProps } from '../hoc/withSearch';

const mockSearch: WithSearchProps = {
  search: {
    anywhere: false,
    anywhereIconClick: jest.fn(),
    externalUpdate: jest.fn(),
    page: 1,
    pageChange: jest.fn(),
    searchChange: jest.fn(),
    searchIconClick: jest.fn(),
    term: '',
    visible: false,
  },
};

export default mockSearch;
