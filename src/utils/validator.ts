export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}


/* AUTH – REGISTER VALIDATION */

export const validateRegister = (data: any) => {
  const errors: string[] = [];

  if (!data.name) {
    errors.push("Name is required");
  }

  if (!data.email) {
    errors.push("Email is required");
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.push("Invalid email format");
  }

  if (!data.phone) {
    errors.push("Phone is required");
  } else if (!/^\d{10}$/.test(data.phone)) {
    errors.push("Phone must be 10 digits");
  }

  if (!data.password) {
    errors.push("Password is required");
  } else if (data.password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join(", "));
  }

  return true;
};

/* LOGIN VALIDATION */
export const validateLogin = (data: any) => {
  const errors: string[] = [];

  if (!data.email) {
    errors.push("Email is required");
  }

  if (!data.password) {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join(", "));
  }

  return true;
};

/* FORGOT PASSWORD */
export const validateForgotPassword = (email: any) => {
  if (!email) {
    throw new ValidationError("Email is required");
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    throw new ValidationError("Invalid email format");
  }

  return true;
};

/* RESET PASSWORD */
export const validateResetPassword = (data: any) => {
  const errors: string[] = [];

  if (!data.token) {
    errors.push("Reset token is required");
  }

  if (!data.newPassword) {
    errors.push("New password is required");
  } else if (data.newPassword.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join(", "));
  }

  return true;
};












export const validateFaq = (data: any) => {
  const errors = [];

  // Question validation
  if (!data.question) {
    errors.push('Question is required');
  } else if (typeof data.question !== 'string') {
    errors.push('Question must be a string');
  } else if (data.question.length < 5) {
    errors.push('Question must be at least 5 characters long');
  }

  // Answer validation
  if (!data.answer) {
    errors.push('Answer is required');
  } else if (typeof data.answer !== 'string') {
    errors.push('Answer must be a string');
  } else if (data.answer.length < 10) {
    errors.push('Answer must be at least 10 characters long');
  }

  // Status validation (optional field)
  if (data.status !== undefined && typeof data.status !== 'boolean') {
    errors.push('Status must be a boolean value');
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join(', '));
  }

  return true;
};