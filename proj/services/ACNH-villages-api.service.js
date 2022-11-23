const axios = require('axios')
const API_KEY = process.env.API_KEY

class ApiService {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://api.nookipedia.com',
            headers: {
                "X-API-KEY": API_KEY
            }
        })
    }

    getAllVillagers = () => {
        return this.axiosApp.get('/villagers').then((res) => res.data)
    }

    getOneVillager = (villagerName) => {
        return this.axiosApp.get(`villagers?name=${villagerName}`).then((res) => res.data)
    }

    getOneSpecies = (species) => {
        return this.axiosApp.get(`villagers?species=${species}`).then((res) => res.data)
    }
}

module.exports = ApiService