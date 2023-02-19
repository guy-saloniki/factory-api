const express = require('express')
const router = express.Router()
const { protect, limitActions } = require('../middleware/auth')
const { getAllUsers } = require('../BLL/usersBLL.')

router.route('/').get(protect, getAllUsers, limitActions)

module.exports = router