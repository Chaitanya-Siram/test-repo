export const validatePassword = (value) => {
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;
  const specialCharacters = /[!@#$%^&*()_+[\]{};':"<>?,./\\|-]/g;

  const isLowerCaseValid = value?.match(lowerCaseLetters);
  const isUpperCaseValid = value.match(upperCaseLetters);
  const isSpecialCharactersValid = value.match(specialCharacters);
  const isNumberValid = value.match(numbers);

  const isLengthValid = value.length >= 12;

  return {
    isLowerCaseValid: !!isLowerCaseValid,
    isUpperCaseValid: !!isUpperCaseValid,
    isNumberValid: !!isNumberValid,
    isLengthValid,
    isSpecialCharactersValid: !!isSpecialCharactersValid,
  };
};
