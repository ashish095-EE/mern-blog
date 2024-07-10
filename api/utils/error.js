export const errorHandler = (statusCode,message) =>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};

//error handler for api errors