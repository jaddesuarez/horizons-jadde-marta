const express = require('express')
const { isLoggedIn } = require('../middleware/route-guard')
const router = express.Router()

const User = require('../models/User.model')

/*  `/profile/:id`
 `/profile/:id/edit`
 `/profile/:id/delete` */

<<<<<<< HEAD:proj/routes/profile.routes.js
=======

// User details
router.get('/:user_id', (req, res) => {
>>>>>>> ca044ba7e7253a88081c11dc9d887262a179b5a8:proj/routes/user.routes.js

// User details - Profile
router.get('/:user_id', (req, res) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .then(userFromDB => {
            console.log(userFromDB)
            res.render('profile/profile', {
                userFromDB,
                /* isADM: req.session.currentUser.role === 'ADMIN',
                isCurrentUser: req.session.currentUser._id === user_id */
            })
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












/* 
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

}) */



module.exports = router
