const mongoose = require('mongoose')


const ShiftSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: new Date()
    },
    startingHour: Number,
    endingHour: Number,
    employee: {
        type: mongoose.Schema.ObjectId,
        ref: 'Employee',
    }
})

module.exports = mongoose.model('Shift', ShiftSchema)