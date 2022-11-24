const express = require('express')
const router = express.Router()

const User = require('./../models/User.model')


// List Profiles
router.get('/', (req, res) => {

    User
        .find()
        // .select({ username: 1})
        .sort({ title: 1 })
        .then(usersArr => {
            res.render('user/community', { usersArr })
        })
        .catch(err => next(err))
})

// Profile Details
router.get("/search", (req, res, next) => {
    const { username } = req.query

    User
        .find({ username })
        .then(([user]) => {
            console.log(user)
            // res.render('profile/profile', { user })
            res.redirect(`/profile/${user._id}`)
        })
        .catch(err => next(err))
})
module.exports = router
