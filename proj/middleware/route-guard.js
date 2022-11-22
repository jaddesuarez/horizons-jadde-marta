function isLoggedIn(req, res, next) {
    if (req.session.currentUser) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Please login' })
    }
}

function isLoggedOut(req, res, next) {
    if (!req.session.currentUser) {
        next()
    } else {
        res.redirect('/')
    }
}

function checkRoles(req, res, next) {
    if (req.session.currentUser._id === req.params.user_id || req.session.currentUser.role === 'ADMIN') {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'Please login' })
    }
}


module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkRoles,
}