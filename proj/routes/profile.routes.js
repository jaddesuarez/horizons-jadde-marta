const express = require('express')
const { isLoggedIn, checkEdit } = require('./../middleware/route-guard')
const router = express.Router()

const uploader = require('../config/uploader.config')
const User = require('../models/User.model')
const Event = require('../models/Event.model')
const villagersApi = require('./../services/ACNH-villages-api.service')
const api = new villagersApi()


// User details - Profile
router.get('/:user_id', (req, res, next) => {
    const { user_id } = req.params

    const promises = [
        User.findById(user_id),
        Event.find().populate('creator attendance'),
        api.getAllVillagers()
    ]

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

            const isADM = req.session.currentUser?.role === 'ADMIN'
            const isCurrentUser = req.session.currentUser?._id === user_id

            res.render('profile/profile', { user, myEvents, favVillagers, currentVillagers, isADM, isCurrentUser })
        })
        .catch(err => next(err))

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
router.get('/:user_id/edit', isLoggedIn, checkEdit, (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .then((userFromDB) => {
            res.render('profile/profile-edit', userFromDB)
        })
        .catch(err => next(err))
})

// Edit Profile (Handle)
router.post('/:user_id/edit', isLoggedIn, checkEdit, uploader.single('imageField'), (req, res, next) => {
    const { email, username, name, lastName, islandName, fruit } = req.body
    const { user_id } = req.params
    const { path: profileImg } = req.file

    User
        .findByIdAndUpdate(user_id, { email, username, name, lastName, profileImg, islandName, fruit })
        .then(() => {
            res.redirect(`/profile/${user_id}`)
        })
        .catch(err => next(err))
})

// Add Villager to Fav
router.post('/:villager_name/addFav', isLoggedIn, (req, res, next) => {
    const { villager_name: favVillagers } = req.params

    User
        .findByIdAndUpdate(req.session.currentUser._id, { $addToSet: { favVillagers } })
        .then(() => res.redirect(`/wiki/${favVillagers}`))
        .catch(err => {
            next(err)
        })
})

// Remove Villager from Fav
router.post('/:villager_name/quitFav', isLoggedIn, (req, res, next) => {
    const { villager_name: favVillagers } = req.params

    User
        .findByIdAndUpdate(req.session.currentUser._id, { $pull: { favVillagers } })
        .then(() => res.redirect(`/wiki/${favVillagers}`))
        .catch(err => {
            next(err)
        })
})

// Add Villager to Island
router.post('/:villager_name/addResident', isLoggedIn, (req, res, next) => {
    const { villager_name: currentVillagers } = req.params

    User
        .findByIdAndUpdate(req.session.currentUser._id, { $addToSet: { currentVillagers } })
        .then(() => res.redirect(`/wiki/${currentVillagers}`))
        .catch(err => {
            next(err)
        })
})

// Remove Villager from Island
router.post('/:villager_name/quitResident', isLoggedIn, (req, res) => {
    const { villager_name: currentVillagers } = req.params

    User
        .findByIdAndUpdate(req.session.currentUser._id, { $pull: { currentVillagers } })
        .then(() => res.redirect(`/wiki/${currentVillagers}`))
        .catch(err => {
            next(err)
        })
})

// Delete Profile
router.post('/:user_id/delete', isLoggedIn, checkEdit, (req, res, next) => {
    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => next(err))
})

module.exports = router
