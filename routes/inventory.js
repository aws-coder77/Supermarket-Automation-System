const express = require("express");
const router = express.Router();
const { getInventory, addItem, updateItem } = require("../controllers/inventoryController");
const { isLoggedIn } = require("../middlewares/authMiddleware");

router.route("/inventory").get(isLoggedIn, getInventory);
router.route("/add").post(isLoggedIn, addItem);
router.route("/updateItems").post(isLoggedIn, updateItem);

module.exports = router;
