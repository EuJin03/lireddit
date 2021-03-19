import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateRegister = (options: UsernamePasswordInput) => {
  // email
  const validateEmail = email.test(options.email);
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
  if (options.password.length < 6) {
    return [
      {
        field: "password",
        message: "length must be greater than 6",
      },
    ];
  }

  const validatePassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
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
