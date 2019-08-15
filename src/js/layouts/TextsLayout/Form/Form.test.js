// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import defaultFormProps from '../../../types/forms';
import formTests from '../../formTests';
import type { Props } from './Form';
import { UI_VIEW_EDIT, UI_VIEW_PREVIEW } from '../../../constants/ui';

describe('TextsLayout <Form />', () => {
  const values = { bodytext: '', categories: [] };
  const fieldErrors = { bodytext: '' };
  const props: Props = {
    ...defaultFormProps(jest),
    categories: [],
    setFieldValue: jest.fn(),
    values,
  };

  const renderer = (additionalProps: Object): React.Element<*> => {
    return <Form {...props} {...additionalProps} />;
  };

  formTests(renderer, Object.keys(values), Object.keys(fieldErrors));

  describe('Render:', () => {
    const wrapper = shallow(renderer());

    test('Renders 3 FieldWraps', () => {
      expect(wrapper.find('FieldWrap')).toHaveLength(3);
    });

    test('Renders a ItemSelection', () => {
      expect(wrapper.find('WithSearch(ItemSelection)')).toHaveLength(1);
    });

    describe('Tabs:', () => {
      test('Renders Tabs', () => {
        expect(wrapper.find('Tabs')).toHaveLength(1);
      });

      test('Tabs contain two items', () => {
        expect(
          wrapper
            .find('Tabs')
            .dive()
            .find('.Tabs__tab')
        ).toHaveLength(2);
      });
    });

    test('Renders a TagList', () => {
      expect(wrapper.find('TagList')).toHaveLength(1);
    });

    describe('State:', () => {
      test('Renders a Textarea if state.view = UI_VIEW_EDIT', () => {
        expect(wrapper.find('Textarea')).toHaveLength(1);
      });

      test('Renders a TextPreview if state.view != UI_VIEW_EDIT', () => {
        wrapper.setState({ view: UI_VIEW_PREVIEW });
        expect(wrapper.find('TextPreview')).toHaveLength(1);
        wrapper.setState({ view: UI_VIEW_EDIT });
      });
    });
  });
});
