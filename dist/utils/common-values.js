export const elementSize = (t) =>
    t.options.padding === 'default' ? 'medium' : 'small',
  baseIconSize = (t) => (elementSize(t) === 'medium' ? 48 : 32),
  rowActions = (t) =>
    t.actions
      ? t.actions.filter((e) => e.position === 'row' || typeof e == 'function')
      : [],
  actionsColumnWidth = (t) => rowActions(t).length * baseIconSize(t),
  selectionMaxWidth = (t, e) => baseIconSize(t) + 9 * e,
  reducePercentsInCalc = (t, e) => {
    const n = t.match(/(\d*)%/);
    if (n && n.length > 1) {
      const o = n[1];
      return t.replace(/\d*%/, `${e * (o / 100)}px`);
    }
    return t.replace(/\d*%/, `${e}px`);
  };
