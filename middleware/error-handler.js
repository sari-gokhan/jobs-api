const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // Set default 
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later."
  }
  
  if(err.code && err.code === 11000) {
    customError.msg = `This ${Object.keys(err.keyValue)} already exists.`
  }

  return res.status(customError.statusCode).json({msg: customError.msg});
  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware
