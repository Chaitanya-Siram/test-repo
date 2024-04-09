export const ValidateEmail = (value) => {
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (value.match(mailformat)) {
    return true;
  } else {
    return false;
  }
};
