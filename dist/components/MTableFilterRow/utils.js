var l = Object.assign;
import { MTableFilterRow as t } from './';
export const getLocalizationData = (e) =>
    l(l({}, t.defaultProps.localization), e),
  getLocalizedFilterPlaceHolder = (e, o) =>
    e.filterPlaceholder || getLocalizationData(o).filterPlaceHolder || '';
