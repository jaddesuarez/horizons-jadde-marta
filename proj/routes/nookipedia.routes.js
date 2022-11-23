const { query } = require('express')
const express = require('express')
const app = require('../app')
const router = express.Router()

const User = require('../models/User.model')
const villagersApi = require('./../services/ACNH-villages-api.service')
const api = new villagersApi()


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
            .catch(err => console.log(err))
    }

    else if (species === undefined) {
        let villager_name = name

        api
            .getOneVillager(villager_name)
            .then(([villager]) => {
                res.render('nookipedia/villager-detail', villager)
            })
            .catch(err => console.log(err))
    }

    else if (name === undefined) {
        console.log('entro en el de buscar especie')

        api
            .getOneSpecies(species)
            .then((villagers) => {
                console.log(villagers)
                res.render('nookipedia/villagers-list', { villagers, speciesOptions, personalityOptions, genderOptions })
            })
            .catch(err => console.log(err))
    }
})


// Villager details
router.get("/:villager_name", (req, res, next) => {
    const { villager_name } = req.params

    api
        .getOneVillager(villager_name)
        .then(([villager]) => {
            res.render('nookipedia/villager-detail', villager)
        })
        .catch(err => console.log(err))
})


module.exports = router