export const giveCheckedfor2dArr = (arr) => {
  let array = [];
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    if (obj.checked) {
      array = [...array, obj];
    }
  }
  return array;
};
