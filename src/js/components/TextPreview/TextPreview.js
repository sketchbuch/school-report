// @flow

import * as React from 'react';
import classNames from 'classnames';
import type { PupilType } from '../../types/pupil';
import { getPupilTextHtml } from '../../utils/html';
import { text as trans } from '../../components/Translation/Translation';
import './TextPreview.css';

const NS: string = 'TextPreview';

export type Props = {
  editor: boolean,
  pupil: PupilType,
  text: string,
};

export class TextPreview extends React.Component<Props> {
  static defaultProps = {
    editor: false,
    text: '',
  };

  props: Props;

  render() {
    const { editor, pupil, text }: Props = this.props;

    return (
      <div className={classNames(NS, { [NS + '--editor']: editor })}>
        {text ? <span dangerouslySetInnerHTML={getPupilTextHtml(text, pupil)} /> : <span>{trans('NoText', NS)}</span>}
      </div>
    );
  }
}

export default TextPreview;
