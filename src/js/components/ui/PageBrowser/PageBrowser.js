//@flow

import React, { Component } from 'react';
import ButtonCircular from '../ButtonCircular/ButtonCircular';
import Translation, { text } from '../../Translation/Translation';
import type { PageBrowserProps } from '../../../types/pageBrowser';
import pageBrowserPropsDefault from '../../../types/pageBrowser';
import './PageBrowser.css';

type PbMoreProps = {
  hidden: boolean,
};

export const PbMore = (props: PbMoreProps) => {
  let classes = 'PageBrowser__more';
  if (props.hidden) {
    classes += ' PageBrowser__more--hidden';
  }
  return <span className={classes}>…</span>;
};

type PbButProps = {
  disabled: boolean,
  label: string,
  page: boolean,
  selected: boolean,
  title: string,
  onClick: (event: SyntheticInputEvent) => void,
  type: string,
};

export const PbBut = (props: PbButProps) => {
  const title = props.title || text('Btn-' + props.type, 'PageBrowser');
  let classes = `PageBrowser__btn PageBrowser__btn--${props.type}`;
  if (props.page) {
    classes += ' PageBrowser__btn--page';
  }
  if (props.selected) {
    classes += ' PageBrowser__btn--selected';
  }

  return (
    <ButtonCircular
      action={props.type}
      className={classes}
      disabled={props.disabled}
      onClick={props.onClick}
      title={title}
    >
      {props.label}
    </ButtonCircular>
  );
};

type Props = { ...PageBrowserProps };

/**
 * A page browser.
 */
class PageBrowser extends Component<Props> {
  static defaultProps = { ...pageBrowserPropsDefault };

  props: Props;
  handleClick: (event: SyntheticInputEvent) => void;

  constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: SyntheticInputEvent) {
    if (this.props.onChange) {
      const btn = event.currentTarget;
      const { action } = btn.dataset;
      const totalPages = this.getTotalPages(
        this.props.itemCount,
        this.props.perPage
      );

      switch (action) {
        case 'first':
          this.props.onChange(1);
          break;

        case 'prev':
          const prev = this.props.curPage > 1 ? this.props.curPage - 1 : 1;
          this.props.onChange(prev);
          break;

        case 'next':
          const next =
            this.props.curPage + 1 < totalPages
              ? this.props.curPage + 1
              : totalPages;
          this.props.onChange(next);
          break;

        case 'last':
          this.props.onChange(totalPages);
          break;

        default:
          this.props.onChange(parseInt(action, 10));
          break;
      }
    }
  }

  getTotalPages(itemCount: number, perPage: number) {
    return Math.ceil(itemCount / perPage);
  }

  renderLeft(
    first: boolean,
    prev: boolean,
    curPage: number
  ): null | React.Node {
    if (first || prev) {
      return (
        <div className="PageBrowser__left">
          {first && (
            <PbBut
              label="&lt;&lt;"
              type="first"
              disabled={curPage === 1}
              onClick={this.handleClick}
            />
          )}
          {prev && (
            <PbBut
              label="&lt;"
              type="prev"
              disabled={curPage === 1}
              onClick={this.handleClick}
            />
          )}
        </div>
      );
    }

    return null;
  }

  renderRight(
    next: boolean,
    last: boolean,
    curPage: number,
    totalPages: number
  ): null | React.Node {
    if (next || last) {
      return (
        <div className="PageBrowser__right">
          {next && (
            <PbBut
              label="&gt;"
              type="next"
              disabled={curPage === totalPages}
              onClick={this.handleClick}
            />
          )}
          {last && (
            <PbBut
              label="&gt;&gt;"
              type="last"
              disabled={curPage === totalPages}
              onClick={this.handleClick}
            />
          )}
        </div>
      );
    }

    return null;
  }

  renderCentre(
    curPage: number,
    pagesToShow: number,
    totalPages: number
  ): React.Node {
    const pages = [];
    const middle = Math.ceil(pagesToShow / 2);

    let start = 1;
    if (curPage > totalPages - middle) {
      start = Math.floor(totalPages - (pagesToShow - 1));
    } else if (curPage > middle) {
      start = Math.floor(curPage - middle / 2);
    }

    if (start < 1) {
      start = 1;
    }

    let finish = pagesToShow + start;
    if (finish > totalPages) {
      finish = totalPages;
    }

    for (let p = start; p <= finish; p++) {
      if (p >= start + pagesToShow) {
        break;
      }
      const sel = p === curPage;
      pages.push(
        <PbBut
          key={'page-' + p}
          label={p}
          title={p}
          type={p}
          selected={sel}
          page
          onClick={this.handleClick}
        />
      );
    }

    const showLeftMore = curPage > middle && totalPages > pagesToShow;
    const showRightMore =
      curPage < totalPages - Math.floor(pagesToShow / 2) &&
      totalPages > pagesToShow;

    return (
      <div className="PageBrowser__centre">
        {showLeftMore ? <PbMore /> : <PbMore hidden />}
        {pages}
        {showRightMore ? <PbMore /> : <PbMore hidden />}
      </div>
    );
  }

  render() {
    const {
      curPage,
      first,
      itemCount,
      last,
      next,
      pagesToShow,
      perPage,
      prev,
    } = this.props;

    const totalPages = this.getTotalPages(itemCount, perPage);
    let classes = 'PageBrowser';
    if (this.props.className && this.props.className !== '') {
      classes += ' ' + this.props.className;
    }

    let pb = null;
    if (itemCount > 0) {
      pb = (
        <div className={classes}>
          <div className="PageBrowser__controls">
            {this.renderLeft(first, prev, curPage)}
            {this.renderCentre(curPage, pagesToShow, totalPages)}
            {this.renderRight(next, last, curPage, totalPages)}
          </div>
          <p className="PageBrowser__info">
            <Translation
              name="InfoText"
              ns="PageBrowser"
              placeholders={{ CUR: curPage, TOTAL: totalPages }}
            />
          </p>
        </div>
      );
    }

    return pb;
  }
}

export default PageBrowser;
