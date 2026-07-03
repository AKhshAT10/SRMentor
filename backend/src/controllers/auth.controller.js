import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import cloudinary from "../lib/cloudinary.js";

// Shape a user document into the safe public object we send to the client
const publicUser = (user) => ({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic,
    role: user.role,
    year: user.year,
    branch: user.branch,
    bio: user.bio,
    interests: user.interests,
    createdAt: user.createdAt,
});

export const signup = async (req,res)=>{
    const {fullName,email,password,role,year,branch,bio,interests} = req.body;
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required" });
        }

        if(password.length < 6){
            return res.status(400).json({message:"Password must be atleast 6 characters"});
        }

        const user = await User.findOne({email}); //to check if user already exists

        if(user) return res.status(400).json({message:"Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword,
            role: role === "mentor" ? "mentor" : "mentee",
            year: year || "",
            branch: branch || "",
            bio: bio || "",
            interests: Array.isArray(interests) ? interests : [],
        });

        if(newUser){
            await newUser.save();
            generateToken(newUser._id,res);

            res.status(201).json(publicUser(newUser));
        }else{
            res.status(400).json({message:"Invalid user data"});
        }

    }catch(error){
        console.log("Error in signup controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
};

export const login = async (req,res)=>{

    const {email,password} = req.body;

    try{
       const user = await User.findOne({email});
       if(!user){
        return res.status(400).json({message:"Invalid credentials"});
       }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }

        generateToken(user._id,res);

        res.status(200).json(publicUser(user));

    }catch(error){
        console.log("Error in login controller",error.message);
        res.status(500).json({message:"internal server error"});
    }
};

export const logout = (req,res)=>{
    try{
       res.cookie("jwt","",{maxAge:0});
       return res.status(200).json({message:"Logged out successfully"});
    }catch(error){
       console.log("Error in logout controller",error.message);
       return res.status(500).json({message:"Internal Server Error"});
    }
};

export const updateProfile = async (req,res) =>{
    try{
       const {profilePic,bio,year,branch,role,interests} = req.body;
       const userId = req.user._id;

       const updates = {};

       if(profilePic){
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        updates.profilePic = uploadResponse.secure_url;
       }
       if(typeof bio === "string") updates.bio = bio;
       if(typeof year === "string") updates.year = year;
       if(typeof branch === "string") updates.branch = branch;
       if(role === "mentor" || role === "mentee") updates.role = role;
       if(Array.isArray(interests)) updates.interests = interests;

       if(Object.keys(updates).length === 0){
        return res.status(400).json({message:"No profile changes provided"});
       }

       const updatedUser = await User.findByIdAndUpdate(userId,updates,{new:true}).select("-password");

       return res.status(200).json(updatedUser);

    }catch(error){
       console.log("error in update profile:",error);
       return res.status(500).json({message:"internal server error"});
    }
};

export const checkAuth = async (req,res) =>{
    try{
     return res.status(200).json(req.user);
    }catch(error){
     console.log("error in checkAuth controller:",error.message);
     return res.status(500).json({message:"Internal server error"});
    }
};
