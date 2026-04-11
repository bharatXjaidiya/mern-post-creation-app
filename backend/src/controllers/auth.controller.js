const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const userModel = require("../models/users.models")

async function registerController(req, res) {
    try{
        // Registration logic here
        const { userName , email , password , bio , profilePicture} = req.body;
        // Validate input
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //check if user already exists
        const existingUser = await userModel.findOne({
            $or: [{ email }, { userName }] //calling db at once to check if email or userName already exists
        });
        if(existingUser) {
            return res.status(409).json({ message: "User already exists with " + (existingUser.email === email ? "this email" : "this userName") });
        }
        // Hash password
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
        // Create user in database
        const newUser = await userModel.create({ userName, email, password: hashedPassword,bio,profilePicture });
        //generating a token and saving it to the cookie storage
        const token = jwt.sign({
            id: newUser._id
        },process.env.JWT_SECRET,{expiresIn:"1 day"})

        res.cookie("token",token)

        res.status(201).json({ 
            message: "User registered successfully",
            user: {
                userName : newUser.userName,
                email : newUser.email,
                //we don't send the password in the response
                bio:newUser.bio,
                porfilePicture : newUser.profilePicture
            }
        });

    }
    catch(error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

async function loginController(req, res) {
    try {
        // Login logic here
        const {userName , email , password} = req.body;
        const userExist = await userModel.findOne({
            $or : [{userName : userName}, {email : email}]
        })

        if(!userExist){
            return res.status(404).json({
                message : "user does not exist with this " + (userName ? "user name" : "email address")
            })
        }
        const hash = crypto.createHash("sha256").update(password).digest("hex");
        if(hash !== userExist.password){
            return ses.status(401).json({
                message : "invalid password"
            })
        }

        const token = jwt.sign({
            id : userExist._id
        },process.env.JWT_SECRET,{expiresIn:"1 day"})

        res.cookie("token",token)
        res.status(200).json({
            message: "user loggin successfully",
            user :{
                username : userExist.username,
                email : userExist.email,
                bio : userExist.bio,
                profilePic : userExist.profilePic

            }
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});    
    }
}

module.exports = {registerController , loginController}