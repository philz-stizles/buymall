class ApiError extends Error {
  statusCode: number;

  status: boolean;

  isOperational: boolean;

  constructor(
    statusCode: number,
    message?: string,
    isOperational = true,
    stack = ''
  ) {
    super(message);

    this.statusCode = statusCode;
    this.status = false;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
