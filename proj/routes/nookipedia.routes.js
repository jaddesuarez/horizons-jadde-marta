const { query } = require('express')
const express = require('express')
const app = require('../app')
const router = express.Router()

const User = require('../models/User.model')
const villagersApi = require('./../services/ACNH-villages-api.service')
const api = new villagersApi()

const { getFavVillagers } = require('./../middleware/route-guard')


// Villagers list
router.get("/", (req, res, next) => {

    api
        .getAllVillagers()
        .then(villagers => {
            const species = villagers.map(villager => villager.species)
            let speciesOptions = [...new Set(species)]

            const personality = villagers.map(villager => villager.personality)
            let personalityOptions = [...new Set(personality)]

            const gender = villagers.map(villager => villager.gender)
            let genderOptions = [...new Set(gender)]

            res.render('nookipedia/villagers-list', { villagers, speciesOptions, personalityOptions, genderOptions })
        })
        .catch(err => console.log(err))
})

// Villager details query
router.get("/search", (req, res, next) => {
    const { name } = req.query

    api
        .getOneVillager(name)
        .then(([villager]) => {
            res.render('nookipedia/villager-detail', villager)
        })
        .catch(err => console.log(err))
})

// Villager details
router.get("/:villager_name", (req, res, next) => {
    const { villager_name } = req.params

    let promises
    let isFav
    let isResident

    if (req.session.currentUser) {
        promises = [User.findById(req.session.currentUser._id), api.getOneVillager(villager_name)]
        Promise
            .all(promises)
            .then(([user, [villager]]) => {
                if (user.favVillagers.includes(villager.name)) {
                    isFav = true
                } else {
                    isFav = null
                }
                if (user.currentVillagers.includes(villager.name)) {
                    isResident = true
                } else {
                    isResident = null
                }
                res.render('nookipedia/villager-detail', { villager, isFav, isResident })
            })
            .catch(err => console.log(err))
    } else {
        promises = [api.getOneVillager(villager_name)]
        Promise
            .all(promises)
            .then(([villager]) => {
                res.render('nookipedia/villager-detail', villager)
            })
    }
})


module.exports = router