const generateMessage = (message: string) => {
  return {
    message,
    createdAt: new Date().getTime(),
  };
};

export { generateMessage };
