import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email:{
           type: String,
           required: true,
           unique: true,
        },
        fullName:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
            minLength: 6,
        },
        profilePic:{
            type: String,
            default: "",
        },
        // Whether this person is offering guidance (mentor) or looking for it (mentee)
        role:{
            type: String,
            enum: ["mentor", "mentee"],
            default: "mentee",
        },
        // Academic year, for example "1st Year", "2nd Year", "Final Year"
        year:{
            type: String,
            default: "",
        },
        // Branch or department, for example "CSE", "ECE", "Mechanical"
        branch:{
            type: String,
            default: "",
        },
        // Short introduction shown on the profile
        bio:{
            type: String,
            default: "",
            maxLength: 300,
        },
        // Topics a mentor can help with or a mentee is curious about
        interests:{
            type: [String],
            default: [],
        },
    },{timestamps: true}
);

const User = mongoose.model("User",userSchema);

export default User;
