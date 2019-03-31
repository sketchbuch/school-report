// @flow

import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import * as categoryActions from '../../../actions/categoryActions';
import { Button, FieldWrap, Form, FormCancel } from '../../../components/Ui';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import Translation, { text } from '../../../components/Translation/Translation';
import setTitle from '../../../utils/title';
import type { FsObject } from '../../../types/fsObject';
import { ROUTE_CATEGORIES } from '../../../constants/routes';

export type Props = {
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
};

type State = {
  deleting: boolean,
  error: boolean,
};

export class DeleteCategoriesLayout extends Component<Props, State> {
  static defaultProps = {
    texts: [],
  };

  props: Props;
  state: State = {
    deleting: false,
    error: false,
  };

  componentDidMount() {
    setTitle(text('WinTitle', 'DeleteCategoriesLayout'));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(text('PersistenceError', 'Toastr'), text('PersistenceDeleteError', 'Categories'));
      this.props.history.push(ROUTE_CATEGORIES);
    } else if (this.state.deleting) {
      this.props.dispatch(categoryActions.deleteAll(this.dataSaved));
      this.setState({ deleting: false });
    }
  }

  handleClick = (event: SyntheticMouseEvent<HTMLElement>): void => {
    event.preventDefault();
    this.setState({ deleting: true });
  };

  dataSaved = (ioResult: FsObject): void => {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceDeleted', 'Categories'));
      this.props.history.push(ROUTE_CATEGORIES);
    } else {
      this.setState({
        deleting: false,
        error: true,
      });
    }
  };

  render() {
    return (
      <EditPanel>
        <EditPanelHeader title={text('DeleteCategories', 'EditPanelHeader')} />
        <EditPanelContent>
          <h2 className="form__headline">
            {this.state.deleting ? (
              <Translation name="HeadlineDeleting" ns="DeleteCategoriesLayout" />
            ) : (
              <Translation name="Headline" ns="DeleteCategoriesLayout" />
            )}
          </h2>
          <Form>
            <FieldWrap>
              <Button
                type="button"
                onClick={this.handleClick}
                buttontype="warning"
                disabled={this.state.deleting}
                busy={this.state.deleting}
              >
                <Translation name="BtnLabel" ns="DeleteCategoriesLayout" />
              </Button>
            </FieldWrap>

            {!this.state.deleting && (
              <FormCancel>
                <Link to={ROUTE_CATEGORIES}>
                  <Translation name="BackToCategories" ns="Categories" />
                </Link>
              </FormCancel>
            )}
          </Form>
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default DeleteCategoriesLayout;
