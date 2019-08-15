// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

type Renderer = (additionalProps: Object) => React.Element<*>;

const testButtonDisablement = (key: string, renderer: Renderer) => {
  describe(`Submit button activation for ${key}:`, () => {
    test(`Enabled if ${key} is valid`, () => {
      const wrapper = shallow(renderer({ saving: false, dirty: true }));
      const button = wrapper.find('Button');
      expect(button.prop('disabled')).toBe(false);
    });

    test(`Disabled if ${key} is invalid`, () => {
      const wrapper = shallow(
        renderer({ saving: false, dirty: true, errors: { [key]: true }, touched: { [key]: true } })
      );
      const button = wrapper.find('Button');
      expect(button.prop('disabled')).toBe(true);
    });
  });
};

const testFieldErrors = (key: string, renderer: Renderer) => {
  describe(`${key} FieldError:`, () => {
    test(`Not rendered if "${key}" is valid`, () => {
      const wrapper = shallow(renderer());
      expect(wrapper.find('FieldError')).toHaveLength(0);
    });

    test(`Rendered if "${key}" is invalid`, () => {
      const wrapper = shallow(renderer({ errors: { [key]: true }, touched: { [key]: true } }));
      expect(wrapper.find('FieldError')).toHaveLength(1);
    });
  });
};

const formTests = (renderer: Renderer, validations: string[] = [], fieldErrors: string[] = []) => {
  const wrapper = shallow(renderer());

  test('Renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  test('Renders a Form', () => {
    expect(wrapper.find('Form')).toHaveLength(1);
  });

  test('Renders a submit Button', () => {
    const button = wrapper.find('Button[type="submit"]');
    expect(button).toHaveLength(1);
  });

  describe('Props:', () => {
    describe('isNew:', () => {
      test('Submit button displays "Create" label', () => {
        const wrapper = shallow(renderer({ isNew: true }));
        const btnTrans = wrapper.find('Button[type="submit"]').find('Translation');
        expect(btnTrans.prop('name').includes('Create')).toBe(true);
      });

      test('Submit button displays "Update" label', () => {
        const wrapper = shallow(renderer());
        const btnTrans = wrapper.find('Button[type="submit"]').find('Translation');
        expect(btnTrans.prop('name').includes('Update')).toBe(true);
      });
    });

    describe('saving:', () => {
      test('false, renders a FormCancel', () => {
        const wrapper = shallow(renderer({ saving: false }));
        expect(wrapper.find('FormCancel')).toHaveLength(1);
      });
      test('true does not render a FormCancel', () => {
        const wrapper = shallow(renderer({ saving: true }));
        expect(wrapper.find('FormCancel')).toHaveLength(0);
      });
    });
  });

  if (validations && validations.length > 0) {
    validations.forEach((key: string) => {
      testButtonDisablement(key, renderer);
    });
  }

  describe('Submit button:', () => {
    test('Disabled if saving', () => {
      const wrapper = shallow(renderer({ saving: true }));
      const button = wrapper.find('Button');
      expect(button.prop('disabled')).toBe(true);
    });

    test('Disabled if !dirty', () => {
      const wrapper = shallow(renderer({ dirty: false }));
      const button = wrapper.find('Button');
      expect(button.prop('disabled')).toBe(true);
    });

    test('Enabled if dirty', () => {
      const wrapper = shallow(renderer({ dirty: true }));
      const button = wrapper.find('Button');
      expect(button.prop('disabled')).toBe(false);
    });
  });

  if (fieldErrors && fieldErrors.length > 0) {
    fieldErrors.forEach((key: string) => {
      testFieldErrors(key, renderer);
    });
  }
};

export default formTests;
