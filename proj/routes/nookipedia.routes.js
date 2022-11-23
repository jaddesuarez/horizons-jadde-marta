const express = require('express')
const router = express.Router()

const User = require('../models/User.model')
const villagersApi = require('./../services/ACNH-villages-api.service')
const api = new villagersApi()


// Villagers List & Filter
router.get("/", (req, res, next) => {

    const { name, species } = req.query

    let speciesOptions
    let personalityOptions
    let genderOptions

    if (name === undefined && species === undefined) {
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

//Fishs List
router.get('/fish', (req, res, next) => {
    api
        .getAllFish()
        .then(fish => {
            res.render('nookipedia/fish-list', { fish })
        })
        .catch(err => next(err))
})

//Bugs List
router.get('/bugs', (req, res, next) => {
    api
        .getAllBugs()
        .then(bugs => {
            res.render('nookipedia/bugs-list', { bugs })
        })
        .catch(err => next(err))
})

//Fossils List
router.get('/fossils', (req, res, next) => {
    api
        .getAllFossils()
        .then(fossils => {
            res.render('nookipedia/fossils-list', { fossils })
        })
        .catch(err => next(err))
})

//Artwork List
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

    if (req.session.currentUser) {
        let promises = [User.findById(req.session.currentUser._id), api.getOneVillager(villager_name)]
        Promise
            .all(promises)
            .then(([user, [villager]]) => {

                const isFav = user.favVillagers.includes(villager.name)
                const isResident = user.currentVillagers.includes(villager.name)

                res.render('nookipedia/villager-detail', { villager, isFav, isResident })
            })
            .catch(err => next(err))
    } else {
        let promises = [api.getOneVillager(villager_name)]
        Promise
            .all(promises)
            .then(([[villager]]) => {
                console.log('whattt:', villager)
                res.render('nookipedia/villager-detail', { villager })
            })
            .catch(err => next(err))
    }
})


module.exports = router