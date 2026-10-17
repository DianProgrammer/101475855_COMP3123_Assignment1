
//Define Authentication Middleware: path = ../middleware/auth
const auth = require("../middleware/auth");

//Define Employee Controller : path = ../controllers/employeeController
const { createEmployee, getEmployees, getEmployeeById, updateEmployee } = require("../controllers/employeeController");

const express = require("express");

//Define the Router
const router = express.Router();

//Apply JWT Authentication to all Employee Routes
router.use(auth);

//GET Method - path : /employees
router.get("/employees", getEmployees);

//POST Method - path : /employees
router.post("/employees", createEmployee);

//GET Employee by ID - path : /employees/:eid
router.get("/employees/:eid", getEmployeeById);

//PUT Employee by ID - path : /employees/:eid
router.put("/employees/:eid", updateEmployee)

//export section
module.exports = router;
