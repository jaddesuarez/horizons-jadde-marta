const express = require('express')
const router = express.Router()

const User = require('./../models/User.model')


// User details
router.get('/:user_id', (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(userFromDB => {
            console.log(userFromDB)
            res.render('user/profile', {
                userFromDB,
                isADM: req.session.currentUser.role === 'ADMIN',
                isCurrentUser: req.session.currentUser._id === user_id
            })
        })
        .catch(err => console.log(err))
})

// Edit User Profile (Render)
router.get('/:user_id/edit', (req, res) => {
    const { user_id } = req.params
    User
        .findById(user_id)
        .then(user => {
            res.render('user/profile-edit', user)
        })
        .catch(err => console.log(err))
})

// Edit User Profile (Handle)
router.post('/:user_id/edit', (req, res) => {
    const { email, username, name, lastName } = req.body
    const { user_id } = req.params
    User
        .findByIdAndUpdate(user_id, { email, username, name, lastName })
        .then(() => res.redirect(`/profile/${user_id}`))
        .catch(err => {
            console.log(err)
            res.redirect(`/profile/${user_id}/edit`)
        })
})

// Delete User Profile
router.post('/:user_id/delete', (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/signup'))
        .catch(err => console.log(err))

})



module.exports = router
