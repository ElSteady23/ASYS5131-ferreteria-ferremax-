const createErrorResponse = (message, statusCode = 500, error) => ({
    error: message,
    statusCode,
    details: error ? error.details : undefined,
  });
  
  const createSuccessResponse = (data) => ({
    data,
    success: true,
  });
  
  module.exports = {
    createErrorResponse,
    createSuccessResponse,
  };
  