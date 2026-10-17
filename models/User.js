
// Define variable to connect to DB
const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema(
    {
        // Define characteristic of the username
        username: {
            // type
            type: String,
            // it is required
            required: true,
            // it should be unique
            unique: true,
            // trim section
            trim: true,
            // minimum length of it
            minlength: 3,
            // maximum length of it
            maxlength: 30
        },

        // Define characteristic of the email
        email: {
            // type
            type: String,
            // it is required
            required: true,
            // it should be unique
            unique: true,
            // it should be lowercase
            lowercase: true,
            // trim
            trim: true,
            // match section
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },

        // Define the characteristic of password
        password: {
            // type
            type: String,
            // it is required
            required: true,
            // select section
            select: false
        }
    },
    {
        // timestamps section
        timestamps: {
            // when does it create?
            createdAt: "created_at",
            // when does it update?
            updatedAt: "updated_at"
        }
    }
);

// export section [export the User model]
module.exports = mongoose.model("User", userSchema);
