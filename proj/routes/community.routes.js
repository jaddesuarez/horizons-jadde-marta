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
        .catch(err => console.log(err))
})

router.get("/search", (req, res, next) => {
    const { username } = req.query
    console.log(username)
    User
        .find({ username })
        .then((username) => {
            res.render('profile/profile', { user: username })
        })
        .catch(err => console.log(err))
})

module.exports = router
