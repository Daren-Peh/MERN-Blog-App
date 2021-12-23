import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
  
    const user = await User.findOne({ username })
  
    if (user && (await user.verifyPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  })
  


// @desc Register new user
// @route POST /api/users/register
// @access Public
const registerUser = async (req, res) => {
    const { username, email, password, profilePic } = req.body;
    const existingUser = await User.findOne({ email });
    if(existingUser){
        res.status(409).json('User exists. Please log in');
    } else { 
        try {
            const saltRounds = 10;
            const hashedPassword =  await bcrypt.hash(password, saltRounds);
        
            const newUser = new User({
                username: username,
                email: email.toLowerCase(), 
                password: hashedPassword,
                profilePic: profilePic,
                
            });
            const registeredUser = await newUser.save();
            res.status(201).json({
                registerUser,
                token: generateToken(newUser._id),
            });         
        } catch(error){
            res.status(500).json(error);
        }
    }
};

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.verifyPassword(password)){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401).json("Invalid login credentials");
    }
}

// @desc Update user
// @route PUT /api/users/:id
// @access Private 

const updateUser = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user){
  
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.profilePic = req.body.profilePic || user.profilePic;
        // if user enters password, update password
        if (req.body.password) {
            const saltRounds = 10;
            req.body.password =  await bcrypt.hash(req.body.password, saltRounds);
        }

        const updatedUser = await User.findByIdAndUpdate(id,{
            $set: req.body
        })
        res.status(200).json({
            username: user.username,
            email: user.email,
            profilePic: user.profilePic

        });
    } else {
        res.status(404);
        throw new Error ("User not found");
    }
}

// @desc Delete user and user's posts
// @route DELETE /api/users/:id
// @access Public
const deleteUser = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user){
        await Post.deleteMany({
            username: user.username
        })
    };

    try{
        if (id === req.body.id){
            await User.findByIdAndDelete(id);
            res.status(201).json(`User with ID ${id} has been deleted.`);
        } else {
            res.status(402).json(`Wrong ID.`);
        }  
    }catch(error){
        res.status(401).json({error: error})
    }  
};

// @desc Get user info
// @route GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
});

export { authUser, registerUser, loginUser, updateUser, deleteUser, getUserProfile };