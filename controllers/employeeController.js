//Define the Employee Model: path = ../models/Employee
const Employee = require("../models/Employee");

//Define mongoose for validating Employee ID
const mongoose = require("mongoose")

//POST : path = /api/v1/emp/employees
//Define the createEmployee function
const createEmployee = async (request, response, next) => {

    //try section
    try {
        //Get employee data from body by request
        const {
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        } = request.body;

        //if statement : check each field
        if (
            first_name === undefined ||
            last_name === undefined ||
            email === undefined ||
            position === undefined ||
            salary === undefined ||
            date_of_joining === undefined ||
            department === undefined
        ) {
            //return the status code (400)
            return response.status(400).json({
                //show message content
                message: "All Employee fields are required!"
            });
        }

        //Create new Employee
        const employee = await Employee.create({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,

            //Get employee owner from authenticated JWT
            user: request.userId
        });

        //return status code (201)
        return response.status(201).json({
            //show message content
            message: "Employee created successfully!",
            employee: employee
        });

    }
    //catch section
    catch (error) {
        next(error);
    }
};

//GET - path : /api/v1/emp/employees
//Define the getEmployees function
const getEmployees = async (request, response, next) => {

    //try section
    try {
        //find employees owned by authenticated user
        const employees = await Employee.find({
            user: request.userId
        });

        //return status code (200)
        return response.status(200).json({
            //show the message content
            message: "Employees retrieved successfully!",
            employees: employees
        });

    }
    //catch section
    catch (error) {
        next(error);
    }
};


//GET Method - path : /api/v1/emp/employees/:eid
//Define the getEmployeeById function 
const getEmployeeById = async(request, response, next) => {
    //try section 
    try{
        //Get employee ID from request params
        const {eid} = request.params

        //if statement - Check if the employee ID is valid?
        if(!mongoose.isValidObjectId(eid)){
            //return status code(400)
            return response.status(400).json({
                //show the message content 
                message: "Invalid Employee ID!"
            })
        }

        //Find Employee by ID & authenticated User
        const employee = await Employee.findOne({
            _id: eid, 
            user: request.userId
        })

        //if statement : check if the employee exists?
        if(!employee){
            //return status code (404)
            return response.status(404).json({
                //show the message content 
                message : "Employee not found!"
            })
        }

        //return status code(200) : succesfull 
        return response.status(200).json({
            //show the message content 
            message : "Employee retrieved successfully", 
            employee: employee
        })
    }

    //catch section 
    catch(error){
        next(error)
    }
}



 //PUT Method - path : /api/v1/emp/employees/:eid
//Define the updateEmployee function
const updateEmployee = async (request, response, next) => {

    //try section
    try {
        //Get employee ID from request params
        const { eid } = request.params;

        //if statement : check employee ID
        if (!mongoose.isValidObjectId(eid)) {
            //return status code (400)
            return response.status(400).json({
                //show the message content
                message: "Invalid Employee ID"
            });
        }

        //Get fields from request body
        const allowedFields = [
            "first_name", "last_name", "email", "position",
            "salary", "date_of_joining", "department"
        ];

        //Create object for updated data
        const updateData = {};

        //Get only allowed fields from body
        //for loop to go through the fields
        allowedFields.forEach((field) => {
            //if statement : check if it is undefined?
            if (request.body[field] !== undefined) {
                updateData[field] = request.body[field];
            }
        });

        //if statement : check if the updated data exists?
        if (Object.keys(updateData).length === 0) {
            //return status code (400)
            return response.status(400).json({
                //show the message error
                message: "No valid fields provided for update"
            });
        }

        //Find the employee and update the employee belonging to authenticated user
        const employee = await Employee.findOneAndUpdate(
            {
                //id section
                _id: eid,
                //user section
                user: request.userId
            },
            { $set: updateData },
            {
                new: true,
                runValidators: true
            }
        );

        //if statement : check if the employee exists
        if (!employee) {
            //return status code (404)
            return response.status(404).json({
                //show the message content
                message: "Employee not found"
            });
        }

        //return status code (200)
        return response.status(200).json({
            //show the message content
            message: "Employee updated successfully!",
            employee: employee
        });
    }

    //catch section
    catch (error) {
        next(error);
    }
};

//export section [createEmployee, getEmployees, getEmployeeById, updateEmployee]
module.exports = { createEmployee, getEmployees, getEmployeeById, updateEmployee };
