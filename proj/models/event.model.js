const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const eventSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        creator: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        date: { type: Date, required: true },
        attendance: [{
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }],
        eventImg: {
            type: String,
            default: '/images/event-default.png',
            set: value => value === '' ? '/images/event-default.png' : value
        }
    },
    {
        timestamps: true
    }
)


module.exports = model('Event', eventSchema)
