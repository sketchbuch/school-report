// @flow

type PupilEle = {
  pupil_name: string,
  texts: string[],
};

type ClassEle = {
  class_name: string,
  class_name_count: string,
  pupil_count: number,
  pupils: PupilEle[],
};

export type ExportContent = {
  classCount: number,
  content: ClassEle[],
  pupilCount: number,
};

export type ExportType = {
  ...ExportContent,
  exported: string,
  name: string,
  reportName: string,
};

export const exportContentDefault: ExportContent = {
  classCount: 0,
  content: [],
  pupilCount: 0,
};

const exportDefault: ExportType = {
  ...exportContentDefault,
  exported: '',
  name: '',
  reportName: '',
};

export default exportDefault;
