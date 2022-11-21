const express = require('express')
const router = express.Router()


const User = require('../models/User.model')
const Event = require('../models/Event.model')

const { isLoggedIn, checkEdit, isLoggedOut, checkRoles } = require('./../middleware/route-guard')

// List Events
router.get('/', (req, res) => {

    Event
        .find()
        .sort({ title: 1 })
        .populate('creator')
        .populate('attendance')
        .then(eventArr => {
            console.log(eventArr)
            res.render('event/event-list', { eventArr })
        })
        .catch(err => console.log(err))
})

// Create Event (Render)
router.get('/create', isLoggedIn, (req, res) => {
    res.render('event/new-event')
})

// Create Event (Handle)
router.post('/create', (req, res) => {

    const creator = req.session.currentUser._id
    const attendance = req.session.currentUser._id
    const { title, description, date } = req.body
    // console.log(`holiii`, creator)

    Event
        .create({ title, description, creator, date, attendance })
        .then(() => {
            res.redirect(`/profile/${creator}`)
        }).catch(err => {
            console.log(err)
            res.redirect('/event/create')
        })
})


// Edit Event (Render)
router.get('/:event_id/edit', isLoggedIn, (req, res) => {
    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(event => {
            res.render('event/event-edit', { event })
        })
        .catch(err => console.log(err))
})


// Edit Event (Handle)
router.post('/:event_id/edit', isLoggedIn, (req, res) => {

    const creator = req.session.currentUser._id
    const { title, description, date } = req.body
    const { event_id } = req.params

    Event
        .findByIdAndUpdate(event_id, { title, description, creator, date })
        .then(() => res.redirect(`/event/${event_id}`))
        .catch(err => {
            console.log(err)
            res.redirect(`/event/${event_id}/edit`)
        })
})

// Join Event
router.post('/:event_id/join', (req, res) => {
    const { event_id } = req.params

    Event
        .findByIdAndUpdate(event_id, { $push: { attendance: req.session.currentUser._id } })
        .then(() => res.redirect(`/event`))
        .catch(err => {
            console.log(err)
            res.redirect(`/event/${event_id}`)
        })
})

// Delete Event
router.post('/:event_id/delete', (req, res) => {
    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect(`/event`))
        .catch(err => {
            console.log(err)
            res.redirect(`/event/${event_id}`)
        })
})

// Event Details
router.get('/:event_id', (req, res) => {

    const { event_id } = req.params

    Event
        .findById(event_id)
        .populate('creator')
        .then(eventFromDB => {
            console.log(eventFromDB.creator)
            res.render('event/event-details', eventFromDB)
        })
        .catch(err => console.log(err))
})

module.exports = router