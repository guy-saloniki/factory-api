const Shift = require('../models/Shift')
const Employee = require('../models/Employee')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')



// Get all shifts / Get shifts for employee
// Route 1 : GET /api/v1/shifts
// Route 2 : GET /api/v1/employees/:employeeId/shift
const getShifts = asyncHandler( async (req, res, next) => {
    let query;
    if(req.params.employeeId){
        query = Shift.find({ employee: req.params.employeeId })
    }else{
        query = Shift.find()
    }
    const shifts = await query;
    res.status(200).json({ success: true, count: shifts.length, data: shifts })
    next()
})


// Create new shift
// Route: POST /api/v1/employees/:employeeId/shift
const createShift = asyncHandler(async (req, res, next) => {
    req.body.employee = req.params.employeeId
    const employee = await Employee.findById(req.params.employeeId)
    if(!employee){
        return next(new ErrorResponse(`Employee not found with id of ${req.params.employeeId}`, 404))
    }
    const shift = await Shift.create(req.body)
    res.status(201).json({ success: true, data: shift })
    next()
})

// Edit shift
// Route: PUT /api/v1/shifts/:id
// Access: private
const editShift = asyncHandler( async (req, res) => {
    let shift = await Shift.findById(req.params.id)
    if(!shift){
        return next(new ErrorResponse(`Shift not found with id of ${req.params.id}`, 404))
    }
    shift = await Shift.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.status(200).json({ success: true, data: shift })
    next()
})

module.exports = {
    getShifts,
    createShift,
    editShift
}