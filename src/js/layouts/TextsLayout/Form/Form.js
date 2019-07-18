// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import TextPreview from '../../../components/TextPreview/TextPreview';
import Translation, { text } from '../../../components/Translation/Translation';
import pupilDefault, { PupilFactory } from '../../../types/pupil';
import type { CategoryType } from '../../../types/category';
import type { DomainType } from '../../../types/domain';
import type { PlaceHolderMapObject } from '../../../utils/html';
import type { PupilType } from '../../../types/pupil';
import type { Tab, Tag, TabView } from '../../../types/ui';
import validate from '../../../validation/validation';
import {
  Button,
  FieldError,
  FieldWrap,
  Form as FormComp,
  FormDescription,
  FormCancel,
  ItemSelection,
  Tabs,
  TagList,
  Textarea,
} from '../../../components/Ui';
import { ROUTE_TEXTS } from '../../../constants/routes';
import { UI_VIEW_EDIT, UI_VIEW_PREVIEW } from '../../../constants/ui';
import { categorySort } from '../../../types/category';
import { defaultTag } from '../../../types/ui';
import { placeholderMap } from '../../../utils/html';
import { sortObjectsAz } from '../../../utils/sort';
import { wrapText } from '../../../utils/strings';

const NS: string = 'Texts';
const dummyPupil: PupilType = PupilFactory(
  { ...pupilDefault, firstname: 'Lydia', gender: 'f', lastname: 'Dietz' },
  Date.now(),
  'c1'
);

// TODO - fix types
export type Props = {
  categories: CategoryType[],
  dirty: boolean,
  errors: Object,
  handleBlur: Function,
  handleChange: Function,
  handleSubmit: Function,
  setFieldValue: Function,
  isNew: boolean,
  isSubmitting: boolean,
  saving: boolean,
  touched: Object,
  values: Object,
};

type State = {
  view: TabView,
};

export class Form extends React.Component<Props, State> {
  static defaultProps = {
    categories: [],
    dirty: false,
    isNew: false,
  };

  props: Props;
  state: State = {
    view: UI_VIEW_EDIT,
  };
  myTextarea: React.ElementRef<any> = React.createRef();

  handleTagClick = (tag: Tag) => (event: SyntheticMouseEvent<HTMLElement> | SyntheticInputEvent<HTMLElement>): void => {
    const { selectionEnd, selectionStart } = this.myTextarea.current;
    const {
      setFieldValue,
      values: { bodytext },
    } = this.props;
    const START: string = bodytext.substr(0, selectionStart);
    const END: string = bodytext.substr(selectionEnd);

    setFieldValue('bodytext', START + wrapText(tag.id) + END);
  };

  handleViewChange = (view: TabView) => {
    if (this.state.view !== view) {
      this.setState({ view });
    }
  };

  getPlaceholders = (): Tag[] => {
    return placeholderMap.map((ph: PlaceHolderMapObject) => {
      return {
        ...defaultTag,
        id: ph.symbol,
        label: text('Title' + ph.symbol, '##'),
        onClick: this.handleTagClick,
        tooltip: wrapText(ph.symbol),
      };
    });
  };

  renderTabs = (): React.Node => {
    const tabs: Tab[] = [
      {
        label: text('TabEdit', 'Tabs'),
        onChange: this.handleViewChange,
        tooltip: text('TabEdit', 'Tabs'),
        view: UI_VIEW_EDIT,
      },
      {
        label: text('TabPreview', 'Tabs'),
        onChange: this.handleViewChange,
        tooltip: text('TabPreview', 'Tabs'),
        view: UI_VIEW_PREVIEW,
      },
    ];

    return <Tabs selected={this.state.view} tabs={tabs} />;
  };

  renderEditor = (btValid: boolean): React.Node => {
    const { errors, handleBlur, handleChange, values } = this.props;
    const placeholders: Tag[] = this.getPlaceholders();

    return (
      <React.Fragment>
        <Textarea
          isValid={btValid}
          name="bodytext"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={text('BodytextPlaceholder', NS)}
          refProp={this.myTextarea}
          value={values.bodytext}
        />
        {!btValid && <FieldError errors={[errors.bodytext]} />}
        {placeholders.length > 0 && <TagList onClick={this.handleTagClick} tags={this.getPlaceholders()} />}
      </React.Fragment>
    );
  };

  renderPreview = (): React.Node => {
    return <TextPreview editor pupil={dummyPupil} text={this.props.values.bodytext} />;
  };

  render() {
    const { categories, dirty, errors, handleSubmit, isNew, saving, touched, values } = this.props;
    const cValid: boolean = validate('categories', errors, touched);
    const btValid: boolean = validate('bodytext', errors, touched);
    const btnIsDisabled: boolean = !cValid || !btValid || saving || !dirty ? true : false;
    const sortedCategories: DomainType[] = sortObjectsAz(categories, categorySort);
    const selCount: number = categories.filter(c => values.categories.includes(c.id)).length;

    return (
      <FormComp classes="EditTextForm" onSubmit={handleSubmit}>
        <FieldWrap>
          {this.renderTabs()}
          {this.state.view === UI_VIEW_EDIT ? this.renderEditor(btValid) : this.renderPreview()}
        </FieldWrap>
        <FieldWrap>
          <FormDescription inline>
            <Translation
              name="ReportCategories"
              ns={NS}
              placeholders={{
                SELECTED: selCount,
                TOTAL: categories.length,
              }}
            />
          </FormDescription>

          <ItemSelection items={sortedCategories} name="categories" selected={values.categories} />
        </FieldWrap>
        <FieldWrap>
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            {isNew ? (
              <Translation name="CreateTextBtnLabel" ns={NS} />
            ) : (
              <Translation name="UpdateTextBtnLabel" ns={NS} />
            )}
          </Button>
        </FieldWrap>

        {!saving && (
          <FormCancel>
            <Link to={ROUTE_TEXTS}>
              <Translation name="BackToTexts" ns={NS} />
            </Link>
          </FormCancel>
        )}
      </FormComp>
    );
  }
}

export default Form;
