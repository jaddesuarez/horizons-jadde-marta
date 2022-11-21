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



module.exports = router
