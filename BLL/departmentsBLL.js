const Department = require('../models/Department')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

// Get all departments
// Route: GET /api/v1/departments
const getAllDepartments = asyncHandler(async (req, res, next) => {
    const departments = await Department.find().populate({
        path: 'employees',
        select: 'firstName lastName -department'
    })
    res.status(200).json({ success: true,count: departments.length, data: departments })
    next()
})

// Get single department
// Route: GET /api/v1/departments/:id
const getSingleDepartment = asyncHandler(async (req, res, next) => {
    const department = await Department.findById(req.params.id)
    if(!department){
        next(new ErrorResponse(`No department found with id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: department })
    next()
})

// Add department
// Route: POST /api/v1/departments
const addDepartment = asyncHandler(async (req, res, next) => {
    const department = await Department.create(req.body)
    res.status(201).json({ success: true, data: department })
    next()
})

// edit department
// Route: PUT /api/v1/departments/:id
const editDepartment = asyncHandler(async (req, res, next) => {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true  })
    if(!department){
        next(new ErrorResponse(`No department found with id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: department })
    next()
})

// Delete department
// Route: DELETE /api/v1/departments/:id
const deleteDepartment = asyncHandler(async (req, res, next) => {
    const department = await Department.findByIdAndDelete(req.params.id)
    if(!department){
        next(new ErrorResponse(`No department found with id of ${req.params.id}`, 404))
    }
    //department.remove()
    res.status(200).json({ success: true, data: 'Department deleted!' })
    next()
})

module.exports = {
    getAllDepartments,
    getSingleDepartment,
    addDepartment,
    editDepartment,
    deleteDepartment
}