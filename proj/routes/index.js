module.exports = app => {

    // Base routes
    const indexRouter = require("./index.routes")
    app.use("/", indexRouter)

    // Auth routes
    const authRouter = require("./auth.routes")
    app.use("/", authRouter)

    // Profile routes
    const profileRouter = require("./profile.routes")
    app.use("/profile", profileRouter)

    // Community routes
    const communityRouter = require("./community.routes")
    app.use("/community", communityRouter)

    // Event routes
    const eventRouter = require("./event.routes")
    app.use("/events", eventRouter)

    // Nookipedia routes
    const nookipediaRouter = require("./nookipedia.routes")
    app.use("/wiki", nookipediaRouter)

}
