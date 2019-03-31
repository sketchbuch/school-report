// @flow

export type PageBrowserProps = {
  className: string,
  curPage: number,
  first: boolean,
  itemCount: number,
  last: boolean,
  next: boolean,
  onChange: ?(curPage: number) => void,
  pagesToShow: number,
  perPage: number,
  prev: boolean,
  reduced: boolean,
};

const pageBrowserPropsDefault = {
  className: '',
  curPage: 1,
  first: true,
  itemCount: 10,
  last: true,
  next: true,
  onChange: null,
  pagesToShow: 3,
  perPage: 20,
  prev: true,
  reduced: false,
};

export default pageBrowserPropsDefault;
