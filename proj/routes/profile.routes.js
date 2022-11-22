const express = require('express')
const { isLoggedIn, isLoggedOut, checkRoles } = require('./../middleware/route-guard')
const router = express.Router()

const uploader = require('../config/uploader.config')
const User = require('../models/User.model')
const Event = require('../models/Event.model')
const villagersApi = require('./../services/ACNH-villages-api.service')
const api = new villagersApi()


// User details - Profile
router.get('/:user_id', (req, res) => {
    const { user_id } = req.params

    const promises = [User.findById(user_id), Event.find().populate('creator').populate('attendance'), api.getAllVillagers()]

    Promise
        .all(promises)
        .then(([user, events, villagers]) => {
            const favVillagers = villagers.filter(elem => {
                if (user.favVillagers.includes(elem.name)) {
                    return elem
                }
            })
            const currentVillagers = villagers.filter(elem => {
                if (user.currentVillagers.includes(elem.name)) {
                    return elem
                }
            })
            const myEvents = events.filter(elem => {
                if (elem.creator._id.toString() === user_id) {
                    return elem
                }
            })
            const isADM = req.session.currentUser.role === 'ADMIN'
            const isCurrentUser = req.session.currentUser._id === user_id
            res.render('profile/profile', { user, myEvents, favVillagers, currentVillagers, isADM, isCurrentUser })
        })
        .catch(err => console.log(err))

    // User
    //     .findById(user_id)
    //     .then(userFromDB => {

    //         Event
    //             .find()
    //             .populate('creator')
    //             .then(eventsFromDB => {

    //                 let formattedDate = eventsFromDB[0].date.toString().split("T")[0].split("01")[0]

    //                 const formattedEvents = eventsFromDB.map(event => {
    //                     return { ...event._doc, formattedDate }
    //                 })

    //                 res.render('profile/profile', { userFromDB, formattedEvents })

    //                 // console.log(eventsFromDB[0].date.toString().split("T")[0].split("01")[0])
    //                 // console.log(formattedEvents)

    //                 /* isADM: req.session.currentUser.role === 'ADMIN',
    //                 isCurrentUser: req.session.currentUser._id === user_id */
    //             })
    //             .catch(err => console.log(err))
    //     })
    //     .catch(err => console.log(err))

})

// Edit Profile (Render)
router.get('/:user_id/edit', isLoggedIn, checkRoles, (req, res) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .then((userFromDB) => {
            res.render('profile/profile-edit', userFromDB)
        })
        .catch(err => console.log(err))
})

// Edit Profile (Handle)
router.post('/:user_id/edit', isLoggedIn, checkRoles, uploader.single('imageField'), (req, res) => {
    const { email, username, name, lastName, islandName, fruit } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { email, username, name, lastName, profileImg: req.file.path, islandName, fruit })
        .then(() => {
            res.redirect(`/profile/${user_id}`)
        })
        .catch(err => console.log(err))
})

// Add Villager to Fav
router.post('/:villager_name/addFav', isLoggedIn, (req, res) => {
    console.log('hello:', req.params)
    const { villager_name } = req.params

    User
        .findByIdAndUpdate(req.session.currentUser._id, { $addToSet: { favVillagers: villager_name } })
        .then(() => res.redirect(`/profile/${req.session.currentUser._id}`))
        .catch(err => {
            console.log(err)
            res.redirect(`/`)
        })
})

// Add Villager to Island
router.post('/:villager_name/addResident', isLoggedIn, (req, res) => {
    console.log('hello:', req.params)
    const { villager_name } = req.params

    User
        .findByIdAndUpdate(req.session.currentUser._id, { $addToSet: { currentVillagers: villager_name } })
        .then(() => res.redirect(`/profile/${req.session.currentUser._id}`))
        .catch(err => {
            console.log(err)
            res.redirect(`/`)
        })
})

// Delete Profile
router.post('/:user_id/delete', isLoggedIn, checkRoles, (req, res) => {
    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})

module.exports = router
