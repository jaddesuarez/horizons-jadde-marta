const express = require('express')
const router = express.Router()

router.get("/", (req, res, next) => {
  const currentUser = req.session.currentUser
  console.log(currentUser)
  res.render("index", { currentUser })
})

module.exports = router
