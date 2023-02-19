const ErrorResponse = require("../utils/errorResponse")

const errorHandler = (err, req, res, next) => {

    let error = { ...err }

    error.message = err.message
    console.log(err.stack)

    if(err.name === 'CastError'){
        const message = `Resource not found with id of ${err.value}`
        error = new ErrorResponse(message, 404)
    }
    //Duplicate key error
    if(err.code === 11000){
        const message = 'Duplicate field entered'
        error = new ErrorResponse(message, 400)
    }
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.status || 500).json({ success: false, error: error.message || 'Server error' })
}

module.exports = errorHandler