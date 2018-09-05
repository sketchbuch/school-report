// @flow

import {
  getDateFromTs,
} from '../export';
import type { SidebarBuilderItemType } from '../../types/sidebarBuilderItem';
import classDefault from '../../types/class';
import pupilDefault from '../../types/pupil';


/**
* FS Export Tests
*/

describe('FS: Export:', () => {
  const items = [
    {
      classRec: {...classDefault, id: 'c1', label: 'Dave Lister' },
      id: 'r1-c1',
      pupils: [],
      reportId: 'r1',
    },
    {
      classRec: {...classDefault, id: 'c2', label: 'Arnold Rimmer' },
      id: 'r1-c2',
      pupils: [
        {...pupilDefault, id: 'p1', firstname: 'John', lastname: 'Smith', classId: 'c2'},
        {...pupilDefault, id: 'p2', firstname: 'John', lastname: 'Smith', classId: 'c2'},
        {...pupilDefault, id: 'p3', firstname: 'John', lastname: 'Smith', classId: 'c2'},
      ],
      reportId: 'r1',
    },
    {
      classRec: {...classDefault, id: 'c3', label: 'The Cat' },
      id: 'r1-c3',
      pupils: [
        {...pupilDefault, id: 'p4', firstname: 'John', lastname: 'Smith', classId: 'c3'},
      ],
      reportId: 'r1',
    },
  ];

  
  test('getDateFromTs() should return a formatted date string', () => {
    const ts = Date.now();
    const result = getDateFromTs(ts);
    expect(getDateFromTs(ts)).toBe(result); // Test that both calls return the same
    expect(getDateFromTs(1536092102000)).toBe('04/09/2018'); // Fixed test
  });
});
