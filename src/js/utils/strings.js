// @flow

export function cropStr(str: string, len: number, ellipsize?: boolean = true): string {
  let trimmedStr: string = str.trim();
  const cropLen: number = parseInt(len, 10);
  const ellipsis: string = ellipsize ? '…' : '';

  if (cropLen < 1 || trimmedStr.length <= cropLen) {
    return trimmedStr;
  }
  return `${trimmedStr.substr(0, cropLen)}${ellipsis}`;
}

export function getDisplayName(hocName: string, component: React.AbstractComponent): string {
  return `${hocName}(${component.displayName || component.name || 'Component'})`;
}

export function ucFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
