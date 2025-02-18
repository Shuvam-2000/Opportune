import UserModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import { getDataUri } from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Load Environment Variables
configDotenv();

// new user registration
export const newUserRegistration = async (req,res) => {
    try{
        const { fullname, email, phoneNumber, password, role } = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role) return res.status(400).json({ 
            message: 'All Fields Required', 
            success: false 
        })

        let profilePicture = undefined;   // set profile picture to undefined by default

        // if profile picture provided uplod it to cloudinary
        if (req.file) {
            const fileURi = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileURi.content);
            profilePicture = cloudResponse.secure_url; // Set uploaded image URL 
        }

        // Check if user already exists
        const user = await UserModel.findOne({ email });
        if(user) return res.status(400).json({ 
            message: 'User Already Exists', 
            success: false 
        });

        // register new user with required fields & securely hash the password
        const newUser = new UserModel({
            fullname,
            email,
            phoneNumber,
            password,
            role,
            profile: { 
                profile: profilePicture ? { profilePicture } : undefined, // if provided give profile picture URL or keep it undefined
            } 
        });

        newUser.password = await bcrypt.hash(password, 10); // hash the password with bycrpt
        await newUser.save(); // save the user details in the database
        res.status(200).json({ 
            message: 'Signed Up SuccessFully', 
            success: true 
        })
    }catch(error){
        res.status(500).json({ 
            message: 'Internal Server Error', 
            success: false 
        });
    };
};

// existing user login
export const userLogin = async (req,res) => {
    try {
        const { email, password, role } = req.body;
        if(!email || !password || !role) return res.status(400).json({ 
            message: 'All Fields Required', 
            success: false 
        });

        // validating email exits in the database
        const userLogin = await UserModel.findOne({ email });
        const errorMessage = 'Incorrect Email Or Password';
        if(!userLogin) return res.status(400).json({ 
            message: errorMessage, 
            success: false 
        });

        // valdating password by comparing the client side passowrd and the db passowrd
        const isPasswordEqual = await bcrypt.compare(password, userLogin.password);
        if(!isPasswordEqual) return res.status(403).json({
            message: errorMessage,
            success: false
        });

        // validate role of the user druring login
        if(role !== userLogin.role) return res.status(400).json({
            message: 'Account Does Not Exist With Current Role',
            success: false
        });

        // Intialize jwt token for the user
        const jwtToken = jwt.sign({ 
            email: userLogin.email, 
            id: userLogin._id,
            role: userLogin.role}, 
            process.env.JWT_SECRET, 
            {expiresIn: '1d'}
        );

        // Set the token to the HTTP-only cookie
        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',  // Use 'none' for cross-origin in production, 'lax' for local development
            maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
        });

        res.status(200).json({
            message: `Welcome ${userLogin.fullname}`,
            user: userLogin,
            success: true
        });
    }catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    };
};

// user logout
export const userLogout = async(req,res) => {
    // clear the cookie when user logs out 
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // use secure cookies in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Use 'none' for cross-origin in production, 'lax' for local development
        maxAge: 0
    });
    res.status(200).json({ 
        message: 'Logged Out Successfully' });
};

// user profile update
export const userProfileUpdate = async (req, res) => {
    try {
        // Fetch the fields to be updated
        const updates = req.body;
        const updateFields = { ...updates };  // Include all updates directly to the updates fields

        // upload file to cloudinary only if file is provided
        const file = req.file;
        if (req.file) {
            const fileURi = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileURi.content);
            
            updateFields["profile.resume"] = cloudResponse.secure_url;
            updateFields["profile.resumeOriginalName"] = req.file.originalname;
        }
        
        // Convert 'skills' string to an array if provided
        if (updates.skills) {
            updateFields["profile.skills"] = updates.skills.split(",");
        }

        // Ensure 'bio' is placed correctly in the profile object
        if (updates.bio) {
            updateFields["profile.bio"] = updates.bio;
        }

        // Extract user ID from request parameters
        const userid = req.params.userid;

        // Update the user profile with only the provided fields
        const user = await UserModel.findByIdAndUpdate(userid, { $set: updateFields }, { new: true });

        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
                success: false
            });
        }

        res.status(200).json({
            message: "Profile Updated Successfully",
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};


// user profile delete
export const useProfileDelete = async (req,res) => {
    try {
        const userid = req.params.userid;

        // find user profile with the id and delete user profile 
        const deleteUserProfile = await UserModel.findByIdAndDelete(userid);

        // check if user is avaliable
        if(!deleteUserProfile) return res.status(400).json({
            message: 'User Not Found',
            success: false
        });

        res.status(200).json({
            message: 'Profile Deleted SuccesFully',
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}