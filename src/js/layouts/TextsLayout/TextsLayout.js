// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import type { FormikProps } from 'formik';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps, RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import * as textActions from '../../actions/textActions';
import CatSelect from '../../components/CatSelect/CatSelect';
import Form from './Form/Form';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import getDomainRec from '../../utils/domain';
import setLayoutTitle from '../../utils/setLayoutTitle';
import textDefault, { TextFactory, textSort } from '../../types/text';
import type { CategoryType } from '../../types/category';
import type { ReduxState } from '../../types/reduxstate';
import type { SelectOption } from '../../types/ui';
import type { SidebarListTypes } from '../../types/sidebarList';
import type { TextType } from '../../types/text';
import type { WithSearchProps } from '../../hoc/withSearch';
import withSearch from '../../hoc/withSearch';
import { ActionButton, Delete, Edit, SearchBox } from '../../components/Domain';
import { CATEGORY_ALL } from '../../constants/misc';
import { ROUTE_DEL_TEXTS, ROUTE_EDIT_TEXT, ROUTE_NEW_TEXT, ROUTE_TEXTS } from '../../constants/routes';
import { text } from '../../components/Translation/Translation';
import { textSchema } from '../../validation/schemas';

export type Props = {
  ...RouteComponentProps,
  categories: CategoryType[],
  curLang: string,
  dispatch: Dispatch,
  texts: TextType[],
} & WithSearchProps;

type State = {
  option: string,
};

const DOMAIN_TYPE: SidebarListTypes = 'text';

export class TextsLayout extends React.Component<Props, State> {
  static defaultProps = {
    categories: [],
    texts: [],
  };

  props: Props;
  state: State = {
    option: CATEGORY_ALL,
  };

  componentDidMount() {
    setLayoutTitle(text('WinTitle', 'Texts'));
  }

  componentDidUpdate() {
    setLayoutTitle(text('WinTitle', 'Texts'), ROUTE_TEXTS);
  }

  handleFilterChanage = (option: SelectOption): void => {
    if (!option.disabled) {
      this.setState({ option: option.value });
      if (this.state.option !== option.value) {
        this.props.search.handleReset();
      }
    }
  };

  renderActionsLeft = (): React.Node => {
    return <ActionButton domainType={DOMAIN_TYPE} title={text('TextAdd', 'Actions')} to={ROUTE_NEW_TEXT} type="add" />;
  };

  renderActionsRight = (disabled: boolean): React.Node => {
    return (
      <ActionButton
        disabled={!disabled}
        domainType={DOMAIN_TYPE}
        title={text('TextDelete', 'Actions')}
        to={ROUTE_DEL_TEXTS}
        type="delete"
      />
    );
  };

  renderDelete = (routerProps: RouteChildrenProps): React.Node => {
    return (
      <Delete
        {...routerProps}
        actionDeleteAll={textActions.deleteAll}
        butCancelName="BackToTexts"
        butCancelNs="Texts"
        butDeleteLabel={text('BtnLabel', 'DeleteTextsLayout')}
        dispatch={this.props.dispatch}
        domainType={DOMAIN_TYPE}
        editPanelTitle={text('DeleteTexts', 'EditPanelHeader')}
        formHeadline={text('Headline', 'DeleteTextsLayout')}
        formHeadlineDeleting={text('HeadlineDeleting', 'DeleteTextsLayout')}
        persistenceErrorMsg={text('PersistenceError', 'Texts')}
        persistenceSuccessMsg={text('PersistenceDeleted', 'Texts')}
        redirectRoute={ROUTE_TEXTS}
      />
    );
  };

  renderEdit = (routerProps: RouteChildrenProps): React.Node => {
    const {
      match: { params },
    }: RouteChildrenProps = routerProps;
    const { dispatch, texts }: Props = this.props;
    const domainRec = getDomainRec(textDefault, texts, params, 'textId');

    return (
      <Edit
        {...routerProps}
        actionAdd={textActions.add}
        actionUpdate={textActions.update}
        dispatch={dispatch}
        domainObjects={texts}
        domainRec={domainRec}
        domainType={DOMAIN_TYPE}
        editPanelTitle={text('EditText', 'EditPanelHeader', { TEXT: domainRec.getLabel() })}
        form={this.renderForm}
        isNew={false}
        persistenceErrorMsg={text('PersistenceEditError', 'Texts')}
        persistenceSuccessMsg={text('PersistenceEdit', 'Texts')}
        redirectRoute={ROUTE_TEXTS}
        schema={textSchema}
      />
    );
  };

  renderForm = (formikProps: FormikProps, saving: boolean, isNew: boolean): React.Node => {
    return <Form {...formikProps} categories={this.props.categories} isNew={isNew} saving={saving} />;
  };

  renderInfo = (routerProps: RouteChildrenProps): React.Node => {
    return <InfoMsg {...routerProps} headine={text('Texts', 'InfoMsg')} subtext={text('TextsMsg', 'InfoMsg')} />;
  };

  renderNew = (routerProps: RouteChildrenProps): React.Node => {
    return (
      <Edit
        {...routerProps}
        actionAdd={textActions.add}
        actionUpdate={textActions.update}
        createNew={(values: TextType): TextType => {
          return TextFactory(values, Date.now(), this.props.curLang);
        }}
        dispatch={this.props.dispatch}
        domainObjects={this.props.texts}
        domainRec={{ ...textDefault }}
        domainType={DOMAIN_TYPE}
        editPanelTitle={text('AddText', 'EditPanelHeader')}
        form={this.renderForm}
        isNew
        persistenceErrorMsg={text('PersistenceNewError', 'Texts')}
        persistenceSuccessMsg={text('PersistenceNew', 'Texts')}
        redirectRoute={ROUTE_TEXTS}
        schema={textSchema}
      />
    );
  };

  render() {
    const { categories, dispatch, search, texts }: Props = this.props;
    const HAS_TEXTS: boolean = texts.length > 0 ? true : false;

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader
            controlsExpanded={search.visible}
            title={text('Header-' + DOMAIN_TYPE, 'SidebarHeader')}
            subtitle={text('Subheader-count', 'SidebarHeader', {
              COUNT: texts.length,
            })}
          >
            <SearchBox domainType={DOMAIN_TYPE} hasSearch={HAS_TEXTS} search={search} />
          </SidebarHeader>
          <SidebarList
            curPage={search.page}
            dispatch={dispatch}
            filter={this.state.option}
            items={texts}
            listType={DOMAIN_TYPE}
            noItemsTxt={text('Texts', 'SidebarNoItems')}
            onPbChange={search.handlePageChange}
            sortOrder={textSort}
            term={search.term}
            termAnywhere={search.anywhere}
            usePb
          >
            {categories.length > 0 && (
              <CatSelect
                categories={categories}
                onChange={this.handleFilterChanage}
                option={this.state.option}
                selectedCount={0}
                texts={texts}
                useSelected={false}
              />
            )}
          </SidebarList>
          <SidebarFooter leftActions={this.renderActionsLeft()} rightActions={this.renderActionsRight(HAS_TEXTS)} />
        </Sidebar>
        <Switch>
          <Route path={ROUTE_EDIT_TEXT} render={routerProps => this.renderEdit(routerProps)} />
          <Route path={ROUTE_DEL_TEXTS} render={routerProps => this.renderDelete(routerProps)} />
          <Route path={ROUTE_NEW_TEXT} render={routerProps => this.renderNew(routerProps)} />
          <Route path={ROUTE_TEXTS} render={routerProps => this.renderInfo(routerProps)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  categories: state.categories,
  curLang: state.languages.current,
  texts: state.texts,
});

export default connect(mapStateToProps)(withSearch(TextsLayout));
