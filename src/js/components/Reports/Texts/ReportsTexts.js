// @flow

import * as React from 'react';
import { text } from '../../Translation/Translation';
import Icon from '../../Icon/Icon';
import AddButton from '../../ui/AddButton/AddButton';
import { ICON_ADD } from '../../../constants/icons';
import type { TextType } from '../../../types/text';
import './ReportsTexts.css';

type Props = {
  selectedTexts: Array<string>,
  texts: Array<TextType>,
};


/**
* A list of available texts.
*/
export class ReportsTexts extends React.Component<Props> {
  static defaultProps = {
    selectedTexts: [],
    texts: [],
  };

  props: Props;

  render() {
    return (
      <div className="ReportsTexts">
        <AddButton title={text('TextAdd', 'Actions')}>
          <Icon type={ ICON_ADD } />
        </AddButton>
      </div>
    )
  }
}


export default ReportsTexts;
