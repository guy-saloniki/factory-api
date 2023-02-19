const mongoose = require('mongoose')

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add department name']
    },
    manager: {
        type: String,
        required: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// Delete employees when department is deleted
DepartmentSchema.pre('remove', async function(next){
    console.log('Employees removed')
    await this.model('Employee').deleteMany({ department: this._id })
    next()
})

// Reverse populate with virtuals
DepartmentSchema.virtual('employees', {
    ref: 'Employee',
    localField: '_id',
    foreignField: 'department',
    justOne: false
})

module.exports = mongoose.model('Department', DepartmentSchema)