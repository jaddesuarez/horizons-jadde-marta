require("dotenv").config()
require("./db")

const express = require("express")
const app = express()

require("./config")(app)
app.locals.appTitle = 'HORIZONS'
require('./config/session.config')(app)

app.use((req, res, next) => {
    if (req.session.currentUser) {
        app.locals.currentUserId = req.session.currentUser._id
    } else {
        app.locals.currentUserId = null
    }
    next()
})

require("./routes")(app)
require("./error-handling")(app)

module.exports = app