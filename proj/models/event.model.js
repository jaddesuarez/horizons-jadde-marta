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
        eventImg: {
            type: String,
            default: '',
            set: value => value === '' ? '' : value
        }
    },
    {
        timestamps: true
    }
)


module.exports = model('Event', eventSchema)
