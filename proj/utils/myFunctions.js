function getFavVillagers(user, villager) {
    if (user.favVillagers.includes(villager.name)) {
        const isFav = true
    } else {
        isFav = null
    }
    return isFav
}


module.exports = {
    getFavVillagers
}