const User = require('../models/User')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const { getUsersMaxActions, writeToFile } = require('../DAL/usersFile')





//Protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    else if(req.cookies.token){
        token = req.cookies.token
    }

    // Make sure token exists
    if(!token){
        return next(new ErrorResponse('Not authorized to access this route', 401))
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        req.user = await User.findById(decoded.id)

        next()
    } catch (error) {
        return next(new ErrorResponse('Not authorized to access this route', 401))
    }
})

const limitActions = asyncHandler(async (req, res, next) => {
    const logs = await getUsersMaxActions();
    const currentDate = new Date().toLocaleDateString();
    const currentTimestamp = new Date().getTime();

    const userLog = logs.actions.find(
        log => log.id == req.user._id
    );
    if (!userLog) {
    logs.actions.push({
        id: req.user.id,
        maxActions: req.user.maxActions,
        date: currentDate,
        actionsAllowed: req.user.maxActions,
        timestamp: currentTimestamp
        });

    } else if (userLog.actionsAllowed > 0) {
        userLog.actionsAllowed--;

        // Check if 24 hours has been passed  
    } else if (currentTimestamp - userLog.timestamp >= 86400000) {
        userLog.actionsAllowed = req.user.maxActions;
        userLog.timestamp = currentTimestamp;
    }else {
        return next(new ErrorResponse(`Maximum actions reached for today for user ${req.user._id}, please try again in 24 hours`, 500))
    }

    await writeToFile(logs ,err => {
        if (err) {
            return next(new ErrorResponse('Error writing to file', 500))
        }

    });
    next()
})




module.exports = {
    protect,
    limitActions
}