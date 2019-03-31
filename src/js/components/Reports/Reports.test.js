// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import ConnectedReports from './Reports';
import categoryDefault, { CategoryFactory } from '../../types/category';
import classDefault, { ClassFactory } from '../../types/class';
import pupilDefault, { PupilFactory } from '../../types/pupil';
import reportDefault, { ReportFactory } from '../../types/report';
import store from '../../store/redux';
import textDefault, { TextFactory } from '../../types/text';
import type { CategoryType } from '../../types/category';
import type { ClassType } from '../../types/class';
import type { Props } from './Reports';
import type { PupilType } from '../../types/pupil';
import type { ReportType } from '../../types/report';
import type { TextType } from '../../types/text';

describe('<Reports />', () => {
  const ACTIVE_REPORT: ReportType = ReportFactory({ ...reportDefault, label: 'Test Report' }, Date.now());
  const ACTIVE_CLASS: ClassType = ClassFactory({ ...classDefault, label: 'Latimer Yr.1' }, Date.now());
  const ACTIVE_PUPIL: PupilType = PupilFactory(
    { ...pupilDefault, firstname: 'Dr', lastname: 'Who' },
    Date.now(),
    ACTIVE_CLASS.id
  );
  const texts: TextType[] = [
    TextFactory({ ...textDefault, bodytext: 'Red Dwarf', categories: [] }, Date.now(), 'EN'),
    TextFactory({ ...textDefault, bodytext: 'Blue Midget', categories: [] }, Date.now(), 'EN'),
    TextFactory({ ...textDefault, bodytext: 'Starbug', categories: [] }, Date.now(), 'EN'),
  ];
  const categories: CategoryType[] = [
    CategoryFactory({ ...categoryDefault, label: 'Lister' }, Date.now()),
    CategoryFactory({ ...categoryDefault, label: 'Rimmer' }, Date.now()),
    CategoryFactory({ ...categoryDefault, label: 'The Cat' }, Date.now()),
  ];
  const props: Props = {
    activeClass: ACTIVE_CLASS,
    activePupil: ACTIVE_PUPIL,
    activeReport: ACTIVE_REPORT,
    categories,
    disableTexts: false,
    saveReports: jest.fn(),
    selected: [],
    texts,
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ConnectedReports {...props} />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });
});
