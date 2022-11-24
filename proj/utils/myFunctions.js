
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

function formatDate(dateObj) {

    const formattedDate = {
        day: dateObj.date.getDate(),
        month: dateObj.date.getMonth(),
        year: dateObj.date.getFullYear()
    }

    return formattedDate
}


function formatEventsDate(events) {

    let formattedEvents = events.map(elem => {
        return {
            ...elem._doc, formattedDate: formatDate(elem)
        }
    })

    return formattedEvents
}



module.exports = {
    getfavVillagers,
    getcurrentVillagers,
    formatDate,
    formatEventsDate
}