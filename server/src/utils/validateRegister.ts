import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  // email
  const validateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    options.email
  );

  if (!validateEmail) {
    return [
      {
        field: "email",
        message: "email invalid",
      },
    ];
  }

  // username
  if (options.username.length <= 5) {
    return [
      {
        field: "username",
        message: "length must be greater than 5",
      },
    ];
  }

  // password
  if (options.password.length <= 8) {
    return [
      {
        field: "password",
        message: "length must be greater than 8",
      },
    ];
  }

  const validatePassword = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/g.test(
    options.password
  );

  if (!validatePassword) {
    return [
      {
        field: "password",
        message: "Password must contain letters, number and special character",
      },
    ];
  }

  return null;
};
