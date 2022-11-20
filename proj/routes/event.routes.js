const express = require('express')
const router = express.Router()

const User = require('../models/User.model')
const Event = require('../models/Event.model')

// // List Events
// router.get('/', (req, res) => {

//     Event
//         .find()
//         // .sort({ title: 1 })
//         .populate('creator', 'name')
//         .populate('islandName')
//         .then(eventArr => {
//             res.render('event/new-event', { eventArr })
//         })
//         .catch(err => console.log(err))
// })

// // Event Details
// router.get('/:event_id', (req, res) => {

//     const { event_id } = req.params

//     Event
//         .findById(event_id)
//         // .sort({ title: 1 })
//         .populate('creator', 'name')
//         .populate('islandName')
//         .then(eventFromDB => {
//             // console.log(eventFromDB)
//             res.render('event/event-details', eventFromDB)
//         })
//         .catch(err => console.log(err))
// })

// Create Event (Render)
router.get('/create', (req, res) => {
    const currentUser = req.session.currentUser
    res.render('event/new-event', { currentUser })
})

// Create Item (Handle)
router.post('/create', (req, res) => {

    const currentUser = req.session.currentUser
    const { title, description, creator, date } = req.body

    Event
        .create({ title, description, creator, date })
        .then(() => {
            res.redirect(`/profile/${currentUser._id}`)
        }).catch(err => {
            console.log(err)
            res.redirect('/event/create')
        })
})


// Edit Event
router.get('/:event_id/edit', (req, res) => {
    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(event => {
            res.render('event/event-edit', { event })
        })
        .catch(err => console.log(err))
})

router.post('/:event_id/edit', (req, res) => {
    const { title, description, creator, date } = req.body
    const { event_id } = req.params

    Event
        .findByIdAndUpdate(event_id, { title, description, creator, date })
        .then(() => res.redirect(`/${event_id}`))
        .catch(err => {
            console.log(err)
        })
})

// Delete Item
router.post('/event/:event_id/delete', (req, res) => {
    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

module.exports = router