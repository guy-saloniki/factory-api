const express = require('express')
const router = express.Router()
const{ register, login, getMe, logout } = require('../BLL/auth')
const { protect, limitActions } = require('../middleware/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/me').get(protect, getMe, limitActions)
router.route('/logout').get(protect, logout)

module.exports = router