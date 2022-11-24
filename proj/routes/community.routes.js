const express = require('express')
const router = express.Router()

const User = require('./../models/User.model')


// List Profiles
router.get('/', (req, res) => {

    const { errorMessage: error } = req.query

    User
        .find()
        .select({ username: 1, name: 1, lastName: 1, profileImg: 1 })
        .sort({ title: 1 })
        .then(usersArr => {
            res.render('user/community', { usersArr, error })
        })
        .catch(err => next(err))
})

// Profile Details
router.get("/search", (req, res, next) => {

    const { username } = req.query

    User
        .find({ username })
        .then(([user]) => {
            if (!user) {
                res.redirect('/community?errorMessage=USER DOES NOT EXIST')
            } else {
                res.redirect(`/profile/${user._id}`)
            }
        })
        .catch(err => next(err))

})

module.exports = router
