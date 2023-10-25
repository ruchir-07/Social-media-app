import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;
        
        /* HASH PASSWORD */
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        /* CREATE USER */
        const newUser = await new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        /* SAVE USER */
        const user = await newUser.save();

        /* SEND RESPONSE */
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

/* LOGIN USER */
export const login = async (req, res) => {
    try{
        // Find the user by their email address
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if(!user) return res.status(400).json({msg: "user not found"});

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"});
        
        // Return jsonwebtoken
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user })
    } catch(error) {
        res.status(500).json(error);
    }
}
