const User = require('../models/User')
const asyncHandler = require('../middleware/async')

// Get all users
//Route: GET /api/v1/users
const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({ success: true, count: users.length, data: users })
    next()
})

module.exports = {
    getAllUsers
}