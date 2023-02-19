const express = require('express')
const employeeRouter = require('./employeesRouter')
const router = express.Router()
const { getAllDepartments, getSingleDepartment, addDepartment, editDepartment, deleteDepartment } = require('../BLL/departmentsBLL')
const { protect, limitActions } = require('../middleware/auth')

//Re-route into other resource routers
router.use('/:departmentId/employees', employeeRouter)

router.route('/').get(protect, getAllDepartments, limitActions).post(protect, addDepartment, limitActions)
router.route('/:id')
    .get(protect, getSingleDepartment, limitActions)
    .put(protect, editDepartment, limitActions)
    .delete(protect, deleteDepartment, limitActions)


module.exports = router