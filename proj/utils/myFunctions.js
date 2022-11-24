
function getfavVillagers(villagers, user) {
    let favVillagers = villagers.filter(elem => {
        if (user.favVillagers.includes(elem.name)) {
            return elem
        }
    })
    return favVillagers
}

function getcurrentVillagers(villagers, user) {
    let currentVillagers = villagers.filter(elem => {
        if (user.currentVillagers.includes(elem.name)) {
            return elem
        }
    })
    return currentVillagers
}

function formatDate(events) {
    let formattedEvents = events.map(elem => {
        formattedDate = {
            day: elem.date.getDate(),
            month: elem.date.getMonth(),
            year: elem.date.getFullYear()
        }
        return { ...elem._doc, formattedDate }
    })

    return formattedEvents
}

module.exports = {
    getfavVillagers,
    getcurrentVillagers,
    formatDate
}