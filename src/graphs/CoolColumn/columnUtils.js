export const getAccArr = (accArrList) => {
  const accArr = accArrList.reduce(function (r, a) {
    a.forEach(function (b, i) {
      r[i] = { ...b, value: (r[i]?.value || 0) + b.value };
    });
    return r;
  }, []);
  return accArr;
};
