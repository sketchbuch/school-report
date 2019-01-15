// @flow

import { DATA_LOADED, REPLACE_BUILDER, REPLACE_DATA, SAVE_BUILDER } from '../constants/actionTypes';
import type { ActionObj } from '../types/action';

/**
 * Reports Reducer.
 */

export default function reducer(state: {} = {}, action: ActionObj) {
  switch (action.type) {
    case DATA_LOADED:
    case REPLACE_BUILDER:
    case REPLACE_DATA:
      if (action.payload && action.payload.builder !== undefined && typeof action.payload.builder === 'object') {
        return action.payload.builder;
      }

      break;

    case SAVE_BUILDER:
      if (action.payload !== undefined && action.meta !== undefined) {
        if (
          action.payload.selected !== undefined &&
          Array.isArray(action.payload.selected) &&
          action.payload.selected.length >= 0
        ) {
          const { reportId, classId, pupilId } = action.meta;
          const selected = action.payload.selected;

          if (reportId && classId && pupilId) {
            const newState = { ...state };

            if (newState[reportId] === undefined) {
              newState[reportId] = { [classId]: { [pupilId]: [] } };

              selected.forEach((textId: string) => {
                newState[reportId][classId][pupilId].push(textId);
              });

              return newState;
            } else {
              const newReportEle = { ...newState[reportId] };

              if (newReportEle[classId] === undefined) {
                newReportEle[classId] = { [pupilId]: [] };

                selected.forEach((textId: string) => {
                  newReportEle[classId][pupilId].push(textId);
                });
              } else {
                const newClassEle = { ...newReportEle[classId] };
                newClassEle[pupilId] = [];

                selected.forEach((textId: string) => {
                  newClassEle[pupilId].push(textId);
                });

                newReportEle[classId] = newClassEle;
              }

              newState[reportId] = newReportEle;
              return newState;
            }
          }
        }
      }

      break;

    default:
      return state;
  }

  return state;
}
