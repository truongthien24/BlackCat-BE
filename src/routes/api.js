const express = require("express");
const { postCreateUser } = require("../controller/user.controller");
const router = express.Router();

router.post("/create-user", postCreateUser);

module.exports = router;