const express = require('express')
const router = express.Router()

const villagersApi = require('./../services/ACNH-villages-api.service')
const api = new villagersApi()


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


// Species
router.get

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