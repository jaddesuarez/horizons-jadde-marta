const express = require('express')
const { isLoggedIn } = require('../middleware/route-guard')
const router = express.Router()

const User = require('../models/User.model')
const Event = require('../models/Event.model')


// User details - Profile
router.get('/:user_id', (req, res) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .then(userFromDB => {

            Event
                .find()
                .populate('creator')
                .then(eventsFromDB => {

                    let formattedDate = eventsFromDB[0].date.toString().split("T")[0].split("01")[0]

                    const formattedEvents = eventsFromDB.map(event => {
                        return { ...event._doc, formattedDate }
                    })
                    // console.log(eventsFromDB[0].date.toString().split("T")[0].split("01")[0])
                    // console.log(formattedEvents)
                    res.render('profile/profile', { userFromDB, formattedEvents })
                    /* isADM: req.session.currentUser.role === 'ADMIN',
                    isCurrentUser: req.session.currentUser._id === user_id */
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

})

// Edit Profile
router.get('/:user_id/edit', (req, res) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .then((userFromDB) => {
            res.render('profile/profile-edit', userFromDB)
        })
        .catch(err => console.log(err))
})

router.post('/:user_id/edit', (req, res) => {
    const { email, username, name, lastName, profileImg, islandName, fruit } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { email, username, name, lastName, profileImg, islandName, fruit })
        .then(() => {
            res.redirect(`/profile/${user_id}`)
        })
        .catch(err => console.log(err))
})

// Delete Profile
router.post('/:user_id/delete', (req, res) => {
    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})

module.exports = router
