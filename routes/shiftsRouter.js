const express = require('express')
const router = express.Router({ mergeParams: true })
const { protect, limitActions } = require('../middleware/auth')
const { getShifts, createShift, editShift } = require('../BLL/shiftsBLL')

router.route('/').get(protect ,getShifts, limitActions).post(protect ,createShift, limitActions)
router.route('/:id').put(protect, editShift, limitActions)

module.exports = router