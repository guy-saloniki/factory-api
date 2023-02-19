const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add last name'],
    },
    startWorkYear: {
        type: Number,
        required: [true, 'Please add start work year']
    },
    department: {
        type: mongoose.Schema.ObjectId,
        ref: 'Department',
    },
    shift: {
        type: mongoose.Schema.ObjectId,
        ref: 'Shift',
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// Delete shifts when employee is deleted
EmployeeSchema.pre('remove', async function(next){
    console.log('Shifts removed')
    await this.model('Shift').deleteMany({ employee: this._id })
    next()
})

// Reverse populate with virtuals
EmployeeSchema.virtual('shifts', {
    ref: 'Shift',
    localField: '_id',
    foreignField: 'employee',
    justOne: false
})




module.exports = mongoose.model('Employee', EmployeeSchema)