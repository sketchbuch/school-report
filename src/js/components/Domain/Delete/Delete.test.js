// @flow

import React from 'react';
import { RouteComponentProps } from 'react-router';
import { shallow } from 'enzyme';
import { toastr } from 'react-redux-toastr';
import Delete from './Delete';
import setTitle from '../../../utils/setTitle';
import type { FsObject } from '../../../types/fsObject';
import type { Props } from './Delete';

jest.mock('react-redux-toastr');
jest.mock('../../../utils/setTitle');

describe('<Delete />', () => {
  const routerProps: RouteComponentProps = {
    history: {
      push: jest.fn(),
    },
  };
  const props: Props = {
    ...routerProps,
    actionDeleteAll: jest.fn(),
    butCancelName: 'Name',
    butCancelNs: 'Ns',
    butDeleteLabel: 'Delete',
    dispatch: jest.fn(),
    domainType: 'catgeory',
    editPanelTitle: 'Delete Records',
    formHeadline: 'Headline',
    formHeadlineDeleting: 'Headline Deleting',
    persistenceErrorMsg: 'Error',
    persistenceSuccessMsg: 'Success',
    redirectRoute: '/test',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renders without crashing', () => {
    const wrapper = shallow(<Delete {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  describe('Lifecycle Methods:', () => {
    describe('componentDidMount():', () => {
      test('Calls setPageTitle()', () => {
        shallow(<Delete {...props} />);
        expect(setTitle).toHaveBeenCalledTimes(1);
      });
    });

    describe('componentDidUpdate():', () => {
      const wrapper = shallow(<Delete {...props} />);

      test('Calls setPageTitle()', () => {
        wrapper.instance().componentDidUpdate();
        expect(setTitle).toHaveBeenCalledTimes(1);
      });

      test('Handles "state.error: true" correctly', () => {
        wrapper.setState({ error: true });
        expect(routerProps.history.push).toHaveBeenCalledTimes(1);
        expect(routerProps.history.push).toHaveBeenCalledWith(props.redirectRoute);
        expect(toastr.error).toHaveBeenCalledTimes(1);
        expect(toastr.error.mock.calls[0][1]).toBe(props.persistenceErrorMsg);
        wrapper.setState({ error: false });
      });

      test('Handles "state.deleting: true" correctly', () => {
        wrapper.setState({ deleting: true });
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.actionDeleteAll).toHaveBeenCalledTimes(1);
        wrapper.setState({ deleting: false });
      });
    });
  });

  describe('handleClick():', () => {
    test.skip('Sets "state.deleting: true"', () => {
      const mockPreventDefault = jest.fn();
      const wrapper = shallow(<Delete {...props} />);
      expect(wrapper.state('deleting')).toBe(false);
      wrapper.instance().handleClick({ preventDefault: mockPreventDefault });
      expect(mockPreventDefault).toHaveBeenCalledTimes(1);
      // expect(wrapper.state('deleting')).toBe(true);
    });
  });

  describe('dataSaved():', () => {
    test('Handles ioResult.success correctly', () => {
      const wrapper = shallow(<Delete {...props} />);
      const ioResult: FsObject = {
        data: {},
        errorObj: null,
        success: true,
      };
      wrapper.instance().dataSaved(ioResult);
      expect(toastr.success).toHaveBeenCalledTimes(1);
      expect(toastr.success.mock.calls[0][0]).toBe(props.persistenceSuccessMsg);
      expect(routerProps.history.push).toHaveBeenCalledTimes(1);
      expect(routerProps.history.push).toHaveBeenCalledWith(props.redirectRoute);
    });

    test('Handles !ioResult.success correctly', () => {
      const wrapper = shallow(<Delete {...props} />);
      const ioResult: FsObject = {
        data: {},
        errorObj: null,
        success: false,
      };
      wrapper.instance().dataSaved(ioResult);
      expect(wrapper.state('error')).toBe(true);
      expect(wrapper.state('deleting')).toBe(false);
    });
  });

  describe('render():', () => {
    const wrapper = shallow(<Delete {...props} />);
    let editPanel;

    test('Contains <Editpanel />', () => {
      editPanel = wrapper.find('EditPanel');
      expect(editPanel).toHaveLength(1);
    });

    test('Contains <EditPanelHeader />', () => {
      const inEditPanel = wrapper.find('EditPanel').dive();
      const editPanelHeader = inEditPanel.find('EditPanelHeader');
      expect(editPanelHeader).toHaveLength(1);
    });

    test('Contains <EditPanelHeader />', () => {
      const inEditPanel = wrapper.find('EditPanel').dive();
      const editPanelContent = inEditPanel.find('EditPanelContent');
      expect(editPanelContent).toHaveLength(1);
    });

    test('Contains <Form />', () => {
      const inEditPanel = wrapper.find('EditPanel').dive();
      const inEditPanelContent = inEditPanel.find('EditPanelContent').dive();
      const form = inEditPanelContent.find('Form');
      expect(form).toHaveLength(1);
    });
  });
});
