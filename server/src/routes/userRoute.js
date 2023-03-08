const express = require('express')
const { register, authUser, allUsers } = require('../controllers/userControllers')
const { protect } = require('../middlewares/auhMiddleware')
const router = express.Router()

router.get("/",protect,allUsers)
router.post("/",register);
router.post("/login",authUser)


module.exports = router