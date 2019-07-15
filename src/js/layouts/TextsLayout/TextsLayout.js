// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import CatSelect from '../../components/CatSelect/CatSelect';
import DeleteTextsLayout from './Delete/DeleteTextsLayout';
import EditTextLayout from './Edit/EditTextLayout';
import Icon from '../../components/Icon/Icon';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import NewTextLayout from './New/NewTextLayout';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarFooter from '../../components/Sidebar/Footer/SidebarFooter';
import SidebarHeader from '../../components/Sidebar/Header/SidebarHeader';
import SidebarList from '../../components/Sidebar/List/SidebarList';
import setTitle from '../../utils/setTitle';
import type { CategoryType } from '../../types/category';
import type { ReduxState } from '../../types/reduxstate';
import type { SelectOption } from '../../types/ui';
import type { TextType } from '../../types/text';
import type { WithSearchProps } from '../../hoc/withSearch';
import withSearch from '../../hoc/withSearch';
import { CATEGORY_ALL } from '../../constants/misc';
import { ICON_ADD, ICON_DELETE } from '../../constants/icons';
import { NavButtonCircular, SearchField } from '../../components/Ui';
import { ROUTE_DEL_TEXTS, ROUTE_EDIT_TEXT, ROUTE_NEW_TEXT, ROUTE_TEXTS } from '../../constants/routes';
import { text } from '../../components/Translation/Translation';
import { textSort } from '../../types/text';

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
    setTitle(text('WinTitle', 'Texts'));
  }

  componentDidUpdate() {
    if (window.location.pathname === ROUTE_TEXTS) {
      setTitle(text('WinTitle', 'Texts'));
    }
  }

  handleFilterChanage = (option: SelectOption): void => {
    if (!option.disabled) {
      this.setState({ option: option.value });
      if (this.state.option !== option.value) {
        this.props.search.handleReset();
      }
    }
  };

  render() {
    const { categories, curLang, dispatch, search, texts } = this.props;
    const HAS_TEXTS: boolean = texts.length > 0 ? true : false;
    const leftActions: React.Element<*> = (
      <NavButtonCircular
        to={ROUTE_NEW_TEXT}
        className="SidebarFooter__action"
        buttontype="pos-rollover"
        action="add-text"
        title={text('TextAdd', 'Actions')}
      >
        <Icon type={ICON_ADD} />
      </NavButtonCircular>
    );
    const rightActions: React.Element<*> = (
      <NavButtonCircular
        disabled={!HAS_TEXTS}
        to={ROUTE_DEL_TEXTS}
        className="SidebarFooter__action"
        buttontype="neg-rollover"
        action="delete-texts"
        title={text('TextDelete', 'Actions')}
      >
        <Icon type={ICON_DELETE} />
      </NavButtonCircular>
    );
    let searchBox = null;

    if (HAS_TEXTS) {
      searchBox = (
        <SearchField
          anywhere={search.anywhere}
          anywhereOnClick={search.handleToggleAnywhere}
          clearOnClick={search.handleToggleVisibility}
          iconOnClick={search.handleToggleVisibility}
          onKeyUp={search.handleKeyUp}
          onChange={search.handleChange}
          placeholder={text('SearchPlaceholder-text', 'SidebarHeader')}
          term={search.term}
          visible={search.visible}
        />
      );
    }

    return (
      <div className="Panel">
        <Sidebar>
          <SidebarHeader
            controlsExpanded={search.visible}
            title={text('Header-text', 'SidebarHeader')}
            subtitle={text('Subheader-count', 'SidebarHeader', {
              COUNT: texts.length,
            })}
          >
            {searchBox}
          </SidebarHeader>
          <SidebarList
            curPage={search.page}
            dispatch={dispatch}
            filter={this.state.option}
            items={texts}
            listType="text"
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
          <SidebarFooter leftActions={leftActions} rightActions={rightActions} />
        </Sidebar>
        <Switch>
          <Route
            path={ROUTE_EDIT_TEXT}
            render={routerProps => (
              <EditTextLayout {...routerProps} dispatch={dispatch} categories={categories} texts={texts} />
            )}
          />
          <Route
            path={ROUTE_DEL_TEXTS}
            render={routerProps => <DeleteTextsLayout {...routerProps} dispatch={dispatch} />}
          />
          <Route
            path={ROUTE_NEW_TEXT}
            render={routerProps => (
              <NewTextLayout {...routerProps} curLang={curLang} categories={categories} dispatch={dispatch} />
            )}
          />
          <Route
            path={ROUTE_TEXTS}
            render={routerProps => (
              <InfoMsg {...routerProps} headine={text('Texts', 'InfoMsg')} subtext={text('TextsMsg', 'InfoMsg')} />
            )}
          />
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
