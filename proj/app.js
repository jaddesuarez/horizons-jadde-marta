require("dotenv").config()
require("./db")

const express = require("express")
const app = express()

require("./config")(app)
app.locals.appTitle = 'HORIZONS'
require('./config/session.config')(app)

const { localSessionStorer } = require("./middleware/local-session-storer")
app.use(localSessionStorer)

require("./routes")(app)
require("./error-handling")(app)

module.exports = app