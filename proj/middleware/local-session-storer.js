const localSessionStorer = (req, res, next) => {
    if (req.session.currentUser) {
        res.locals.currentUserId = req.session.currentUser._id
    } else {
        res.locals.currentUserId = null
    }
    next()
}

module.exports = {
    localSessionStorer
}