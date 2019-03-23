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

export type ExportType = {
  classCount: number,
  content: ClassEle[],
  exported: string,
  name: string,
  pupilCount: number,
  reportName: string,
};

const exportDefault: ExportType = {
  classCount: -1,
  content: [],
  exported: '',
  name: '',
  pupilCount: -1,
  reportName: '',
};

export default exportDefault;
