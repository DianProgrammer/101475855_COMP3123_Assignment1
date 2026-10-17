
//define the User varaible : path = ../models/User
const User = require("../models/User");

//define the varaibel for hashing side
const bcrypt = require("bcryptjs");

//Define variable for JWT
const jwt = require("jsonwebtoken");

// POST : path : /api/v1/user/signup
const signup = async (request, response, next) => {

    //try section
    try {
        //get data for these 3 vars
        const { username, email, password } = request.body;

        //if statement : see if these are exists
        if (!username || !email || !password) {
            //return status code [400]
            return response.status(400).json({

                //show the message content
                message: "Username, email & password are required"
            });
        }

        //2. Validate the input
        if (
            //type section
            typeof username !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||

            //length & trim section
            username.trim().length < 3 ||
            username.trim().length > 30 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
            password.length < 8 ||
            password.length > 128
        ) {
            //return status code [400]
            return response.status(400).json({
                //show the message content
                message: "Invalid username, email or password"
            });
        }

        //check the user already exists or not
        const existingUser = await User.findOne({
            $or: [
                { username: username.trim() },
                { email: email.trim().toLowerCase() }
            ]
        });

        //if statement : to check user exists or not
        if (existingUser) {
            //return status code [409]
            return response.status(409).json({

                //show the message content
                message: "Username or email already exists"
            });
        }

        //Hashing the password section
        const hashedPassword = await bcrypt.hash(password, 12);

        //creating the new user
        const user = await User.create({
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword
        });

        //return the response section : without password
        return response.status(201).json({
            //show the message content
            message: "User registered successfully",

            //info for user
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    }
    //catch section
    catch (error) {
        next(error);
    }
};

//POST = path : /api/v1/user/login
//define var : login
const login = async (request, response, next) => {

    //try section
    try {
        //get data from body for those vars
        const { username, email, password } = request.body;

        //if statement : check the type
        if (
            typeof password !== "string" ||
            !password ||
            (
                //username check
                (typeof username !== "string" || !username.trim()) &&

                //email check
                (typeof email !== "string" || !email.trim())
            )
        ) {
            //return the status code [400]
            return response.status(400).json({
                //show the message content
                message: "Username or email and password are required"
            });
        }

        //find the username or email - await
        const user = await User.findOne({
            $or: [
                //username type & trim
                {
                    username: typeof username === "string"
                        ? username.trim()
                        : null
                },

                //email type & trim based on lowercase
                {
                    email: typeof email === "string"
                        ? email.trim().toLowerCase()
                        : null
                }
            ]
        }).select("+password");

        //if statement - check the user inputs with DB
        if (!user) {
            //return status code [401]
            return response.status(401).json({
                //show the message content
                message: "Invalid credentials"
            });
        }

        //compare the hashed password with the entered password
        const isMatch = await bcrypt.compare(password, user.password);

        //if statement - check the password is correct or not?
        if (!isMatch) {
            //return status code [401]
            return response.status(401).json({
                //show the message content
                message: "Invalid credentials"
            });
        }

        //if statement - check the JWT Secret
        if (!process.env.JWT_SECRET) {
            //throw an error
            throw new Error("JWT_SECRET is not configured");
        }

        //Generate JWT Token
        const token = jwt.sign(
            //userid
            { userId: user._id.toString() },

            process.env.JWT_SECRET,

            //expire section
            { expiresIn: "1h", algorithm: "HS256" }
        );

        //return status code [200]
        return response.status(200).json({
            //show the message content
            message: "Login successful",
            token: token,

            //user info
            user: {
                //id section
                id: user._id,

                //username section
                username: user.username,

                //email section
                email: user.email
            }
        });
    }

    //catch section : error
    catch (error) {
        next(error);
    }
};

//export - signup / login
module.exports = { signup, login };
