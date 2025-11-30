import User from "../models/user.model.js";
import { generateToken } from "../util/generateToken.js";
import bcrypt from "bcryptjs";

//Register user

 export const registerUser = async(req,res) => {
    try {
        const {name,email,password,gender,phone} =req.body;
        console.log(name,email,password)
        if(!name || !email || !password){
            return res.status(400).json({message : "All Fields are required"})
        }
        const user = await User.findOne({email});
        console.log(user)
        if(user){
            return res.status(400).json({message : "email is already exist"})
        }
        const newUser = await User.create({
            name,
            email,
            password,
            gender,
            phone
        })

        let token;
    try {
      token = generateToken(newUser._id);
    } catch (err) {
      console.error("Token generation failed ❌", err);
      // STILL return success because user is created
      return res.status(201).json({
        message: "User registered but token generation failed",
        user: newUser
      });
    }
        res.cookie("token",token,{
            httpOnly : true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge : 15 * 60 * 60 * 1000
        })

        res.status(200).json({message : "user registered successfully" , user : newUser, token})
    } catch (error) {
        res.status(500).json({message : "Internal Server Error (unable to register user)"})
    }
}

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });
    console.log(email,password , "at login")
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
    });

    res.status(200).json({
      message: "User logged in successfully",
      user,
      token
    });

  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error (unable to login user)" });
  }
};

//logout user

export const logoutUser = async(req,res) => {
    try {
        res.cookie("token","")
        res.status(200).json({message : "user logged out successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal Server Error (unable to logout user)"})
    }
}
