import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from '../lib/cloudinary.js';
import { getReceiverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js";

export const getUsersForSidebar = async (req,res) =>{
    try{
        const loggedInUserId = req.user._id;

        // Optional role filter so mentees can browse mentors and vice versa
        const { role } = req.query;
        const query = { _id: { $ne: loggedInUserId } };
        if (role === "mentor" || role === "mentee") {
            query.role = role;
        }

        const filteredUsers = await User.find(query).select("-password").sort({ createdAt: -1 });

        return res.status(200).json(filteredUsers);

    }catch(error){
        console.error("error in getUsersForSidebar:",error.message);
        return res.status(500).json({error:"internal server error"});
    }
};

export const getMessages = async (req,res) => {
    try{
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId , receiverId:userToChatId},
                {senderId:userToChatId , receiverId:myId},
            ]
        })
        return res.status(200).json(messages);
    }catch(error){

        console.log("Error in getMessages controller:",error.message);
        return res.status(500).json({error:"Internal server error"});

    }
};

export const sendMessage = async (req,res) => {
    try{
       const {text,image} = req.body;
       const {id: receiverId} = req.params;
       const senderId = req.user._id;

       let imageUrl;
       if(image){
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
       }

       const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
       });

       await newMessage.save();

       


       //todo : app real time functionality with socket.io
       const receiverSocketId = getReceiverSocketId(receiverId);
       if(receiverSocketId){
           io.to(receiverSocketId).emit("newMessage",newMessage);
       }
       


       return res.status(201).json(newMessage);
    }catch(error){
       console.log("Error in sendMessage controller:",error.message);
       return res.status(500).json({error:"Internal server error"});
    }
};