import r from 'react';
function a(o, i) {
  const t = r.useRef(0),
    e = r.useRef(null),
    n = r.useRef(null),
    u = r.useRef(null);
  return (
    r.useEffect(() => {
      (n.current = i), (u.current = o);
    }),
    r.useCallback((c) => {
      const s = t.current + 1 === 2,
        l = e.current;
      if (
        (l &&
          s &&
          (clearTimeout(e.current),
          (e.current = null),
          (t.current = 0),
          n.current && n.current(c)),
        !l)
      ) {
        t.current = t.current + 1;
        const f = setTimeout(() => {
          clearTimeout(e.current),
            (e.current = null),
            (t.current = 0),
            u.current && u.current(c);
        }, 200);
        e.current = f;
      }
    }, [])
  );
}
export { a as useDoubleClick };
