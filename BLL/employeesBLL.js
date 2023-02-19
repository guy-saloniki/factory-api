const Employee = require('../models/Employee')
const Department = require('../models/Department')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

// Get all employees
// Route 1: GET /api/v1/employees
// Rout 2: GET /api/v1/departments/:departmentId/employees
const getAllEmployees = asyncHandler( async (req, res, next) => {
    let query;
    if(req.params.departmentId){
        query = Employee.find({ department: req.params.departmentId })
    }else{
        query = Employee.find().populate('shifts')
    }
    const employees = await query;
    res.status(200).json({ success: true, count: employees.length, data: employees })
    next()
})

// Get single employee
// Route: GET /api/v1/employees/:id
const getSingleEmployee = asyncHandler( async (req, res, next) => {
    const employee = await Employee.findById(req.params.id).populate('department shifts')
    if(!employee){
        return next(new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: employee })
    next()
})

// Add employee
// Route: POST /api/v1/department/:departmentId/employee
// Access: private
const addEmployee = asyncHandler( async (req, res, next) => {
    req.body.department = req.params.departmentId
    const department = await Department.findById(req.params.departmentId)
    if(!department){
        return next(new ErrorResponse(`Department not found with id of ${req.params.departmentId}`, 404))
    }
    const employee = await Employee.create(req.body)
    res.status(201).json({ success: true, data: employee })
    next()
})

// Edit employee
// Route: PUT /api/v1/employees/:id
// Access: private
const editEmployee = asyncHandler( async (req, res, next) => {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if(!employee){
        return next(new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: employee })
    next()
})

// Delete employee
// Route: DELETE /api/v1/employees/:id
// Access: private
const deleteEmployee = asyncHandler( async (req, res, next) => {
    const employee = await Employee.findById(req.params.id)
    if(!employee){
        return next(new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404))
    }
    employee.remove()
    res.status(200).json({ success: true, data: 'Employee deleted!' })
    next()
})

module.exports = {
    getAllEmployees,
    getSingleEmployee,
    addEmployee,
    editEmployee,
    deleteEmployee
}