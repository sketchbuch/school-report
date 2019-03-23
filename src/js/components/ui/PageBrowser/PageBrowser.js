//@flow

import React, { Component } from 'react';
import classNames from 'classnames';
import ButtonCircular from '../ButtonCircular/ButtonCircular';
import Translation, { text } from '../../Translation/Translation';
import pageBrowserPropsDefault from '../../../types/pageBrowser';
import type { PageBrowserProps } from '../../../types/pageBrowser';
import type { RenderHelperReturn } from '../../../types/misc';
import './PageBrowser.css';

export type PbMoreProps = {
  hidden: boolean,
};

export const PbMore = (props: PbMoreProps) => {
  return <span className={classNames('PageBrowser__more', { 'PageBrowser__more--hidden': props.hidden })}>…</span>;
};

export type PbButProps = {
  disabled: boolean,
  label: string,
  onClick: (event: SyntheticMouseEvent<HTMLElement>) => void,
  page?: boolean,
  selected?: boolean,
  title?: string,
  type: string,
};

export const PbBut = (props: PbButProps) => {
  return (
    <ButtonCircular
      action={props.type}
      className={classNames(`PageBrowser__btn PageBrowser__btn--${props.type}`, {
        'PageBrowser__btn--page': props.page,
        'PageBrowser__btn--selected': props.selected,
      })}
      disabled={props.disabled}
      onClick={props.onClick}
      title={props.title || text('Btn-' + props.type, 'PageBrowser')}
    >
      {props.label}
    </ButtonCircular>
  );
};

export type Props = { ...PageBrowserProps };

class PageBrowser extends Component<Props> {
  static defaultProps = { ...pageBrowserPropsDefault };

  props: Props;

  handleClick = (event: SyntheticMouseEvent<HTMLElement>): void => {
    const { curPage, itemCount, onChange, perPage } = this.props;

    if (onChange) {
      const btn = event.currentTarget;
      const { action } = btn.dataset;
      const totalPages = this.getTotalPages(itemCount, perPage);

      switch (action) {
        case 'first':
          onChange(1);
          break;

        case 'prev':
          const prev = curPage > 1 ? curPage - 1 : 1;
          onChange(prev);
          break;

        case 'next':
          const next = curPage + 1 < totalPages ? curPage + 1 : totalPages;
          onChange(next);
          break;

        case 'last':
          onChange(totalPages);
          break;

        default:
          onChange(parseInt(action, 10));
          break;
      }
    }
  };

  getTotalPages(itemCount: number, perPage: number): number {
    return Math.ceil(itemCount / perPage);
  }

  renderLeft(first: boolean, prev: boolean, curPage: number): RenderHelperReturn {
    if (first || prev) {
      return (
        <div className="PageBrowser__left">
          {first && <PbBut label="&lt;&lt;" type="first" disabled={curPage === 1} onClick={this.handleClick} />}
          {prev && <PbBut label="&lt;" type="prev" disabled={curPage === 1} onClick={this.handleClick} />}
        </div>
      );
    }

    return null;
  }

  renderRight(next: boolean, last: boolean, curPage: number, totalPages: number): RenderHelperReturn {
    if (next || last) {
      return (
        <div className="PageBrowser__right">
          {next && <PbBut label="&gt;" type="next" disabled={curPage === totalPages} onClick={this.handleClick} />}
          {last && <PbBut label="&gt;&gt;" type="last" disabled={curPage === totalPages} onClick={this.handleClick} />}
        </div>
      );
    }

    return null;
  }

  renderCentre(curPage: number, totalPages: number): RenderHelperReturn {
    return (
      <div className="PageBrowser__centre">
        <p className="PageBrowser__info">
          <Translation name="InfoText" ns="PageBrowser" placeholders={{ CUR: curPage, TOTAL: totalPages }} />
        </p>
      </div>
    );
  }

  render() {
    const { className, curPage, first, itemCount, last, next, perPage, prev } = this.props;

    const totalPages = this.getTotalPages(itemCount, perPage);

    let pb = null;
    if (itemCount > 0) {
      pb = (
        <div className={classNames('PageBrowser', { [className]: !!className })}>
          <div className="PageBrowser__controls">
            {this.renderLeft(first, prev, curPage)}
            {this.renderCentre(curPage, totalPages)}
            {this.renderRight(next, last, curPage, totalPages)}
          </div>
        </div>
      );
    }

    return pb;
  }
}

export default PageBrowser;
