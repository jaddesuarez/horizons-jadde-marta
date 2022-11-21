module.exports = app => {

    // Base routes
    const indexRouter = require("./index.routes")
    app.use("/", indexRouter)

    // Auth routes
    const authRouter = require("./auth.routes")
    app.use("/", authRouter)

    // User routes
    const userRouter = require("./user.routes")
    app.use("/profile", userRouter)

    // Community routes
    const communityRouter = require("./community.routes")
    app.use("/community", communityRouter)

    // Event routes
    const eventRouter = require("./event.routes")
    app.use("/event", eventRouter)

}
