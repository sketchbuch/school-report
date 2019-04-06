// @flow

import type { WithSearchProps } from '../hoc/withSearch';

const mockSearch: WithSearchProps = {
  search: {
    anywhere: false,
    handleChange: jest.fn(),
    handleKeyUp: jest.fn(),
    handlePageChange: jest.fn(),
    handleReset: jest.fn(),
    handleToggleAnywhere: jest.fn(),
    handleToggleVisibility: jest.fn(),
    page: 1,
    term: '',
    visible: false,
  },
};

export default mockSearch;
