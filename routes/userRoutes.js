//express section
const express = require("express");

//signup section : path = ../controllers/userController
const { signup, login } = require("../controllers/userController");

//router section
const router = express.Router();

//Signup endpoint - POST Method - path : /signup
router.post("/signup", signup);

//Login endpoint - POST Method - path : /login
router.post("/login", login);

//export section
module.exports = router;
