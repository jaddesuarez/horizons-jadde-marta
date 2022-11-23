module.exports = app => {

    const indexRouter = require("./index.routes")
    app.use("/", indexRouter)

    const authRouter = require("./auth.routes")
    app.use("/", authRouter)

    const profileRouter = require("./profile.routes")
    app.use("/profile", profileRouter)

    const communityRouter = require("./community.routes")
    app.use("/community", communityRouter)

    const eventRouter = require("./event.routes")
    app.use("/event", eventRouter)

    const nookipediaRouter = require("./nookipedia.routes")
    app.use("/wiki", nookipediaRouter)

}
