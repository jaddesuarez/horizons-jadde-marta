const express = require('express')
const router = express.Router()

const User = require('../models/User.model')

const bcryptjs = require('bcryptjs')
const saltRounds = 10

const { isLoggedOut } = require('../middleware/route-guard')


// Signup form (render)
router.get('/signup', (req, res) => {
    res.render('auth/signup')
})


// Signup form (handle)
router.post('/signup', (req, res) => {

    const { email, username, name, plainPassword } = req.body

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => {
            return bcryptjs.hash(plainPassword, salt)
        })
        .then(hashedPassword => {
            return User.create({ email, username, name, password: hashedPassword })
        })
        .then(() => res.redirect('/login'))
        .catch(err => {
            console.log(err)
            res.render('auth/signup', { errorMessage: 'Username alredy taken' })
        })
})


// Login form (render)
router.get('/login', (req, res) => {
    res.render('auth/login')
})


// Login form (handle)
router.post('/login', (req, res) => {

    const { email, plainPassword } = req.body

    User
        .findOne({ email })
        .then(user => {

            if (!user) {
                res.render('auth/login', { errorMessage: 'Wrong Email or Password' })
                return
            }

            if (bcryptjs.compareSync(plainPassword, user.password) === false) {
                res.render('auth/login', { errorMessage: 'Wrong Email or Password' })
                return
            }
            req.session.currentUser = user
            res.redirect('/')
        })
        .catch(err => console.log(err))
})


router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/login'))
})


module.exports = router