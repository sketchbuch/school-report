// @flow

import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import EditPanel from '../../../components/EditPanel/EditPanel';
import EditPanelHeader from '../../../components/EditPanel/Header/EditPanelHeader';
import EditPanelContent from '../../../components/EditPanel/Content/EditPanelContent';
import Button from '../../../components/ui/Button/Button';
import Translation, { text } from '../../../components/Translation/Translation';
import * as reportActions from '../../../actions/reportActions';
import { ROUTE_REPORTS } from '../../../constants/routes';
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
 * Layout for deleting all reports records.
 */
export class DeleteReportsLayout extends Component<Props, State> {
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
    setTitle(text('WinTitle', 'DeleteReportsLayout'));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.error) {
      toastr.error(
        text('PersistenceError', 'Toastr'),
        text('PersistenceDeleteError', 'Reports')
      );
      this.props.history.push(ROUTE_REPORTS);
    } else if (this.state.deleting) {
      this.props.dispatch(reportActions.deleteAll(this.dataSaved));
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
      toastr.success(text('PersistenceDeleted', 'Reports'));
      this.props.history.push(ROUTE_REPORTS);
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
        <EditPanelHeader title={text('DeleteReports', 'EditPanelHeader')} />
        <EditPanelContent>
          <h2 className="form__headline">
            {this.state.deleting ? (
              <Translation name="HeadlineDeleting" ns="DeleteReportsLayout" />
            ) : (
              <Translation name="Headline" ns="DeleteReportsLayout" />
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
                <Translation name="BtnLabel" ns="DeleteReportsLayout" />
              </Button>
            </div>

            {!this.state.deleting && (
              <p className="form__submsg">
                <Link to={ROUTE_REPORTS}>
                  <Translation name="BackToReports" ns="Reports" />
                </Link>
              </p>
            )}
          </form>
        </EditPanelContent>
      </EditPanel>
    );
  }
}

export default DeleteReportsLayout;
