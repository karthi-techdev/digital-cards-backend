export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

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
export const validateAdmin=(data:any)=>{
  const errors=[];
  if (!data.name) {
    errors.push('Name is required');
  } else if (typeof data.name !== 'string') {
    errors.push('Name must be a string');
  } else if (data.name.length < 3) {
    errors.push('Name must be at least 3 characters long');
  }

  if (!data.email) {
    errors.push('email is required');
  } else if (typeof data.email !== 'string') {
    errors.push('Email must be a string');
  }  else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push('Email must be valid');
  }
  if (!data.password) {
    errors.push('password is required');
  } else if (typeof data.password !== 'string') {
    errors.push('password must be a string');
  } else if (data.password.length < 8) {
    errors.push('password must be at least 8 characters long');
  }
  if (errors.length > 0) {
    throw new ValidationError(errors.join(', '));
  }

  return true;
}