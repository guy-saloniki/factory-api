const express = require('express')
const router = express.Router({ mergeParams: true })
const shiftsRouter = require('./shiftsRouter')

const { getAllEmployees, getSingleEmployee, addEmployee, editEmployee, deleteEmployee } = require('../BLL/employeesBLL')
const { protect, limitActions } = require('../middleware/auth')

//Re-route into other resource routers
router.use('/:employeeId/shift', shiftsRouter)


router.route('/').get(protect, getAllEmployees, limitActions).post(protect, addEmployee,  limitActions)
router.route('/:id')
    .get(protect, getSingleEmployee, limitActions)
    .put(protect, editEmployee, limitActions)
    .delete(protect, deleteEmployee, limitActions)

module.exports = router

