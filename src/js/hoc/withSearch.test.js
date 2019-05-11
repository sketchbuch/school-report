// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import withSearch, { defaultState } from './withSearch';

type DummyComponentProps = {
  title: string,
};

const testFunctionIsInProps = (
  functionName: string,
  props: DummyComponentProps,
  Component: React.AbstractComponent<*>
): void => {
  test(`Search props contains the function "${functionName}"`, () => {
    const wrapper = shallow(<Component {...props} />);
    const wrapperProps = wrapper.props();
    expect(wrapperProps.search).toHaveProperty(functionName);
    expect(wrapperProps.search[functionName]).toBeInstanceOf(Function);
  });
};

describe('withSearch() HOC', () => {
  const props: DummyComponentProps = {
    title: 'The title',
  };

  const DummyComponent = (props: DummyComponentProps): React.Element<*> => {
    return <div>{props.title}</div>;
  };
  const DummyComponentWithSearch: React.AbstractComponent<*> = withSearch(DummyComponent);

  test('Renders without crashing', () => {
    const wrapper = shallow(<DummyComponentWithSearch {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  describe('WrappedComponent props:', () => {
    test('Has own props', () => {
      const wrapper = shallow(<DummyComponentWithSearch {...props} />);
      const wrapperProps = wrapper.props();
      expect(wrapperProps).toHaveProperty('title');
      expect(wrapperProps.title).toBe(props.title);
    });

    test('Has search props', () => {
      const wrapper = shallow(<DummyComponentWithSearch {...props} />);
      const wrapperProps = wrapper.props();
      expect(wrapperProps).toHaveProperty('search');
    });

    test('Search props contain state', () => {
      const wrapper = shallow(<DummyComponentWithSearch {...props} />);
      const wrapperProps = wrapper.props();
      expect(JSON.parse(JSON.stringify(wrapperProps)).search).toEqual(defaultState);
    });

    describe('handleChange function:', () => {
      testFunctionIsInProps('handleChange', props, DummyComponentWithSearch);

      test('state.term updated without changing page if state.term === value', () => {
        const mockEvent = {
          currentTarget: {
            value: '',
          },
        };

        const wrapper = shallow(<DummyComponentWithSearch {...props} />);
        const wrapperProps = wrapper.props().search;
        expect(wrapper.state().term).toBe(defaultState.term);

        wrapper.setState({ page: 2 });
        wrapper.update();
        wrapperProps.handleChange(mockEvent);

        wrapper.update();
        expect(wrapper.state().term).toBe(mockEvent.currentTarget.value);
        expect(wrapper.state().page).toBe(2);
      });

      test('state.term & state.page updated if state.term !== value', () => {
        const mockEvent = {
          currentTarget: {
            value: 'elphaba',
          },
        };

        const wrapper = shallow(<DummyComponentWithSearch {...props} />);
        const wrapperProps = wrapper.props().search;
        expect(wrapper.state().term).toBe(defaultState.term);

        wrapper.setState({ page: 2 });
        wrapper.update();
        expect(wrapper.state().page).toBe(2);

        wrapperProps.handleChange(mockEvent);
        wrapper.update();
        expect(wrapper.state().term).toBe(mockEvent.currentTarget.value);
        expect(wrapper.state().page).toBe(1);
      });
    });

    describe('handleKeyUp function:', () => {
      testFunctionIsInProps('handleKeyUp', props, DummyComponentWithSearch);

      test('Does not call toggleVisibility() when key is not "Escape"', () => {
        const mockEvent = {
          key: 'a',
        };

        const wrapper = shallow(<DummyComponentWithSearch {...props} />);
        wrapper.instance().toggleVisibility = jest.fn();
        const wrapperProps = wrapper.props().search;
        wrapperProps.handleKeyUp(mockEvent);
        expect(wrapper.instance().toggleVisibility).not.toHaveBeenCalled();
      });

      test('Does call toggleVisibility() when key is "Escape"', () => {
        const mockEvent = {
          key: 'Escape',
        };

        const wrapper = shallow(<DummyComponentWithSearch {...props} />);
        wrapper.instance().toggleVisibility = jest.fn();
        const wrapperProps = wrapper.props().search;
        wrapperProps.handleKeyUp(mockEvent);
        expect(wrapper.instance().toggleVisibility).toHaveBeenCalled();
      });
    });

    describe('handlePageChange function:', () => {
      testFunctionIsInProps('handlePageChange', props, DummyComponentWithSearch);

      test('Updates state.page correctly', () => {
        const wrapper = shallow(<DummyComponentWithSearch {...props} />);
        const wrapperProps = wrapper.props().search;
        expect(wrapper.state().page).toBe(defaultState.page);

        wrapperProps.handlePageChange(2);
        wrapper.update();
        expect(wrapper.state().page).toBe(2);
      });
    });

    describe('handleReset function:', () => {
      testFunctionIsInProps('handleReset', props, DummyComponentWithSearch);

      test('Resets state correctly to default', () => {
        const wrapper = shallow(<DummyComponentWithSearch {...props} />);
        const wrapperProps = wrapper.props().search;
        wrapper.setState({
          anywhere: true,
          page: 2,
          term: 'Oz',
        });
        wrapper.update();
        wrapperProps.handleReset();
        wrapper.update();
        expect(wrapper.state()).toEqual(defaultState);
      });

      test('Resets state correctly to default but uses newVisibility', () => {
        const newVisibility: boolean = true;
        const wrapper = shallow(<DummyComponentWithSearch {...props} />);
        const wrapperProps = wrapper.props().search;
        wrapper.setState({
          anywhere: true,
          page: 2,
          term: 'Oz',
        });
        wrapper.update();
        wrapperProps.handleReset(newVisibility);
        wrapper.update();
        expect(wrapper.state()).toEqual({ ...defaultState, visible: newVisibility });
      });
    });

    describe('handleToggleAnywhere function:', () => {
      testFunctionIsInProps('handleToggleAnywhere', props, DummyComponentWithSearch);

      test('Inverts state.anywhere', () => {
        const wrapper = shallow(<DummyComponentWithSearch {...props} />);
        const wrapperProps = wrapper.props().search;
        expect(wrapper.state().anywhere).toBe(false);

        wrapperProps.handleToggleAnywhere({});
        wrapper.update();
        expect(wrapper.state().anywhere).toBe(true);

        wrapperProps.handleToggleAnywhere({});
        wrapper.update();
        expect(wrapper.state().anywhere).toBe(false);
      });
    });

    describe('handleToggleVisibility function:', () => {
      testFunctionIsInProps('handleToggleVisibility', props, DummyComponentWithSearch);

      test('Calls reset() if alwaysVisible', () => {
        const AlwaysVisibleWithSearch: React.AbstractComponent<*> = withSearch(DummyComponent, true);
        const wrapper = shallow(<AlwaysVisibleWithSearch {...props} />);
        wrapper.instance().reset = jest.fn();
        const wrapperProps = wrapper.props().search;
        wrapperProps.handleToggleVisibility({});
        expect(wrapper.instance().alwaysVisible).toBe(true);
        expect(wrapper.instance().reset).toHaveBeenCalled();
      });

      test('Calls reset() if state.visible === true', () => {
        const wrapper = shallow(<DummyComponentWithSearch {...props} />);
        wrapper.instance().reset = jest.fn();
        const wrapperProps = wrapper.props().search;
        wrapper.setState({ visible: true });
        wrapper.update();
        wrapperProps.handleToggleVisibility({});
        expect(wrapper.instance().reset).toHaveBeenCalled();
      });

      test('Updates state.visible to true if state.visible === false', () => {
        const wrapper = shallow(<DummyComponentWithSearch {...props} />);
        const wrapperProps = wrapper.props().search;
        wrapperProps.handleToggleVisibility({});
        expect(wrapper.state().visible).toBe(true);
      });
    });
  });
});
