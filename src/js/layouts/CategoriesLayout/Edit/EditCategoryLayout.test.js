// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditCategoryLayout from './EditCategoryLayout';
import { ROUTE_CATEGORIES } from '../../../constants/routes';
import '../../../components/Translation/testData';

configure({ adapter: new Adapter() });


describe('<EditCategoryLayout />', () => {
  const props = {
    categories: [],
    dispatch: jest.fn(),
    history: {
      push: jest.fn(),
    },
    location: {},
    match: {},
  }

  test('Renders without crashing', () => {
    const wrapper = shallow(<EditCategoryLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('handleSubmit() updates state', () => {
    const wrapper = shallow(<EditCategoryLayout {...props} />);
    const instance = wrapper.instance();

    instance.componentDidUpdate = jest.fn();
    instance.handleSubmit({});
    
    expect(wrapper.state().saving).toBe(true);
    expect(wrapper.instance().componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('dataSaved() handles success correctly', () => {
    const wrapper = shallow(<EditCategoryLayout {...props} />);
    const instance = wrapper.instance();

    instance.dataSaved({ success: true });
    expect(props.history.push).toHaveBeenCalledTimes(1);

    instance.dataSaved({ success: false });
    expect(wrapper.state().error).toBe(true);
  });

  describe('componentDidUpdate():', () => {
    test('state.error pushes a route to history', () => {
      const wrapper = shallow(<EditCategoryLayout {...props} />);
      const instance = wrapper.instance();

      wrapper.setState({ error: true });
      instance.componentDidUpdate({}, {});
      expect(props.history.push).toHaveBeenCalledWith(ROUTE_CATEGORIES);
    });

    test('state.saving calls props.dispatch', () => {
      const mockDispatch =  jest.fn();
      const wrapper = shallow(<EditCategoryLayout {...props} dispatch={mockDispatch} />);
      const instance = wrapper.instance();

      wrapper.setState({ saving: true });
      instance.componentDidUpdate({}, {});
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});