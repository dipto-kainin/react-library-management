const expressAsyncHandler = require("express-async-handler");
const Book = require("../model/bookModel");
const User = require("../model/userModel");
const mongoose = require("mongoose");
//done by sayani
const addBook = expressAsyncHandler(async (req, res) => {
    const { title, author, genre, isbnPre, copies,image,description} = req.body;
    if (!title || !author || !genre || !isbnPre || !copies || !description) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    if (copies <= 0) {
        res.status(400).json({ message: "Number of copies should be greater than zero" });
        return;
    }
    const book = await Book.findOne({isbnPre})
    try {
        const isbnList =[]
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        const hour = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();
        for(let i=0;i<req.body.copies;i++){
            const obj={}
            obj.id= isbnPre+'-'+day+month+year+'|'+hour+min+sec+'-'+i;
            isbnList.push(obj)
        }
        if(book){
            book.isbn = book.isbn.concat(isbnList);
            book.save();
            res.status(200).json(book);
        }
        else{
            const book = new Book({
                title,
                author,
                genre,
                isbnPre,
                isbn: isbnList,
                image,
                description
            });
            const createdBook = await book.save();
            res.status(201).json(createdBook);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//done by sayani
const fetchBooks = expressAsyncHandler(async (req, res) => {
    try {
        const { pageNo } = req.params;
        const pageSize = 10;
        const skipBooks = (pageNo - 1) * pageSize;
        // Exclude the 'isbn' field
        const books = await Book.find({})
            .sort({ updatedAt: -1 })
            .skip(skipBooks)
            .limit(pageSize)
            .select('-isbn -borrowReq -returnReq');
        if (!books || books.length === 0) {
            return res.status(404).json({ error: "Books not found" });
        }
        return res.send({ data: books });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Some problem occurred" });
    }
});

//done by dipto
const fetchBook=expressAsyncHandler(async(req, res) =>{
    try {
        const {search} = req.params;
        console.log(search)
        const keywords ={
            $or: [
                { title: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } },
                { genre: { $regex: search, $options: "i" } },
                { isbnPre : search}
            ]
        }
        const books = await Book.find(keywords)
        .select('-isbn -borrowReq -returnReq');;
        if(!books){
            return res.status(404).json({error :"Books not found"})
        }
        return res.send({data:books})
    } catch (error) {
            console.log(error);
            res.send({mas:"Some problem occured"})
    }
})
//done by som
const deleteBook = expressAsyncHandler(async(req, res) => {
    if(req.user.role!=="user")
        return res.status(401).json({message:"You are not authorized to perform this action"});
    try {
        let book = await Book.find({ isbnPre: req.params.isbnPre })
        if (book.isbn.some(copy => copy.borrowedBy)) {
            return res.status(400).send("borrower exist cant delete");
        }
        else {
            const result = await Book.delete({ isbnPre: req.params.isbnPre })
            return res.send(result).status(200);
        }
    } catch (err) {
        console.log(err);
        return res.send("err");
    }
});
//done by som
const deleteSpecificCopy = expressAsyncHandler(async(req,res)=>{
    if(req.user.role!=="user")
        return res.status(401).json({message:"You are not authorized to perform this action"});
    try{
        const {isbnPre,id}=req.params;
        let result = await Book.updateOne({isbnPre: isbnPre},{$pull:{isbn:{$and:[{id:id},{borrowedBy:null}]}}})
        if(!result){
            return res.status(400).json({message:"Book not found or currently borrowed by"});
        }
        return res.json({message:"Successfully deleted copy"}).status(200);
    }
    catch(err){
        res.status(500).json(err);
    }
});
//done by anik,dipto
const updateBook = expressAsyncHandler(async(req,res)=>{
    if(req.user.role==="Admin"){
        const {title,author,genre,isbnPre,newIsbnPre} = req.body;
        const book=await Book.findOne({isbnPre});
        if(!book){
            res.status(404).json({message:"Book not found"});
            return;
        }
        const isAnyCopyBorrowed = book.isbn.some(copy => copy.borrowedBy);
        if (isAnyCopyBorrowed) {
            return res.status(400).json({ message: "Cannot update book details while a copy is borrowed" });
        }
        book.title = title || book.title;
        book.author = author || book.author;
        book.genre = genre || book.genre;
        if (newIsbnPre) {
            book.isbnPre = newIsbnPre;
            book.isbn = book.isbn.map(copy => {
                copy.id = copy.id.replace(isbnPre, newIsbnPre);
                return copy;
            });
        }
        await book.save();
        res.status(200).json({ message: "Book details updated successfully" });
    }
    else{
        res.status(401).json({message:"You are not authorized to perform this action"});
    }
});
//done by dipto
const borrowReq = expressAsyncHandler(async(req,res)=>{
    try {
        if(req.user._id){
            const {isbnPre}=req.body;
            const book=await Book.findOne({isbnPre});
            if(!book){
                res.status(404);
                throw new Error("Book not found");
            }
            book.borrowReq.push(req.user._id);
            await book.save();
            res.status(200).json({
                message: "book borrow requested successfully"
            });
        }
        else{
            res.status(401).json({message:"You are not authorized to perform this action"});
        }
    } catch (error) {
        res.status(500).json({message:"some error occured",error});
    }
});
//done by dipto
const borrowReqList = expressAsyncHandler(async (req, res) => {
    if (req.user.role === "Admin") {
        const books = await Book.find({ borrowReq: { $not: { $size: 0 } } })
            .select("-isbn -returnReq")
            .populate('borrowReq', '_id email'); // Populate borrowReq with user's _id and email

        if (!books.length) {
            return res.status(404).json({ message: "No books with borrow requests found" });
        }

        const Books = books.flatMap(book =>
            book.borrowReq.map(user => ({
                title: book.title,
                author: book.author,
                isbnPre: book.isbnPre,
                image: book.image,
                borrowReq: {
                    userId: user._id,
                    email: user.email
                }
            }))
        );

        res.status(200).json(Books);
    } else {
        res.status(401).send("You are not authorized to view this page");
    }
});
//done by dipto
const borrowReqCancel = expressAsyncHandler(async(req,res)=>{
    if(req.user.role==="Admin"){
        try{
        const {isbnPre,userid}=req.body;
        const book=await Book.findOne({isbnPre});
        if(!book){
            res.status(404);
            throw new Error("Book not found");
        }
        const index=book.borrowReq.indexOf(userid);
        book.borrowReq.splice(index,1);
        await book.save();
        res.status(200).json({
            message: "Borrow request cancelled successfully"
        });
        }catch(err)
        {
            res.status(500).json({
                message: "Error cancelling borrow request"
                });
        }
    }
    else{
        res.status(401).send("You are not authorized to view this page");
    }
});
//done by dipto
const borrowReqAccept = expressAsyncHandler(async(req,res)=>{
    if(req.user.role==="Admin"){
        const {isbnPre,email}=req.body;
        const book=await Book.findOne({isbnPre});
        const user=await User.findOne({email});
        if(!user){
            res.status(404);
            throw new Error("User not found");
        }
        if(!book){
            res.status(404);
            throw new Error("Book not found");
        }
        const availableCopy = book.isbn.find(copy => !copy.borrowedBy)
        if (!availableCopy) {
            return res.status(404).json({ message: "No available copies found" });
        }
        const borrowRequestIndex = book.borrowReq.indexOf(user._id);
        if (borrowRequestIndex === -1) {
            return res.status(404).json({ message: "Borrow request not found" });
        }
        availableCopy.borrowedBy = user._id;
        user.borrowedBook.push(availableCopy.id);
        availableCopy.borrowedAt = new Date();
        book.borrowReq.splice(borrowRequestIndex, 1);
        await book.save();
        await user.save();
        res.status(200).json({
            message: "Book borrow request accepted and assigned successfully"
        });
    }
    else{
        res.status(401).json({message:"You are not authorized to view this page"});
    }
});
//done by dipto
const returnReq = expressAsyncHandler(async(req,res)=>{
    const {isbnPre}=req.body;
    try{
        const book=await Book.findOne({isbnPre});
        if(!book){
            res.status(404);
            throw new Error("Book not found");
        }
        //console.log(req.user._id.toString(),book.isbn[0].borrowedBy.toString() )
        if(!book.isbn.find((copy)=> copy.borrowedBy?.toString() == req.user._id.toString())){
            res.status(404).json({message:"you do not have the book"});
            throw new Error("Book not found");
        }
        book.returnReq.push(req.user._id);
        await book.save();
        res.status(200).json({
            message: "return request updated successfully"
        });
    }catch(err){
        res.status(404).json({message:err.message});
    }
});
//done by dipto
const returnReqCancel = expressAsyncHandler(async(req,res)=>{
    if(req.user.role==="Admin"){
        const {isbnPre,userid}=req.body;
        const book=await Book.findOne({isbnPre});
        if(!book){
            res.status(404);
            throw new Error("Book not found");
        }
        const index=book.returnReq.indexOf(userid);
        book.returnReq.splice(index,1);
        await book.save();
        res.status(200).json({
            message: "return request cancelled successfully"
        });
    }
    else{
        res.status(401).send("You are not authorized to view this page");
    }
});
//done by dipto
const returnReqList = expressAsyncHandler(async (req, res) => {
    if (req.user.role === "Admin") {
        const books = await Book.find({ returnReq: { $not: { $size: 0 } } })
            .select("-isbn -borrowReq")
            .populate('returnReq', '_id email');
        if (!books.length) {
            return res.status(200).json({ message: "No books with return requests found" });
        }

        const Books = books.flatMap(book =>
            book.returnReq.map(user => ({
                title: book.title,
                author: book.author,
                isbnPre: book.isbnPre,
                image: book.image,
                returnReq: {
                    userId: user._id,
                    email: user.email
                }
            }))
        );

        res.status(200).json(Books);
    } else {
        res.status(401).send("You are not authorized to view this page");
    }
});
//done by dipto
const returnBook = expressAsyncHandler(async(req,res)=>{
    if(req.user.role==="Admin" && req.body.userid){
        const {isbnPre,email}=req.body;
        const book=await Book.findOne({isbnPre});
        const user=await User.findOne({email});
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        const returnRequestIndex = book.returnReq.indexOf(user._id);
        if (borrowRequestIndex === -1) {
            return res.status(404).json({ message: "Return request not found" });
        }
        const exactCopy = book.isbn.find(copy => copy.borrowedBy==user._id);
        if (!exactCopy) {
            return res.status(404).json({ message: "Book copy not found" });
        }
        const borrowedAt = new Date(exactCopy.borrowedAt);
        const returnedAt = new Date();
        const timeDiff = returnedAt - borrowedAt;
        const daysBorrowed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        exactCopy.borrowedBy=null;
        exactCopy.borrowedAt=null;
        user.borrowedBook.splice(borrowedBook.indexOf(exactCopy.id),1);
        book.returnReq.splice(returnRequestIndex, 1);
        book.save();
        res.status(200).json({
            message: "Book returned successfully",
            returned: daysBorrowed
        });
    }
    else{
        res.status(401).send("You are not authorized to view this page");
    }
});
//done by dipto
const uploadImg = expressAsyncHandler(async(req,res)=>{
    if(req.user.role==="Admin"){
        try {
            const imgRef = ref(storage, `files/book/${uuidv4()}`);
            const snapshot = await uploadBytes(imgRef, req.file.buffer, {
            contentType: req.file.mimetype,
            });
            const downloadURL = await getDownloadURL(snapshot.ref);
            res.status(200).json({ imageUrl: downloadURL });
        } catch (error) {
            console.error("Error uploading file:", error);
            res.status(500).json({ error: error.message });
        }
    }
    else{
        res.status(401).send("You are not authorized to view this page");
    }
})
module.exports={addBook,fetchBooks,fetchBook,deleteBook,deleteSpecificCopy,updateBook,borrowReq,borrowReqList,borrowReqCancel,borrowReqAccept,returnReq,returnReqList,returnReqCancel,returnBook,uploadImg};
