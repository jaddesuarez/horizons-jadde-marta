const express = require('express')
const router = express.Router()

const User = require('./../models/User.model')


// List Profiles
router.get('/', (req, res) => {

    User
        .find()
        .sort({ title: 1 })
        .then(usersArr => {
            res.render('user/community', { usersArr })
        })
        .catch(err => next(err))
})

router.get("/search", (req, res, next) => {
    const { username } = req.query

    User
        .find({ username })
        .then((username) => {
            console.log(username)
            res.render('profile/profile', { user: username })
        })
        .catch(err => next(err))
})
module.exports = router
