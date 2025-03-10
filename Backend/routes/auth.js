const express = require("express");
const { userRegistration } = require("../controllers/auth-controller");
const router = express.Router();

router.post("/register", userRegistration);

module.exports = router;
