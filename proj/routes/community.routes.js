const express = require('express')
const router = express.Router()

const User = require('./../models/User.model')


// List Profiles
router.get('/', (req, res) => {

    let error
    const { errorMessage } = req.query
    if (req.query.errorMessage === undefined) {
        error = {
            canView: false
        }
    } else {
        error = {
            errorMessage,
            canView: true
        }
    }

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
            if (user === undefined) {
                res.redirect('/community?errorMessage=USER DOES NOT EXIST')
            } else {
                res.redirect(`/profile/${user._id}`)
            }
        })
        .catch(err => next(err))

})

module.exports = router
