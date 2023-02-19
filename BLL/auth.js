const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const { fetchUsers } = require('../DAL/usersWS')

// Register user
// POST /api/v1/auth/register
const register = asyncHandler(async (req, res, next) => {
    const{ name, username, email } = req.body

    //Validate email and username
    if(!name || !username || !email){
        return next(new ErrorResponse(`Please provide name, username and email`, 400))
    }

    // Chack for user in jsonplacholder.com
    const { data: users } = await fetchUsers()
    const isUserExists = users.find(user => user.username === username && user.email === email)
    if(!isUserExists){
        return next(new ErrorResponse(`Invalid username or email`, 401))
    }
    //create user
    const user = await User.create({
        name,
        username, 
        email,
    })
    
    sendTokenResponse(user ,201, res)
})

//Login user
//Route: POST /api/v1/auth/login
const login = asyncHandler(async (req, res, next) => {
    const { username, email } = req.body

    //Validate email and username
    if(!username || !email){
        return next(new ErrorResponse(`Please provide username and email`, 400))
    }
    // Chack for user
    const user = await User.findOne({ username, email })
    if(!user){
        return next(new ErrorResponse(`Invalid username or email`, 401))
    }
    
    sendTokenResponse(user, 200, res)
})

// Get current user
// Route: GET /api/v1/auth/me
const getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({ success: true, data: user })
})

// Logout user / Clear cookie
// Route: GET /api/v1/auth/logout
const logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({ success: true, data: {}})
})



// create cookie and send response
const sendTokenResponse = (user ,statusCode, res) => {
    const token = user.getSignJwtToken()
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,

    }
    if(process.env.NODE_ENV === 'production'){
        options.secure = true
    }
    res.status(statusCode).cookie('token', token, options).json({ success: true, token })
}

module.exports = {
    register,
    login,
    getMe,
    logout,
}