const express = require('express')
const { register, authUser, allUsers } = require('../controllers/userControllers')
const { protect } = require('../middlewares/auhMiddleware')
const router = express.Router()

router.route("/").post(register).get(protect,allUsers)

router.post("/login",authUser)


module.exports = router