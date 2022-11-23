const { query } = require('express')
const express = require('express')
const app = require('../app')
const router = express.Router()

const User = require('../models/User.model')
const villagersApi = require('./../services/ACNH-villages-api.service')
const api = new villagersApi()

const { getIsFav, getIsResident } = require('./../utils/myFunctions')


// Villagers list & Filter
router.get("/", (req, res, next) => {
    const { name, species } = req.query

    let speciesOptions
    let personalityOptions
    let genderOptions

    if (name === undefined && species === undefined) {
        console.log('entro en el de todos')
        api
            .getAllVillagers()
            .then(villagers => {
                const species = villagers.map(villager => villager.species)
                speciesOptions = [...new Set(species)]

                const personality = villagers.map(villager => villager.personality)
                personalityOptions = [...new Set(personality)]

                const gender = villagers.map(villager => villager.gender)
                genderOptions = [...new Set(gender)]

                res.render('nookipedia/villagers-list', { villagers, speciesOptions, personalityOptions, genderOptions })
            })
            .catch(err => next(err))
    }

    else if (species === undefined) {
        let villager_name = name

        api
            .getOneVillager(villager_name)
            .then(([villager]) => {
                res.render('nookipedia/villager-detail', { villager })
            })
            .catch(err => next(err))
    }

    else if (name === undefined) {
        console.log('entro en el de buscar especie')

        api
            .getOneSpecies(species)
            .then((villagers) => {
                res.render('nookipedia/villagers-list', { villagers, speciesOptions, personalityOptions, genderOptions })
            })
            .catch(err => next(err))
    }
})

router.get('/fish', (req, res, next) => {
    api
        .getAllFish()
        .then(fish => {
            res.render('nookipedia/fish-list', { fish })
        })
        .catch(err => next(err))
})

router.get('/bugs', (req, res, next) => {
    api
        .getAllBugs()
        .then(bugs => {
            res.render('nookipedia/bugs-list', { bugs })
        })
        .catch(err => next(err))
})

router.get('/fossils', (req, res, next) => {
    api
        .getAllFossils()
        .then(fossils => {
            res.render('nookipedia/fossils-list', { fossils })
        })
        .catch(err => next(err))
})

router.get('/artwork', (req, res, next) => {
    api
        .getAllArtwork()
        .then(artwork => {
            res.render('nookipedia/artwork-list', { artwork })
        })
        .catch(err => next(err))
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
                // getIsFav(user, villager, isFav)
                if (user.favVillagers.includes(villager.name)) {
                    isFav = true
                } else {
                    isFav = null
                }
                // getIsResident(user, villager, isResident)
                if (user.currentVillagers.includes(villager.name)) {
                    isResident = true
                } else {
                    isResident = null
                }
                // console.log(isFav)
                // console.log(isResident)

                res.render('nookipedia/villager-detail', { villager, isFav, isResident })
            })
            .catch(err => next(err))
    } else {
        promises = [api.getOneVillager(villager_name)]
        Promise
            .all(promises)
            .then(([villager]) => {
                console.log(villager)
                res.render('nookipedia/villager-detail', villager)
            })
            .catch(err => next(err))
    }
})


module.exports = router