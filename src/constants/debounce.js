export const debounce = (func, timeout = 1000) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

// export function debounce(func, delay = 500) {
//   let timer;
//   return function (event) {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(func, delay, event);
//   };
// }
