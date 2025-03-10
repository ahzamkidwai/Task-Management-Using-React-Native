const express = require("express");
const {
  userRegistration,
  userLogginIn,
} = require("../controllers/auth-controller");
const router = express.Router();

router.post("/register", userRegistration);
router.post("/signin", userLogginIn);

module.exports = router;
