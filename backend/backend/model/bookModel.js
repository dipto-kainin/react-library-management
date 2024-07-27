const mongoose = require("mongoose");
const isbnSchema = mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        borrowedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        borrowedAt: {
            type: Date,
            default: null
        }
    },
    { _id: false }
);
const bookSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: { type: String, required: true },
        image:{type:String},
        isbnPre: { type: String,unique:true,required: true },
        isbn: [isbnSchema],
        description: { type: String, required: true },
        borrowReq:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default:null
        }],
        returnReq:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default:null
        }]
    },
    {
        timestamps: true
    }
);
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
