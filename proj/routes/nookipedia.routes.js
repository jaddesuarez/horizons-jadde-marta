const express = require('express')
const router = express.Router()

const villagersApi = require('./../services/ACNH-villages-api.service')
const api = new villagersApi()


// Villagers list
router.get("/", (req, res, next) => {

    api
        .getAllVillagers()
        .then(villagers => res.render('nookipedia/villagers-list', { villagers }))
        .catch(err => console.log(err))

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