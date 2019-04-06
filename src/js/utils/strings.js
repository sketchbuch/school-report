// @flow

export const DEFAULT_WRAP: string = '#';

export const cropStr = (str: string, len: number, ellipsize?: boolean = true): string => {
  let trimmedStr: string = str.trim();
  const cropLen: number = parseInt(len, 10);
  const ellipsis: string = ellipsize ? '…' : '';

  if (cropLen < 1 || trimmedStr.length <= cropLen) {
    return trimmedStr;
  }
  return `${trimmedStr.substr(0, cropLen)}${ellipsis}`;
};

export const getDisplayName = (hocName: string, component: React.AbstractComponent): string => {
  return `${hocName}(${component.displayName || component.name || 'Component'})`;
};

export const ucFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const wrapText = (textToWrap: string, wrapStr: string = DEFAULT_WRAP): string => {
  return `${wrapStr}${textToWrap}${wrapStr}`;
};
