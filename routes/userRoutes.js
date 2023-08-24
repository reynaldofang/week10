const { Router } = require("express");
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
