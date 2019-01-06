// @flow

import React from 'react';
import { shallow } from 'enzyme';
import DeleteCategoriesLayout from './DeleteCategoriesLayout';
import { ROUTE_CATEGORIES } from '../../../constants/routes';

describe('<DeleteCategoriesLayout />', () => {
  const props = {
    dispatch: jest.fn(),
    history: {
      push: jest.fn(),
    },
    location: {},
    match: {},
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<DeleteCategoriesLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('form__submsg is hidden when state.deleting = true', () => {
    const wrapper = shallow(<DeleteCategoriesLayout {...props} />);
    const instance = wrapper.instance();

    expect(wrapper.find('.form__submsg')).toHaveLength(1);
    expect(wrapper.state().deleting).toBe(false);

    instance.componentDidUpdate = jest.fn();
    wrapper.setState({ deleting: true });

    expect(wrapper.state().deleting).toBe(true);
    expect(wrapper.find('.form__submsg')).toHaveLength(0);
    expect(wrapper.instance().componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('dataSaved() handles success correctly', () => {
    const wrapper = shallow(<DeleteCategoriesLayout {...props} />);
    const instance = wrapper.instance();

    instance.dataSaved({ success: true });
    expect(props.history.push).toHaveBeenCalledTimes(1);

    instance.dataSaved({ success: false });
    expect(wrapper.state().error).toBe(true);
  });

  test('handleClick() sets state.deleting to true', () => {
    const wrapper = shallow(<DeleteCategoriesLayout {...props} />);
    const instance = wrapper.instance();
    const mockPreventDefault = jest.fn();
    instance.componentDidUpdate = jest.fn();

    instance.handleClick({ preventDefault: mockPreventDefault });
    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    expect(wrapper.state().deleting).toBe(true);
  });

  describe('componentDidUpdate():', () => {
    test('state.error pushes a route to history', () => {
      const wrapper = shallow(<DeleteCategoriesLayout {...props} />);
      const instance = wrapper.instance();

      wrapper.setState({ error: true });
      instance.componentDidUpdate({}, {});
      expect(props.history.push).toHaveBeenCalledWith(ROUTE_CATEGORIES);
    });

    test('state.deleting calls props.dispatch', () => {
      const mockDispatch = jest.fn();
      const wrapper = shallow(
        <DeleteCategoriesLayout {...props} dispatch={mockDispatch} />
      );
      const instance = wrapper.instance();

      wrapper.setState({ deleting: true });
      instance.componentDidUpdate({}, {});
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
