
//Define the mongoose
const mongoose = require("mongoose");

//Define the Employee Schema
const employeeSchema = new mongoose.Schema({
    //Define the first name
    first_name: {
        //type
        type: String,
        //it should be required
        required: true,
        //trim section
        trim: true,
        //minimum length
        minlength: 2,
        //maximum length
        maxlength: 50
    },

    //Define the last name
    last_name: {
        //type
        type: String,
        //it should be required
        required: true,
        //trim section
        trim: true,
        //minimum length
        minlength: 2,
        //maximum length
        maxlength: 50
    },

    //email section
    email: {
        //type
        type: String,
        //it should be required
        required: true,
        //it should be lowercase
        lowercase: true,
        //trim section
        trim: true,
        //match pattern
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },

    //Define the position of Employee
    position: {
        //type
        type: String,
        //it should be required
        required: true,
        //trim section
        trim: true,
        //maximum length
        maxlength: 100
    },

    //Define the Salary
    salary: {
        //type
        type: Number,
        //it should be required
        required: true,
        //min salary
        min: 0
    },

    //Define the date of joining
    date_of_joining: {
        //type
        type: Date,
        //it should be required
        required: true
    },

    //Define the Department
    department: {
        //type
        type: String,
        //it should be required
        required: true,
        //trim section
        trim: true,
        //maximum length
        maxlength: 100
    },

    //Define the relationship between User & Employee
    user: {
        //type
        type: mongoose.Schema.Types.ObjectId,
        //ref section
        ref: "User",
        //it should be required
        required: true,
        //immutable section
        immutable: true
    }
}, {
    //Define the timestamps
    timestamps: {
        //when does it create?
        createdAt: "created_at",
        //when does it update?
        updatedAt: "updated_at"
    }
});

//Create index for employee ownership queries
employeeSchema.index({ user: 1 });

//Export section
module.exports = mongoose.model("Employee", employeeSchema);
