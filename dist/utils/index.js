export const byString = (n, e) => {
    if (!e) return;
    (e = e.replace(/\[(\w+)\]/g, '.$1')), (e = e.replace(/^\./, ''));
    const c = e.split('.');
    for (let t = 0, r = c.length; t < r; ++t) {
      const l = c[t];
      if (n && l in n) n = n[l];
      else return;
    }
    return n;
  },
  setByString = (n, e, c) => {
    let t = n;
    (e = e.replace(/\[(\w+)\]/g, '.$1')), (e = e.replace(/^\./, ''));
    const r = e.split('.'),
      l = r.length;
    for (let i = 0; i < l - 1; i++) {
      const s = r[i];
      t[s] || (t[s] = {}), (t = t[s]);
    }
    t[r[l - 1]] = c;
  };
