// @flow

import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import Button from '../../../components/ui/Button/Button';
import Translation, { text } from '../../../components/Translation/Translation';
import * as classActions from '../../../actions/classActions';
import { ROUTE_CLASSES } from '../../../constants/routes';
import setTitle from '../../../utils/title';

type Props = {
  dispatch: Function,
  history: Object,
  location: Object,
  match: Object,
};

type State = {
  deleting: boolean,
  error: boolean,
};

/**
 * Layout for deleting all classes.
 */
export class DeleteClassesLayout extends Component<Props, State> {
  dataSaved: Function;
  props: Props;
  handleClick: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      deleting: false,
      error: false,
    };

    this.dataSaved = this.dataSaved.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    setTitle(text('WinTitle', 'DeleteClassesLayout'));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(
        text('PersistenceError', 'Toastr'),
        text('PersistenceDeleteError', 'Classes')
      );
      this.props.history.push(ROUTE_CLASSES);
    } else if (this.state.deleting) {
      this.props.dispatch(classActions.deleteAll(this.dataSaved));
      this.setState({ deleting: false });
    }
  }

  handleClick(event: SyntheticInputEvent<HTMLInputElement>) {
    event.preventDefault();
    this.setState({ deleting: true });
  }

  /**
   * Callback used by electron fs functions.
   *
   * @param object ioResult An object: {success: boolean, errorObj?: object, data?: json}
   */
  dataSaved(ioResult: Object) {
    if (ioResult.success === true) {
      toastr.success(text('PersistenceDeleted', 'Classes'));
      this.props.history.push(ROUTE_CLASSES);
    } else {
      this.setState({
        deleting: false,
        error: true,
      });
    }
  }

  render() {
    return (
      <EditPanel>
        <EditPanelHeader title={text('DeleteClasses', 'EditPanelHeader')} />
        <EditPanelContent>
          <h2 className="form__headline">
            {this.state.deleting ? (
              <Translation name="HeadlineDeleting" ns="DeleteClassesLayout" />
            ) : (
              <Translation name="Headline" ns="DeleteClassesLayout" />
            )}
          </h2>
          <form className="form">
            <div className="fieldwrap">
              <Button
                type="button"
                onClick={this.handleClick}
                buttontype="warning"
                disabled={this.state.deleting}
                busy={this.state.deleting}
              >
                <Translation name="BtnLabel" ns="DeleteClassesLayout" />
              </Button>
            </div>

            {!this.state.deleting && (
              <p className="form__submsg">
                <Link to={ROUTE_CLASSES}>
                  <Translation name="BackToClasses" ns="Classes" />
                </Link>
              </p>
            )}
          </form>
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default DeleteClassesLayout;
