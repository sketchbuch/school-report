/**
* Route Constants
*/

export const ROUTE_HOME = '/';

// Categories
export const ROUTE_CATEGORIES = '/categories';
export const ROUTE_EDIT_CATEGORY = '/categories/:categoryId/edit';
export const ROUTE_DEL_CATEGORY = '/categories/:categoryId/delete';
export const ROUTE_DEL_CATEGORIES = '/categories/delete-all';
export const ROUTE_NEW_CATEGORY = '/categories/new';

// Classes
export const ROUTE_CLASSES = '/classes';
export const ROUTE_EDIT_CLASS = '/classes/:classId/edit';
export const ROUTE_DEL_CLASS = '/classes/:classId/delete';
export const ROUTE_DEL_CLASSES = '/classes/delete-all';
export const ROUTE_NEW_CLASS = '/classes/new';

// Pupils
export const ROUTE_PUPILS = '/pupils/:classId';
export const ROUTE_EDIT_PUPIL = '/pupils/:classId/edit/:pupilId';
export const ROUTE_DEL_PUPIL = '/classes/:classId/delete/:pupilId';
export const ROUTE_DEL_PUPILS = '/pupils/:classId/delete-all';
export const ROUTE_NEW_PUPIL = '/pupils/:classId/new';

// Reports
export const ROUTE_REPORTS = '/reports';
export const ROUTE_BUILD_REPORT = '/reports/:reportId/build';
export const ROUTE_EDIT_REPORT = '/reports/:reportId/edit';
export const ROUTE_DEL_REPORT = '/reports/:reportId/delete';
export const ROUTE_DEL_REPORTS = '/reports/delete-all';
export const ROUTE_NEW_REPORT = '/reports/new';

// Report Builder
export const ROUTE_BUILDER = '/builder/:reportId';
export const ROUTE_EDIT_BUILDER = '/builder/:reportId/class/:classId/edit/:pupilId';

// Settings
export const ROUTE_SETTINGS = '/settings';

// Texts
export const ROUTE_TEXTS = '/texts';
export const ROUTE_EDIT_TEXT = '/texts/:textId/edit';
export const ROUTE_DEL_TEXT = '/texts/:textId/delete';
export const ROUTE_DEL_TEXTS = '/texts/delete-all';
export const ROUTE_NEW_TEXT = '/texts/new';
