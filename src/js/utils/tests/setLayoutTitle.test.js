// @flow

import setLayoutTitle from '../setLayoutTitle';
import setTitle from '../setTitle';

jest.mock('../setTitle');

describe('Util: setLayoutTitle()', () => {
  const TITLE: string = 'Stranger Things';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should call setTitle() correctly', () => {
    setLayoutTitle(TITLE);
    expect(setTitle).toHaveBeenCalledTimes(1);
    expect(setTitle).toHaveBeenCalledWith(TITLE);
  });

  describe('With route:', () => {
    const ROUTE: string = '/demogorgon';

    test('Does not call setTitle() if route is NOT a match', () => {
      setLayoutTitle(TITLE, ROUTE);
      expect(setTitle).not.toHaveBeenCalled();
    });

    test('Calls setTitle() if route is a match', () => {
      const location = window.location;
      delete window.location;
      window.location = { pathname: ROUTE };

      setLayoutTitle(TITLE, ROUTE);
      expect(setTitle).toHaveBeenCalledTimes(1);
      expect(setTitle).toHaveBeenCalledWith(TITLE);

      window.location = location;
    });
  });
});
