const express = require('express')
const router = express.Router()

const uploader = require('../config/uploader.config')
const User = require('../models/User.model')
const Event = require('../models/Event.model')

const { formatEventsDate } = require('../utils/myFunctions')
const { isLoggedIn } = require('./../middleware/route-guard')

// List Events
router.get('/', (req, res, next) => {

    Event
        .find()
        .sort({ title: 1 })
        .populate('creator attendance')
        .then(eventArr => {
            res.render('event/event-list', { eventArr })
        })
        .catch(err => next(err))
})

// Create Event (Render)
router.get('/create', isLoggedIn, (req, res, next) => {
    res.render('event/new-event')
})

// Create Event (Handle)
router.post('/create', (req, res, next) => {

    const { _id: creator } = req.session.currentUser
    const { _id: attendance } = req.session.currentUser
    const { title, description, date } = req.body

    Event
        .create({ title, description, creator, date, attendance })
        .then(() => {
            res.redirect(`/profile/${creator}`)
        })
        .catch(err => {
            next(err)
            res.redirect('/event/create')
        })
})


// Edit Event (Render)
router.get('/:event_id/edit', isLoggedIn, (req, res, next) => {

    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(event => {
            res.render('event/event-edit', { event })
        })
        .catch(err => next(err))
})


// Edit Event (Handle)
router.post('/:event_id/edit', isLoggedIn, uploader.single('imageField'), (req, res, next) => {

    const { _id: creator } = req.session.currentUser
    const { title, description, date } = req.body
    const { event_id } = req.params
    const { path: eventImg } = req.file

    Event
        .findByIdAndUpdate(event_id, { title, description, creator, date, eventImg })
        .then(() => res.redirect(`/event/${event_id}`))
        .catch(err => {
            next(err)
            res.redirect(`/event/${event_id}/edit`)
        })
})

// Join Event
router.post('/:event_id/join', (req, res, next) => {
    // console.log('hello:', req.params)
    const { event_id } = req.params
    const { _id: attendance } = req.session.currentUser

    Event
        .findByIdAndUpdate(event_id, { $addToSet: { attendance } })
        .then(() => res.redirect(`/event`))
        .catch(err => {
            next(err)
            res.redirect(`/event/${event_id}`)
        })
})

// Unjoin Event
router.post('/:event_id/unjoin', (req, res, next) => {

    const { event_id } = req.params
    const { _id: attendance } = req.session.currentUser

    Event
        .findByIdAndUpdate(event_id, { $pull: { attendance } })
        .then(() => res.redirect(`/event`))
        .catch(err => {
            next(err)
            res.redirect(`/event/${event_id}`)
        })
})

// Delete Event
router.post('/:event_id/delete', (req, res, next) => {

    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect(`/event`))
        .catch(err => {
            next(err)
            res.redirect(`/event/${event_id}`)
        })
})

// Event Details
router.get('/:event_id', (req, res, next) => {

    const { event_id } = req.params

    Event
        .findById(event_id)
        .populate('creator attendance')
        .then(eventFromDB => {
            [eventFromDB] = formatEventsDate([eventFromDB])
            res.render('event/event-details', eventFromDB)
        })
        .catch(err => next(err))
})

module.exports = router