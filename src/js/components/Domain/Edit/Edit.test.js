// @flow

import React from 'react';
import { RouteComponentProps } from 'react-router';
import { shallow } from 'enzyme';
import { toastr } from 'react-redux-toastr';
import Edit from './Edit';
import categoryDefault, { CategoryFactory } from '../../../types/category';
import setTitle from '../../../utils/setTitle';
import type { FsObject } from '../../../types/fsObject';
import type { Props } from './Edit';

jest.mock('react-redux-toastr');
jest.mock('../../../utils/setTitle');

describe('<Edit />', () => {
  const LABEL: string = 'Test Cat';
  const routerProps: RouteComponentProps = {
    history: {
      push: jest.fn(),
    },
  };
  const props: Props = {
    ...routerProps,
    actionAdd: jest.fn(),
    actionUpdate: jest.fn(),
    createNew: jest.fn(values => values),
    dispatch: jest.fn(),
    domainObjects: [],
    domainRec: CategoryFactory({ ...categoryDefault, label: LABEL, id: 'cat-1' }, Date.now()),
    domainType: 'catgeory',
    isNew: true,
    editPanelTitle: 'The EP Header',
    persistenceErrorMsg: 'Error',
    persistenceSuccessMsg: 'Success',
    redirectRoute: '/test',
    schema: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renders without crashing', () => {
    const wrapper = shallow(<Edit {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  describe('Lifecycle Methods:', () => {
    describe('componentDidMount():', () => {
      test('Calls setPageTitle()', () => {
        shallow(<Edit {...props} />);
        expect(setTitle).toHaveBeenCalledTimes(1);
      });
    });

    describe('componentDidUpdate():', () => {
      const wrapper = shallow(<Edit {...props} />);
      const instance = wrapper.instance();

      test('Calls setPageTitle()', () => {
        instance.componentDidUpdate();
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

      test('Handles "state.saving: true" correctly when isNew', () => {
        wrapper.setState({ saving: true });
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.actionAdd).toHaveBeenCalledTimes(1);
        expect(props.actionAdd.mock.calls[0][0]).toBe(wrapper.state().domain);
        wrapper.setState({ saving: false });
      });

      test('Handles "state.saving: true" correctly when !isNew', () => {
        const wrapperNotNew = shallow(<Edit {...props} isNew={false} />);
        wrapperNotNew.setState({ saving: true });
        expect(props.dispatch).toHaveBeenCalledTimes(1);
        expect(props.actionUpdate).toHaveBeenCalledTimes(1);
        expect(props.actionUpdate.mock.calls[0][0]).toBe(wrapperNotNew.state().domain);
        expect(wrapperNotNew.state('saving')).toBe(false);
      });
    });
  });

  describe('handleSubmit():', () => {
    const LABEL2: string = LABEL + ' 2';

    test('Updates a new domain record correctly', () => {
      const wrapper = shallow(<Edit {...props} />);
      const instance = wrapper.instance();
      instance.handleSubmit({ ...categoryDefault, label: LABEL2, id: 'cat-1' });
      expect(props.createNew).toHaveBeenCalledTimes(1);
      expect(wrapper.state('domain').label).toBe(LABEL2);
    });

    test('Updates a new domain record correctly if !isNew', () => {
      const wrapper = shallow(<Edit {...props} isNew={false} />);
      const instance = wrapper.instance();
      instance.handleSubmit({ ...categoryDefault, label: LABEL2, id: 'cat-1' });
      expect(props.createNew).not.toHaveBeenCalled();
      expect(wrapper.state('domain').label).toBe(LABEL2);
      expect(wrapper.state('domain').update).not.toBe(props.domainRec.updated);
    });
  });

  describe('dataSaved():', () => {
    test('Handles ioResult.success correctly', () => {
      const wrapper = shallow(<Edit {...props} />);
      const instance = wrapper.instance();
      const ioResult: FsObject = {
        data: {},
        errorObj: null,
        success: true,
      };
      instance.dataSaved(ioResult);
      expect(toastr.success).toHaveBeenCalledTimes(1);
      expect(toastr.success.mock.calls[0][0]).toBe(props.persistenceSuccessMsg);
      expect(toastr.success.mock.calls[0][1]).toBe(LABEL);
      expect(routerProps.history.push).toHaveBeenCalledTimes(1);
      expect(routerProps.history.push).toHaveBeenCalledWith(props.redirectRoute);
    });

    test('Handles !ioResult.success correctly', () => {
      const wrapper = shallow(<Edit {...props} />);
      const instance = wrapper.instance();
      const ioResult: FsObject = {
        data: {},
        errorObj: null,
        success: false,
      };
      instance.dataSaved(ioResult);
      expect(wrapper.state('error')).toBe(true);
      expect(wrapper.state('saving')).toBe(false);
    });
  });

  describe('render():', () => {
    const wrapper = shallow(<Edit {...props} />);
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

    test('Contains <Formik />', () => {
      const inEditPanel = wrapper.find('EditPanel').dive();
      const inEditPanelContent = inEditPanel.find('EditPanelContent').dive();
      const formik = inEditPanelContent.find('Formik');
      expect(formik).toHaveLength(1);
    });
  });
});
