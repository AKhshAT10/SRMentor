import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

config();

// Demo accounts for SRMentor. Every password is "123456".
const seedUsers = [
  // Mentors (senior students offering guidance)
  {
    email: "aarav.senior@srmist.edu.in",
    fullName: "Aarav Menon",
    password: "123456",
    role: "mentor",
    year: "Final Year",
    branch: "CSE",
    bio: "Placed at a product company. Happy to help juniors with DSA and internships.",
    interests: ["DSA", "Internships", "Web Development"],
    profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    email: "diya.senior@srmist.edu.in",
    fullName: "Diya Sharma",
    password: "123456",
    role: "mentor",
    year: "3rd Year",
    branch: "ECE",
    bio: "Robotics club lead. Ask me about circuits, clubs and campus life.",
    interests: ["Robotics", "Clubs", "Electronics"],
    profilePic: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    email: "kabir.senior@srmist.edu.in",
    fullName: "Kabir Nair",
    password: "123456",
    role: "mentor",
    year: "Final Year",
    branch: "Mechanical",
    bio: "Core engineering enthusiast. Guidance on projects, GATE and higher studies.",
    interests: ["GATE", "Projects", "Higher Studies"],
    profilePic: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    email: "ananya.senior@srmist.edu.in",
    fullName: "Ananya Reddy",
    password: "123456",
    role: "mentor",
    year: "3rd Year",
    branch: "IT",
    bio: "Full stack developer and hackathon regular. Let us build something.",
    interests: ["Hackathons", "Full Stack", "UI Design"],
    profilePic: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    email: "vihaan.senior@srmist.edu.in",
    fullName: "Vihaan Gupta",
    password: "123456",
    role: "mentor",
    year: "Final Year",
    branch: "CSE",
    bio: "Into AI and ML research. Ask me about papers, courses and internships.",
    interests: ["Machine Learning", "Research", "Python"],
    profilePic: "https://randomuser.me/api/portraits/men/15.jpg",
  },

  // Mentees (first year students looking for guidance)
  {
    email: "riya.fresher@srmist.edu.in",
    fullName: "Riya Patel",
    password: "123456",
    role: "mentee",
    year: "1st Year",
    branch: "CSE",
    bio: "Just started at SRM. Excited to learn coding and join clubs.",
    interests: ["Coding", "Clubs"],
    profilePic: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    email: "arjun.fresher@srmist.edu.in",
    fullName: "Arjun Verma",
    password: "123456",
    role: "mentee",
    year: "1st Year",
    branch: "ECE",
    bio: "First year ECE. Looking for a mentor to guide me through campus life.",
    interests: ["Electronics", "Sports"],
    profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    email: "sara.fresher@srmist.edu.in",
    fullName: "Sara Khan",
    password: "123456",
    role: "mentee",
    year: "1st Year",
    branch: "IT",
    bio: "New to SRM and curious about hackathons and design.",
    interests: ["Design", "Hackathons"],
    profilePic: "https://randomuser.me/api/portraits/women/23.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await User.deleteMany();

    for (const user of seedUsers) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      const newUser = new User({ ...user, password: hashedPassword });
      await newUser.save();
    }

    console.log("Database seeded successfully with SRM MentorConnect demo users");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
