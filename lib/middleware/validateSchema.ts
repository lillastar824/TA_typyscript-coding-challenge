const validateSchema = (data, schema) => {
  if (!data) {
    throw {
      status: 400,
      message: 'No data was sent',
    };
  }
  let validation = schema.validate(data, {
    abortEarly: false,
  });
  if (validation.error) {
    let messages = validation.error.details.map((i) => i.message);
    let errMessage = `Validation errors: ${messages.join(', ')}`;
    throw {
      status: 400,
      message: errMessage,
    };
  }
};

export default validateSchema;
