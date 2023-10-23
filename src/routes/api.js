const express = require("express");
const { postCreateUser, getAllUser } = require("../controller/user.controller");
const router = express.Router();

router.post("/create-user", postCreateUser);
router.get("/getAll-user", getAllUser);

module.exports = router;