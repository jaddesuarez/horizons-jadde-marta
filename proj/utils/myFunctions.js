function getIsFav(user, villager, isFav) {
    if (user.favVillagers.includes(villager.name)) {
        isFav = true
    } else {
        isFav = null
    }
    return isFav
}

function getIsResident(user, villager, isResident) {
    if (user.currentVillagers.includes(villager.name)) {
        isResident = true
    } else {
        isResident = null
    }
    return isResident
}


module.exports = {
    getIsFav,
    getIsResident
}