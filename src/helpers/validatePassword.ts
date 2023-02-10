export const validatePassword = (value: string) => {
  const lengthIsSmall = value.length < 6;
  if (lengthIsSmall) {
    return {
      isValid: false,
      message: "Please enter Password of atleast 6 characters",
    };
  }

  const containsSpace = value.includes(" ");
  if (containsSpace) {
    return {
      isValid: false,
      message: "It should not have empty space  ",
    };
  }

  const noDigits = value.match(/\d/g) === null;
  const noSpecialChar = value.match(/[^A-Z0-9]/i) === null;
  const noUpperCase = value.match(/[A-Z]/) === null;
  const noLowerCase = value.match(/[a-z]/) === null;
  if (noDigits || noSpecialChar || noUpperCase || noLowerCase) {
    return {
      isValid: false,
      message:
        "It should contain combination of numbers, letters (lowercase and uppercase) and special characters",
    };
  }

  return {
    isValid: true,
    message: null,
  };
};
