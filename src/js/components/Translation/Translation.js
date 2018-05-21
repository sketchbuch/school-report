// @flow

import React, { Component } from 'react';

type Props = {
  name: string,
  ns: string,
  placeholders: ?Object,
};


/**
* Returns the correct translation from the translations object.
*
* @param string name The name/key of the translation.
* @param string ns The namespace that the name belongs to.
* @param mixed placeholders An optional object of replacement texts: {search: replace}
* @return string The translation or the name if no translation is found.
*/
export function text(name: string, ns: string, placeholders: ?Object = null) {
  const { translations, curLang } = window.reportr;

  if (translations !== undefined) {
    if (translations[curLang] !== undefined) {
      if (translations[curLang][ns] !== undefined) {
        if (translations[curLang][ns][name] !== undefined) {
          let trans = translations[curLang][ns][name].trim();

          if (placeholders != null) {
            for (const [k, v] of Object.entries(placeholders)) {
              trans = trans.replace(`%${k}%`, v);
            }
          }

          return trans;
        }
      }
    }
  }

  return `?${name.trim()}:${ns.trim()}`;
}

/**
* Translation component that renders a text string.
*/
export default class Translation extends Component<Props> {
  static defaultProps = {
    placeholders: null,
  }

  props: Props;
  prevLang: string = '';

  componentWillMount() {
    if (window.reportr.translations.length > 0) this.prevLang = window.reportr.curLang;
  }

  shouldComponentUpdate(nextProps: Props) {
    if (this.prevLang !== window.reportr.curLang) return true;
    if (this.props.name !== nextProps.name) return true;
    if (this.props.ns !== nextProps.ns) return true;

    return false;
  }

  componentWillUpdate() {
    if (window.reportr.translations.length > 0) this.prevLang = window.reportr.curLang;
  }


  render() {
    return text(this.props.name, this.props.ns, this.props.placeholders);
  }
}

/**
* Translation function that returns a react element to allow "inline" use of a component (like in attributes).
*
* @param string name The name/key of the translation.
* @param string ns The namespace that the name belongs to.
* @param mixed placeholders An optional object of replacement texts: {search: replace}
*/
export function t(name: string, ns: string, placeholders: ?Object = null) {
  return React.createElement(Translation, { name, ns, placeholders });
}
