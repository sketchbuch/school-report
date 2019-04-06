// @flow

import { Component } from 'react';

type Props = {
  name: string,
  ns: string,
  placeholders: ?Object,
};

export const text = (name: string, ns: string, placeholders: ?Object): string => {
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
};

export default class Translation extends Component<Props> {
  static defaultProps = {
    placeholders: null,
  };

  props: Props;
  prevLang: string = '';

  componentWillMount() {
    if (window.reportr && window.reportr.curLang) {
      this.prevLang = window.reportr.curLang;
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    if (this.prevLang !== window.reportr.curLang) {
      return true;
    }
    if (this.props.name !== nextProps.name) {
      return true;
    }
    if (this.props.ns !== nextProps.ns) {
      return true;
    }
    if (this.props.placeholders && nextProps.placeholders) {
      if (JSON.stringify(this.props.placeholders) !== JSON.stringify(nextProps.placeholders)) {
        return true;
      }
    }

    return false;
  }

  componentWillUpdate() {
    if (window.reportr && window.reportr.curLang) {
      this.prevLang = window.reportr.curLang;
    }
  }

  render() {
    return text(this.props.name, this.props.ns, this.props.placeholders);
  }
}
