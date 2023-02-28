const express  = require('express');
const {protect} = require("../middlewares/auhMiddleware");
const { accessChat, fetchChat, createGroup,renameGroup,removeFromGroup,addToGroup } = require('../controllers/chatController');

const router = express.Router()

router.route("/").post(protect,accessChat)
router.route("/").get(protect,fetchChat)
router.route("/group").post(protect,createGroup)
router.route("/rename").put(protect,renameGroup)
router.route("/groupremove").delete(protect,removeFromGroup)
router.route("/groupadd").post(protect,addToGroup)

module.exports = router