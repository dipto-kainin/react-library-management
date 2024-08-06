const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Book = require("../model/bookModel");
const generateToken = require("../utils/generateToken");
const nodemailer = require("nodemailer");
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const jwt = require("jsonwebtoken")
const { storage } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const dotenv = require("dotenv");
dotenv.config();

//done by som
const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password, address, pic } = req.body;
    console.log(email);
    if (!name || !email || !address || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({ name, email, password, address, pic });
    if (user) {
        res.status(201).json({
            message: "success"
        })
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});
//done by anik
const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            address: user.address,
            pic: user.pic,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});
//done by sudipta
const updateUser = expressAsyncHandler(async (req, res) => {
    try {
        if (req.user._id) {
            const { name, email, address, pic, newPassword, oldPassword } = req.body;
            const user = await User.findOne({ _id: req.user._id });
            console.log(pic);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            if (oldPassword && !(await user.comparePassword(oldPassword))) {
                return res.status(400).json({ message: "Old password is incorrect" });
            }
            user.name = name || user.name;
            user.email = email || user.email;
            user.address = address || user.address;
            user.pic = pic || user.pic;
            if (newPassword) {
                user.password = newPassword;
            }

            await user.save();

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
                pic: user.pic,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
//done by sudipta
const forgotPassword = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user)
            return res.status(400).json("User not found!");
        const data = {
            user: {
                email: user.email
            }
        };
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "5m" });
        console.log(token);
        const link = `http://localhost:3000/resetPassword/${user._id}/${token};`
        console.log(link);
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset',
            text: `Please use the following link to reset your password: ${link}`
        };
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Failed to send email", error });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'Token sent to email!' });
            }
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
//done by sudipta
const resetPassword = expressAsyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    const { id ,  token } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(400).json("User not found!");
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if (!verify) return res.status(400).json("Invalid token");
        if(verify!==user.email)
            return res.status(400).json("Invalid email");
        user.password = newPassword
        await user.save();
        res.status(200).json({ message: "Password reset successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: errorMessage, error: err });
    }
});
//done by dipto
const userBorrowedBook = expressAsyncHandler(async (req, res) => {
    try {
        if (req.user && req.user._id) {
            const user = await User.findById(req.user._id);
            if (!user) {
                return res.status(400).json({ message: "User not found!" });
            }
            const userBorrowed = user.borrowedBook;
            if (!Array.isArray(userBorrowed) || userBorrowed.length === 0) {
                return res.status(200).json({ message: "No books borrowed yet!" });
            }
            const borrowedBooks = await Promise.all(userBorrowed.map(async (isbnid) => {
                const isbnPre = isbnid.split("-")[0];
                const book = await Book.findOne({ isbnPre }).select("-isbn -borrowReq -returnReq");
                return {
                    isbnPre: book.isbnPre,
                    title: book.title,
                    author: book.author,
                    isbnid,
                    genre: book.genre,
                    image: book.image
                };
            }));
            console.log(borrowedBooks);
            res.status(200).json(borrowedBooks);
        } else {
            res.status(400).json({ message: "User not found!" });
        }
    } catch (error) {
        console.error("Error fetching borrowed books:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
//done by sudipta/dipto
const userDetailsSearch = expressAsyncHandler(async (req, res) => {
    try {
        if (req.user.role !== "user") {
            const { searchitem } = req.params;
            //console.log(searchitem)
            const keywords = {
                $or: [
                    { name: { $regex: searchitem, $options: "i" } },
                    { email: { $regex: searchitem } }
                ]
            }
            const user = await User.findOne(keywords);
            if (!user) {
                return res.status(404).json({ error: "User not found" })
            }
            //console.log(user);
            const userBorrowed = user.borrowedBook;
            //console.log(userBorrowed);
            if (!Array.isArray(userBorrowed) || userBorrowed.length === 0) {
                return res.status(200).json({ data: user, message: "No books borrowed yet!" });
            }

            const borrowedBooks = await Promise.all(userBorrowed.map(async (isbnid) => {
                const isbnPre = isbnid.split("-")[0];
                const book = await Book.findOne({ isbnPre }).select("-isbn -borrowReq -returnReq");
                return res.status(200).json({ data: user, borrwedBooks: book });

            }));
        }
        else {
            res.status(400).json({ message: "You are not authorized to perform this action!" });
        }
    }
    catch (error) {
        console.log(error);
        res.send({ mas: "Some problem occured" })
    }
});
//done by dipto
const uploadImg = expressAsyncHandler(async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const imgRef = ref(storage, `files/user/${req.user.email}`);
        const snapshot = await uploadBytes(imgRef, req.file.buffer, { contentType: req.file.mimetype });
        const downloadURL = await getDownloadURL(snapshot.ref);
        res.status(200).json({ imageUrl: downloadURL });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: error.message });
    }
})
module.exports = { registerUser, authUser, updateUser, forgotPassword, resetPassword, userBorrowedBook, userDetailsSearch,uploadImg }