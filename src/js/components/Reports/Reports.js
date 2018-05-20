// @flow

import React, { Component } from 'react';
import ReportsTextList from './TextList/ReportsTextList'
import ReportsTexts from './Texts/ReportsTexts'
import type { TextType } from '../../types/text';
import './Reports.css';

type Props = {
  texts: Array<TextType>,
};


/**
* The interface to build a report.
*/
export class Reports extends Component<Props> {
  static defaultProps = {
    texts: [],
  };

  props: Props;

  render() {
    return (
      <section className="Reports">
        <div className="Reports__left">
          <ReportsTexts />
        </div>
        <div className="Reports__right">
          <ReportsTextList texts={this.props.texts} />
        </div>
      </section>
    )
  }
}


export default Reports;
