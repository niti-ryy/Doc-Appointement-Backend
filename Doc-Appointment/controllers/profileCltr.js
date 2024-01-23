
const Profile = require("../models/profileModel") // Import necessary modules and dependencies
const _ = require("lodash")
const bcrypt = require("bcrypt")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const profileController = {} // Initialize profileController object to handle profile-related operations

profileController.create = async (req, res) => { // Controller function to handle user registration
    const errors = validationResult(req) // Validate the request body
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }) // Return validation errors if present
    }
    const userData = _.pick(req.body, ["firstName", "lastName", "email", "phone", "password", "role"]) // Pick necessary fields from the request body
    const newUser = new Profile(userData)
    try {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds) // Generate salt for password hashing
        newUser.password = await bcrypt.hash(newUser.password, salt) // Hash the password
        
        const savedUser = await newUser.save() // Save the new user profile
        
        res.status(201).json({ // Return success message and saved user details
            message: "Registration Successful",
            user: savedUser
        })
    } catch (error) {
        res.status(500).json({ // Return error message in case of registration failure
            message: "Error in registration",
            error: error.message
        })
    }
}


profileController.login = async (req, res) => { // Controller function to handle user login
    const errors = validationResult(req) // Validate the request body
    if (!errors.isEmpty()) {
        return res.status(401).json({ // Return error message for validation failures during login
            message: "Error in Login",
            errors: errors.array()
        })
    }
    const { email, password } = req.body // Extract email and password from request body
    
    try {
        const user = await Profile.findOne({ email: email }) // Find user by email in the database
        if (!user) {
            return res.status(401).json({ // Return error message for invalid email during login
                message: "Invalid Email or Password"
            })
        }
        const verifyPassword = await bcrypt.compare(password, user.password) // Compare hashed password with input password
        if (!verifyPassword) {
            return res.status(401).json({ // Return error message for invalid password during login
                message: "Invalid Email or Password"
            })
        }
        const tokenData = {
            id: user._id,
            role: user.role,
            email: user.email
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" }) // Generate JWT token for user authentication
        res.status(201).json({ // Return success message with generated token for authenticated user
            message: `Bearer ${token}`
        })
    } catch (e) {
        res.status(401).json({ // Return error message for any unexpected errors during login
            message: e.message
        })
    }
}

profileController.update = async (req, res) => { // Controller function to update a profile based on its ID
    const { id } = req.params // Extract profile ID from request parameters
    const { body } = req // Extract updated profile data from request body
    
    try {
        const updatedRecord = await Profile.findByIdAndUpdate(id, body, { new: true }) // Find profile by ID and update it
        if (!updatedRecord) {
            res.status(401).json({ // Return error message if no profile found for the provided ID
                message: "No Profile found with the provided ID. Update failed."
            })
        }
        res.status(200).json({ // Return success message and updated profile details
            message: updatedRecord
        })
    } catch (e) {
        res.status(500).json({ // Return error message for any unexpected errors during update
            message: e.message
        })
    }
}

profileController.getUserAndCounselors = async (req, res) => { // Controller function to get users or counselors based on their roles
    const { role } = req.params // Extract role from request parameters
    try {
        if (role === 'Counselor' || role === 'User') {
            const profiles = await Profile.find({ role: role }) // Find profiles based on the specified role
            if (!profiles || profiles.length === 0) {
                return res.status(404).json({ 
                    message: `No ${role}s Found`,
                })
            }
            return res.status(200).json({
                success: true,
                message: profiles,
            })
        } else {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid role specified',
            })
        }
    } catch (e) {
        res.status(500).json({ 
            success: false,
            message: e.message,
        })
    }
}

profileController.getSingleUserAndCounselor = async (req, res) => { // Controller function to get a single user or counselor by ID
    const { id } = req.params // Extract profile ID from request parameters
    try {
        const fetchedRecord = await Profile.findById(id) // Find profile by ID
        if (!fetchedRecord) {
            res.status(401).json({ // Return error message if no profile found for the provided ID
                message: "No Record Found",
            })
        }
        res.status(200).json({ 
            message: fetchedRecord,
        })
    } catch (e) {
        res.status(500).json({ 
            message: e.message,
        })
    }
}

module.exports = profileController 